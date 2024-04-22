const ratio = 0.4
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
      super(scene,x,y,'baseplayer')
      this.scene = scene;
      this.scene.add.existing(this)
      this.scene.physics.world.enable(this)
      this.body.setCollideWorldBounds(true)
      this.scale = ratio
      this.message 
  
      this.scene.anims.create({
        key: "right",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers("baseplayer", {start: 5, end:8}),
        repeat: -1
      });
      this.scene.anims.create({
        key: "left",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers("baseplayer", {start: 1, end:4}),
        repeat: -1
      }); //creating sprite animations

      this.scene.anims.create({
        key: "eyes-right",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers("eyes", {start: 0, end:1}),
        repeat: 1
      });
      this.scene.anims.create({
        key: "eyes-left",
        frameRate: 1,
        frames: this.anims.generateFrameNumbers("eyes", {start: 2, end:3}),
        repeat: 1
      }); //creating sprite animations



      
  
  
    }
    update(){
    }
  }

export default Player;