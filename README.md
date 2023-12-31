![GitHub tag (latest by date)](https://img.shields.io/github/tag-date/jjcapellan/Phaser3-scrollinglayer.svg)
![GitHub license](https://img.shields.io/github/license/jjcapellan/Phaser3-scrollinglayer.svg)
# Phaser3-ScrollingLayer
This package creates infinite scrolls and parallax efects using [Phaser 3](https://github.com/photonstorm/phaser) and a simple image concatenation principle. Especially useful for endless runner-type and similar games.  

This package avoids the use of tilesprites, instead uses a blitter and bob objects.  
Demo: https://jjcapellan.github.io/Phaser3-scrollinglayer/  
## Installation
### Browser
There are two alternatives:
* Download the file [scrollinglayer.min.js](https://cdn.jsdelivr.net/gh/jjcapellan/Phaser3-scrollinglayer@3.0.0/dist/scrollinglayer.min.js) to your proyect folder and add a reference in your html:
```html
<script src = "scrollinglayer.min.js"></script>
```  
* Link to the cdn:
```html
<script src = "https://cdn.jsdelivr.net/gh/jjcapellan/Phaser3-scrollinglayer@3.0.0/dist/scrollinglayer.min.js"></script>
```  
**Important**: the package is exposed as **LayerFactory**
### From NPM
```
npm i phaser3-scrollinglayer
```


## How to use
### 1. Image requirements
Depending on whether we want to create a horizontal or vertical scroll, the images used must span at least the width or height of the screen in the scrolling direction. For instance, to create a horizontal scroll layer, I will need an image that is at least as wide as the screen.
### 2. Import the class LayerFactory
This step is only necessary if you are using modules.
```js
// For ES6 modules
import LayerFactory from "phaser3-scrollinglayer";
// For CommonJS modules
const LayerFactory = require("phaser3-scrollinglayer");
```
### 3. Add LayerFactory instance to the scene
From the *create* function of a Phaser scene:
```js
create() {
    // ..
const lf = this.add.existing(new LayerFactory(this, "texture"));
   // ..
}
```
The purpose of the class LayerFactory is to create, update and destroy scroll layers.  

Constructor:  
* *new LayerFactory(scene: Phaser.Scene, texture: string)*
### 4. Create one or more scroll layers
LayerFactory has two methods for create horizontal layers (*addHlayer*) and vertical layers (*addVlayer*).  

Here and example of horizontal layer:
```js
create() {
    // ..
    const lf = this.add.existing(new LayerFactory(this, "texture"));
    lf.addHlayer(0, -80, "ground")
    // ..
}
```
In the example above, we have created a horizontal layer at the y-coordinate of 0, which moves to the left at a speed of 80 pixels per second and uses the frame associated with the "ground" key.
* *addHlayer(y: number, speed: number, frame: string) : Layer*
* *addVlayer(x: number, speed: number, frame: string) : Layer*  

Both functions return an object of class *Layer*
### 5. Modify the layers if necessary
The class *Layer* has methods for modifying a layer.  
```js
create() {
    // ..
    const lf = this.add.existing(new LayerFactory(this, "texture"));

    lf.addHlayer(0, -80, "clouds")
    // sets layer opacity to 40%. (default = 1)
    .setAlpha(0.4)
    // sets position to 60 y-coordinate
    .setPosition(60)
    // changes the frame
    .setFrame("birds")
    // sets speed to -120 px/sec
    .setSpeed(-120)
    // sets frame origin in the y-axis. (default = 0 (top/left))
    .setOrigin(0.5)
    // sets visibility. (default = true); Really not necessary in this case.
    .setVisible(true)
    // sets overlap of concatenated images. (default = 1 pixel)
    // Overlap could be necessary in some cases if you see gaps between images.
    .setOverlap(0);
    // ..
}
```
### 6. Remove the layers
The layers are automatically removed at the end of the scene execution.  

If you need to remove one or more during the scene:
```js
    // ..
    const lf = this.add.existing(new LayerFactory(this, "texture"));
    const ground = lf.addHlayer(0, -80, "ground");
    // ..

    // Removes "ground" layer
    lf.removeLayer(ground);

    // To destroy all layers including the LayerFactory instance
    lf.destroy();
```




