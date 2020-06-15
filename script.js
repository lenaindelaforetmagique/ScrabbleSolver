class Universe {
  constructor() {
    this.container = document.getElementById("container");
    this.dom = document.createElementNS(SVGNS, "svg");
    this.container.appendChild(this.dom);

    this.viewBox = new ViewBox(this.dom);

    this.boardgame = null;

    this.init();
    // this.addEvents();
  }

  init() {
    // clean everything
    while (this.dom.firstChild != null) {
      this.dom.removeChild(this.dom.firstChild);
    }

    // create BoardGame
    this.boardgame = new BoardGame(this);
    this.dom.appendChild(this.boardgame.dom);
  }


  addEvents() {
    let thiz = this;
    // KEYBOARD Events
    document.onkeydown = function(e) {
      // console.log(e.key);
      switch (e.key.toUpperCase()) {
        case "ENTER":
          thiz.addPolygon();
          thiz.polygons.last().triangulate();
          break;
        case ' ':
          thiz.init();
          break;
        case 'R':
          thiz.polygons.last().refine();
          break;
        case 'P':
          thiz.polygons.last().refine(false);
          break;
        case 'M':
          thiz.polygons.last().mesh();
          break;
        case 'S':
          thiz.splitAction();
          break;
        default:
          break;
      }
    }


    // MOUSE events
    this.container.addEventListener("mousedown", function(e) {
      e.preventDefault();
      if (e.ctrlKey) {
        thiz.addNode(thiz.viewBox.realX(e.clientX), thiz.viewBox.realY(e.clientY));
      } else {
        thiz.addPoint(thiz.viewBox.realX(e.clientX), thiz.viewBox.realY(e.clientY));
      }
    }, false);

    document.addEventListener("mousemove", function(e) {
      e.preventDefault();
    }, false);

    document.addEventListener("mouseup", function(e) {
      e.preventDefault();
    }, false);

    document.addEventListener("wheel", function(e) {
      e.preventDefault();
      let k = 1.1;
      if (e.deltaY > 0) {
        k = 1 / k;
      }
      thiz.viewBox.scale(e.clientX, e.clientY, k);
    }, false);

    //
    // // TOUCH events
    // this.container.addEventListener("touchstart", function(e) {
    //   e.preventDefault();
    // }, false);
    //
    // this.container.addEventListener("touchmove", function(e) {
    //   e.preventDefault();
    // }, false);
    //
    // this.container.addEventListener("touchend", function(e) {
    //   e.preventDefault();
    // }, false);
    //
    // this.container.addEventListener("touchcancel", function(e) {
    //   e.preventDefault();
    // }, false);
    //
    // this.container.addEventListener("touchleave", function(e) {
    //   e.preventDefault();
    // }, false);

    // OTHER events
    window.onresize = function(e) {
      thiz.viewBox.resize();
    }

    // window.onerror = function(msg, source, noligne, nocolonne, erreur) {
    //   let str = "";
    //   str += msg;
    //   str += " * ";
    //   str += source;
    //   str += " * ";
    //   str += noligne;
    //   str += " * ";
    //   str += nocolonne;
    //   str += " * ";
    //   // str += erreur;
    //   thiz.console(str);
    // }
  }

}

class ViewBox {
  constructor(parent_) {
    this.parent = parent_;
    this.xMin = 0;
    this.yMin = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.set();
  }

  repr() {
    return this.xMin + " " + this.yMin + " " + this.width + " " + this.height;
  }

  set() {
    this.parent.setAttributeNS(null, 'viewBox', this.repr());
  }

  realX(x) {
    // Returns the "real" X in the viewBox from a click on the parent Dom...
    let domRect = this.parent.getBoundingClientRect();
    return (x - domRect.left) / domRect.width * this.width + this.xMin;
  }

  realY(y) {
    // Returns the "real" Y in the viewBox from a click on the parent Dom...
    let domRect = this.parent.getBoundingClientRect();
    return (y - domRect.top) / domRect.height * this.height + this.yMin;
  }

  // Events
  resize() {
    this.height = this.width * window.innerHeight / window.innerWidth;
    this.set();
  }

  scale(x, y, fact = 1) {
    let coorX = this.realX(x);
    let coorY = this.realY(y);

    this.xMin = coorX - (coorX - this.xMin) / fact;
    this.yMin = coorY - (coorY - this.yMin) / fact;
    this.width /= fact;
    this.height /= fact;
    this.set();
  }

  translate(dx, dy) {
    let domRect = this.parent.getBoundingClientRect();
    this.xMin += dx / domRect.width * this.width;
    this.yMin += dy / domRect.height * this.height;
    this.set();
  }
}

let u_ = new Universe();