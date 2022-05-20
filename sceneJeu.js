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
            this.templeOuvertTorcheAllumer = data.templeOuvertTorcheAllumer
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
            ///////////////////////

            this.load.spritesheet('animLasso','assets/animLasso.png',
            { frameWidth: 96, frameHeight: 32 });

            this.load.image("ennemi", "assets/ennemi.png");

            this.load.image("torche", "assets/objets/torche.png");

            this.load.image("invisible", "assets/invisible.png");

            this.load.image("balleLeft", "assets/objets/balleLeft.png");
            this.load.image("balleRight", "assets/objets/balleRight.png");
            this.load.image("arme", "assets/objets/arme.png");

            this.load.image("torchesAAllumer", "assets/objets/torchesAAllumer.png");
            this.load.image("torchesAllumer", "assets/objets/torchesAllumer.png");

            this.load.image("murAOuvrir", "assets/objets/murAOuvrir.png");

            this.load.image("mur1", "assets/objets/mur1.png");
            this.load.image("mur2", "assets/objets/mur2.png");
            this.load.image("mur3", "assets/objets/mur3.png");

            this.load.image("lianes", "assets/lianes.png");

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

            this.lights.enable();
            this.lights.setAmbientColor(0xFF0000);
            this.light = this.lights.addLight(400, 300, 100).setIntensity(0);

            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////

            this.player = this.physics.add.sprite(this.spawnXSortieScene, this.spawnYSortieScene, 'perso').setOrigin(0).setDepth(9)
            this.player.body.setSize(16,32,true)

            const devant = carte.createLayer(
                "devant",
                tileset
                ).setDepth(10)
            
            this.physics.add.collider(this.player, build);
            build.setCollisionByProperty({ estSolide: true });

            this.player.setCollideWorldBounds(true);

            this.cameras.main.zoom = 1
            this.cameras.main.startFollow(this.player); 
            this.physics.world.setBounds(0, 0, 6400, 1920);
            this.cameras.main.setBounds(0, 0, 6400, 1920);

            this.nbrTorcheAllume = 0

            this.murStop = false
            this.compteurMurStop = 180

            this.accroche1 = false

            this.accrochePossible1 = true
            this.compteurAccrochePossible1 = 50

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
                frameRate: 3,
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
                frameRate: 12,
                repeat: -1
            });

            this.anims.create({
                key: 'animLassoLeft',
                frames: this.anims.generateFrameNumbers('animLasso', {start:21,end:11}),
                frameRate: 12,
                repeat: -1
            });

            this.enemis = this.physics.add.group({
            });      

            carte.getObjectLayer('ennemi').objects.forEach((enemis) => {
                this.enemi = this.enemis.create(enemis.x, enemis.y, 'ennemi').setOrigin(0);
                this.enemi.setPushable(false)
                this.enemi.body.setSize(22,32)
            });

            this.physics.add.collider(this.enemis,build)
            this.physics.add.collider(this.player,this.enemis,this.stopEnnemi,null,this)

            ///////////////////////////////////////////////////////////////

            this.torche = this.physics.add.staticGroup({
            });      

            carte.getObjectLayer('torche').objects.forEach((torche) => {
                this.torche = this.torche.create(torche.x, torche.y, 'torche').setOrigin(0);
            });

            this.physics.add.overlap(this.player,this.torche,this.prendreTorche,null,this)

            /////////////////////////////

            this.balles = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })

            this.physics.add.overlap(this.balles,this.enemis,this.hitGun,null,this)

            /////////////////////////////

            carte.getObjectLayer('arme').objects.forEach((arme) => {
                this.arme = this.physics.add.image(arme.x, arme.y, 'arme').setOrigin(0);
                this.arme.body.setAllowGravity(false)
            });

            this.physics.add.overlap(this.player,this.arme,this.takeWeapon,null,this)

            ///////////////////////////////////////////////////////////////

            this.torchesAAllumer = this.physics.add.staticGroup({
            }); 
            this.torchesAllumer = this.physics.add.staticGroup({
            });      

            carte.getObjectLayer('torchesAAllumer').objects.forEach((torchesAAllumer) => {
                this.torchesAAllumer1 = this.torchesAAllumer.create(torchesAAllumer.x, torchesAAllumer.y, 'torchesAAllumer').setOrigin(0);
                this.torchesAAllumer1.setPushable(false)
                this.torchesAAllumer1.setInteractive()
                this.torchesAAllumer1.body.setSize(30,32)
                this.torchesAAllumer1.setOffset(17,16)
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

            /////////////////////////////
            /////////////////////////////
            /////////////////////////////

            this.entreTemple = this.physics.add.image(1824, 1760, 'invisible').setOrigin(0)
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
                a: Phaser.Input.Keyboard.KeyCodes.A,
                c: Phaser.Input.Keyboard.KeyCodes.C,
                v: Phaser.Input.Keyboard.KeyCodes.V,
                f: Phaser.Input.Keyboard.KeyCodes.F,
                e: Phaser.Input.Keyboard.KeyCodes.E
            });

            /////////////////////// /////////////////////// /////////////////////// ///////////////////////
            /////////////////////// /////////////////// LIANES //////////////////// ///////////////////////
            /////////////////////// /////////////////////// /////////////////////// ///////////////////////

            this.follower1 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path1 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes1').objects.forEach((lianes1) => {this.liane1X = lianes1.x,this.liane1Y = lianes1.y,this.add.image(lianes1.x,lianes1.y + 32,'lianes').setDepth(7)});
            this.path1.add(new Phaser.Curves.Ellipse(this.liane1X, this.liane1Y, 125));
            this.tweens.add({targets: this.follower1,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur1 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur1.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur1,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path2 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes2').objects.forEach((lianes2) => {this.lianes2X = lianes2.x,this.lianes2Y = lianes2.y});
            this.path2.add(new Phaser.Curves.Ellipse(this.lianes2X, this.lianes2Y, 125));
            this.tweens.add({targets: this.follower2,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur2 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur2.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur2,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower3 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path3 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes3').objects.forEach((lianes3) => {this.lianes3X = lianes3.x,this.lianes3Y = lianes3.y});
            this.path3.add(new Phaser.Curves.Ellipse(this.lianes3X, this.lianes3Y, 125));
            this.tweens.add({targets: this.follower3,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur3 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur3.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur3,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower4 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path4 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes4').objects.forEach((lianes4) => {this.lianes4X = lianes4.x,this.lianes4Y = lianes4.y});
            this.path4.add(new Phaser.Curves.Ellipse(this.lianes4X, this.lianes4Y, 125));
            this.tweens.add({targets: this.follower4,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur4 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur4.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur4,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower5 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path5 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes5').objects.forEach((lianes5) => {this.lianes5X = lianes5.x,this.lianes5Y = lianes5.y});
            this.path5.add(new Phaser.Curves.Ellipse(this.lianes5X, this.lianes5Y, 125));
            this.tweens.add({targets: this.follower5,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur5 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur5.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur5,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower6 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path6 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes6').objects.forEach((lianes6) => {this.lianes6X = lianes6.x,this.lianes6Y = lianes6.y});
            this.path6.add(new Phaser.Curves.Ellipse(this.lianes6X, this.lianes6Y, 125));
            this.tweens.add({targets: this.follower6,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur6 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur6.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur6,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower7 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path7 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes7').objects.forEach((lianes7) => {this.lianes7X = lianes7.x,this.lianes7Y = lianes7.y});
            this.path7.add(new Phaser.Curves.Ellipse(this.lianes7X, this.lianes7Y, 125));
            this.tweens.add({targets: this.follower7,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur7 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur7.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur7,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower8 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path8 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes8').objects.forEach((lianes8) => {this.lianes8X = lianes8.x,this.lianes8Y = lianes8.y});
            this.path8.add(new Phaser.Curves.Ellipse(this.lianes8X, this.lianes8Y, 125));
            this.tweens.add({targets: this.follower8,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur8 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur8.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur8,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower9 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path9 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes9').objects.forEach((lianes9) => {this.lianes9X = lianes9.x,this.lianes9Y = lianes9.y});
            this.path9.add(new Phaser.Curves.Ellipse(this.lianes9X, this.lianes9Y, 125));
            this.tweens.add({targets: this.follower9,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur9 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur9.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur9,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
            this.follower10 = { t: 0, vec: new Phaser.Math.Vector2() };
            this.path10 = new Phaser.Curves.Path();
            carte.getObjectLayer('lianes10').objects.forEach((lianes10) => {this.lianes10X = lianes10.x,this.lianes10Y = lianes10.y});
            this.path10.add(new Phaser.Curves.Ellipse(this.lianes10X, this.lianes10Y, 125));
            this.tweens.add({targets: this.follower10,t: 1,ease: 'Sine.easeInOut',duration: 1000,yoyo: true,repeat: -1 });
            this.accrocheJoueur10 = this.physics.add.image(0,0,"invisible")
            this.accrocheJoueur10.body.setAllowGravity(false)
            this.physics.add.overlap(this.player,this.accrocheJoueur10,this.accrocheJoueur1Fonction,null,this)
            ////////////////////////////////////////
    
        }

        update(){
            this.accrocheJoueur1.x = this.follower1.vec.x
            this.accrocheJoueur1.y = this.follower1.vec.y
            this.path1.getPoint(this.follower1.t/2, this.follower1.vec);
            ///
            this.accrocheJoueur2.x = this.follower2.vec.x
            this.accrocheJoueur2.y = this.follower2.vec.y
            this.path2.getPoint(this.follower2.t/2, this.follower2.vec);
            ///
            this.accrocheJoueur3.x = this.follower3.vec.x
            this.accrocheJoueur3.y = this.follower3.vec.y
            this.path3.getPoint(this.follower3.t/2, this.follower3.vec);
            ///
            this.accrocheJoueur4.x = this.follower4.vec.x
            this.accrocheJoueur4.y = this.follower4.vec.y
            this.path4.getPoint(this.follower4.t/2, this.follower4.vec);
            ///
            this.accrocheJoueur5.x = this.follower5.vec.x
            this.accrocheJoueur5.y = this.follower5.vec.y
            this.path5.getPoint(this.follower5.t/2, this.follower5.vec);
            ///
            this.accrocheJoueur6.x = this.follower6.vec.x
            this.accrocheJoueur6.y = this.follower6.vec.y
            this.path6.getPoint(this.follower6.t/2, this.follower6.vec);
            ///
            this.accrocheJoueur7.x = this.follower7.vec.x
            this.accrocheJoueur7.y = this.follower7.vec.y
            this.path7.getPoint(this.follower7.t/2, this.follower7.vec);
            ///
            this.accrocheJoueur8.x = this.follower8.vec.x
            this.accrocheJoueur8.y = this.follower8.vec.y
            this.path8.getPoint(this.follower8.t/2, this.follower8.vec);
            ///
            this.accrocheJoueur9.x = this.follower9.vec.x
            this.accrocheJoueur9.y = this.follower9.vec.y
            this.path9.getPoint(this.follower9.t/2, this.follower9.vec);
            ///
            this.accrocheJoueur10.x = this.follower10.vec.x
            this.accrocheJoueur10.y = this.follower10.vec.y
            this.path10.getPoint(this.follower10.t/2, this.follower10.vec);
            ///
        

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


            if (this.dialogue == false){

                this.shot = Phaser.Input.Keyboard.JustDown(this.keys.e)
                this.attaqueTouche = Phaser.Input.Keyboard.JustDown(this.keys.a)
                this.lightTouche = Phaser.Input.Keyboard.JustDown(this.keys.c)
                this.interagir = Phaser.Input.Keyboard.JustDown(this.keys.f)
                this.noLightTouche = Phaser.Input.Keyboard.JustDown(this.keys.v)
                this.moveUp = Phaser.Input.Keyboard.JustDown(this.keys.space)
                this.moveLeft = (this.keys.q.isDown )  
                this.moveRight = (this.keys.d.isDown ) 
        
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

                this.physics.add.overlap(this.lasso,this.enemis,this.toucheEnnemi,null,this)
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

                    if (this.resetGraviteLeft == true ){this.speedRight = 100}
                    else{this.speedRight = this.speed}

                    if (this.resetGraviteRight == true){this.speedLeft = 100}
                    else{this.speedLeft = this.speed}

                    if (this.player.body.blocked.down){
                        this.doubleSautRightPossible = true
                        this.doubleSautLeftPossible = true
                        this.resetGraviteLeft = false
                        this.resetGraviteRight = false

                        this.animNormal = true
                        this.animJump = false
                        this.doubleJumpActif = false
                    }      
                    else{
                        this.animNormal = false
                        this.animJump = true
                        this.doubleJumpActif = true
                    }      
                }       

            if (this.player.body.blocked.left ||this.player.body.blocked.right ) {
                this.player.setVelocityY(20); 
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
                this.player.y = this.accrocheTest.y - 14
                this.player.body.setAllowGravity(false)
                if (this.moveUp){
                    this.player.setVelocityY(-this.speedSaut)
                    this.accrochePossible1 = false
                    this.accroche1 = false
                    this.player.body.setAllowGravity(true)
                }
            }
            if (this.accrochePossible1 == false){
                this.compteurAccrochePossible1 -= 1
                if (this.compteurAccrochePossible1 == 0){
                    this.compteurAccrochePossible1 = 50
                    this.accrochePossible1 = true
                }
            }               
        }

        accrocheJoueur1Fonction(player,accroche){
            if (this.accrochePossible1 == true){ 
                this.accroche1 = true
                this.accrocheTest = accroche
            }
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
        }

        stopEnnemi(play,ennemi){
            ennemi.setVelocityX(0)
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
                    templeOuvertTorcheAllumer: this.templeOuvertTorcheAllumer
                })
            }
        }
    }
        