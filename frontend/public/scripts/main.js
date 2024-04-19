import './style.css'
import Phaser, { GameObjects } from 'phaser'

const sizes = {
  width:960,
  height:540
}

const speedDown = 300;

const ratio = 0.4

class Player extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y){
    super(scene,x,y,'baseplayer')
    this.scene = scene;
    this.scene.add.existing(this)
    this.scene.physics.world.enable(this)
    this.body.setCollideWorldBounds(true)
    this.scale = ratio

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

    


  }
}


class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
    this.cursorKeys
    this.playerSpeed=150
    this.jukebox
    this.track1
  }

  preload(){
    this.load.image("bg", "./assets/bg.PNG")
    this.load.spritesheet('baseplayer', './assets/bp-spritesheet2.png', {
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.image("jukebox","./assets/jukebox.PNG")
    this.load.audio("funkymusic","./assets/funkymusic.mp3")
    this.load.on('complete', () => {
      console.log('Audio files loaded');
    });
    this.load.image("note","./assets/note.png")
    this.load.image("crown","./assets/crown.PNG")
}

  create(){
    const bg = this.add.image(0,0,"bg").setOrigin(0,0)
    bg.scale = 0.625
    this.jukebox = this.physics.add.image(sizes.width-50,sizes.height-80,"jukebox")
    this.jukebox.setInteractive();
    this.track1 = this.sound.add("funkymusic")
    //this.player = this.physics.add.sprite(sizes.width/2,sizes.height/2,"baseplayer").setOrigin(0,0) //when player was just sprite
    this.player = new Player(this,sizes.width/2,sizes.height/2) //create player from class


    //this.player.body.setCollideWorldBounds(true)
    //this.player.scale = 0.4

    this.jukebox.body.setCollideWorldBounds(true)
    this.jukebox.scale = ratio

    this.cursorKeys = this.input.keyboard.createCursorKeys();


    this.physics.add.overlap(this.jukebox,this.player,this.onContact, null, this)

    this.emitter=this.add.particles(sizes.width-50,sizes.height-200,"note",{
      speed:500,
      gravityY:speedDown - 200,
      scale:0.04,
      duration:1,
      emitting:false
    })



  const crown = this.physics.add.image(sizes.width/2,sizes.height/2, "crown")
  crown.scale = ratio
  crown.setCollideWorldBounds(true)

  this.playerGroup = this.physics.add.group({ collideWorldBounds: true })
  this.playerGroup.add(this.player)
  this.playerGroup.add(crown)




  }

  update(){
    this.movePlayer();
    if(this.track1.isPlaying){
      this.emitter.start();
    }


  }

  movePlayer(){
    if(this.cursorKeys.up.isDown && this.player.body.blocked.down){
      this.playerGroup.setVelocityY(-150);
    }
    if(this.cursorKeys.left.isDown){
      this.playerGroup.setVelocityX(-this.playerSpeed);
      this.player.anims.play("left",true);
    } else if(this.cursorKeys.right.isDown){
      this.player.anims.play("right",true);
      this.playerGroup.setVelocityX(this.playerSpeed);
    }
    else{
      this.playerGroup.setVelocityX(0)
      this.player.anims.pause();
      this.player.setFrame(0);

    }
  }


  onContact() {
    this.jukebox.on('pointerup', () => {
      console.log("clicked");
      if (this.track1.isPlaying) {
        this.track1.pause();
      } else {
        this.track1.play();
      }
    });
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

