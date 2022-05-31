var config = {
    type: Phaser.AUTO,
    width: 896, height: 448,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: false
    }},
    pixelArt:true,
    scene: [accueil,sceneJeu,sceneTemple],
    input : {gamepad:true},
    };

new Phaser.Game(config);  
