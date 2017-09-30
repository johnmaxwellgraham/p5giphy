var giphy = null;
var img;
var x = 0;
var y = 0;
function preload() {
  var url = 'http://api.giphy.com/v1/gifs/search?q=mountain+goats&api_key=CclSdboYShMQMA4b8vLUJkZUUOwVDR5t&limit=6';
  httpGet(url, "json", false, function(response){
    giphy = response.data;
  });
}

function setup(){
  createCanvas(1200, 800);
}
function draw() {
  if (!giphy) {
    text("loading", 10, 30);
    return;
  }
  for (i = 0; i < giphy.length; i++){
    loadImage(giphy[i].images.downsized.url, function(img) {
      image(img, x, y, 200, 200);
      x = x + 200;
      if (x === 600) {
        x = 0; 
        y = y + 200;
      } 
    });
  }
  noLoop();
}