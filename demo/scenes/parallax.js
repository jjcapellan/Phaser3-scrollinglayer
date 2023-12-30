/*let count = 0;
let acc = 0;
let avg = 0;*/

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
    //let t1 = performance.now();
    this.updateScrollingLayers(delta);
    /*let elapsed = performance.now() - t1;
    count++;
    avg = (elapsed + acc) / count;
    acc += elapsed;
    if(count == 2000) console.log(avg);*/
  }

  updateScrollingLayers(delta) {
    this.layer4.update(delta);
    this.layer3.update(delta);
    this.layer2.update(delta);
    this.layer1.update(delta);
    this.layerRain.update(delta);
  }

  generateScrollingLayers() {
    const factor = 2;
    let bottom = this.scale.height;

    this.layer4 = new ScrollingLayer(this, 0, -20 * factor, 'atlas', 'Builds3-0')
      .setOrigin(1)
      .setPosition(bottom - 60);

    this.layer3 = new ScrollingLayer(this, 0, -40 * factor, 'atlas', 'Builds2-0')
      .setOrigin(0)
      .setPosition(bottom - 106 - 10);

    this.layer2 = new ScrollingLayer(this, 0, -80 * factor, 'atlas', 'Builds1-0')
      .setOrigin(1)
      .setPosition(bottom - 10);

    this.layerRain = new ScrollingLayer(this, 0, 200, 'atlas', 'Rain-0')
      .setOrigin(1)
      .setVertical()
      .setAlpha(0.08);

    this.layer1 = new ScrollingLayer(this, bottom, -160 * factor, 'atlas', 'Front-0')
      .setOrigin(1);
  }
}
