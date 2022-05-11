        class sceneJeu extends Phaser.Scene{
            constructor(){
            super("sceneJeu");
        }

        init(data){
            this.pointDeVie = data.pointDeVie,
            this.spawnXSortieScene = data.spawnXSortieScene,
            this.spawnYSortieScene = data.spawnYSortieScene,
            this.speed = data.speed
        }

        preload(){
            this.load.image("Phaser_tuilesdejeu", "assets/tuilesJeu.png");

            this.load.tilemapTiledJSON("carte", "map.json");  

            this.load.spritesheet('perso','assets/perso.png',
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

            collisionInvisible.setCollisionByProperty({ estSolide: true });

            this.player.setCollideWorldBounds(true);

            this.cameras.main.zoom = 3
            this.cameras.main.startFollow(this.player); 
            this.physics.world.setBounds(0, 0, 6400, 2880);
            this.cameras.main.setBounds(0, 0, 6400, 2880);

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('perso', {start:18,end:23}),
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('perso', {start:12,end:17}),
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: 'front',
                frames: this.anims.generateFrameNumbers('perso', {start:0,end:5}),
                frameRate: 8,
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
            this.toucheG = this.input.keyboard.addKey('G')||this.paddle.Y;
            this.trancher = this.input.keyboard.addKey('A')||this.paddle.X;

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

                    if (this.moveLeft) {
                        this.player.setVelocityX(-this.speed)
                        this.player.direction = 'left';
                    } else if (this.moveRight) {
                        this.player.setVelocityX(this.speed)
                        this.player.direction = 'right';
                    }

                    if (this.moveUp) {
                        this.player.setVelocityY(-this.speed)
                        this.player.direction = 'up';
                    } else if (this.moveDown) {
                        this.player.setVelocityY(this.speed)
                        this.player.direction = 'down';
                    }

                    this.player.body.velocity.normalize().scale(this.speed)
            }
        }

        /////////////////////////////////////////
        //////////changements de scènes//////////
        /////////////////////////////////////////

        goInsideGrotto(player,entreeGrotte){
            if (Phaser.Input.Keyboard.JustDown(this.toucheF)) { 
                this.scene.start("sceneGrotte", {
                    pointDeVie:this.pointDeVie,
                })
            }
        }
    }
        