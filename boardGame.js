class TextFile {
  constructor(filename_, onload_ = null) {
    this.filename = filename_;
    this.lines = [];


  }
}


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


class Letter {
  constructor(face_, value_) {
    this.face = face_;
    this.value = value_;
    this.dom = document.createElementNS(SVGNS, 'g');

    this.xPos = 0;
    this.yPos = 0;
    this.init();
  }

  init() {
    let rect = document.createElementNS(SVGNS, 'rect');
    rect.setAttribute("width", 28);
    rect.setAttribute("height", 28);
    this.dom.appendChild(rect);

    let text = document.createElementNS(SVGNS, 'text');
    text.innerHTML = this.face;
    text.setAttribute("x", 12);
    text.setAttribute("y", 19);
    text.setAttribute("class", "face");
    this.dom.appendChild(text);

    if (this.value > 0) {
      let value = document.createElementNS(SVGNS, 'text');
      value.innerHTML = this.value;
      value.setAttribute("x", 25);
      value.setAttribute("y", 25);
      value.setAttribute("class", "value");
      this.dom.appendChild(value);
    }

    this.dom.setAttribute("class", "letter");
  }

  update(newX, newY) {
    this.posX = newX;
    this.posY = newY;
    this.dom.setAttribute("transform", "translate(" + (this.posX + 1) + "," + (this.posY + 1) + ") rotate(0)");
  }
}


class Square {
  constructor(parent_, squareClass, letterMultiplier_, wordMultiplier_, posX_, posY_) {
    this.parent = parent_;
    this.dom = document.createElementNS(SVGNS, 'rect');
    this.letter = null;
    this.posX = posX_;
    this.posY = posY_;
    // this.i = i_; // line
    // this.j = j_; // column
    this.letterMultiplier = letterMultiplier_;
    this.wordMultiplier = wordMultiplier_;
    this.init(squareClass);
  }

  init(squareClass) {
    this.dom.setAttribute("width", this.parent.squareWidth);
    this.dom.setAttribute("height", this.parent.squareWidth);
    this.dom.setAttribute("x", this.posX);
    this.dom.setAttribute("y", this.posY);
    this.dom.setAttribute("class", squareClass);

  }

  update() {
    if (this.letter != null) {
      this.letter.update(this.posX, this.posY);
    }
  }

  placeLetter(letter_) {
    this.letter = letter_;
    // this.letter.update(this.parent.xGrid + this.j * this.parent.squareWidth, this.parent.yGrid + this.i * this.parent.squareWidth);
  }

}

class BoardGame {
  constructor(parent_) {
    this.parent = parent_;

    this.grid = [];
    this.remainder = [];
    this.currentLetters = [];
    this.currentSolutions = [];

    this.xGrid = 0;
    this.yGrid = 0;
    this.squareWidth = 30;

    this.xRemainder = this.xGrid + 17 * this.squareWidth;
    this.yRemainder = this.yGrid;
    this.remainder_width = 7 * this.squareWidth;

    this.init();

    this.loadLetters("letters/FR.let");

    // this.playLetter(new Letter("Z", 10), 13, 4);
    // this.playLetter(new Letter("M", 2), 11, 4);
    // this.update();

  }


  init() {
    this.dom = document.createElementNS(SVGNS, 'g');
    this.gridDom = document.createElementNS(SVGNS, 'g');
    this.gridDom.setAttribute("name", "grid");
    this.grid = [];

    let bg = document.createElementNS(SVGNS, 'rect');
    bg.setAttribute("width", 17 * this.squareWidth);
    bg.setAttribute("height", 17 * this.squareWidth);
    bg.setAttribute("x", -this.squareWidth);
    bg.setAttribute("y", -this.squareWidth);
    bg.setAttribute("class", "boardGame");
    this.gridDom.appendChild(bg);

    for (let i = 0; i < 15; i++) {
      let newLine = [];
      for (let j = 0; j < 15; j++) {
        // class
        let squareName = "ABCDEFGHIJKLMNO".charAt(i) + (j + 1) + ",";
        let squareClass = "Square";
        let letterMultiplier = 1;
        let wordMultiplier = 1;
        if ("A1,A8,A15,H1,H15,O1,O8,O15,".includes(squareName)) {
          // Triple word
          squareClass = "Square_TW";
          wordMultiplier = 3;
        } else if ("B2,B14,C3,C13,D4,D12,E5,E11,H8,N2,N14,M3,M13,L4,L12,K5,K11,".includes(squareName)) {
          // Double word
          squareClass = "Square_DW";
          wordMultiplier = 2;
        } else if ("B6,B10,F2,F6,F10,F14,J2,J6,J10,J14,N6,N10,".includes(squareName)) {
          // Triple Letter
          squareClass = "Square_TL";
          letterMultiplier = 3;
        } else if ("A4,A12,C7,C9,D1,D8,D15,G3,G7,G9,G13,H4,H12,I3,I7,I9,I13,L1,L8,L15,M7,M9,O4,O12,".includes(squareName)) {
          // Double Letter
          squareClass = "Square_DL";
          letterMultiplier = 2;
        }

        let newSquare = new Square(this, squareClass, letterMultiplier, wordMultiplier, j * this.squareWidth, i * this.squareWidth);
        newLine.push(newSquare);
        this.gridDom.appendChild(newSquare.dom);
      }
      this.grid.push(newLine);
    }
    this.dom.appendChild(this.gridDom);
  }


  update() {

    this.gridDom.setAttribute("transform", "translate(" + 50 + "," + 12 + ") rotate(0)");

    let posX = this.xRemainder;
    let posY = this.yRemainder;
    for (let i = 0; i < this.remainder.length; i++) {
      this.remainder[i].update(posX, posY);
      posX += this.squareWidth;
      if (posX > this.xRemainder + this.remainder_width) {
        posX = this.xRemainder;
        posY += this.squareWidth;
      }
    }
  }
  refresh() {

  }


  loadLetters(lettersFile_) {
    let lettersDom = document.createElementNS(SVGNS, 'g');
    lettersDom.setAttribute("name", "letters");
    this.dom.appendChild(lettersDom);

    let thiz = this;
    let request = new XMLHttpRequest();
    request.onload = function() {
      let lines = request.response.split('\n');
      thiz.remainder = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] != "") {
          let keys = lines[i].split(" ");
          for (let j = 0; j < parseInt(keys[2]); j++) {
            let newLetter = new Letter(keys[0], parseInt(keys[1]));
            thiz.remainder.push(newLetter);
            lettersDom.appendChild(newLetter.dom);
          }
        }
      }
      thiz.update();
    };

    request.open("GET", lettersFile_);
    request.responseType = "txt";
    request.send();

  }


  playLetter(letter_, i, j) {
    this.grid[i][j].letter = letter_;
    this.dom.appendChild(letter_.dom);
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