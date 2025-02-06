let mContext, width, height, sheeps = [], amount = 2, destroySound, scoreText, scoreTimer, scoreCounter = 0, time = 30; 

export class MainScene extends Phaser.Scene {
    constructor(){
        super('MainScene');
    }  

    preload(){}    

    create(){ 
        mContext = this;
        mContext.createSheeps(amount);
        mContext.setTimer();

        // Colliders
        this.physics.add.collider(sheeps, sheeps);
    }

    update(){}

    init() {
        width = this.game.config.width;
        height = this.game.config.height;
        this.add.image(0, 0, 'background').setScale(0.8).setOrigin(0, 0);        
        destroySound = this.sound.add('sound-hit');
        let miniSheep = this.add.image(20, 20, 'sheep').setScale(0.5).setOrigin(0, 0);
        scoreText = this.add.text(miniSheep.x + 90, 28, scoreCounter, { font: '50px font1', fill: '#ffffff' });
        scoreTimer = this.add.text(width - 100, 20, ":"+time, { font: '50px font1', fill: '#ffffff' });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    createSheeps(amount){
        for(let i = 0; i < amount; i++){
            let sheep = mContext.physics.add.image(this.getRandomInt(0, width), this.getRandomInt(0, height), 'sheep');
            sheep.setInteractive();
            sheep.setCollideWorldBounds(true);
            sheep.setBounce(1);
            sheep.setCircle(70);
            sheeps.push(sheep);
        }

        if (amount > 2){
            this.cameras.main.shake(150, 0.02);
        }

        sheeps.forEach(sheep => {
            sheep.on('pointerdown', function(){
                mContext.deleteSheep(sheep);
            });
            
            sheep.setVelocity(this.getRandomInt(-300, 300), this.getRandomInt(-300, 300));
        });

        // World step
        this.physics.world.on('worldstep', () => {
            sheeps.forEach(sheep => {
                sheep.setAngularVelocity(
                    Phaser.Math.RadToDeg(sheep.body.velocity.x / sheep.body.halfWidth)
                );
            });
        });
    }

    deleteSheep(sheep){
        destroySound.play();
        sheeps.splice(sheeps.indexOf(sheep), 1);
        sheep.destroy();
        scoreText.setText(scoreCounter+=1);

        if(sheeps.length == 0){
            mContext.createSheeps(amount += 2);
        }
    }   

    setTimer(){
        let timeInterval = setInterval(() => {
            time--;
            if (time < 10){scoreTimer.setText(":0"+time);}else {scoreTimer.setText(":"+time);}
            if(time == 0){
                clearInterval(timeInterval);
                mContext.gameOver();
            }
        }, 1000);
    }

    gameOver(){
        mContext.scene.start('GameOverScene', {score: scoreCounter});
    }
} 