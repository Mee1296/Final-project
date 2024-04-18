import './style.css'
import Phaser, { GameObjects } from 'phaser'

const sizes = {
  width:960,
  height:540
}

const speedDown = 300;


class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
    this.cursorKeys
    this.playerSpeed=150
  }

  preload(){
    this.load.image("bg", "./assets/space.png")
    //this.load.image("baseplayer", "./assets/baseplayerfull.png")
    this.load.spritesheet('baseplayer', './assets/bp-spritesheet2.png', {
      frameWidth: 256,
      frameHeight: 512
    });
}

  create(){
    const bg = this.add.image(0,0,"bg").setOrigin(0,0)
    this.player = this.physics.add.sprite(sizes.width/2,sizes.height/2,"baseplayer").setOrigin(0,0)

    this.player.body.setCollideWorldBounds(true)
    this.player.scale = 0.4

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("baseplayer", {start: 5, end:8}),
      repeat: -1
    });
    this.anims.create({
      key: "left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("baseplayer", {start: 1, end:4}),
      repeat: -1
    });
    

    

  }

  update(){
    this.movePlayer();


  }

  movePlayer(){
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-this.playerSpeed);
      this.player.anims.play("left",true);
    } else if(this.cursorKeys.right.isDown){
      this.player.anims.play("right",true);
      this.player.setVelocityX(this.playerSpeed);
    }
    else{
      this.player.setVelocityX(0);
      this.player.anims.pause();
      this.player.setFrame(0);

    }
  }

}
const config = {
  type: Phaser.WEBGL,
  width:sizes.width,
  height:sizes.height,
  canvas:gameCanvas,
  physics:{
    default:"arcade",
    arcade:{
      gravity:{y:speedDown},
      debug:true
    }

  },
  scene:[GameScene]
}


const game = new Phaser.Game(config)

