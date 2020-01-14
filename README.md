# Phser3-ScrollingLayer
Class to get parallax effects using [Phaser 3](https://github.com/photonstorm/phaser).  
This class avoids the use of tilesprites, instead uses blitters.  
Demo: https://jjcapellan.github.io/Phaser3-scrollinglayer/  
Used in: [Flappy Tours 2](https://jjcapellan.github.io/flappytours2/)
## Installation
There are two alternatives:
* Download the file [scrollinglayer.min.js](https://cdn.jsdelivr.net/gh/jjcapellan/Phaser3-scrollinglayer/dist/scrollinglayer.min.js) to your proyect folder and add a reference in your html:
```html
<script src = "scrollinglayer.min.js"></script>
```  
Or you can download the commented version: [scrollinglayer.js](https://cdn.jsdelivr.net/gh/jjcapellan/Phaser3-scrollinglayer/dist/scrollinglayer.js) 
* Point a script tag to the CDN link:
```html
<script src = "https://cdn.jsdelivr.net/gh/jjcapellan/Phaser3-scrollinglayer/dist/scrollinglayer.min.js"></script>
```  
## How to use
The width of the image/s used should not be less than the width of the screen.  
You need the framework Phaser 3 to use this class.  
Example:
```javascript
    
    // In the create() function
create(){
    this.layer1 = new ScrollingLayer(
        this,         // Phaser.Scene
        0,            // Position y. ScrollingLayer objects allways have as origin (0,0)
        -20,          // Horizontal speed in pixels/second
        2,            // Horizontal overlap in pixels. Prevents empty spaces between images.
        'texture',    // Key of the texture stored in cache.
        'layer1'      // Optional frame of the texture.
         );
}

    // In the update() function
update(time,delta){
        // ...
    this.layer1.update(delta); // Updates the position x. delta is the duration of the last game step.
        // ...
}
```

## Attributions
Demo images by [CraftPix.net](https://opengameart.org/users/craftpixnet-2d-game-assets). License [OGA-BY-3.0](http://static.opengameart.org/OGA-BY-3.0.txt)  
Powered by [Phaser 3](https://github.com/photonstorm/phaser)



