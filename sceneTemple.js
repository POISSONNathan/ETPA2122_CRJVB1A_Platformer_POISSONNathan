class sceneTemple extends Phaser.Scene{
    constructor(){
    super("sceneTemple");
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

    this.load.tilemapTiledJSON("carte2", "mapTemple.json");  

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

    this.load.image("invisible", "assets/invisible.png");

    this.load.image("torche", "assets/objets/torche.png");


}

create(){
    const carte2 = this.make.tilemap({ key: 'carte2' });

    const tileset = carte2.addTilesetImage(
            "tuilesJeu",
            "Phaser_tuilesdejeu"
            );  

    const backgroundGrotte = carte2.createLayer(
            "backgroundGrotte",
            tileset
            ).setPipeline('Light2D').setAlpha(0.05);

    const buildGrotte = carte2.createLayer(
            "buildGrotte",
            tileset
            ).setPipeline('Light2D').setAlpha(0.05);

           


    this.lights.enable();
    this.lights.setAmbientColor(0xFF0000);
    this.light = this.lights.addLight(400, 300, 400).setIntensity(0);

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    this.player = this.physics.add.sprite(64,1770, 'perso').setOrigin(0)
    this.player.body.setSize(16,32)

    this.physics.add.collider(this.player, buildGrotte);
    buildGrotte.setCollisionByProperty({ estSolide: true });

    this.player.setCollideWorldBounds(true);

    this.cameras.main.zoom = 2.5
    this.cameras.main.startFollow(this.player); 
    this.physics.world.setBounds(0, 0, 6400, 2880);
    this.cameras.main.setBounds(0, 0, 6400, 2880);

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
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
        key: 'animLassoLeft',
        frames: this.anims.generateFrameNumbers('animLasso', {start:21,end:11}),
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

    this.enemis = this.physics.add.group({
    });      

    carte2.getObjectLayer('ennemi').objects.forEach((enemis) => {
        this.enemi = this.enemis.create(enemis.x, enemis.y, 'ennemi').setOrigin(0);
        this.enemi.setPushable(false)
        this.enemi.body.setSize(22,32)
    });

    this.physics.add.collider(this.enemis,buildGrotte)
    this.physics.add.collider(this.player,this.enemis,this.stopEnnemi,null,this)

    /////////////////////////////

    this.balles = this.physics.add.group({
        immovable: true,
        allowGravity: false
    })

    this.physics.add.overlap(this.balles,this.enemis,this.hitGun,null,this)

    ////////////////////////

    this.torches = this.physics.add.group({
    });   
       
    carte2.getObjectLayer('torches').objects.forEach((torches) => {
        this.torche = this.torches.create(torches.x, torches.y, 'torches').setOrigin(0);
        this.torche.setPushable(false)
        this.torche.body.setSize(22,32)
    });

   

    

    ///////////////////////////////////////////////////////////////

    this.retourAvantTemple = this.physics.add.image(64, 1760, 'invisible').setOrigin(0)
    this.retourAvantTemple.body.setAllowGravity(false)
    this.physics.add.overlap(this.player,this.retourAvantTemple,this.goOutTemple,null,this)


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
}

update(){

    
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
        this.light.setIntensity(16)
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
        this.player.alpha = 0.1
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
        this.lasso.alpha = 0.1

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

            if (this.resetGraviteLeft == true){this.speedRight = 100}
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

        if (this.shot){
            this.tirer(this.player);
        }
    }
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

/////////////////////////////////////////
//////////changements de scènes//////////
/////////////////////////////////////////


goOutTemple(player,retourAvantTemple){
    if (this.interagir) { 
        this.scene.start("sceneJeu", {
            pointDeVie:this.pointDeVie,
            spawnXSortieScene: this.spawnXSortieScene,
            spawnYSortieScene: this.spawnYSortieScene,
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
            ouvrirTemplePossible: this.ouvrirTemplePossible,
            entreeTemplePossible: this.entreeTemplePossible,
            templeOuvertTorcheAllumer: this.templeOuvertTorcheAllumer
        })
    }
}

}
