## Build a memory game
Set Up
5x4 Grid of 20 images
  Get half num of images from giphy
  Make sure images are placed randomly in grid 
Start all images hidden
  Draw filled rect instead of images

Playing Game
When hidden image is clicked, it displays image and keeps it displayed
When second hidden image clicked
  if matched leave flipped over
  else if clicks exposed image, ingore click
  else hide images after alert msg "no match"
    if all images are exposed, alert "you win", "play again?"
      if yes, redo setup
      else "thanks for playing!" 