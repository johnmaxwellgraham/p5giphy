var giphy = null;
var imageArray = [];
var shuffledArray = [];
var img;
var x = 0;
var y = 0;
var squares = [];
var visCounter = 0;
var compareArr = [];

function preload() {
  var url = 'http://api.giphy.com/v1/gifs/search?q=mountains&api_key=CclSdboYShMQMA4b8vLUJkZUUOwVDR5t&limit=10';
  httpGet(url, "json", false, function (response) {
    giphy = response.data;
  });
}

function setup() {
  createCanvas(1200, 1000);
}

function draw() {
  if (!giphy) {
    text("loading", 10, 30);
    return;
  }

  //Duplicating Array
  for (i = 0; i < giphy.length; i++) {
    imageArray.push(giphy[i]);
    imageArray.push(giphy[i]);
  }

  shuffledArray = shuffleArray(imageArray);

  //creating square objects and push to squares array 
  for (i = 0; i < 20; i++) {
    squares.push(new Square(shuffledArray[i].images.downsized.url, x, y));
    x = x + 200;
    if (x === 1000) {
      x = 0;
      y = y + 200;
    }
  }

  //creating grid of hidden squares 
  for (i = 0; i < squares.length; i++) {
    squares[i].renderHidden();
    // squares[i].renderVisible();
  }

  noLoop();
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var Square = function (url, x, y) {
  this.url = url;
  this.color = "pink";
  this.x = x;
  this.y = y;
  this.hidden = true;
  this.size = 200;
  this.renderHidden = function () {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    this.hidden = true;
  };
  this.renderVisible = function () {
    var that = this;
    loadImage(this.url, function (img) {
      image(img, that.x, that.y, that.size, that.size);
    });
    this.hidden = false;
  };
  this.isClicked = function (mX, mY) {
    if (mX >= this.x &&
      mX < this.size + this.x &&
      mY >= this.y &&
      mY < this.size + this.y //&&
      //this.hidden === true
    ) {
      return true;
    }
  };
};

function mouseClicked() {
  for (i = 0; i < squares.length; i++) {
    if (squares[i].isClicked(mouseX, mouseY)) {
      if (compareArr.length < 2 && squares[i].hidden) {
        squares[i].renderVisible();
        compareArr.push(squares[i]);
        if (compareArr.length === 2) {

          if (new String(compareArr[0].url).valueOf() == new String(compareArr[1].url).valueOf()) {
            compareArr.pop();
            compareArr.pop();
            setTimeout(function() {
              alert("It's a Match!!");  
              if (allMatch()) {
                
                alert("Play again!!!");
                for (i = 0; i < squares.length; i++) {
                  squares[i].renderHidden();
                }
              }             
            }, 200);
            
          } else {
            setTimeout(function() {
              compareArr[0].renderHidden();
              compareArr[1].renderHidden();
              compareArr.pop();
              compareArr.pop();
            }, 1000);
          }
          console.log(compareArr);
          console.log(squares);
        }
      }
    }
  
  }
    
}

function allMatch() {
  var allMatched = true;
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].hidden) {
      allMatched = false;
    }
  }
}