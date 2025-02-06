let width, height, score;

export class GameOverScene extends Phaser.Scene {
    constructor(){
        super('GameOverScene');
    }  

    preload(){}    

    create(){ 
        score = this.sys.settings.data.score;
        height = this.game.config.height;
        this.add.image(0, 0, 'background').setScale(0.8).setOrigin(0, 0);
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.add.image(screenCenterX, (height/4), 'game-over').setScale(.6);
        this.add.image((screenCenterX - 80), (height/2) - 100, 'sheep').setOrigin(.5);
        this.add.text((screenCenterX + 80), (height/2) - 100, score, { font: '70px font1', fill: '#ffffff' }).setOrigin(.5);

        setTimeout(() => {
            location.reload();
        }, 5000);
    }
} 