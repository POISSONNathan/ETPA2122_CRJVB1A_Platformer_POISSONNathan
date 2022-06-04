class accueil extends Phaser.Scene{
    constructor(){
    super("accueil");
}

preload(){
    this.load.image("accueil", "assets/menu/accueil.png");
    this.load.image("accueil2", "assets/menu/accueilPage2.png");

    this.load.image("BouttonPlay", "assets/menu/BouttonPlay.png");

    this.load.tilemapTiledJSON("carte", "map.json");  

    this.load.image("invisible", "assets/invisible.png");
}

create(){
    
const carte = this.make.tilemap({ key: 'carte' });

this.page = 0

this.menu = this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,"accueil").setScale(0.67);
this.menu.setInteractive()

this.cursors = this.input.keyboard.createCursorKeys();

this.startButton = this.add.image(this.cameras.main.width/2 + 260,this.cameras.main.height/2 + 157, 'BouttonPlay').setScale(0.8).setInteractive();

this.startButton.alpha = 0


this.startButton.on('pointerdown', function (pointer) {
        carte.getObjectLayer('spawnJoueur').objects.forEach((spawnJoueur) => {
            this.spawnXSortieScene = spawnJoueur.x, 
            this.spawnYSortieScene =  spawnJoueur.y
        });

        this.scene.scene.start("sceneJeu", {
            pointDeVie:4,
            spawnXSortieScene: this.spawnXSortieScene,
            spawnYSortieScene: this.spawnYSortieScene,
            speedLeft: 200,
            speedRight: 200,
            dialogue: false,
            speed: 200,
            speedSaut: 380,
            doubleSautLeft: false,
            compteurDoubleSautLeft: 10,
            doubleSautRight: false,
            compteurDoubleSautRight: 10,
            doubleSautLeftPossible: true,
            doubleSautRightPossible: true,
            resetGraviteLeft: false,
            resetGraviteRight: false,
            animNormal: true,
            animJump: false,
            animPousseCaisse: false,
            attaque: false,
            attaquePossible: false,
            doubleJumpActif: false,
            torcheDebloque: false,
            torcheActive: false,
            pouvoirTirer: false,
            tempsAvantTirer: false,
            animTorche: false,
            ouvrirTemplePossible: false,
            entreeTemplePossible: false,
            templeOuvertTorcheAllumer: false,
            compteurDeplacementLasso: 120,
            compteurDeplacementLassoCaisse: 70,
            deplacementEnnemi: false,
            deplacementCaisse: false,
            blockCaisse: false,
            lassoUnlcok: false,
            invulnérable: false,
            compteurInvunlerable: 200,
            saveXMort: 0,
            saveYMort: 0,
            animAccrocheMur: false
        })
        });


this.cursors = this.input.keyboard.createCursorKeys();
            this.keys = this.input.keyboard.addKeys({
                space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            });


}
update(){

    this.tournePage = Phaser.Input.Keyboard.JustDown(this.keys.space)
    if (this.tournePage){
        this.menu.setTexture('accueil2')
        this.startButton.alpha = 1
    }
}
}