![GitHub tag (latest by date)](https://img.shields.io/github/tag-date/jjcapellan/Phaser3-scrollinglayer.svg)
![GitHub license](https://img.shields.io/github/license/jjcapellan/Phaser3-scrollinglayer.svg)
# Phaser3-ScrollingLayer
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
        this,                   // Phaser.Scene
        -20,                    // Horizontal speed in pixels/second
        'textureKey',           // Key of the texture stored in cache
        {
            y: 0,               // (Optional) Y position. By default, texture is positioned at bottom.
            overlap: 2,         // (Optional) Horizontal overlap in pixels (default 1). Prevents empty spaces between images.
            frame: 'frameKey'   // (Optional) Frame key.
        }
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



