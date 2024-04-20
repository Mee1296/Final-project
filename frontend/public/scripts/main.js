import './style.css'
import Phaser, { GameObjects } from 'phaser'
import Player from './player'

const sizes = {
  width:960,
  height:540
}

const speedDown = 300;

<<<<<<< Updated upstream
||||||| Stash base
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

=======
const ratio = 0.4

// class Player extends Phaser.GameObjects.Sprite{
//   constructor(scene,x,y){
//     super(scene,x,y,'baseplayer')
//     this.scene = scene;
//     this.scene.add.existing(this)
//     this.scene.physics.world.enable(this)
//     this.body.setCollideWorldBounds(true)
//     this.scale = ratio

//     this.scene.anims.create({
//       key: "right",
//       frameRate: 10,
//       frames: this.anims.generateFrameNumbers("baseplayer", {start: 5, end:8}),
//       repeat: -1
//     });
//     this.scene.anims.create({
//       key: "left",
//       frameRate: 10,
//       frames: this.anims.generateFrameNumbers("baseplayer", {start: 1, end:4}),
//       repeat: -1
//     }); //creating sprite animations

    


//   }
// }

>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
}
||||||| Stash base
    this.load.image("jukebox","./assets/jukebox.PNG")
    this.load.audio("funkymusic","./assets/funkymusic.mp3")
    this.load.on('complete', () => {
      console.log('Audio files loaded');
    });
    this.load.image("note","./assets/note.png")
    this.load.image("crown","./assets/crown.PNG")
}
=======
    this.load.image("jukebox","./assets/jukebox.PNG")
    this.load.audio("funkymusic","./assets/funkymusic.mp3")
    this.load.audio("pop","./assets/pop.mp3")
    this.load.on('complete', () => {
      console.log('Audio files loaded');
    });
    this.load.image("note","./assets/note.png")
    this.load.image("crown","./assets/crown.PNG")
    this.load.image('exit',"./assets/x.PNG")
    this.load.bitmapFont('mono','./assets/fonts/bitmap/mono.png','./assets/fonts/bitmap/mono.xml')
   
  }
>>>>>>> Stashed changes

  create(){
    const bg = this.add.image(0,0,"bg").setOrigin(0,0)
<<<<<<< Updated upstream
    this.player = this.physics.add.sprite(sizes.width/2,sizes.height/2,"baseplayer").setOrigin(0,0)
||||||| Stash base
    bg.scale = 0.625
    this.jukebox = this.physics.add.image(sizes.width-50,sizes.height-80,"jukebox")
    this.jukebox.setInteractive();
    this.track1 = this.sound.add("funkymusic")
    //this.player = this.physics.add.sprite(sizes.width/2,sizes.height/2,"baseplayer").setOrigin(0,0) //when player was just sprite
    this.player = new Player(this,sizes.width/2,sizes.height/2) //create player from class
=======
    bg.scale = 0.625
    this.jukebox = this.physics.add.image(sizes.width-50,sizes.height-80,"jukebox")
    this.jukebox.setInteractive();
    this.track1 = this.sound.add("funkymusic")
    this.pop = this.sound.add('pop')
    //this.player = this.physics.add.sprite(sizes.width/2,sizes.height/2,"baseplayer").setOrigin(0,0) //when player was just sprite
    this.player = new Player(this,sizes.width/2,sizes.height/2) //create player from class
>>>>>>> Stashed changes

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
    

<<<<<<< Updated upstream
    
||||||| Stash base
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



=======
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

  this.customizeMenu = new CustomizationContainer(this,0,0)

  //this.add.existing(container2)


  const customizeButton = this.add.group();
  const customizeRect = this.add.rectangle(0,0,225,100,0x322C2B)
  const customizeText = this.add.bitmapText(10,15,'mono','Customize','18')
  customizeText.setTint(0xE4C59E)
  customizeButton.add(customizeRect)
  customizeButton.add(customizeText)
  customizeRect.setInteractive();
  customizeRect.on('pointerup', () => { this.customizeMenu.create(),this.pop.play()});


>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
}
const config = {
||||||| Stash base

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

// class MenuScreen extends Phaser.Scene {
//   constructor() {
//     super('menuScreen')
//   }

//   preload() {
//     this.load.image("bgMenu", "../assets/space.png")

//   }

//   create() {
//     const startButton = this.add.text(300, 100, 'Welcome to Our Cafe', { font: '50px jersey', fill: '#ffffff' });
//     startButton.setInteractive();
//     startButton.on('pointerdown', () => {
//     this.scene.start('GameScene'); // Transition to the main game scene
//   });
//   }
// }

const config = {
=======



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


  class CustomizationContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

  }
  preload(){
  }
  create(){
    const container = this.scene.add.container(this.x,this.y)

    const rect = this.scene.add.rectangle(0,0,sizes.width/3,sizes.height,0xA79277,1).setOrigin(0,0)
    const exit = this.scene.add.image(sizes.width/3-30,30,'exit').setScale(0.2)
    const heading = this.scene.add.bitmapText(100,30,'mono','CUSTOMIZE',20)
    

    container.add(rect);
    container.add(exit)
    container.add(heading)
    exit.setInteractive();
    exit.on('pointerup', () => { container.destroy(),this.scene.pop.play()});


    


  }
  }





  const config = {
>>>>>>> Stashed changes
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


<<<<<<< Updated upstream
const game = new Phaser.Game(config)
||||||| Stash base


const game = new Phaser.Game(config)
=======


  const game = new Phaser.Game(config)
>>>>>>> Stashed changes

