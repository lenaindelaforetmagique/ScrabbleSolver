class TextBox {
  constructor(parent_) {
    this.dom = document.getElementById("textBox");
    this.text = "";
    this.initEvents();

    this.parent = parent_;
    this.dictionary = this.parent.solutionDictionary;
  }

  initEvents() {
    var thiz = this;
    document.onkeydown = function(e) {
      // console.log(e.which);
      if (e.key == " ") {
        e.preventDefault();
        // space bar
        thiz.submit();
      } else if (e.which == 8) {
        e.preventDefault();
        thiz.backspace();
      } else {
        var letter = e.key;
        letter = letter.toUpperCase();
        var inL = ["À", "É", "È", "Ç", "Ù"];
        var outL = ["A", "E", "E", "C", "U"];
        for (var i = 0; i < inL.length; i++) {
          letter = letter.replace(inL[i], outL[i]);
        }
        if ("ABCDEFGHJIKLMNOPQRSTUVWXYZ".indexOf(letter) > -1) {
          thiz.appendLetter(letter);
        }
      }
    }
  }

  submit() {
    this.parent.submit(this.text);
    this.clear();
  }

  appendLetter(letter) {
    letter = letter.toUpperCase();
    this.text += letter;
    this.update();
  }

  backspace() {
    this.text = this.text.substring(0, this.text.length - 1);
    this.update();
  }

  clear() {
    this.text = "";
    this.update();
  }

  update() {
    this.dom.innerHTML = this.text;
    if (this.dictionary.loaded) {
      var test = this.dictionary.testWord(this.text)
      if (test == 0) { // return "'" + word + "' n'existe pas !";
        this.dom.setAttribute("class", "false");
      } else if (test == 1) { // return "'" + word + "' existe mais n'est pas terminal";
        this.dom.setAttribute("class", "partial");
      } else if (test == 2) { // return "'" + word + "' existe et est terminal";
        this.dom.setAttribute("class", "ended");
      } else if (test == 3) { // return "'" + word + "' existe et est terminal";
        this.dom.setAttribute("class", "extendable");
      }
    }
  }
}

class Square {
  constructor(parent_, i_, j_) {
    this.parent = parent_;
    this.dom = document.createElementNS(SVGNS, 'rect');
    this.letter = null;
    this.i = i_; // line
    this.j = j_; // column
    this.letterMultiplier = 1;
    this.wordMultiplier = 1;
    this.init();
  }

  init() {
    let myName = "ABCDEFGHIJKLMNO".charAt(this.i) + (this.j + 1) + ",";
    // console.log(myName);
    let squareClass = "Square";
    if ("A1,A8,A15,H1,H15,O1,O8,O15,".includes(myName)) {
      // Triple word
      squareClass = "Square_TW";
    } else if ("B2,B14,C3,C13,D4,D12,E5,E11,H8,N2,N14,M3,M13,L4,L12,K5,K11,".includes(myName)) {
      // Double word
      squareClass = "Square_DW";
    } else if ("B6,B10,F2,F6,F10,F14,J2,J6,J10,J14,N6,N10,".includes(myName)) {
      // Triple Letter
      squareClass = "Square_TL";
    } else if ("A4,A12,C7,C9,D1,D8,D15,G3,G7,G9,G13,H4,H12,I3,I7,I9,I13,L1,L8,L15,M7,M9,O4,O12,".includes(myName)) {
      // Double Letter
      squareClass = "Square_DL";
    }
    this.dom.setAttribute("class", squareClass);

  }

  update() {
    this.dom.setAttribute("x", this.parent.xGrid + this.j * this.parent.squareWidth);
    this.dom.setAttribute("y", this.parent.yGrid + this.i * this.parent.squareWidth);
    this.dom.setAttribute("width", this.parent.squareWidth);
    this.dom.setAttribute("height", this.parent.squareWidth);

  }

}





class BoardGame {
  constructor(parent_) {
    this.parent = parent_;

    this.dom = document.createElementNS(SVGNS, 'g');

    this.grid = [];
    this.remainder = [];
    this.currentLetters = [];
    this.currentSolutions = [];

    this.xGrid = 0;
    this.yGrid = 0;
    this.squareWidth = 30;
    this.init();
  }


  init() {
    this.grid = [];
    for (let i = 0; i < 15; i++) {
      let newLine = [];
      for (let j = 0; j < 15; j++) {
        let newSquare = new Square(this, i, j);
        newLine.push(newSquare);
        this.dom.appendChild(newSquare.dom);
        newSquare.update();
      }
      this.grid.push(newLine);
    }

    console.log(this.grid);
  }


  load_events() {
    var thiz = this;
    var handleReset = function(e) {
      if (e.type != "mouseup" || !thiz.mouseFired) {
        thiz.resetGame();
      }
    }

    var handleShowSolution = function(e) {
      if (e.type != "mouseup" || !thiz.mouseFired) {
        thiz.showSolutions();
      }
    }

    var handleSubmit = function(e) {
      if (e.type != "mouseup" || !thiz.mouseFired) {
        thiz.textBox.submit();
      }
    }

    var handleBcksp = function(e) {
      if (e.type != "mouseup" || !thiz.mouseFired) {
        thiz.textBox.backspace();
      }
    }

    this.resetButton.addEventListener("mouseup", handleReset, false);
    this.showSolutionButton.addEventListener("mouseup", handleShowSolution, false);
    this.submitButton.addEventListener("mouseup", handleSubmit, false);
    this.bckspButton.addEventListener("mouseup", handleBcksp, false);
    // }

    this.resetButton.addEventListener("touchend", handleReset, false);
    this.showSolutionButton.addEventListener("touchend", handleShowSolution, false);
    this.submitButton.addEventListener("touchend", handleSubmit, false);
    this.bckspButton.addEventListener("touchend", handleBcksp, false);
    // } else {
    document.addEventListener("touchend", function(e) {
      if (e.type == "touchend") {
        thiz.mouseFired = true;
      }
    }, false);
  }

  updateScore() {
    this.scoreCell.innerHTML = this.totalScore + " / " + this.maxScore + " points<br>" + this.foundWords.length + " / " + this.totalWords + " mots";
  }



  showSolutions() {
    removeChildren(this.solutionsBox);
    for (var sol of this.solutions) {
      var p_ = document.createElement("div");
      p_.innerHTML = sol;
      if (this.foundWords.indexOf(sol) > -1) {
        // found
        p_.setAttribute("class", "found");
      } else {
        p_.setAttribute("class", "notFound");
        // not found
      }
      this.solutionsBox.appendChild(p_);
    }
  }

  updateFoundWords() {
    removeChildren(this.solutionsBox);
    this.foundWords.sort();
    for (var sol of this.foundWords) {
      var p_ = document.createElement("div");
      p_.innerHTML = sol;
      p_.setAttribute("class", "found");
      // p_.setAttribute("class", "notFound");
      this.solutionsBox.appendChild(p_);
    }
  }




  solve() {
    var currentState = [];
    for (var i = 0; i < 4; i++) {
      currentState[i] = [];
      for (var j = 0; j < 4; j++) {
        currentState[i][j] = 0;
      }
    }

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        this.goDeeper(currentState, i, j, "");
      }
    }
    this.solutions.sort();
    for (var sol of this.solutions) {
      this.solutionDictionary.addWord(sol);
      this.maxScore += this.score(sol);
    }
    this.solutionDictionary.loaded = true;
    this.textBox.dictionary = this.solutionDictionary;
    this.totalWords = this.solutionDictionary.size;

    // console.log(this.solutions);
  }


  goDeeper(currentState, posi, posj, word) {
    if ((0 <= posi && posi < 4) && (0 <= posj && posj < 4)) {
      if (currentState[posi][posj] == 0) {
        word += this.grid[posi][posj];
        var res = this.dictionary.testWord(word);
        if (res > 0) {
          var newState = [];
          for (var i = 0; i < 4; i++) {
            newState[i] = [];
            for (var j = 0; j < 4; j++) {
              newState[i][j] = currentState[i][j];
            }
          }
          newState[posi][posj] = 1;

          if (res >= 2) {
            if (this.solutions.indexOf(word) == -1 && word.length > 2) {
              this.solutions.push(word);
            }
          }

          // explores neighboring
          this.goDeeper(newState, posi - 1, posj - 1, word);
          this.goDeeper(newState, posi - 1, posj, word);
          this.goDeeper(newState, posi - 1, posj + 1, word);
          this.goDeeper(newState, posi, posj - 1, word);
          this.goDeeper(newState, posi, posj + 1, word);
          this.goDeeper(newState, posi + 1, posj - 1, word);
          this.goDeeper(newState, posi + 1, posj, word);
          this.goDeeper(newState, posi + 1, posj + 1, word);
        }
      }
    }
  }

  score(word) {
    var len = word.length;
    var res = 0
    if (len == 3) {
      res = 1;
    } else if (len == 4) {
      res = 1;
    } else if (len == 5) {
      res = 2;
    } else if (len == 6) {
      res = 3;
    } else if (len == 7) {
      res = 5;
    } else if (len >= 8) {
      res = 11;
    }
    return res;
  }

  submit(word) {
    if (this.solutionDictionary.testWord(word) >= 2) {
      if (this.foundWords.indexOf(word) == -1) {
        this.totalScore += this.score(word);
        this.foundWords.push(word);
        this.updateScore();
        this.updateFoundWords();
      }
      this.solutionDictionary.removeWord(word);
      // console.log(this.solutionDictionary);
    }
  }
}