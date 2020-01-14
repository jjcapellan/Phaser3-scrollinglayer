function runGame() {
  var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'game',
    backgroundColor: 0x000000,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Parallax]
  };

  new Phaser.Game(config);
}

window.onload = function () {
  runGame();
};
