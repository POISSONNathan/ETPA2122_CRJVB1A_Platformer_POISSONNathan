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
            ///////////////////////

            this.load.spritesheet('animLasso','assets/animLasso.png',
            { frameWidth: 96, frameHeight: 32 });

            this.load.image("enemisVolant", "assets/enemisVolant.png");

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

            this.load.image("mur1", "assets/objets/mur1.png");
            this.load.image("mur2", "assets/objets/mur2.png");
            this.load.image("mur3", "assets/objets/mur3.png");

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

            this.load.image("checkPoint", "assets/objets/checkPoint.png");

            this.load.spritesheet('enemisMur','assets/enemisMur.png',
            { frameWidth: 11, frameHeight: 32 });

            this.load.spritesheet('rondinsBois','assets/objets/rondinsBois.png',
            { frameWidth:96, frameHeight: 21 });
            
            this.load.spritesheet('animEau','assets/animEau.png',
            { frameWidth: 64, frameHeight: 32 });


        }

        create(){
            const carte = this.make.tilemap({ key: 'carte' });

            const tileset = carte.addTilesetImage(
                    "tuilesJeu",
                    "Phaser_tuilesdejeu"
                    );  

            const background = carte.createLayer(
                    "background",
                    tileset
                        );

            const build = carte.createLayer(
                    "build",
                    tileset
                    ).setDepth(8)

            const zoneEnnemi = carte.createLayer(
                    "zoneEnnemi",
                    tileset
                    )

            const eau = carte.createLayer(
                    "eau",
                    tileset
                    ).setDepth(100)

            this.lights.enable();
            this.lights.setAmbientColor(0xFF0000);
            this.light = this.lights.addLight(400, 300, 100).setIntensity(0);

            this.pointDeVieStock = this.pointDeVie

            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////

            if (this.sortieTemple == true){
                carte.getObjectLayer('spawnJoueurSortieTemple').objects.forEach((spawnJoueurSortieTemple) => {
                    this.spawnXSortieScene = spawnJoueurSortieTemple.x, 
                    this.spawnYSortieScene =  spawnJoueurSortieTemple.y
                });
            }

            this.player = this.physics.add.sprite(this.spawnXSortieScene, this.spawnYSortieScene, 'perso').setOrigin(0).setDepth(9)
            this.player.body.setSize(16,32,true)

            const devant = carte.createLayer(
                "devant",
                tileset
                ).setDepth(10)
            
            zoneEnnemi.setCollisionByProperty({ solideEnnemi: true });

            this.physics.add.collider(this.player, build);
            build.setCollisionByProperty({ estSolide: true });

            this.physics.add.collider(this.player, eau,this.respawnJoueur,null,this);
            eau.setCollisionByProperty({ eauKill: true });

            this.player.setCollideWorldBounds(true);

            this.cameras.main.zoom = 2.5
            this.cameras.main.startFollow(this.player); 
            this.physics.world.setBounds(0, 0, 6400, 1920);
            this.cameras.main.setBounds(0, 0, 6400, 1920);

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

            this.compteurSpawnRondinPossible = 200
            this.test = true


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

            ///////////////////////////////////////////////////////////////  
            ///////////////////////////////////////////////////////////////  ENNEMIS
            ///////////////////////////////////////////////////////////////  

            this.enemisVolant = this.physics.add.group({
            });      

            carte.getObjectLayer('enemisVolant').objects.forEach((enemisVolant) => {
                this.enemiVolant = this.enemisVolant.create(enemisVolant.x, enemisVolant.y, 'enemisVolant').setOrigin(0);
                this.enemiVolant.setPushable(false)
                this.enemiVolant.setBounce(1);
                this.enemiVolant.body.setAllowGravity(false)
            });

            this.enemisVolant.setVelocityY(-60)
            this.enemisVolant.setVelocityX(-60)
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

            ///////////////////////////////////////////////////////////////  
            ///////////////////////////////////////////////////////////////  
            ///////////////////////////////////////////////////////////////  


            carte.getObjectLayer('torche').objects.forEach((torche) => {
                this.torche = this.physics.add.image(torche.x, torche.y, 'torche').setOrigin(0);
                this.torche.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.torche,this.prendreTorche,null,this)

            /////////////////////////////

            this.balles = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })

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
                this.lasso = this.physics.add.sprite(lasso.x + 3, lasso.y + 3 , 'lasso').setOrigin(0).setScale(0.8)
                this.lasso.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.lasso,this.takeLasso,null,this)


            ///////////////////////////////////////////////////////////////

            this.torchesAAllumer = this.physics.add.staticGroup({
            }); 
            this.torchesAllumer = this.physics.add.staticGroup({
            });      

            carte.getObjectLayer('torchesAAllumer').objects.forEach((torchesAAllumer) => {
                this.torchesAAllumer1 = this.torchesAAllumer.create(torchesAAllumer.x, torchesAAllumer.y, 'torchesAAllumer').setOrigin(0);
                this.torchesAAllumer1.setPushable(false)
                this.torchesAAllumer1.setInteractive()
                this.torchesAAllumer1.body.setSize(20,32)
                this.torchesAAllumer1.setOffset(22,16)
            });

            this.physics.add.overlap(this.player,this.torchesAAllumer,this.allumeTorche,null,this)

            ////////////////////////////////////////////////

            carte.getObjectLayer('murAOuvrir').objects.forEach((murAOuvrir) => {
                this.murAOuvrir = this.physics.add.image(murAOuvrir.x, murAOuvrir.y, 'murAOuvrir').setOrigin(0);
                this.murAOuvrir.setPushable(false)
                this.murAOuvrir.body.setAllowGravity(false)
                this.murAOuvrir.setInteractive()

                this.murAOuvrir.body.setSize(64,96)
                this.murAOuvrir.setOffset(-16,0)
            });

            this.physics.add.overlap(this.player,this.murAOuvrir,this.murOuvert,null,this)

            ///////////////////////////////////////////////

            this.caisses = this.physics.add.group({
                immovable: true,
            })

            carte.getObjectLayer('caissesDeplacables').objects.forEach((caisses) => {
                this.caisse = this.caisses.create(caisses.x + 16,caisses.y + 16,'caisses').setDepth(7)
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
            });

            this.physics.add.overlap(this.rondinsBois,this.rondinCreate,this.spawnRondin,null,this)
            this.physics.add.collider(zoneEnnemi,this.rondinsBois,this.despawnRondin,null,this)
            this.physics.add.collider(build,this.rondinsBois,this.destructionRondins,null,this)
            this.physics.add.collider(this.player,this.rondinsBois,this.mouvementJoueurRondins,null,this)

            this.eau = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })
            
            carte.getObjectLayer('eauAnim').objects.forEach((eauAnim) => {
                this.eau.create(eauAnim.x + 32,eauAnim.y - 16,'animEau').setDepth(7)
            });

            /////////////////////////////
            /////////////////////////////
            /////////////////////////////


            this.entreTemple = this.physics.add.image(this.murAOuvrir.x, this.murAOuvrir.y+64, 'invisible').setOrigin(0)
            this.entreTemple.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.entreTemple,this.goTemple,null,this)

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
        
        this.inventaireEcran = this.add.image(838,250,'interfaceArmeObj0').setScale(0.7)
        this.inventaireEcran.setScrollFactor(0)
        this.inventaireEcran.setDepth(100)
        this.inventaireEcran.setInteractive()

        this.vieTexte = this.add.text(400, 221, this.pointDeVie, {fontSize:30,color:"#000000" });
        this.vieTexte.setDepth(100)
        this.vieTexte.setScale(0.7);
        this.vieTexte.setScrollFactor(0);


        }

        update(time, delta){
            super.update(time, delta);

            if ( this.pouvoirTirer == false){
            this.arme.anims.play('animArme', true);
            }

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

        
            if (this.player.direction == 'left'){
                this.player.setOffset(8,0)
            }
            if (this.player.direction == 'right'){
                this.player.setOffset(8,0)
            }

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
                if (this.attaqueTouche && this.lassoUnlcok == true){ 
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

            if  (this.attaque == true){
                this.lasso.y = this.player.y

                if (this.test == true ){
                    this.player.setVelocityX(this.speedRight/3);
                    this.lasso.anims.play('animLassoRight', true);
                    this.player.anims.play(this.frameRight, true);
                    this.test = false
                }
                
                if (this.moveLeft){ 
                    this.player.direction = 'left';
                    this.player.setVelocityX(-this.speedLeft/3); 
                    this.lasso.anims.play('animLassoLeft', true);
                    this.player.anims.play(this.frameLeft, true);

                }
                
                else if (this.moveRight){ 
                    this.player.direction = 'right';
                    this.player.setVelocityX(this.speedRight/2);
                    this.lasso.anims.play('animLassoRight', true);
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
                    this.player.setVelocityX(0); 
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
                        this.player.setVelocityX(-200);
                        this.player.setVelocityY(-this.speedSaut);
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
                        this.player.setVelocityX(200);
                        this.player.setVelocityY(-this.speedSaut);
                        if(this.compteurDoubleSautRight == 0){
                            this.compteurDoubleSautRight = 10
                            this.doubleSautRight = false
                        }
                    }

                    if(this.invulnérable == false){
                    if (this.resetGraviteLeft == true ){this.speedRight = 100}
                    else{this.speedRight = this.speed}

                    if (this.resetGraviteRight == true){this.speedLeft = 100}
                    else{this.speedLeft = this.speed}
                    }

                    if (this.player.body.blocked.down){
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

            if (this.player.body.blocked.left ||this.player.body.blocked.right ) {
                this.player.setVelocityY(20); 
                this.animAccrocheMur = true
                this.animJump = false
            }
            else{
                this.animAccrocheMur = false
            }

            }

            if (this.murStop == true){
                this.compteurMurStop --
                if (this.compteurMurStop == 0){
                    this.murAOuvrir.setVelocityY(0)
                    this.entreeTemplePossible = true
                }
            }

            if (this.templeOuvertTorcheAllumer == true){
                this.torchesAAllumer.children.iterate((child) => {
                    child.setTexture('torchesAllumer');
                });
                this.murAOuvrir.setTexture('mur3')
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
                    this.idxDebutAnimLianeStop = this.lianeTemporaire.anims.currentFrame.index
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
                    child.anims.play({ key: 'animLianes', startFrame: this.idxDebutAnimLianeStop }, true);
                });
            }
            if (this.animLianeSpecial == true && this.accroche1 == true){
                this.lianes.children.iterate((child) => {
                    this.idxDebutAnimLiane = child.anims.currentFrame.index
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
                        this.animPousseCaisse = false
                    }
                    if (child.x > this.player.x + 40 ){
                        child.setVelocityX(0)
                        this.animPousseCaisse = false
                    }
                });
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
                if(this.invulnérable == false && this.distEnemisVolant < 150){
                    this.physics.moveToObject(child, child.scene.player, 60)
                }
            },this);

           if(this.invulnérable == true){
            this.compteurInvunlerable -=1 ;
                if(this.compteurInvunlerable == 0){
                    this.compteurInvunlerable = 100;
                    this.speedSaut *= 1.5
                    this.invulnérable = false ;
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
                    this.compteurSpawnRondinPossible = 200
                    this.murAOuvrir.setVelocityY(0)
                    this.spawnRondinPossible = false
                    this.test = false
                }
            }

            if (this.test == false){
                this.rondinsBois.create(this.spawnRondinX + 16 ,this.spawnRondinY + 10,'rondinsBois')
                this.rondinsBois.setVelocityY(-10)
                this.test = true
            }

            if (this.pointDeVie == 0){
                this.respawnJoueur()
            }
    } 

        spawnRondin(rondinBois,rondinCreate){
            if (this.test == true) {
            this.spawnRondinPossible = true
            }
        }

        despawnRondin(rondinBois,zoneEnnemi) {
            rondinBois.destroy()
        }

        destructionRondins(rondinBois,build){
            rondinBois.setVelocityX(0)
            rondinBois.setVelocityY(30)
        }

        mouvementJoueurRondins(player,rondinBois){
            if (rondinBois.body.velocity.x > 0){
                player.body.velocity.x += rondinBois.body.velocity.x + 70
            }
            if (rondinBois.body.velocity.x < 0){
                player.body.velocity.x += rondinBois.body.velocity.x - 70
            }
        }

        respawnJoueur(){
            this.player.x = this.saveXMort
            this.player.y = this.saveYMort

            this.pointDeVie = this.pointDeVieStock
            this.vieTexte.setText(this.pointDeVie)
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

        degatEnnemi(play,ennemi){
            if(this.invulnérable == false){
                this.pointDeVie --
                this.vieTexte.setText(this.pointDeVie)
                this.cameras.main.shake(150, 0.004);
                this.invulnérable = true

                this.speedLeft /= 1.5
                this.speedRight /= 1.5
                if (this.pointDeVie > 0){
                this.speedSaut /= 1.5
                }
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

            this.apparaitreAccroche = true
        }

        takeWeapon(play,arme){
            arme.destroy()
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
                    this.murAOuvrir.setTexture('mur1')
                }
                if (this.nbrTorcheAllume == 2){
                    this.murAOuvrir.setTexture('mur2')
                }
                if (this.nbrTorcheAllume == 3){
                    this.murAOuvrir.setTexture('mur3')
                    this.ouvrirTemplePossible = true
                }
            }
        }

        murOuvert(player,murAOuvrir){
            if (this.ouvrirTemplePossible == true && this.interagir){
                this.ouvrirTemplePossible = false
                murAOuvrir.setVelocityY(-11)
                this.murStop = true
                this.cameras.main.shake(3000, 0.0007);
                this.nbrTorcheAllume = 0
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
        