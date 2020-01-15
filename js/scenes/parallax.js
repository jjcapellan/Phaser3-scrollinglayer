class Parallax extends Phaser.Scene {
  constructor() {
    super('parallax');
  }

  init() {
    this.height = this.game.config.height;
  }

  preload() {
    this.load.atlas('atlas', 'assets/imgs/spritesheet_low.png', 'assets/imgs/sprites_low.json');
  }

  create() {
    this.add.image(0,0,'atlas','layer07_Sky').setOrigin(0,0);
    this.generateScrollingLayers();
  }

  update(time, delta) {
    this.updateScrollingLayers(delta);    
  }

  updateScrollingLayers(delta){
    this.layer6.update(delta);
    this.layer5.update(delta);
    this.layer4.update(delta);
    this.layer3.update(delta);
    this.layer2.update(delta);
    this.layer1.update(delta);
  }

  generateScrollingLayers(){
    this.layer6 = new ScrollingLayer(this, -10, 'atlas', {frame: 'layer06_Rocks'});
    this.layer5 = new ScrollingLayer(this, -50, 'atlas',{frame: 'layer05_Hills'});
    this.layer4 = new ScrollingLayer(this, -90, 'atlas',{frame: 'layer04_Clouds', y: 0});
    this.layer3 = new ScrollingLayer(this, -130, 'atlas', {frame: 'layer03_Hills_Castle'});
    this.layer2 = new ScrollingLayer(this, -170, 'atlas',{frame:'layer02_Trees_rocks'});
    this.layer1 = new ScrollingLayer(this, -240, 'atlas',{frame: 'layer01_Ground'});
  }

}
