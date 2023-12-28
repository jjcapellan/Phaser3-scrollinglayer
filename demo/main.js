function runGame() {
  var config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 360,
    parent: 'game',
    backgroundColor: 0xcbdbfc,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    zoom: 2,
    scene: [Parallax]
  };

  new Phaser.Game(config);
}

window.onload = function () {
  runGame();
};
