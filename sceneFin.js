class sceneFin extends Phaser.Scene{
    constructor(){
    super("sceneFin");
}

preload(){
    this.load.image("finJeu", "assets/menu/finJeu.png");

    this.load.image("BouttonRestart", "assets/menu/BouttonRestart.png");


}

create(){
    

this.finMenu = this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,"finJeu").setScale(0.67);


this.restartButton = this.add.image(this.cameras.main.width/2 + 260,this.cameras.main.height/2 + 167, 'BouttonRestart').setScale(0.7).setInteractive();



this.restartButton.on('pointerdown', function (pointer) {
    this.scene.scene.start("accueil")
});


this.cursors = this.input.keyboard.createCursorKeys();
            this.keys = this.input.keyboard.addKeys({
                space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            });


}
update(){}
}