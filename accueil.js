class accueil extends Phaser.Scene{
    constructor(){
    super("accueil");
}

preload(){
    this.load.image("bouttonPlay", "assets/menu/BouttonPlay.png");
    this.load.image("bouttonLeave", "assets/menu/BouttonQuit.png");
    this.load.image("accueil", "assets/menu/accueil.png");
    this.load.tilemapTiledJSON("carte", "map.json");  
}

create(){
const carte = this.make.tilemap({ key: 'carte' });

this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,"accueil").setScale(0.4);

this.cursors = this.input.keyboard.createCursorKeys();

this.startButton = this.add.image(this.cameras.main.width/2,this.cameras.main.height/2 + 50, 'bouttonPlay').setScale(0.4).setInteractive();




this.startButton.on('pointerdown', function (pointer) {
        carte.getObjectLayer('spawnJoueur').objects.forEach((spawnJoueur) => {
            this.spawnXSortieScene = spawnJoueur.x, 
            this.spawnYSortieScene =  spawnJoueur.y
        });

        this.scene.scene.start("sceneJeu", {
            pointDeVie:10,
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
            compteurInvunlerable: 100,
            saveXMort: 0,
            saveYMort: 0,
            animAccrocheMur: false
        })
        });

this.quitButton = this.add.image(this.cameras.main.width/2,this.cameras.main.height/2 + 150, 'bouttonLeave').setScale(0.4).setInteractive();

this.quitButton.on('pointerdown', function (pointer) {
        this.scene.scene.stop("accueil")
});
}
update(){}
}