let camera;
let penguin;
let mContext;

export class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene');
    }  

    preload(){
        
    }    
 
    create(){
        mContext = this;
        /* background */
            this.add.image(256, 320, 'background').setScrollFactor(1, 0).alpha = 0.7;
            this.add.image(256, 320, 'background').setScrollFactor(1, 0).alpha = 0.7;
            
            const map = this.make.tilemap({ key: "map", tileWidth: 128, tileHeight: 128});
            const tileset = map.addTilesetImage("tiles1","tiles");
            const layer = map.createLayer("ground", tileset, 0, 0);
            const layer2 = map.createLayer("title", tileset, 0, 0);
            layer2.setScale(.8, 1);
            layer2.y = -60;
            layer2.x = 50;
            layer.alpha = 0.6;
        /* --- */

        /* Objects */
            this.add.image(20, 400, 'tree1').setScale(.6);
            this.add.image(20, 462, 'iglu').setScale(.5).flipX = true;
            this.add.image(450, 429, 'tree2').setScale(.6);

            this.add.image(105, 38, 'stone').setScale(.8);
            this.add.image(105, 38, 'stone').setScale(.8);
            this.add.image(380, 38, 'stone').setScale(.8);
            this.add.image(140, 45, 'crystal').setScale(.6);
            this.add.image(340, 45, 'sign1').setScale(.5);
            this.add.image(340, 45, 'sign1').setScale(.5);
            
            this.add.image(200, 38, 'snowman').setScale(.3);
        /* --- */

        /* Penguni */
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNumbers('walk', {start: 0, end: 3}), 
                frameRate: 8,
                repeat: -1
            }); 
            penguin = this.physics.add.sprite(480, 480, 'player').setScale(.7);
            penguin.flipX = true;
            penguin.setVelocityX(-90);
            penguin.setSize(120, 50, true);
            penguin.anims.play('walk', true);
        /* --- */

        /* Cameras */
            camera = this.cameras.main;
            camera.roundPixels = true;
        /* --- */

        /* Title */
            let title = this.add.text(this.scale.width * .18, this.scale.height * .165, "¡Salta! \n y gana", { fontSize: 85, fill: "#ffffff", fontFamily: 'Snowtop Caps, "Goudy Bookletter 1911", Times, serif', align: "center"}).setScrollFactor(1, 0);
            let btn_play = this.add.image(this.scale.width/2, this.scale.height * .8, 'play_btn').setScale(.5).setScrollFactor(1, 0).setInteractive();
        /* --- */
        
        /* Interacciones */
            btn_play.on('pointerover',function(pointer){
                btn_play.setScale(.6);
            });

            btn_play.on('pointerout',function(pointer){
                btn_play.setScale(.5);
            });

            btn_play.on('pointerup', function (pointer) {
                let cont = 1;
                let intervalo = setInterval(function(){
                    camera.setAlpha(cont -= .1);
                    if (camera.alpha == 0){
                        clearInterval(intervalo);
                        mContext.scene.start('MainScene');
                    }
                }, 30); 
            }, this);
        /* --- */

        /* colitions */
            this.physics.add.collider(penguin, layer);
            layer.setCollisionBetween(1, 2);
        /* --- */
    }

    update(){
        this.horizontalWrap(penguin);

        if (penguin.x < 125){
            penguin.alpha -= .1;
            if (penguin.alpha === 0){
                penguin.destroy();
            }
        }
    }

    horizontalWrap(sprite){
        const halfWidth = sprite.displayWidth * 0.5
        const gameWidth = this.scale.width
        if (sprite.x < -halfWidth)
        {
            sprite.x = gameWidth + halfWidth
        }
        else if (sprite.x > gameWidth + halfWidth)
        {
            sprite.x = -halfWidth
        }
    }
}