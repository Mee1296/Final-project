// import '../style.css'
//import Phaser from 'phaser';

const sizes = {
  width:960,
  height:540
}




const config = {
  type: Phaser.Auto,
  width:sizes.width,
  height:sizes.height,
  canvas:gameCanvas,
}

const game = new Phaser.Game(config)

class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
  }

  preload(){
    this.load.image("bg", "./assets/space.png")
  }

  create(){
    const bg = this.add.image(0,0,"bg").setOrigin(0,0)
    

  }

  update(){

  }

}

// Add the scene to the game
game.scene.add('gameScene', GameScene);

// Start the "myScene" scene
game.scene.start('gameScene');


