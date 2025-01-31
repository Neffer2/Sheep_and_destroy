let mContext, width, height, sheeps = [], amount = 2; 

export class MainScene extends Phaser.Scene {
    constructor(){
        super('MainScene');
    }  

    preload(){}    

    create(){ 
        mContext = this;
        mContext.createSheeps(amount);

        // Colliders
        this.physics.add.collider(sheeps, sheeps);
    }

    update(){
        
    }

    init() {
        width = this.game.config.width;
        height = this.game.config.height;
        this.add.image(0, 0, 'background').setScale(0.8).setOrigin(0, 0);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    createSheeps(amount){
        for(let i = 0; i < amount; i++){
            let sheep = mContext.physics.add.image(this.getRandomInt(0, width), this.getRandomInt(0, height), 'sheep');
            sheep.setInteractive();
            sheep.setCollideWorldBounds(true);
            sheeps.push(sheep);
        }

        sheeps.forEach(sheep => {
            sheep.on('pointerdown', function(){
                mContext.deleteSheep(sheep);
            });
        });

        let SheepsInterval = setInterval(() => {
            sheeps.forEach(sheep => {
                sheep.x += this.getRandomInt(-2, 3);
                sheep.y += this.getRandomInt(-2, 3);
            });
        }, 70);
    }

    deleteSheep(sheep){
        sheeps.splice(sheeps.indexOf(sheep), 1);
        sheep.destroy();

        if(sheeps.length == 0){
            mContext.createSheeps(amount += 2);
        }
    }   
} 