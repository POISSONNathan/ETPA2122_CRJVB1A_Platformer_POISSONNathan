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
            this.speed = data.speed
        }

        preload(){
            this.load.image("Phaser_tuilesdejeu", "assets/tileset.png");

            this.load.tilemapTiledJSON("carte", "map.json");  

            this.load.spritesheet('perso','assets/persoDebut.png',
            { frameWidth: 32, frameHeight: 32 });
        }

        create(){
            const carte = this.make.tilemap({ key: 'carte' });
            // importer les TileSet 
            const tileset = carte.addTilesetImage(
                    "tuilesJeu",
                    "Phaser_tuilesdejeu"
                    );  

            const build = carte.createLayer(
                    "build",
                    tileset
                    );


            this.doubleSautLeft = false
            this.compteurDoubleSautLeft = 10
            this.doubleSautRight = false
            this.compteurDoubleSautRight = 10

            this.doubleSautLeftPossible = true
            this.doubleSautRightPossible = true

            this.resetGraviteLeft = false
            this.resetGraviteRight = false

            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////

            this.player = this.physics.add.sprite(this.spawnXSortieScene, this.spawnYSortieScene, 'perso').setOrigin(0);
            this.player.body.setSize(24,6,true)
            this.player.setOffset(4, 26)
            
            this.physics.add.collider(this.player, build);
            build.setCollisionByProperty({ estSolide: true });

            this.player.setCollideWorldBounds(true);

            this.cameras.main.zoom = 3
            this.cameras.main.startFollow(this.player); 
            this.physics.world.setBounds(0, 0, 6400, 2880);
            this.cameras.main.setBounds(0, 0, 6400, 2880);

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'turn',
                frames: [ { key: 'perso', frame: 4 } ],
                frameRate: 20
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
                frameRate: 6,
                repeat: -1
            });


            ///////////////////////////////////////////////////////////////
            /////////////////////////TOUCHES///////////////////////////////
            ///////////////////////////////////////////////////////////////

            this.cursors = this.input.keyboard.createCursorKeys();
            this.keys = this.input.keyboard.addKeys({
            });

            // touches spéciales clavier + manettes
            this.toucheF = this.input.keyboard.addKey('F') ||this.paddle.A;
        }

        update(){

            if (this.dialogue == false){

            this.input.gamepad.once('connected', function (pad) {
                this.paddle = pad;
                this.padConnected = true;
            });   

                 // quand la manette est connectée, les touches manettes sont activées
            if (this.padConnected) {
                this.moveUp = (this.cursors.up.isDown||  this.paddle.up)  
                this.moveLeft = (this.cursors.left.isDown|| this.paddle.left)  
                this.moveRight = (this.cursors.right.isDown || this.paddle.right)
                this.moveDown = ( this.cursors.down.isDown || this.paddle.down) 
            }
            // quand la manette n'est pas connectée, les touches manettes ne sont pas activées
            else{
                this.moveUp = (this.cursors.up.isDown )  
                this.moveLeft = (this.cursors.left.isDown )  
                this.moveRight = (this.cursors.right.isDown ) 
                this.moveDown = ( this.cursors.down.isDown) 
            }

            
                if (this.moveUp && this.player.body.blocked.down ) {
                    this.player.setVelocityY(-this.speed);
                }  
                if (this.moveLeft){ 
                    this.player.direction = 'left';
                    this.player.setVelocityX(-this.speedLeft); 
                    this.player.anims.play('left', true);
                }
                else if (this.moveRight){ 
                    this.player.direction = 'right';
                    this.player.setVelocityX(this.speedRight);
                    this.player.anims.play('right', true);
                }
                else{ 
                    this.player.setVelocityX(0); 
                    this.player.anims.play('turn');
                }

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
                
                if(this.doubleSautLeft == true){
                    this.resetGraviteLeft = true
                    this.doubleSautRightPossible = false
                    this.doubleSautLeftPossible = true
                    this.compteurDoubleSautLeft -=1 ;
                    this.player.setVelocityX(-300);
                    this.player.setVelocityY(-600);
                    this.player.angle += 30
                    if(this.compteurDoubleSautLeft == 0){
                        this.compteurDoubleSautLeft = 10
                        this.doubleSautLeft = false
                        this.player.angle = 0
                    }
                }

                if(this.doubleSautRight == true){
                    this.resetGraviteRight = true
                    this.doubleSautRightPossible = true
                    this.doubleSautLeftPossible = false
                    this.compteurDoubleSautRight -=1 ;
                    this.player.setVelocityX(300);
                    this.player.setVelocityY(-600);
                    this.player.angle -= 30
                    if(this.compteurDoubleSautRight == 0){
                        this.compteurDoubleSautRight = 10
                        this.doubleSautRight = false
                        this.player.angle = 0
                    }
                }

                if (this.resetGraviteLeft == true){
                    this.speedRight = 100
                }
                else{
                    this.speedRight = this.speed
                }
                if (this.resetGraviteRight == true){
                    this.speedLeft = 100
                }
                else{
                    this.speedLeft = this.speed
                }

                if (this.player.body.blocked.down){
                    this.doubleSautRightPossible = true
                    this.doubleSautLeftPossible = true

                    this.resetGraviteLeft = false
                    this.resetGraviteRight = false
                }

                console.log(this.doubleSautLeft)
                    
            }
        }

        /////////////////////////////////////////
        //////////changements de scènes//////////
        /////////////////////////////////////////

        changeScene(player,entreeGrotte){
            if (Phaser.Input.Keyboard.JustDown(this.toucheF)) { 
                this.scene.start("sceneGrotte", {
                    pointDeVie:this.pointDeVie,
                })
            }
        }
    }
        