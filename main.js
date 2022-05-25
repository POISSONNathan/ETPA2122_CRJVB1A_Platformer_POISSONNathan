var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
        pixelArt: true,
        },
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: false
    }},
    scene: [accueil,sceneJeu,sceneTemple],
    input : {gamepad:true},
      };

new Phaser.Game(config); 
