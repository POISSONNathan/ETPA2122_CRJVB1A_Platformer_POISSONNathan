        class sceneJeu extends Phaser.Scene{
            constructor(){
            super("sceneJeu");
        }

        init(data){
            this.pointDeVie = data.pointDeVie,
            this.spawnXSortieScene = data.spawnXSortieScene,
            this.spawnYSortieScene = data.spawnYSortieScene,
            this.speedLeft = data.speedLeft,
            this.speedRight = data.speedRight,
            this.dialogue = data.dialogue,
            this.speed = data.speed,
            this.speedSaut = data.speedSaut,
            this.doubleSautLeft = data.doubleSautLeft,
            this.compteurDoubleSautLeft = data.compteurDoubleSautLeft,
            this.doubleSautRight = data.doubleSautRight,
            this.compteurDoubleSautRight = data.compteurDoubleSautRight,
            this.doubleSautLeftPossible = data.doubleSautLeftPossible,
            this.doubleSautRightPossible = data.doubleSautRightPossible,
            this.resetGraviteLeft = data.resetGraviteLeft,
            this.resetGraviteRight = data.resetGraviteRight,
            this.animNormal = data.animNormal,
            this.animJump = data.animJump,
            this.animPousseCaisse = data.animPousseCaisse,
            this.attaque = data.attaque,
            this.attaquePossible = data.attaquePossible,
            this.doubleJumpActif = data.doubleJumpActif,
            this.torcheDebloque = data.torcheDebloque,
            this.torcheActive = data.torcheActive,
            this.pouvoirTirer = data.pouvoirTirer,
            this.tempsAvantTirer = data.tempsAvantTirer,
            this.animTorche = data.animTorche,
            this.ouvrirTemplePossible = data.ouvrirTemplePossible,
            this.entreeTemplePossible = data.entreeTemplePossible,
            this.templeOuvertTorcheAllumer = data.templeOuvertTorcheAllumer,
            this.compteurDeplacementLasso = data.compteurDeplacementLasso,
            this.compteurDeplacementLassoCaisse = data.compteurDeplacementLassoCaisse,
            this.deplacementEnnemi = data.deplacementEnnemi,
            this.deplacementCaisse = data.deplacementCaisse,
            this.blockCaisse = data.blockCaisse,
            this.lassoUnlcok = data.lassoUnlcok,
            this.invulnérable = data.invulnérable,
            this.compteurInvunlerable = data.compteurInvunlerable,
            this.saveXMort = data.saveXMort,
            this.saveYMort = data.saveYMort,
            this.animAccrocheMur = data.animAccrocheMur,
            this.sortieTemple = data.sortieTemple
        }

        preload(){
            this.load.image("Phaser_tuilesdejeu", "assets/tileset.png");

            this.load.tilemapTiledJSON("carte", "map.json");  

             //////////////////////// SPRITES PERSO
            this.load.spritesheet('perso','assets/perso.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('persoTest','assets/test.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('attaque','assets/attaque.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('animTorche','assets/animTorche.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('animPousse','assets/animPousse.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('animGrimpeLiane','assets/animGrimpeLiane.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('animAccrocheMurPerso','assets/animAccrocheMurPerso.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('animNage','assets/animNage.png',
            { frameWidth: 32, frameHeight: 32 });
            ///////////////////////

            this.load.spritesheet('animLasso','assets/animLasso.png',
            { frameWidth: 96, frameHeight: 32 });

            this.load.spritesheet('enemisVolant','assets/enemisVolant.png',
            { frameWidth: 32, frameHeight: 19 });

            this.load.spritesheet('enemisEau','assets/enemisEau.png',
            { frameWidth: 32, frameHeight: 20 });

            this.load.image("torche", "assets/objets/torche.png");

            this.load.image("invisible", "assets/invisible.png");

            this.load.image("balleLeft", "assets/objets/balleLeft.png");
            this.load.image("balleRight", "assets/objets/balleRight.png");
            this.load.spritesheet('arme','assets/objets/arme.png',
            { frameWidth: 32, frameHeight: 32 });

            this.load.image("lasso", "assets/objets/lasso.png");

            this.load.image("torchesAAllumer", "assets/objets/torchesAAllumer.png");
            this.load.image("torchesAllumer", "assets/objets/torchesAllumer.png");

            this.load.image("murAOuvrir", "assets/objets/murAOuvrir.png");
            this.load.image("temple0", "assets/objets/temple0.png");
            this.load.image("temple1", "assets/objets/temple1.png");
            this.load.image("temple2", "assets/objets/temple2.png");
            this.load.image("temple3", "assets/objets/temple3.png");
            this.load.image("temple4", "assets/objets/temple4.png");

            this.load.spritesheet('lianes','assets/lianes.png',
            { frameWidth: 266, frameHeight: 172 });
            this.load.spritesheet('lianesAnim','assets/lianesAnim.png',
            { frameWidth: 266, frameHeight: 172 });
            this.load.image("invisibleLiane", "assets/invisibleLiane.png");

            this.load.image("caisses", "assets/objets/caisses.png");

            this.load.image("lianesAGrimper", "assets/objets/lianesAGrimper.png");
            this.load.image("boutLianesAGrimper", "assets/objets/boutLianesAGrimper.png");

            ////////////////// INTERFACE /////////////////////

            this.load.image("interfaceArmeObj0", "assets/interface/interfaceArmeObj0.png");
            this.load.image("interfaceArmeObj1", "assets/interface/interfaceArmeObj1.png");
            this.load.image("interfaceArmeObj2", "assets/interface/interfaceArmeObj2.png");

            this.load.image("hp4", "assets/interface/hp4.png");
            this.load.image("hp3", "assets/interface/hp3.png");
            this.load.image("hp2", "assets/interface/hp2.png");
            this.load.image("hp1", "assets/interface/hp1.png");

            this.load.spritesheet('guideAllumeTorhce','assets/interface/guideAllumeTorhce.png',
            { frameWidth: 54, frameHeight: 32 });
            this.load.spritesheet('guideTorcheEtteinteAllume','assets/interface/guideTorcheEtteinteAllume.png',
            { frameWidth: 48, frameHeight: 32 });
            this.load.spritesheet('guideArme','assets/interface/guideArme.png',
            { frameWidth: 57, frameHeight: 24 });
            this.load.spritesheet('guideLasso','assets/interface/guideLasso.png',
            { frameWidth: 57, frameHeight: 34 });

            this.load.image("checkPoint", "assets/objets/checkPoint.png");

            this.load.spritesheet('enemisMur','assets/enemisMur.png',
            { frameWidth: 11, frameHeight: 32 });

            this.load.spritesheet('rondinsBois','assets/objets/rondinsBois.png',
            { frameWidth:96, frameHeight: 21 });
            
            this.load.spritesheet('animEau','assets/animEau.png',
            { frameWidth: 64, frameHeight: 32 });

            this.load.image("blocSolo", "assets/objets/blocSolo.png");
            this.load.image("blocTriple", "assets/objets/blocTriple.png");


            this.load.spritesheet('vieObj','assets/objets/vieAPrendre.png',
            { frameWidth: 23, frameHeight: 31 });

            this.load.image("piquesBas", "assets/objets/piquesBas.png");
            this.load.image("piquesHaut", "assets/objets/piquesHaut.png");

            this.load.spritesheet('animFinJeu','assets/animFinJeu.png',
            { frameWidth: 108, frameHeight: 238 });
            
        }

        create(){
            const carte = this.make.tilemap({ key: 'carte' });

            const tileset = carte.addTilesetImage(
                    "tuilesJeu",
                    "Phaser_tuilesdejeu"
                    );  
            const back1 = carte.createLayer(
                    "back1",
                    tileset
                        );

            const back2 = carte.createLayer(
                "back2",
                tileset
                    );

            const back3 = carte.createLayer(
                "back3",
                tileset
                    );

            back2.setScrollFactor(0.98,0.98)
            back3.setScrollFactor(0.95,0.95)

            const background2 = carte.createLayer(
                    "background2",
                    tileset
                    );

            const build = carte.createLayer(
                    "build",
                    tileset
                    ).setDepth(8)

            const zoneEnnemi = carte.createLayer(
                    "zoneEnnemi",
                    tileset
                    ).setDepth(1000)

            this.eauLayer = carte.createLayer(
                    "eau",
                    tileset
                    ).setDepth(1)

                    this.entreeFinJeu = carte.createLayer(
                        "entreeFinJeu",
                        tileset
                        )

            this.lights.enable();
            this.lights.setAmbientColor(0xFF0000);
            this.light = this.lights.addLight(400, 300, 100).setIntensity(0);

            this.pointDeVieStock = 4

            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////

            if (this.sortieTemple == true){
                carte.getObjectLayer('spawnJoueurSortieTemple').objects.forEach((spawnJoueurSortieTemple) => {
                    this.spawnXSortieScene = spawnJoueurSortieTemple.x + 10, 
                    this.spawnYSortieScene =  spawnJoueurSortieTemple.y
                });
            }

            this.player = this.physics.add.sprite(this.spawnXSortieScene, this.spawnYSortieScene, 'perso').setOrigin(0).setDepth(9)
            this.player.body.setSize(16,32,true)

            const devant = carte.createLayer(
                "devant",
                tileset
                ).setDepth(1000)
            
            zoneEnnemi.setCollisionByProperty({ solideEnnemi: true });

            this.physics.add.collider(this.player, build,this.jumpAuto,null,this);
            build.setCollisionByProperty({ estSolide: true });

            this.player.setCollideWorldBounds(true);

            this.cameras.main.zoom = 2.9
            this.cameras.main.startFollow(this.player); 
            this.physics.world.setBounds(0, 0, 12080, 1920);
            this.cameras.main.setBounds(0, 0, 12080, 1920);

            this.nbrTorcheAllume = 0

            this.murStop = false
            this.compteurMurStop = 280

            this.accroche1 = false

            this.accrochePossible1 = true
            this.compteurAccrochePossible1 = 50

            this.animLianeSpecial = false
            this.idxDebutAnimLianeStop = 0
            this.apparaitreAccroche = false

            this.compteurDeplacementLassoStock = this.compteurDeplacementLasso
            this.compteurDeplacementLassoCaisseStock = this.compteurDeplacementLassoCaisse

            this.compteurStopGrimper = 8
            this.stopGrimper = false

            this.compteurSpawnRondinPossible = 600
            this.testRondins = true

            this.animNage = false

            this.armeUnlock = false

            this.infunctionBloc = false

            this.startAnimOuvertureGrotte = false

            this.truc = false

            this.resetEnemis = true
            this.compteurReset = 2000

            this.resetEnemisEau = true
            this.compteurResetEau = 2000

            this.compteurToucheSol = 25
            this.toucheSol = false

            this.stopAnimCaisse = false
            this.compteurStopAnimCaisse = 10
            

            this.anims.create({
                key: 'animVieObj',
                frames: this.anims.generateFrameNumbers('vieObj', {start:0,end:3}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('perso', {start:0,end:4}),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'turn',
                frames: [ { key: 'perso', frame: 5 } ],
                frameRate: 20
            });
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('perso', {start:6,end:10}),
                frameRate: 6,
                repeat: -1
            });

            /////////////////////////

            this.anims.create({
                key: 'jumpRight',
                frames: this.anims.generateFrameNumbers('persoTest', {start:0,end:3}),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'turnJump',
                frames: this.anims.generateFrameNumbers('persoTest', {start:8,end:10}),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'jumpLeft',
                frames: this.anims.generateFrameNumbers('persoTest', {start:4,end:7}),
                frameRate: 6,
                repeat: -1
            });

             /////////////////////////

             this.anims.create({
                key: 'animGrimpeLiane',
                frames: this.anims.generateFrameNumbers('animGrimpeLiane', {start:0,end:3}),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'idleAnimGrimpeLiane',
                frames: [ { key: 'animGrimpeLiane', frame: 4 } ],
                frameRate: 20
            });
            /////////////////////////

            this.anims.create({
                key: 'animPousseRight',
                frames: this.anims.generateFrameNumbers('animPousse', {start:0,end:2}),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'animPousseLeft',
                frames: this.anims.generateFrameNumbers('animPousse', {start:3,end:5}),
                frameRate: 5,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animTorcheRight',
                frames: this.anims.generateFrameNumbers('animTorche', {start:0,end:4}),
                frameRate: 12,
                repeat: -1
            });

            this.anims.create({
                key: 'animTorcheLeft',
                frames: this.anims.generateFrameNumbers('animTorche', {start:5,end:9}),
                frameRate: 12,
                repeat: -1
            });
            this.anims.create({
                key: 'idleRightTorche',
                frames: [ { key: 'animTorche', frame: 10 } ],
                frameRate: 20
            });
            this.anims.create({
                key: 'idleLeftTorche',
                frames: [ { key: 'animTorche', frame: 11 } ],
                frameRate: 20
            });

             ////////////////////////

            this.anims.create({
                key: 'attaqueRight',
                frames: this.anims.generateFrameNumbers('attaque', {start:0,end:4}),
                frameRate: 4,
                repeat: -1
            });

            this.anims.create({
                key: 'attaqueLeft',
                frames: this.anims.generateFrameNumbers('attaque', {start:5,end:9}),
                frameRate: 4,
                repeat: -1
            });
            this.anims.create({
                key: 'idleRight',
                frames: [ { key: 'attaque', frame: 10 } ],
                frameRate: 20
            });
            this.anims.create({
                key: 'idleLeft',
                frames: [ { key: 'attaque', frame: 11 } ],
                frameRate: 20
            });

            ////////////////////////

            this.anims.create({
                key: 'animLassoRight',
                frames: this.anims.generateFrameNumbers('animLasso', {start:0,end:10}),
                frameRate: 14,
                repeat: -1
            });

            this.anims.create({
                key: 'animLassoLeft',
                frames: this.anims.generateFrameNumbers('animLasso', {start:21,end:11}),
                frameRate: 14,
                repeat: -1
            });

            /////////////////////////

            this.anims.create({
                key: 'animLianes',
                frames: this.anims.generateFrameNumbers('lianes', {start:0,end:17}),
                frameRate: 11,
                repeat: -1
            });

            this.anims.create({
                key: 'animLianesPerso',
                frames: this.anims.generateFrameNumbers('lianesAnim', {start:0,end:17}),
                frameRate: 11,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animArme',
                frames: this.anims.generateFrameNumbers('arme', {start:0,end:13}),
                frameRate: 12,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animEnemiMur',
                frames: this.anims.generateFrameNumbers('enemisMur', {start:0,end:3}),
                frameRate: 10,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animAccrocheMurPersoRight',
                frames: this.anims.generateFrameNumbers('animAccrocheMurPerso', {start:0,end:1}),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'animAccrocheMurPersoLeft',
                frames: this.anims.generateFrameNumbers('animAccrocheMurPerso', {start:2,end:3}),
                frameRate: 10,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animRondinsBois',
                frames: this.anims.generateFrameNumbers('rondinsBois', {start:0,end:3}),
                frameRate: 6,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animationEau',
                frames: this.anims.generateFrameNumbers('animEau', {start:0,end:15}),
                frameRate: 10,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animEnemisVolantRight',
                frames: this.anims.generateFrameNumbers('enemisVolant', {start:0,end:3}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'animEnemisVolantLeft',
                frames: this.anims.generateFrameNumbers('enemisVolant', {start:4,end:7}),
                frameRate: 6,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'enemisEauRight',
                frames: this.anims.generateFrameNumbers('enemisEau', {start:0,end:3}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'enemisEauLeft',
                frames: this.anims.generateFrameNumbers('enemisEau', {start:4,end:7}),
                frameRate: 6,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animNageRight',
                frames: this.anims.generateFrameNumbers('animNage', {start:0,end:3}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'animNageLeft',
                frames: this.anims.generateFrameNumbers('animNage', {start:4,end:7}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'animIdleNage',
                frames: this.anims.generateFrameNumbers('animNage', {start:8,end:9}),
                frameRate: 6,
                repeat: -1
            });

            ////////////////////////

            this.anims.create({
                key: 'animGuideTorcheEtteinteAllume',
                frames: this.anims.generateFrameNumbers('guideTorcheEtteinteAllume', {start:0,end:13}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'animGuideArme',
                frames: this.anims.generateFrameNumbers('guideArme', {start:0,end:6}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'animGuideLasso',
                frames: this.anims.generateFrameNumbers('guideLasso', {start:0,end:6}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'animGuideAllumeTorhce',
                frames: this.anims.generateFrameNumbers('guideAllumeTorhce', {start:0,end:9}),
                frameRate: 6,
                repeat: -1
            });

            //////////////////////////////

            this.anims.create({
                key: 'animationFinGrotte',
                frames: this.anims.generateFrameNumbers('animFinJeu', {start:0,end:12}),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'animationFinGrotteIdle',
                frames: [ { key: 'animFinJeu', frame: 12 } ],
                frameRate: 20
            });
            
            ///////////////////////////////////////////////////////////////  
            ///////////////////////////////////////////////////////////////  ENNEMIS
            ///////////////////////////////////////////////////////////////  

            this.nbrEnemisVolant = 0

            this.enemisVolant = this.physics.add.group({
            });      

            carte.getObjectLayer('enemisVolant').objects.forEach((enemisVolant) => {
                this.enemiVolant = this.enemisVolant.create(enemisVolant.x, enemisVolant.y, 'enemisVolant').setOrigin(0);
                this.enemiVolant.setPushable(false)
                this.enemiVolant.setBounce(1);
                this.enemiVolant.setDepth(1000)
                this.enemiVolant.body.setAllowGravity(false)
                this.nbrEnemisVolant++
            });

            this.nbrEnemisVolantStock = this.nbrEnemisVolant

            this.enemisVolant.setVelocityY(-60)
            this.enemisVolant.setVelocityX(-60)
            this.physics.add.collider(this.enemisVolant,this.enemisVolant)
            this.physics.add.collider(this.enemisVolant,zoneEnnemi)
            this.physics.add.collider(this.enemisVolant,build)
            this.physics.add.collider(this.player,this.enemisVolant,this.degatEnnemi,null,this)

            //////////////////

            this.enemisMurGauche = this.physics.add.group({
            });      

            carte.getObjectLayer('enemisMurGauche').objects.forEach((enemisMurGauche) => {
                this.enemiMurGauche = this.enemisMurGauche.create(enemisMurGauche.x - 1, enemisMurGauche.y, 'enemisMur').setOrigin(0);
                this.enemiMurGauche.setPushable(false)
                this.enemiMurGauche.setBounce(1);
                this.enemiMurGauche.body.setAllowGravity(false)
            });

            this.enemisMurGauche.setVelocityY(-60)
            this.physics.add.collider(this.enemisMurGauche,zoneEnnemi)
            this.physics.add.collider(this.enemisMurGauche,build)
            this.physics.add.collider(this.player,this.enemisMurGauche,this.degatEnnemi,null,this)

            //////////////

            this.enemisMurDroite = this.physics.add.group({
            });      

            carte.getObjectLayer('enemisMurDroite').objects.forEach((enemisMurDroite) => {
                this.enemiMurDroite = this.enemisMurDroite.create(enemisMurDroite.x + 21, enemisMurDroite.y, 'enemisMur').setOrigin(0);
                this.enemiMurDroite.setPushable(false)
                this.enemiMurDroite.setBounce(1);
                this.enemiMurDroite.body.setAllowGravity(false)
                this.enemiMurDroite.flipX = true
            });


            this.enemisMurDroite.setVelocityY(-60)
            this.physics.add.collider(this.enemisMurDroite,zoneEnnemi)
            this.physics.add.collider(this.enemisMurDroite,build)
            this.physics.add.collider(this.player,this.enemisMurDroite,this.degatEnnemi,null,this)

            
            //////////////
            this.nbrEnemisEau = 0

            this.enemisEau = this.physics.add.group({
            });      

            carte.getObjectLayer('enemisEau').objects.forEach((enemisEau) => {
                this.enemiEau = this.enemisEau.create(enemisEau.x + 21, enemisEau.y, 'enemisEau').setOrigin(0);
                this.enemiEau.setPushable(false)
                this.enemiEau.setBounce(1);
                this.enemiEau.body.setAllowGravity(false)
                this.enemiEau.setDepth(2)
                this.enemiEau.setCollideWorldBounds(true);
                this.nbrEnemisEau ++

            });

            this.nbrEnemisEauStock = this.nbrEnemisEau

            this.enemisEau.setVelocityX(50)
            this.physics.add.collider(this.enemisEau,this.enemisEau)
            this.physics.add.collider(this.enemisEau,build)
            this.physics.add.collider(this.player,this.enemisEau,this.degatEnnemi,null,this)


            ///////////////////////////////////////////////////////////////  
            ///////////////////////////////////////////////////////////////  
            ///////////////////////////////////////////////////////////////  


            carte.getObjectLayer('torche').objects.forEach((torche) => {
                this.torche = this.physics.add.image(torche.x, torche.y, 'torche').setOrigin(0).setScale(0.8);
                this.torche.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.torche,this.prendreTorche,null,this)

            /////////////////////////////

            this.balles = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })

            this.physics.add.collider(this.balles,build,this.destroyBalle,null,this)

            this.physics.add.overlap(this.balles,this.enemisVolant,this.hitGun,null,this)
            this.physics.add.overlap(this.balles,this.enemisMurGauche,this.hitGun,null,this)
            this.physics.add.overlap(this.balles,this.enemisMurDroite,this.hitGun,null,this)


            /////////////////////////////

            carte.getObjectLayer('arme').objects.forEach((arme) => {
                this.arme = this.physics.add.sprite(arme.x, arme.y + 6, 'arme').setOrigin(0).setScale(0.8)
                this.arme.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.arme,this.takeWeapon,null,this)

            /////////////////////////////

            carte.getObjectLayer('lasso').objects.forEach((lasso) => {
                this.lassoObj = this.physics.add.sprite(lasso.x + 3, lasso.y + 3 , 'lasso').setOrigin(0).setScale(0.8)
                this.lassoObj.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.lassoObj,this.takeLasso,null,this)


            ///////////////////////////////////////////////////////////////

            this.torchesAAllumer  = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })
            this.torchesAllumer = this.physics.add.staticGroup({
            });      

            carte.getObjectLayer('torchesAAllumer').objects.forEach((torchesAAllumer) => {
                this.torchesAAllumer1 = this.torchesAAllumer.create(torchesAAllumer.x, torchesAAllumer.y, 'torchesAAllumer').setOrigin(0);
                this.torchesAAllumer1.setPushable(false)
                this.torchesAAllumer1.setInteractive()
                this.torchesAAllumer1.body.setSize(20,32)
                this.torchesAAllumer1.setDepth(1)
            });

            this.physics.add.overlap(this.player,this.torchesAAllumer,this.allumeTorche,null,this)

            ////////////////////////////////////////////////

            carte.getObjectLayer('murAOuvrir').objects.forEach((murAOuvrir) => {
                this.murAOuvrir = this.physics.add.image(murAOuvrir.x + 12, murAOuvrir.y, 'murAOuvrir').setOrigin(0);
                this.murAOuvrir.setPushable(false)
                this.murAOuvrir.body.setAllowGravity(false)
                this.murAOuvrir.setInteractive()
                this.murAOuvrirY = this.murAOuvrir.y
                

                this.temple = this.physics.add.image(murAOuvrir.x - 138, murAOuvrir.y - 102, 'temple0').setOrigin(0);
                this.temple.setPushable(false)
                this.temple.body.setAllowGravity(false)
                this.temple.setInteractive()

                this.murAOuvrir.body.setSize(64,96)
            });

            this.physics.add.overlap(this.player,this.murAOuvrir,this.murOuvert,null,this)

            ///////////////////////////////////////////////

            this.caisses = this.physics.add.group({
                immovable: true,
            })

            carte.getObjectLayer('caissesDeplacables').objects.forEach((caisses) => {
                this.caisse = this.caisses.create(caisses.x + 16,caisses.y + 16,'caisses').setDepth(7)
                this.caisse.body.setSize(28,32)
            });

            this.physics.add.collider(this.caisses,this.caisses,this.stopCaisseVelocite0,null,this)
            this.physics.add.collider(this.caisses,build)
            this.physics.add.collider(this.player,this.caisses,this.stopCaisse,null,this)
            

            //////////////////////////////////////////////////

            this.lianesAGrimper = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })
            this.boutLianesAGrimper = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })

            carte.getObjectLayer('lianesAGrimper').objects.forEach((lianesAGrimper) => {
                this.lianeAGrimper = this.lianesAGrimper.create(lianesAGrimper.x + 16,lianesAGrimper.y + 16 ,'lianesAGrimper').setDepth(7)
                this.lianeAGrimper.body.setSize(4,96)
            });

            this.physics.add.overlap(this.player,this.lianesAGrimper,this.grimperLianes,null,this)

            ////////////////////////////////////////////////

            this.checkPoints = this.physics.add.group({
            });      

            carte.getObjectLayer('checkPoint').objects.forEach((checkPoint) => {
                this.checkPoint = this.checkPoints.create(checkPoint.x, checkPoint.y, 'checkPoint').setOrigin(0);
                this.checkPoint.setPushable(false)
                this.checkPoint.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.checkPoints,this.savePoint,null,this)

            ///////////////////////////////////////////////////

            this.rondinsBois = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })

            carte.getObjectLayer('rondinsBois').objects.forEach((rondinsBois) => {
                this.rondinBois = this.rondinsBois.create(rondinsBois.x,rondinsBois.y - 4 ,'rondinsBois').setDepth(7)
                this.rondinBois.body.setSize(96,13)
                this.rondinBois.setOffset(0,6)
                this.spawnRondinX = this.rondinBois.x
                this.spawnRondinY = this.rondinBois.y

                this.rondinCreate = this.physics.add.image(rondinsBois.x + 200,rondinsBois.y,'invisible')
                this.rondinCreate.body.setAllowGravity(false)
                this.rondinCreate.body.setSize(2,32)
            });

            this.physics.add.overlap(this.rondinsBois,this.rondinCreate,this.spawnRondin,null,this)
            this.physics.add.collider(build,this.rondinsBois,this.destructionRondins,null,this)
            this.physics.add.collider(this.rondinsBois,zoneEnnemi,this.despawnRondin,null,this)
            this.physics.add.collider(this.player,this.rondinsBois,this.mouvementJoueurRondin,null,this)

            this.eau = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })
            
            carte.getObjectLayer('eauAnim').objects.forEach((eauAnim) => {
                this.eau.create(eauAnim.x + 32,eauAnim.y - 16,'animEau').setDepth(7)
            });

            this.physics.add.collider(this.enemisVolant,this.eau)
            this.physics.add.collider(this.enemisEau,this.eau)

            //////////////

            this.blocSoloDroiteGauches = this.physics.add.group({
                immovable: true,
                allowGravity: false
            });      

            carte.getObjectLayer('blocSoloDroiteGauches').objects.forEach((blocSoloDroiteGauches) => {
                this.blocSoloDroiteGauche = this.blocSoloDroiteGauches.create(blocSoloDroiteGauches.x, blocSoloDroiteGauches.y - 32, 'blocSolo').setOrigin(0);
                this.blocSoloDroiteGauche.setBounce(1);
            });

            this.blocTripleDroiteGauches = this.physics.add.group({
                immovable: true,
                allowGravity: false
            });      

            carte.getObjectLayer('blocTripleDroiteGauches').objects.forEach((blocTripleDroiteGauches) => {
                this.blocTripleDroiteGauche = this.blocTripleDroiteGauches.create(blocTripleDroiteGauches.x, blocTripleDroiteGauches.y - 32, 'blocTriple').setOrigin(0);
                this.blocTripleDroiteGauche.setBounce(1);

            });

            this.physics.add.collider(this.player,this.blocSoloDroiteGauches,this.mouvementJoueurPlateforme,null,this)
            this.physics.add.collider(this.player,this.blocTripleDroiteGauches,this.mouvementJoueurPlateforme,null,this)

            this.blocSoloDroiteGauches.setVelocityX(70)
            this.physics.add.collider(this.blocSoloDroiteGauches,zoneEnnemi)
            this.physics.add.collider(this.blocSoloDroiteGauches,build)

            this.blocTripleDroiteGauches.setVelocityX(70)
            this.physics.add.collider(this.blocTripleDroiteGauches,zoneEnnemi)
            this.physics.add.collider(this.blocTripleDroiteGauches,build)

            ////////////////////////////////////////////////

            this.vieObj = this.physics.add.group({
            });      

            carte.getObjectLayer('vieObj').objects.forEach((vieObj) => {
                this.vieAPrendre = this.vieObj.create(vieObj.x + 6, vieObj.y , 'vieObj').setOrigin(0).setScale(0.8);;
                this.vieAPrendre.setPushable(false)
                this.vieAPrendre.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.vieObj,this.takeHp,null,this)

            //////////////////

            this.piquesBas = this.physics.add.group({
            });      

            carte.getObjectLayer('piquesBas').objects.forEach((piquesBas) => {
                this.piqueBas = this.piquesBas.create(piquesBas.x + 1, piquesBas.y- 8, 'piquesBas').setOrigin(0).setDepth(100);
                this.piqueBas.body.setAllowGravity(false)
                this.piqueBas.setPushable(false)
            });

            this.piquesHaut = this.physics.add.group({
            });      

            carte.getObjectLayer('piquesHaut').objects.forEach((piquesHaut) => {
                this.piqueHaut = this.piquesHaut.create(piquesHaut.x + 4, piquesHaut.y- 37, 'piquesHaut').setOrigin(0);
                this.piqueHaut.body.setAllowGravity(false)
                this.piqueHaut.setPushable(false)
            });

            this.physics.add.collider(this.player,this.piquesHaut,this.degatEnnemi,null,this)
            this.physics.add.collider(this.player,this.piquesBas,this.degatEnnemi,null,this)

            /////////////////////////////////////

            carte.getObjectLayer('animFinJeu').objects.forEach((animFinJeu) => {
                this.collideCaisseFinJeu = this.physics.add.image(animFinJeu.x - 33, animFinJeu.y + 48, 'invisible').setOrigin(0);
                this.collideCaisseFinJeu.body.setAllowGravity(false)
                this.collideCaisseFinJeu.setPushable(false)
                this.collideCaisseFinJeu.body.setSize(42,10)

                this.animStart = this.physics.add.sprite(animFinJeu.x - 38, animFinJeu.y + 17, 'animFinJeu').setOrigin(0);
                this.animStart.body.setAllowGravity(false)
                this.animStart.setPushable(false)
                this.animStart.alpha = 0

                this.collidePorteGrotte = this.physics.add.image(animFinJeu.x + 50, animFinJeu.y + 190, 'invisible').setOrigin(0);
                this.collidePorteGrotte.body.setAllowGravity(false)
                this.collidePorteGrotte.setPushable(false)
                this.collidePorteGrotte.body.setSize(10,96)

            });

            this.physics.add.collider(this.player,this.collidePorteGrotte)
            this.physics.add.collider(this.collidePorteGrotte,zoneEnnemi,this.despawnRondin,null,this)
            this.physics.add.overlap(this.caisses,this.collideCaisseFinJeu,this.startAnimFin,null,this)




            /////////////////////////////
            /////////////////////////////
            /////////////////////////////


            this.entreTemple = this.physics.add.image(this.murAOuvrir.x, this.murAOuvrir.y+32, 'invisible').setOrigin(0)
            this.entreTemple.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.entreTemple,this.goTemple,null,this)
            this.entreTemple.body.setSize(64,64)
            this.entreTemple.setOffset(0,0)

            ///////////////////////////////////////////////////////////////
            /////////////////////////TOUCHES///////////////////////////////
            ///////////////////////////////////////////////////////////////

            this.cursors = this.input.keyboard.createCursorKeys();
            this.keys = this.input.keyboard.addKeys({
                space: Phaser.Input.Keyboard.KeyCodes.SPACE,
                q: Phaser.Input.Keyboard.KeyCodes.Q,
                d: Phaser.Input.Keyboard.KeyCodes.D,
                z: Phaser.Input.Keyboard.KeyCodes.Z,
                s: Phaser.Input.Keyboard.KeyCodes.S,
                a: Phaser.Input.Keyboard.KeyCodes.A,
                c: Phaser.Input.Keyboard.KeyCodes.C,
                v: Phaser.Input.Keyboard.KeyCodes.V,
                f: Phaser.Input.Keyboard.KeyCodes.F,
                e: Phaser.Input.Keyboard.KeyCodes.E
            });

            /////////////////////// /////////////////////// /////////////////////// ///////////////////////
            /////////////////////// /////////////////// LIANES //////////////////// ///////////////////////
            /////////////////////// /////////////////////// /////////////////////// ///////////////////////

            this.lianes = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })

            this.overlapLiane = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })
            
            carte.getObjectLayer('lianes1').objects.forEach((lianes1) => {
                this.lianes.create(lianes1.x,lianes1.y + 32,'lianes').setDepth(7)
            });

            this.overlapTest = this.overlapLiane.create(0,0,"invisibleLiane")

            this.physics.add.overlap(this.player,this.overlapTest,this.accrocheJoueur1Fonction,null,this)
            this.physics.add.overlap(this.player,this.lianes,this.testAnimLianes,null,this)

        ///////////////////////////////////////////////////////////////
        ////////////////////////INTERFACE//////////////////////////////
        ///////////////////////////////////////////////////////////////
        
        this.inventaireEcran = this.add.image(810,260,'interfaceArmeObj0').setScale(0.6)
        this.inventaireEcran.setScrollFactor(0)
        this.inventaireEcran.setDepth(100)
        this.inventaireEcran.setInteractive()

        this.vieEcran = this.add.image(460,260,'hp4').setScale(0.6)
        this.vieEcran.setScrollFactor(0) 
        this.vieEcran.setDepth(100)
        this.vieEcran.setInteractive()

        this.guideTorche = this.physics.add.sprite(0,2000,'guideAllumeTorhce').setScale(0.8).setDepth(10000)
        this.guideTorche.body.setAllowGravity(false)

        this.guideTest =  this.physics.add.sprite(0,2000,'guideTorcheEtteinteAllume').setScale(0.8).setDepth(10000)
        this.guideTest.body.setAllowGravity(false)

        this.guideArme = this.physics.add.sprite(0,2000,'guideArme').setScale(0.8).setDepth(10000)
        this.guideArme.body.setAllowGravity(false)

        this.guideLasso = this.physics.add.sprite(0,2000,'guideLasso').setScale(0.8).setDepth(10000)
        this.guideLasso.body.setAllowGravity(false)


        }

        update(time, delta){
            super.update(time, delta);

            if ( this.pouvoirTirer == false && this.armeUnlockck == false){
            this.arme.anims.play('animArme', true);
            }

            this.vieObj.children.iterate((child) => {
                child.anims.play('animVieObj', true);
            });

            this.rondinsBois.children.iterate((child) => {
                if (child.y < this.spawnRondinY + 1 ){
                    child.setVelocityX(40)
                    child.setVelocityY(0)
                }
                
                child.anims.play('animRondinsBois', true);
            });

            this.eau.children.iterate((child) => {
                child.anims.play('animationEau', true);
            });
            
            //////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////
            
            if (this.player.direction == 'right'){
                this.light.x = this.player.x + 30;
            }
            if (this.player.direction == 'left'){
                this.light.x = this.player.x;
            }

            this.light.y = this.player.y;

            this.shot = Phaser.Input.Keyboard.JustDown(this.keys.e)
            this.attaqueTouche = Phaser.Input.Keyboard.JustDown(this.keys.a)
            this.lightTouche = Phaser.Input.Keyboard.JustDown(this.keys.c)
            this.interagir = Phaser.Input.Keyboard.JustDown(this.keys.f)
            this.noLightTouche = Phaser.Input.Keyboard.JustDown(this.keys.v)
            this.moveUp = Phaser.Input.Keyboard.JustDown(this.keys.space)
            this.moveLeft = (this.keys.q.isDown )  
            this.moveRight = (this.keys.d.isDown ) 
            this.moveUpLiane = (this.keys.z.isDown )  
            this.moveDownLiane = (this.keys.s.isDown ) 


            if (this.dialogue == false){

        

            if (this.torcheDebloque == true){
                if (this.lightTouche){
                    this.torcheActive = true
                }
            }

            if (this.torcheActive == true){
                this.light.setIntensity(6)
                this.player.alpha = 1
        
                this.animTorche = true
                this.animNormal = false
                this.animJump = false
                this.attaquePossible = false
        
                if (this.noLightTouche){
                    this.torcheActive = false
                    this.animNormal = true
                    this.attaquePossible = true
                    this.animTorche = false
                }
            }
            if (this.torcheActive == false){
                this.light.setIntensity(0)
                this.player.alpha = 1
            }

            // frames utiliser selon les situations
            if (this.animNormal == true){
                this.frameLeft = 'left'
                this.frameRight = 'right'
                this.frameTurn = 'turn'
            }
        
            if (this.animAccrocheMur == true){
                this.frameLeft = 'animAccrocheMurPersoLeft'
                this.frameRight = 'animAccrocheMurPersoRight'
            }

            if (this.animNage == true){
                this.frameLeft = 'animNageLeft'
                this.frameRight = 'animNageRight'
                this.frameTurn ='animIdleNage'
            }
            
            if (this.animPousseCaisse == true){
                this.frameLeft = 'animPousseLeft'
                this.frameRight = 'animPousseRight'
            }
        
            if (this.animJump == true){
                this.frameLeft = 'jumpLeft'
                this.frameRight = 'jumpRight'
                this.frameTurn = 'turnJump'
            }
        
            if (this.attaque == true){
                this.frameLeft = 'attaqueLeft'
                this.frameRight = 'attaqueRight'
                this.frameTurn = 'turnJump'
            }
        
            if (this.animTorche == true){
                this.frameLeft = 'animTorcheLeft'
                this.frameRight = 'animTorcheRight'
            }
        
            if (this.attaquePossible == true){
                if (this.attaqueTouche){ 
                    this.attaque = true
                    this.animNormal = false
                    this.animJump = false
                    this.attaquePossible = false
        
                    this.player.direction = 'right';
                    this.createLasso = true
                    this.test = true
                }
            }

            if (this.createLasso == true){
                this.lasso = this.physics.add.sprite(this.player.x,this.player.y,'animLasso').setOrigin(0);
                this.lasso.body.setAllowGravity(false)
                this.createLasso = false

                this.physics.add.overlap(this.lasso,this.enemisVolant,this.toucheEnnemi,null,this)
                this.physics.add.overlap(this.lasso,this.caisses,this.bougerCaisse,null,this)
            }

        if (this.inWater == false){

            if (this.player.direction == 'left'){
                this.player.setOffset(8,0)
            }
            if (this.player.direction == 'right'){
                this.player.setOffset(8,0)
            }

            if  (this.attaque == true){
                this.lasso.y = this.player.y
        
                if (this.test == true ){
                    this.player.setVelocityX(this.speedRight/3);
                    this.player.anims.play(this.frameRight, true);
                    this.test = false
                }
                
                if (this.moveLeft){ 
                    this.player.direction = 'left';
                    this.player.setVelocityX(-this.speedLeft/3); 
                    this.player.anims.play(this.frameLeft, true);
        
                }
                
                else if (this.moveRight){ 
                    this.player.direction = 'right';
                    this.player.setVelocityX(this.speedRight/2);
                    this.player.anims.play(this.frameRight, true);
                }
                else{ 
                    this.player.setVelocityX(0); 
                    if (this.player.direction == 'left'){
                        this.player.anims.play('idleLeft', true);     
                    }
                    if (this.player.direction == 'right'){
                        this.player.anims.play('idleRight', true);     
                    }
                }
        
                    if (this.player.direction == 'right'){
                        this.lasso.x = this.player.x + 32
                        this.lasso.anims.play('animLassoRight', true);

                        if (this.lasso.anims.currentFrame.index == 1){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(-4,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 2){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(10,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 3){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(26,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 4){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(42,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 5){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(58,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 6){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(74,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 7){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(58,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 8){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(42,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 9){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(26,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 10){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(10,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 11 ){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(-4,12)
                            this.attaque = false
                            this.animNormal = true
                            this.attaquePossible = true
                            this.lasso.destroy()
                        }
                    }
        
                    if (this.player.direction == 'left'){
                        this.lasso.anims.play('animLassoLeft', true);

                        this.lasso.x = this.player.x - 94
                        if (this.lasso.anims.currentFrame.index == 1){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(74,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 2){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(74,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 3){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(58,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 4){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(42,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 5){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(26,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 6){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(-4,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 7){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(26,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 8){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(42,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 9){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(58,12)
                        }
                        if (this.lasso.anims.currentFrame.index == 10){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(74,12)
                        }
        
                        if (this.lasso.anims.currentFrame.index == 11){
                            this.lasso.body.setSize(20,12)
                            this.lasso.setOffset(56,12)
                            this.attaque = false
                            this.animNormal = true
                            this.attaquePossible = true
                            this.lasso.destroy()
                        }          
                }  
            }

            if (this.attaque == false){
                if (this.moveUp && this.player.body.blocked.down ) {
                    this.player.setVelocityY(-this.speedSaut);
                }  
                if (this.moveLeft){ 
                    this.player.direction = 'left';
                    this.player.setVelocityX(-this.speedLeft); 
                    this.player.anims.play(this.frameLeft, true);
                }
                else if (this.moveRight){ 
                    this.player.direction = 'right';
                    this.player.setVelocityX(this.speedRight);
                    this.player.anims.play(this.frameRight, true);
                }
                else{ 
                    if (this.surRondin == false){
                    this.player.setVelocityX(0); 
                    }
                    if (this.animTorche == false){
                        this.player.anims.play(this.frameTurn, true);
                    }
                    else{
                        if (this.player.direction == 'right'){
                            this.player.anims.play('idleRightTorche', true);
                        }
                        if (this.player.direction == 'left'){
                            this.player.anims.play('idleLeftTorche', true);
                        }
                    }
                }

                    if(this.doubleJumpActif == true){
                        if(this.doubleSautRightPossible == true){
                            if (this.player.body.blocked.right ) {
                                if (this.moveUp) {
                                    this.doubleSautLeft = true
                                }  
                            }
                        }

                        if(this.doubleSautLeftPossible == true){
                            if (this.player.body.blocked.left ) {
                                if (this.moveUp) {
                                    this.doubleSautRight = true
                                }  
                            }
                        }
                    }
                    
                    if(this.doubleSautLeft == true){
                        this.resetGraviteRight = false
                        this.resetGraviteLeft = true
                        this.doubleSautRightPossible = false
                        this.doubleSautLeftPossible = true
                        this.compteurDoubleSautLeft -=1 ;
                        this.player.setVelocityX(-300);
                        this.player.setVelocityY(-this.speedSaut + 75);
                        if(this.compteurDoubleSautLeft == 0){
                            this.compteurDoubleSautLeft = 10
                            this.doubleSautLeft = false
                        }
                    }

                    if(this.doubleSautRight == true){
                        this.resetGraviteRight = true
                        this.resetGraviteLeft = false
                        this.doubleSautRightPossible = true
                        this.doubleSautLeftPossible = false
                        this.compteurDoubleSautRight -=1 ;
                        this.player.setVelocityX(300);
                        this.player.setVelocityY(-this.speedSaut + 75);
                        if(this.compteurDoubleSautRight == 0){
                            this.compteurDoubleSautRight = 10
                            this.doubleSautRight = false
                        }
                    }

                    if(this.invulnérable == false){
                    if (this.resetGraviteLeft == true ){this.speedRight = 90}
                    else{this.speedRight = this.speed}

                    if (this.resetGraviteRight == true){this.speedLeft = 90}
                    else{this.speedLeft = this.speed}
                    }

                    if (this.player.body.blocked.down){
                        this.animAccrocheMur = false
                        this.doubleSautRightPossible = true
                        this.doubleSautLeftPossible = true
                        this.resetGraviteLeft = false
                        this.resetGraviteRight = false
                        if (this.animPousseCaisse == false){
                            this.animNormal = true
                        }
                        this.animJump = false
                        this.doubleJumpActif = false
                        this.accrochePossibleLianeAGrimper = false

                        this.toucheSol = true

                        this.compteurToucheSol = 25
                    }      
                    else{
                        this.animNormal = false
                        this.animJump = true
                        this.doubleJumpActif = true
                        if (this.stopGrimper == false){
                            this.accrochePossibleLianeAGrimper = true
                        }
                    }      
                }       

                if (this.toucheSol == true){
                    this.compteurToucheSol --
                    if(this.compteurToucheSol == 0){
                        this.compteurToucheSol = 25
                        this.toucheSol = false
                        this.animAccrocheMur = false
                    }
                }

        if (this.toucheSol == false){
            if (this.tileTest2.index == -1){
                if (this.player.body.blocked.left ||this.player.body.blocked.right ) {
                    this.player.setVelocityY(20); 
                    this.animAccrocheMur = true
                    this.animJump = false
                }
                else{
                    this.animAccrocheMur = false
                }
            }
        }
            
        }

            if (this.murStop == true){
                if (this.murAOuvrir.y < this.murAOuvrirY - 100){
                    this.murAOuvrir.setVelocityY(0)
                    this.entreeTemplePossible = true
                }
            }


            if (this.templeOuvertTorcheAllumer == true){
                this.torchesAAllumer.children.iterate((child) => {
                    child.setTexture('torchesAllumer');
                });
                this.temple.setTexture('temple4')
            }

            if (this.shot){
                this.tirer(this.player);
            }

            if (this.accroche1 == true){
                this.resetGraviteLeft = false
                this.resetGraviteRight = false
                this.player.x = this.accrocheTest.x - 14
                this.player.y = this.accrocheTest.y - 20
                this.player.body.setAllowGravity(false)
                this.player.alpha = 0
                this.attaquePossible = false

                this.cameras.main.startFollow(this.lianeTemporaire); 

                this.doubleSautRightPossible = true
                this.doubleSautLeftPossible = true
                
                if (this.moveUp){
                    this.player.setVelocityY(-this.speedSaut)
                    this.accrochePossible1 = false
                    this.accroche1 = false
                    this.player.body.setAllowGravity(true)
                    this.player.alpha = 1
                    this.lianes.children.iterate((child) => {
                        this.idxDebutAnimLianeStop = child.anims.currentFrame.index
                    });
                    this.cameras.main.startFollow(this.player); 
                    this.animLianeSpecial = false
                    this.attaquePossible = true
                }
            }
            if (this.accrochePossible1 == false){
                this.compteurAccrochePossible1 -= 1
                if (this.compteurAccrochePossible1 == 0){
                    this.compteurAccrochePossible1 = 50
                    this.accrochePossible1 = true
                }
            }      
            
            if (this.animLianeSpecial == false){
                this.lianes.children.iterate((child) => {
                    if (this.idxDebutAnimLianeStop == 18){
                        this.idxDebutAnimLianeStop = 17
                    }
                    child.anims.play({ key: 'animLianes', startFrame: this.idxDebutAnimLianeStop}, true);
                });
            }
            if (this.animLianeSpecial == true && this.accroche1 == true){
                this.lianes.children.iterate((child) => {
                    if (this.idxDebutAnimLiane == 18){
                        this.idxDebutAnimLiane = 17
                    }
                });
                this.lianeTemporaire.anims.play({ key: 'animLianesPerso', startFrame: this.idxDebutAnimLiane }, true);
            }

            if (this.apparaitreAccroche == true){
                if (this.lianeTemporaire.anims.currentFrame.index == 1){  this.overlapTest.x = this.lianeTemporaire.x + 110,this.overlapTest.y = this.lianeTemporaire.y - 50 }
                if (this.lianeTemporaire.anims.currentFrame.index == 2){  this.overlapTest.x = this.lianeTemporaire.x + 90,this.overlapTest.y = this.lianeTemporaire.y + 10 }
                if (this.lianeTemporaire.anims.currentFrame.index == 3){  this.overlapTest.x = this.lianeTemporaire.x + 70,this.overlapTest.y = this.lianeTemporaire.y + 40}
                if (this.lianeTemporaire.anims.currentFrame.index == 4){  this.overlapTest.x = this.lianeTemporaire.x + 36,this.overlapTest.y = this.lianeTemporaire.y + 60}
                if (this.lianeTemporaire.anims.currentFrame.index == 5){  this.overlapTest.x = this.lianeTemporaire.x - 10,this.overlapTest.y = this.lianeTemporaire.y + 60}
                if (this.lianeTemporaire.anims.currentFrame.index == 6){  this.overlapTest.x = this.lianeTemporaire.x - 52,this.overlapTest.y = this.lianeTemporaire.y + 56}
                if (this.lianeTemporaire.anims.currentFrame.index == 7){  this.overlapTest.x = this.lianeTemporaire.x - 86,this.overlapTest.y = this.lianeTemporaire.y + 40}
                if (this.lianeTemporaire.anims.currentFrame.index == 8){ this.overlapTest.x = this.lianeTemporaire.x - 110, this.overlapTest.y = this.lianeTemporaire.y + 10}
                if (this.lianeTemporaire.anims.currentFrame.index == 9){ this.overlapTest.x = this.lianeTemporaire.x - 120,this.overlapTest.y = this.lianeTemporaire.y - 50}
                if (this.lianeTemporaire.anims.currentFrame.index == 10){  this.overlapTest.x = this.lianeTemporaire.x - 120,this.overlapTest.y = this.lianeTemporaire.y - 50}
                if (this.lianeTemporaire.anims.currentFrame.index == 11){this.overlapTest.x = this.lianeTemporaire.x - 110, this.overlapTest.y = this.lianeTemporaire.y + 10}
                if (this.lianeTemporaire.anims.currentFrame.index == 12){ this.overlapTest.x = this.lianeTemporaire.x - 86,this.overlapTest.y = this.lianeTemporaire.y + 40 }
                if (this.lianeTemporaire.anims.currentFrame.index == 13){ this.overlapTest.x = this.lianeTemporaire.x - 52, this.overlapTest.y = this.lianeTemporaire.y + 56}
                if (this.lianeTemporaire.anims.currentFrame.index == 14){ this.overlapTest.x = this.lianeTemporaire.x - 10,this.overlapTest.y = this.lianeTemporaire.y + 60}
                if (this.lianeTemporaire.anims.currentFrame.index == 15){ this.overlapTest.x = this.lianeTemporaire.x + 36,this.overlapTest.y = this.lianeTemporaire.y + 60}
                if (this.lianeTemporaire.anims.currentFrame.index == 16){ this.overlapTest.x = this.lianeTemporaire.x + 70,this.overlapTest.y = this.lianeTemporaire.y + 40}
                if (this.lianeTemporaire.anims.currentFrame.index == 17){ this.overlapTest.x = this.lianeTemporaire.x + 100, this.overlapTest.y = this.lianeTemporaire.y + 10}
                if (this.lianeTemporaire.anims.currentFrame.index == 18){ this.overlapTest.x = this.lianeTemporaire.x + 110,this.overlapTest.y = this.lianeTemporaire.y - 50}
            }

            if (this.deplacementEnnemi == true){
                this.compteurDeplacementLasso --
                if (this.compteurDeplacementLasso == 0){
                    this.enemisVolant.setVelocityX(0)
                    this.compteurDeplacementLasso = this.compteurDeplacementLassoStock
                    this.deplacementEnnemi = false
                }
            }

            if (this.deplacementCaisse == true){
                this.compteurDeplacementLassoCaisse --
                if (this.compteurDeplacementLassoCaisse == 0){
                    this.caisses.setVelocityX(0)
                    this.compteurDeplacementLassoCaisse = this.compteurDeplacementLassoCaisseStock
                    this.deplacementCaisse = false
                    this.blockCaisse = true
                }
            }

            if (this.blockCaisse == true){
                this.caisses.children.iterate((child) => {
                    if (child.x < this.player.x - 10 ){
                        child.setVelocityX(0)
                        this.stopAnimCaisse = true
                    }
                    if (child.x > this.player.x + 40 ){
                        child.setVelocityX(0)
                        this.stopAnimCaisse = true
                    }
                });
            }
        
            if (this.stopAnimCaisse == true){
                this.compteurStopAnimCaisse --
                if (this.compteurStopAnimCaisse == 0){
                    this.compteurStopAnimCaisse = 10
                    this.animPousseCaisse = false
                    this.stopAnimCaisse = false
                    this.blockCaisse = false
                }
            }

            }
            if (this.dialogue == true){
                this.player.body.setAllowGravity(false)
                this.player.setVelocityY(0)
                
                if (this.moveUpLiane){
                    this.player.setVelocityY(-80)
                    this.player.anims.play('animGrimpeLiane', true);
                }
                else if (this.moveDownLiane){
                    this.player.setVelocityY(80)
                    this.player.anims.play('animGrimpeLiane', true);
                }
                else {
                    this.player.setVelocityY(0)
                    this.player.anims.play('idleAnimGrimpeLiane', true);
                }

                if (this.moveRight){
                    this.player.direction = 'right'
                }
                if (this.moveLeft){
                    this.player.direction = 'left'
                }

                if (this.moveUp){
                    this.accrochePossibleLianeAGrimper = false
                    if (this.player.direction == 'right'){
                        this.player.setVelocityX(300)
                        this.player.setVelocityY(-300)
                    }
                    if (this.player.direction == 'left'){
                        this.player.setVelocityX(-300)
                        this.player.setVelocityY(-300)
                    }
                    this.dialogue = false
                    this.stopGrimper = true
                }
            }

            if (this.stopGrimper == true){
                this.compteurStopGrimper -= 1
                if (this.compteurStopGrimper == 0){
                    this.compteurStopGrimper = 8
                    this.player.body.setAllowGravity(true)
                    this.stopGrimper = false
                    this.accrochePossibleLianeAGrimper = true
                }
            }

            if (this.lassoUnlcok == true){
                this.inventaireEcran.setTexture('interfaceArmeObj1')
                if (this.pouvoirTirer == true){
                    this.inventaireEcran.setTexture('interfaceArmeObj2')
                }
            }

            this.enemisVolant.children.iterate(function (child) {
                this.distEnemisVolant = Phaser.Math.Distance.Between(child.scene.player.body.x,child.scene.player.body.y,child.body.x,child.body.y)
                if(this.invulnérable == false && this.distEnemisVolant < 75){
                    this.physics.moveToObject(child, child.scene.player, 60)
                }
                if (child.body.velocity.x > 0){
                    child.anims.play('animEnemisVolantRight', true);
                }
                if (child.body.velocity.x < 0){
                    child.anims.play('animEnemisVolantLeft', true);
                }

                if (this.resetEnemis == true){
                    this.choixRandomX = Phaser.Math.Between(1, 2)
                    if (this.choixRandomX == 1){
                        this.directionVolantX = 1
                    }
                    if (this.choixRandomX == 2){
                        this.directionVolantX = -1
                    }

                    this.choixRandomY = Phaser.Math.Between(1, 2)
                    if (this.choixRandomY == 1){
                        this.directionVolantY = 1
                    }
                    if (this.choixRandomY == 2){
                        this.directionVolantY = -1
                    }
                    child.setVelocityX(60* this.directionVolantX)
                    child.setVelocityY(60* this.directionVolantY)
                    this.nbrEnemisVolant--
                    if (this.nbrEnemisVolant == 0){
                        this.nbrEnemisVolant = this.nbrEnemisVolantStock
                        this.resetEnemis = false
                    }
                }

                if (this.resetEnemis == false){
                    this.compteurReset --
                    if(this.compteurReset == 0){
                        this.compteurReset = 2000
                        this.resetEnemis = true
                    }
                }
                    
                    

            },this);

            this.enemisEau.children.iterate(function (child) {
                this.distEnemisEau = Phaser.Math.Distance.Between(child.scene.player.body.x,child.scene.player.body.y,child.body.x,child.body.y)
                if(this.invulnérable == false && this.distEnemisEau < 75){
                    this.physics.moveToObject(child, child.scene.player, 50)
                }
                if (child.body.velocity.x > 0){
                    child.anims.play('enemisEauRight', true);
                }
                if (child.body.velocity.x < 0){
                    child.anims.play('enemisEauLeft', true);
                }

                if (this.resetEnemisEau == true){
                    this.choixRandomXEau = Phaser.Math.Between(1, 2)
                    if (this.choixRandomXEau == 1){
                        this.directionVolantXEau = 1
                    }
                    if (this.choixRandomXEau == 2){
                        this.directionVolantXEau = -1
                    }
                    
                    this.choixRandomYEau = Phaser.Math.Between(1, 2)
                    if (this.choixRandomYEau == 1){
                        this.directionVolantYEau = 1
                    }
                    if (this.choixRandomYEau == 2){
                        this.directionVolantYEau = -1
                    }
                    child.setVelocityX(50* this.directionVolantXEau)
                    child.setVelocityY(50* this.directionVolantYEau)
                    this.nbrEnemisEau--
                    if (this.nbrEnemisEau == 0){
                        this.nbrEnemisEau = this.nbrEnemisEauStock
                        this.resetEnemisEau = false
                    }
                }

                if (this.resetEnemisEau == false){
                    this.compteurResetEau --
                    if(this.compteurResetEau == 0){
                        this.compteurResetEau = 2000
                        this.resetEnemisEau = true
                    }
                }
            },this);

        

           if(this.invulnérable == true){
            this.compteurInvunlerable -=1 ;
                if(this.compteurInvunlerable == 0){
                    this.compteurInvunlerable = 200;
                    this.invulnérable = false ;
                    this.player.setTint(0xffffff)
                }
            }

            this.enemisMurGauche.children.iterate((child) => {
                child.anims.play('animEnemiMur', true);
                if (child.body.velocity.y < 0){
                    child.flipY = true
                }
                if (child.body.velocity.y > 0){
                    child.flipY = false
                }
            });

            this.enemisMurDroite.children.iterate((child) => {
                child.anims.play('animEnemiMur', true);
                if (child.body.velocity.y < 0){
                    child.flipY = true
                }
                if (child.body.velocity.y > 0){
                    child.flipY = false
                }
            });

            if (this.spawnRondinPossible == true){
                this.compteurSpawnRondinPossible --
                if (this.compteurSpawnRondinPossible == 0){
                    this.compteurSpawnRondinPossible = 600
                    this.spawnRondinPossible = false
                    this.testRondins = false
                }
            }

            if (this.testRondins == false){
                this.rondintest = this.rondinsBois.create(this.spawnRondinX + 16 ,this.spawnRondinY + 10,'rondinsBois')
                this.rondinsBois.setVelocityY(-10)
                this.rondintest.body.setSize(96,13)
                this.rondintest.setOffset(0,6)
                this.testRondins = true
            }



                this.tile = this.eauLayer.getTileAtWorldXY(this.player.x, this.player.y, true);
                if (this.tile != null) {
                    if (this.tile.index != -1){
                       this.speedLeft = 75
                       this.speedRight = 75
                       this.speedSaut = 65
                       this.attaquePossible = false
                       this.pouvoirTirer = false
                       this.inWater = true
                       this.animNage = true

                       this.animNormal = false
                       this.animAccrocheMur = false
                       this.animJump = false
                       this.player.setVelocityY(8)

                       if (this.attaque == true){
                           this.attaque = false
                           this.lasso.destroy()
                       }

                       this.sortEau = true
                    }
                    else{
                        if (this.invulnérable == false && this.doubleSautLeftPossible == true && this.doubleSautRightPossible == true){
                       this.speedSaut = 380
                        }
                   
                       if (this.armeUnlock == true){
                        this.pouvoirTirer = true
                       }
                       if (this.lassoUnlcok == true){
                            this.attaquePossible = true
                        }
                        this.inWater = false
                       this.animNage = false
                       this.player.body.setSize(16,32)

                       if (this.sortEau == true){
                           this.player.setVelocityY(-280)
                           this.sortEau = false
                       }
                    }
                }


                this.tileTest2 = this.eauLayer.getTileAtWorldXY(this.player.x, this.player.y + 32, true);


                if (this.inWater == true){
              
                    if (this.moveLeft){ 
                        this.player.direction = 'left';
                        this.player.setVelocityX(-this.speedLeft); 
                        this.player.anims.play(this.frameLeft, true);
                        this.player.body.setSize(32,16)
                    }
                    else if (this.moveRight){ 
                        this.player.direction = 'right';
                        this.player.setVelocityX(this.speedRight);
                        this.player.anims.play(this.frameRight, true);
                        this.player.body.setSize(32,16)
                    }

                    if (this.moveUpLiane){ 
                        this.player.setVelocityY(-this.speedSaut);
                    }
                    if (this.moveDownLiane){ 
                        this.player.setVelocityY(this.speedSaut);
                    }

                    if (this.keys.z.isUp && this.keys.q.isUp && this.keys.d.isUp && this.keys.s.isUp && this.surRondin == false){
                        this.player.setVelocityX(0)
                        this.player.anims.play(this.frameTurn, true);
                        this.player.body.setSize(16,32)
                    }
                  
                }

            if (this.pointDeVie == 0){
                this.respawnJoueur()
            }

            if (this.surRondin == true){
                this.surRondin = false
            }
            else{
                this.surRondin = false
            }

            if (this.pointDeVie > 4){
                this.pointDeVie = 4
            }

            this.torchesAAllumer.children.iterate((child) => {
                if (this.player.x < child.x + 30 && this.player.x > child.x - 30 && this.player.y < child.y + 30 && this.player.y > child.y - 30){
                    this.guideTorche.x = child.x - 20
                    this.guideTorche.y = child.y 
                    this.guideTorche.anims.play('animGuideAllumeTorhce',true);
                }           
            });

            if (this.player.x < this.torche.x + 70 && this.player.x > this.torche.x - 70 && this.player.y < this.torche.y + 70 && this.player.y > this.torche.y - 70){
                this.guideTest.x = this.torche.x + 16
                this.guideTest.y = this.torche.y - 20
                this.guideTest.anims.play('animGuideTorcheEtteinteAllume',true);
                this.guideTest.alpha = 1
            }  
            else{
                this.guideTest.alpha = 0
            }
            
            if (this.player.x < this.arme.x + 50 && this.player.x > this.arme.x - 50 && this.player.y < this.arme.y + 50 && this.player.y > this.arme.y - 50){
                this.guideArme.x = this.arme.x + 18
                this.guideArme.y = this.arme.y - 16
                this.guideArme.anims.play('animGuideArme',true);
                this.guideArme.alpha = 1
            } 
            else{
                this.guideArme.alpha = 0
            }

            if (this.player.x < this.lassoObj.x + 50 && this.player.x > this.lassoObj.x - 50 && this.player.y  < this.lassoObj.y + 50 && this.player.y > this.lassoObj.y - 50){
                this.guideLasso.x = this.lassoObj.x + 18
                this.guideLasso.y = this.lassoObj.y - 18
                this.guideLasso.anims.play('animGuideLasso',true);
                this.guideLasso.alpha = 1
            } 
            else{
                this.guideLasso.alpha = 0
            }

            if (this.startAnimOuvertureGrotte == true){
                if (this.truc == false){
                    this.animStart.anims.play('animationFinGrotte', true);
                }

                if (this.animStart.anims.currentFrame.index == 12){
                    this.startAnimOuvertureGrotte = false
                    this.truc = true
                }
            }

            if (this.truc == true){
                this.animStart.anims.play('animationFinGrotteIdle', true);
            }

            this.barreDeVie()
    } 

    jumpAuto(player,build){
        if (this.blockCaisse == false){
            if (player.body.blocked.down  && (player.body.blocked.right || player.body.blocked.left)){
                player.setVelocityY(-270)
            }
        }
    }

        startAnimFin(caisse,collideCaisseFinJeu){

            collideCaisseFinJeu.destroy()
            caisse.destroy()

            this.entreeFinJeu.alpha = 0

            this.animStart.alpha = 1
            this.startAnimOuvertureGrotte = true

            this.collidePorteGrotte.setVelocityY(-50)
        }

        takeHp(player,vieAPrendre){
            this.pointDeVie++
            vieAPrendre.destroy()
        }

        mouvementJoueurRondin(player,rondinBois){
        this.player.setVelocityX(40)
        }

        mouvementJoueurPlateforme(player,blocTest){
            this.surRondin = true
            if (blocTest.body.velocity.x > 0){
                this.player.setVelocityX(70)
            }
            if (blocTest.body.velocity.x < 0){
                this.player.setVelocityX(-70)
            }
        }

        destroyBalle(balle,build){
            balle.destroy()
        }

        spawnRondin(rondinBois,rondinCreate){
            if (this.testRondins == true) {
            this.spawnRondinPossible = true
            }
        }

        despawnRondin(rondinBois,zoneEnnemi) {
            rondinBois.destroy()
        }

        destructionRondins(rondinBois,build){
            rondinBois.y += 2
            rondinBois.setVelocityX(0)
            rondinBois.setVelocityY(30)
        }

        respawnJoueur(){
            this.player.x = this.saveXMort
            this.player.y = this.saveYMort - 10

            this.pointDeVie = this.pointDeVieStock - 2
            this.invulnérable = false
        }

        savePoint(player,checkPoint){
            this.saveXMort = checkPoint.x
            this.saveYMort = checkPoint.y
        }

        toucheEnnemi(lasso,ennemi){
            lasso.destroy()

            this.attaque = false
            this.animNormal = true

            if (ennemi.x < this.player.x){
                ennemi.setVelocityX(100)
            }
            if (ennemi.x > this.player.x){
                ennemi.setVelocityX(-100)
            }

            this.attaquePossible = true
            this.deplacementEnnemi = true
        }

        degatEnnemi(player,ennemi){
            if(this.invulnérable == false){
                this.pointDeVie --
                this.cameras.main.shake(150, 0.004);
                this.invulnérable = true
                player.setTint(0xff0000)
            }
        }

        takeLasso(play,lasso){
            lasso.destroy()
            this.lassoUnlcok = true
        }

        grimperLianes(player,lianesAGrimper){
            if (this.accrochePossibleLianeAGrimper == true){ 
                player.x = lianesAGrimper.x - 15
                this.dialogue = true
                player.setVelocityX(0)
                this.resetGraviteLeft = false
                this.resetGraviteRight = false
            }
        }

        stopCaisseVelocite0(caisse1,caisse2){
            caisse1.setVelocityX(0)
            caisse2.setVelocityX(0)
        }

        bougerCaisse(lasso,caisse){
            this.blockCaisse = false
            lasso.destroy()

            this.attaque = false
            this.animNormal = true

            if (caisse.x < this.player.x){
                caisse.setVelocityX(100)
            }
            if (caisse.x > this.player.x){
                caisse.setVelocityX(-100)
            }

            this.attaquePossible = true
            this.deplacementCaisse = true
        }

        stopCaisse(player,caisse){
            if (this.torcheActive == false){
                this.compteurStopAnimCaisse = 10
                this.blockCaisse = true
                if (this.player.body.blocked.left){
                    caisse.setVelocityX(-55)
                }
                if (this.player.body.blocked.right){
                    caisse.setVelocityX(55)
                }

                this.animNormal = false
                this.animPousseCaisse = true

                this.compteurDeplacementLassoCaisse = this.compteurDeplacementLassoCaisseStock
                this.deplacementCaisse = false
            }
        }

        accrocheJoueur1Fonction(player,accroche){
            if (this.accrochePossible1 == true){ 
                this.accroche1 = true
                this.accrocheTest = accroche
            }
        }

        testAnimLianes(player,lianeTempo){
            this.animLianeSpecial = true
            this.lianeTemporaire = lianeTempo
            this.idxDebutAnimLiane = lianeTempo.anims.currentFrame.index


            this.apparaitreAccroche = true
        }

        takeWeapon(play,arme){
            arme.destroy()
            this.armeUnlock = true
            this.pouvoirTirer = true
        }

        tirer(player) {
            if (this.pouvoirTirer == true){
                this.tempsAvantTirer = true
                if (player.direction == 'left') { 
                    this.directionTir = -1; 
                    this.imgBalle = 'balleLeft'
                    this.distanceTir = -6
                } 
                else if (player.direction == 'right'){ 
                    this.directionTir = 1 
                    this.imgBalle = 'balleRight'
                    this.distanceTir = 30
                }
                
                this.balle1 = this.balles.create(player.x + (this.distanceTir * this.directionTir), player.y + 16, this.imgBalle).setScale(0.4);
                this.balle1.setVelocity(900 * this.directionTir, 0);  
            }  
        }  

        prendreTorche(player,torche){
            torche.destroy()
            this.torcheDebloque = true
        }

        hitGun(balle,enemi){
            balle.destroy()
            enemi.destroy()
        }

        allumeTorche(play,torchesAAllumer){
            if (this.torcheActive == true){
                if (this.interagir){
                    torchesAAllumer.destroy()
                    this.torchesAllumer.create(torchesAAllumer.x, torchesAAllumer.y, 'torchesAllumer').setOrigin(0);
                    this.nbrTorcheAllume ++
                }

                if (this.nbrTorcheAllume == 1){
                    this.temple.setTexture('temple1')
                }
                if (this.nbrTorcheAllume == 2){
                    this.temple.setTexture('temple2')
                }
                if (this.nbrTorcheAllume == 3){
                    this.temple.setTexture('temple3')
                }
                if (this.nbrTorcheAllume == 4){
                    this.temple.setTexture('temple4')
                    this.ouvrirTemplePossible = true
                }
            }
        }

        murOuvert(player,murAOuvrir){
            if (this.ouvrirTemplePossible == true && this.interagir){
                this.ouvrirTemplePossible = false
                murAOuvrir.setVelocityY(-20)
                this.murStop = true
                this.cameras.main.shake(5000, 0.0005);
                this.nbrTorcheAllume = 0
            }
        }

        
        barreDeVie (){
            if (this.pointDeVie == 4){
                this.vieEcran.setTexture('hp4')
            }
            if (this.pointDeVie == 3){
                this.vieEcran.setTexture('hp3')
            }
            if (this.pointDeVie == 2){
                this.vieEcran.setTexture('hp2')
            }
            if (this.pointDeVie == 1){
                this.vieEcran.setTexture('hp1')
            }
        }

        /////////////////////////////////////////
        //////////changements de scènes//////////
        /////////////////////////////////////////


        goTemple(player,entreTemple){
            if (this.interagir && this.entreeTemplePossible == true) {
                this.ouvrirTemplePossible = true
                this.entreeTemplePossible = false
                this.templeOuvertTorcheAllumer = true   
                this.scene.start("sceneTemple", {
                    pointDeVie:this.pointDeVie,
                    spawnXSortieScene: this.player.x,
                    spawnYSortieScene: this.player.y,
                    speedLeft: this.speedLeft,
                    speedRight: this.speedRight,
                    dialogue: this.dialogue,
                    speed: this.speed,
                    speedSaut: this.speedSaut,
                    doubleSautLeft: this.doubleSautLeft,
                    compteurDoubleSautLeft: this.compteurDoubleSautLeft,
                    doubleSautRight: this.doubleSautRight,
                    compteurDoubleSautRight: this.compteurDoubleSautRight,
                    doubleSautLeftPossible: this.doubleSautLeftPossible,
                    doubleSautRightPossible: this.doubleSautRightPossible,
                    resetGraviteLeft: this.resetGraviteLeft,
                    resetGraviteRight: this.resetGraviteRight,
                    animNormal: this.animNormal,
                    animJump: this.animJump,
                    attaque: this.attaque,
                    attaquePossible: this.attaquePossible,
                    doubleJumpActif: this.doubleJumpActif,
                    torcheDebloque: this.torcheDebloque,
                    torcheActive: this.torcheActive,
                    pouvoirTirer: this.pouvoirTirer,
                    tempsAvantTirer: this.tempsAvantTirer,
                    animTorche: this.animTorche,
                    ouvrirTemplePossible: this.ouvrirTemplePossible ,
                    entreeTemplePossible: this.entreeTemplePossible,
                    templeOuvertTorcheAllumer: this.templeOuvertTorcheAllumer,
                    compteurDeplacementLasso: this.compteurDeplacementLasso,
                    compteurDeplacementLassoCaisse: this.compteurDeplacementLassoCaisse,
                    deplacementEnnemi: this.deplacementEnnemi,
                    deplacementCaisse: this.deplacementCaisse,
                    blockCaisse: this.blockCaisse,
                    animPousseCaisse: this.animPousseCaisse,
                    lassoUnlcok: this.lassoUnlcok,
                    invulnérable: this.invulnérable,
                    compteurInvunlerable: this.compteurInvunlerable,
                    saveXMort: this.saveXMort,
                    saveYMort: this.saveYMort,
                    animAccrocheMur: this.animAccrocheMur
                })
            }
        }
    }
        