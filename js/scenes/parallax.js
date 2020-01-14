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
    this.layer6 = new ScrollingLayer(this, this.height - this.getTextureHeight('layer06_Rocks'), -10, 2, 'atlas','layer06_Rocks');
    this.layer5 = new ScrollingLayer(this, this.height - this.getTextureHeight('layer05_Hills'), -50, 2, 'atlas','layer05_Hills');
    this.layer4 = new ScrollingLayer(this, 0, -90, 2, 'atlas','layer04_Clouds');
    this.layer3 = new ScrollingLayer(this, this.height - this.getTextureHeight('layer03_Hills_Castle'), -130, 2, 'atlas','layer03_Hills_Castle');
    this.layer2 = new ScrollingLayer(this, this.height - this.getTextureHeight('layer02_Trees_rocks'), -170, 2, 'atlas','layer02_Trees_rocks');
    this.layer1 = new ScrollingLayer(this, this.height - this.getTextureHeight('layer01_Ground'), -240, 2, 'atlas','layer01_Ground');
  }

  getTextureHeight(frame) {
    return this.textures.getFrame('atlas',frame).height;
  }

}
