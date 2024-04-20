import Phaser from "phaser";
import "./menuStyle.css"

class MenuScreen extends Phaser.Scene {
    constructor() {
        super('menu-screen')
    }

    preload(){
        this.load.image("bg", "./assets/space.png")
    }

    create() {
        const background = this.add.image(0,0,'bg').setOrigin(0,0)
        background.setScale(sizes.width / background.width, sizes.height / background.height);
        const welcomeText = this.add.text(sizes.width / 2, sizes.height / 3, 'Welcome to our cafe', {
            font: '48px Arial',
            fill: '#ffffff',
        }).setOrigin(0.5)
        const playButton = this.add.text(sizes.width / 2, sizes.height / 2, 'Start Game', {
            font: '48px Arial',
            fill: '#ffffff',
          }).setOrigin(0.5);
        playButton.setInteractive();
        playButton.on('pointerup', () => {
        this.scene.start('scene-game')
        })
    }
}

export default MenuScreen