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

  update(time, delta) {
    this.updateScrollingLayers(delta);
  }

  updateScrollingLayers(delta) {
    this.layer6.update(delta);
    this.layer5.update(delta);
    this.layer4.update(delta);
    this.layer3.update(delta);
  }

  generateScrollingLayers() {
    const factor = 2;
    let bottom = this.scale.height;
    this.layer6 = new ScrollingLayer(this, -10 * factor, 'atlas', { frame: 'Builds3-0', y: bottom - 64 - 60});
    this.layer5 = new ScrollingLayer(this, -50 * factor, 'atlas', { frame: 'Builds2-0', y: bottom - 106 - 10});
    this.layer4 = new ScrollingLayer(this, -90 * factor, 'atlas', { frame: 'Builds1-0', y: bottom - 84 -10});
    this.layer3 = new ScrollingLayer(this, -130 * factor, 'atlas', { frame: 'Front-0'});
  }

}
