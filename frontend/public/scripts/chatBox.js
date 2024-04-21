const size = {width:960,
    height:540
}

class chatBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y)
    }

    preload() {
    }

    create() {
        const container = this.scene.add.container(this.x,this.y)

        const rect = this.scene.add.rectangle(0,0,size.width/3+10,size.height,0xA79277,1).setOrigin(0,0)
        const exit = this.scene.add.image(size.width/3-20,30,'exit').setScale(0.2)
        const heading = this.scene.add.bitmapText(80,30,'mono','Chatbox',40)
        const displayRect = this.scene.add.rectangle(10,490,250,40,0xffffff,1).setOrigin(0,0)

        container.add(rect);
        container.add(exit)
        container.add(heading)

        exit.setInteractive();
        exit.on('pointerup', () => { container.destroy(),this.scene.click.play()});

    }

    
}


export default chatBox;