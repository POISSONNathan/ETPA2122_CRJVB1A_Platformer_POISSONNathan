        class sceneJeu extends Phaser.Scene{
            constructor(){
            super("sceneJeu");
        }

        init(data){
            this.pointDeVie = data.pointDeVie,
            this.spawnXSortieScene = data.spawnXSortieScene,
            this.spawnYSortieScene = data.spawnYSortieScene,
            this.speed = data.speed,
            this.dialogue = data.dialogue
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
                    this.player.setVelocityX(-this.speed); 
                    this.player.anims.play('left', true);
                }
                else if (this.moveRight){ 
                    this.player.direction = 'right';
                    this.player.setVelocityX(this.speed);
                    this.player.anims.play('right', true);
                }
                else{ 
                    this.player.setVelocityX(0); 
                    this.player.anims.play('turn');
                }
                    
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
        