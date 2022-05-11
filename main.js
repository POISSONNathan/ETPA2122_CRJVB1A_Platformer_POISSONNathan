var config = {
    type: Phaser.AUTO,
    width: 1024, height: 576,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: false
    }},
    pixelArt:true,
    scene: [accueil,sceneJeu],
    input : {gamepad:true},
    };

new Phaser.Game(config); 
