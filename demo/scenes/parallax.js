/// <reference types="../../node_modules/phaser/types/phaser.d.ts" />
class Parallax extends Phaser.Scene {
  constructor() {
    super('parallax');
  }

  init() {
    this.height = this.game.config.height;
  }

  preload() {
    this.load.atlas('atlas', 'demo/assets/imgs/parallax.png', 'demo/assets/imgs/parallax.json');
  }

  create() {
    this.add.image(this.scale.width * 0.66, this.scale.height * 0.66, 'atlas', 'Sun-0');
    this.generateScrollingLayers();
  }

  generateScrollingLayers() {
    const factor = 2;
    let bottom = this.scale.height;

    const layers = this.add.existing(new LayerFactory(this, "atlas"));
    console.log("Scrollinglayer v" + layers.VERSION);

    layers.addHlayer(0, -20 * factor, 'Builds3-0')
      .setOrigin(1)
      .setPosition(bottom - 60);

    layers.addHlayer(0, -40 * factor, 'Builds2-0')
      .setOrigin(0)
      .setPosition(bottom - 106 - 10);

    let l = layers.addHlayer(0, -80 * factor, 'Builds1-0')
      .setOrigin(1)
      .setPosition(bottom - 10);    
    
    /*layers.addVlayer(0, 200, 'Rain-0')
      .setAlpha(0.08);*/

    layers.addHlayer(bottom, -160 * factor, "Front-0")
      .setOrigin(1);

    // this.time.delayedCall(5000, () => { l.setVisible(false)});
    // this.time.delayedCall(5000, () => { layers.destroy()});
    // this.time.delayedCall(5000, () => { layers.destroy(true)});
    // this.time.delayedCall(5000, () => { layers.removeLayer(l); });
    // this.time.delayedCall(5000, () => { l.setSpeed(40)});
    // this.time.delayedCall(5000, () => { l.setFrame('Builds3-0')});
    
  }
}
