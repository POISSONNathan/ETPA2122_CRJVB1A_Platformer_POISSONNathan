var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: false
    }},
    fps: {
        target: 90,                    
        forceSetTimeOut: true
        },
    pixelArt:true,
    scene: [accueil,sceneJeu,sceneTemple,sceneFin],
    input : {gamepad:true},
    };

new Phaser.Game(config);  
