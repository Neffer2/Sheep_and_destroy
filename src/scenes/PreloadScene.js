export class PreloadScene extends Phaser.Scene {
    constructor(){
        super('PreloadScene');
    }  

    preload(){
        this.load.setPath('public/assets');
        this.load.image('background', 'generic-png/env/background_tall.png');
        this.load.image('sheep', 'generic-png/characters/white_sheep.png');
    }    
 
    create(){
        this.scene.start('MainScene');   
    }
}