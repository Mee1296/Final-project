import './style.css'
import Phaser, { GameObjects } from 'phaser'
import Player from './player'

const sizes = {
  width:960,
  height:540
}

const speedDown = 300;

const menuScreenDiv = document.querySelector("#menuScreenDiv")
const RoomNumberBtn = document.querySelector("#RoomNumberBtn")


const ratio = 0.4


class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
    this.cursorKeys
    this.playerSpeed=150
    this.jukebox
    this.track1
    this.overlayContainer;
    this.curstomizeMenu;
    this.pop
    this.eyes
    this.shoes
  }

  preload(){
    this.load.image("menubg","./assets/menubg.png")
    this.load.image("bg", "./assets/bg.PNG")
    this.load.spritesheet('baseplayer', './assets/bp-spritesheet2.png', {
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.spritesheet('eyes','./assets/eyes/eyesSpritesheet.png',{
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.spritesheet('shoes','./assets/shoes/shoeSpritesheet.png',{
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.image("jukebox","./assets/jukebox.PNG")
    this.load.audio("funkymusic","./assets/funkymusic.mp3")
    this.load.audio("pop","./assets/sfx/pop.mp3")
    this.load.audio('click',"./assets/sfx/click.mp3")
    this.load.on('complete', () => {
      console.log('Audio files loaded');
    });
    this.load.image("note","./assets/note.png")
    this.load.image("crown","./assets/crown.PNG")
    this.load.image('exit',"./assets/x.PNG")
    this.load.bitmapFont('mono','./assets/fonts/bitmap/mono.png','./assets/fonts/bitmap/mono.xml')
    this.load.image('leftarrow','./assets/button/leftarrow.PNG')
    this.load.image('rightarrow','./assets/button/rightarrow.PNG')
    this.load.image('none','./assets/none.png')
  }

 create(){
    const bg = this.add.image(0,0,"bg").setOrigin(0,0)
    bg.scale = 0.625
    this.jukebox = this.physics.add.image(sizes.width-50,sizes.height-80,"jukebox")
    this.jukebox.setInteractive();
    this.track1 = this.sound.add("funkymusic",{volume: 0.5})
    this.pop = this.sound.add('pop', {volume: 0.5})
    this.click = this.sound.add('click', {volume: 0.25})
    this.player = new Player(this,sizes.width/2,sizes.height/2) //create player from class

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

    //shoes animation

    this.anims.create({
      key: "shoes-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shoes", {start: 5, end:8}),
      repeat: -1
    });
    this.anims.create({
      key: "shoes-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shoes", {start: 1, end:4}),
      repeat: -1
    });







  
  //Player Group for customization


  this.eyes = this.physics.add.sprite(sizes.width/2,sizes.height/2,"eyes",0).setTint(0x181818)
  this.eyes.scale = ratio
  this.eyes.setCollideWorldBounds(true)

  this.shoes = this.physics.add.sprite(sizes.width/2,sizes.height/2,"shoes",0).setAlpha(0)
  this.shoes.scale = ratio
  this.shoes.setCollideWorldBounds(true)


  const crown = this.physics.add.image(sizes.width/2,sizes.height/2, "crown")
  crown.scale = ratio
  crown.setCollideWorldBounds(true)

  this.playerGroup = this.physics.add.group({ collideWorldBounds: true })
  this.playerGroup.add(this.player)
  this.playerGroup.add(crown)
  this.playerGroup.add(this.eyes)
  this.playerGroup.add(this.shoes)

  this.customizeMenu = new CustomizationContainer(this,0,0)
  
  //this.add.existing(container2)

  
  const customizeButton = this.add.group();
  const customizeRect = this.add.rectangle(0,0,225,100,0x322C2B)
  const customizeText = this.add.bitmapText(10,15,'mono','Customize','18')
  customizeText.setTint(0xE4C59E)
  customizeButton.add(customizeRect)
  customizeButton.add(customizeText)
  customizeRect.setInteractive();
  customizeRect.on('pointerup', () => { this.customizeMenu.create(),this.click.play()});


  


  




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
      this.eyes.setFrame(3)
      this.shoes.anims.play("shoes-left",true)
    } else if(this.cursorKeys.right.isDown){
      this.player.anims.play("right",true);
      this.playerGroup.setVelocityX(this.playerSpeed);
      this.eyes.setFrame(1)
      this.shoes.anims.play("shoes-right",true)
    }
    else{
      this.playerGroup.setVelocityX(0)
      this.player.anims.pause();
      this.player.setFrame(0);
      this.eyes.setFrame(0)
      this.shoes.setFrame(0)

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


class CustomizationContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

  }
  preload(){
  }
  create(){
    const container = this.scene.add.container(this.x,this.y)

    const rect = this.scene.add.rectangle(0,0,sizes.width/3+10,sizes.height,0xA79277,1).setOrigin(0,0)
    const exit = this.scene.add.image(sizes.width/3-20,30,'exit').setScale(0.2)
    const heading = this.scene.add.bitmapText(100,30,'mono','CUSTOMIZE',20)
    const displayRect = this.scene.add.rectangle(90,80,128,256,0xffffff,1).setOrigin(0,0)

    //adding arrows
    const leftarrow1 =  this.scene.add.image(15,90,'leftarrow').setOrigin(0,0).setScale(0.25)
    const rightarrow1 =  this.scene.add.image(90+128+10,90,'rightarrow').setOrigin(0,0).setScale(0.25)

    //adding skincolor
    const skinColor = this.scene.add.bitmapText(10,370,'mono','Skin Color',20).setOrigin(0,0)
    const blackBox1 = this.scene.add.rectangle(130,360,193,40,0x000000,1).setOrigin(0,0)
    const skin1 = this.scene.add.rectangle(133,362.5,35,35,0xffdbac,1).setOrigin(0,0)
    const skin2 = this.scene.add.rectangle(171,362.5,35,35,0xffbc6e,1).setOrigin(0,0)
    const skin3 = this.scene.add.rectangle(209,362.5,35,35,0xe1a363,1).setOrigin(0,0)
    const skin4 = this.scene.add.rectangle(247,362.5,35,35,0xbf7848,1).setOrigin(0,0)
    const skin5 = this.scene.add.rectangle(285,362.5,35,35,0x985d37,1).setOrigin(0,0)

    //adding haircolor
    const hairColor = this.scene.add.bitmapText(10,410,'mono','Hair Color',20).setOrigin(0,0)
    const blackBox2 = this.scene.add.rectangle(130,400,193,40,0x000000,1).setOrigin(0,0)
    
    //adding eyeclor
    const eyeColor = this.scene.add.bitmapText(10,450,'mono','Eye Color',20).setOrigin(0,0)
    const blackBox3 = this.scene.add.rectangle(130,440,193,40,0x000000,1).setOrigin(0,0)
    const eye1 = this.scene.add.rectangle(133,442.5,35,35,0x181818,1).setOrigin(0,0)
    const eye2 = this.scene.add.rectangle(171,442.5,35,35,0x593722,1).setOrigin(0,0)
    const eye3 = this.scene.add.rectangle(209,442.5,35,35,0x79a3dd,1).setOrigin(0,0)
    const eye4 = this.scene.add.rectangle(247,442.5,35,35,0xA58454,1).setOrigin(0,0)
    const eye5 = this.scene.add.rectangle(285,442.5,35,35,0x568A62,1).setOrigin(0,0)


    //adding shoe color
    const shoeColor = this.scene.add.bitmapText(10,490,'mono','Shoe Color',20).setOrigin(0,0)
    const blackBox4 = this.scene.add.rectangle(130,480,193,40,0x000000,1).setOrigin(0,0)
    const shoe1 = this.scene.add.rectangle(133,482.5,35,35,0xffffff,1).setOrigin(0,0)
    const shoe2 = this.scene.add.rectangle(171,482.5,35,35,0x3d3d3d,1).setOrigin(0,0)
    const shoe3 = this.scene.add.rectangle(209,482.5,35,35,0xff0000,1).setOrigin(0,0)
    const shoe4 = this.scene.add.rectangle(247,482.5,35,35,0xc45f00,1).setOrigin(0,0)
    const shoe5 = this.scene.add.image(285,482.5,'none').setOrigin(0,0).setScale(0.136)
    //const shoe5 = this.scene.add.rectangle(285,482.5,35,35,0xffffff,1).setOrigin(0,0)

    

    container.add(rect);
    container.add(exit)
    container.add(heading)
    container.add(displayRect)
    container.add(leftarrow1)
    container.add(rightarrow1)

    container.add(skinColor)
    container.add(blackBox1)
    container.add(skin1)
    container.add(skin2)
    container.add(skin3)
    container.add(skin4)
    container.add(skin5)

    container.add(hairColor)
    container.add(blackBox2)

    container.add(eyeColor)
    container.add(blackBox3)
    container.add(eye1)
    container.add(eye2)
    container.add(eye3)
    container.add(eye4)
    container.add(eye5)

    container.add(shoeColor)
    container.add(blackBox4)
    container.add(shoe1)
    container.add(shoe2)
    container.add(shoe3)
    container.add(shoe4)
    container.add(shoe5)

    exit.setInteractive();
    exit.on('pointerup', () => { container.destroy(),this.scene.click.play()});
    leftarrow1.setInteractive();
    leftarrow1.on('pointerup', () => { 
      leftarrow1.setTint(0x808080)
      ,this.scene.pop.play()
    });
    rightarrow1.setInteractive();
    rightarrow1.on('pointerup', () => { 
      rightarrow1.setTint(0x808080)
      ,this.scene.pop.play()
    });

    //skin color

    skin1.setInteractive()
    skin1.on('pointerup',() => {
      this.scene.player.setTint(0xffffff)
      ,this.scene.pop.play()
    })

    skin2.setInteractive()
    skin2.on('pointerup',() => {
      this.scene.player.setTint(0xFfda9f)
      ,this.scene.pop.play()
    })

    skin3.setInteractive()
    skin3.on('pointerup',() => {
      this.scene.player.setTint(0xe1bd8e)
      ,this.scene.pop.play()
    })

    skin4.setInteractive()
    skin4.on('pointerup',() => {
      this.scene.player.setTint(0xBf8b68)
      ,this.scene.pop.play()
    })

    skin5.setInteractive()
    skin5.on('pointerup',() => {
      this.scene.player.setTint(0x986c4f)
      ,this.scene.pop.play()
    })

    //hair color


    //eye color

    eye1.setInteractive()
    eye1.on('pointerup',() => {
      this.scene.eyes.setTint(0x181818)
      ,this.scene.pop.play()
    })

    eye2.setInteractive()
    eye2.on('pointerup',() => {
      this.scene.eyes.setTint(0x593722)
      ,this.scene.pop.play()
    })

    eye3.setInteractive()
    eye3.on('pointerup',() => {
      this.scene.eyes.setTint(0x79a3dd)
      ,this.scene.pop.play()
    })

    eye4.setInteractive()
    eye4.on('pointerup',() => {
      this.scene.eyes.setTint(0xA58454)
      ,this.scene.pop.play()
    })

    eye5.setInteractive()
    eye5.on('pointerup',() => {
      this.scene.eyes.setTint(0x568A62)
      ,this.scene.pop.play()
    })



    //shoe color
    shoe1.setInteractive()
    shoe1.on('pointerup',() => {
      this.scene.shoes.setAlpha(1),
      this.scene.shoes.setTint(0xffffff),
      this.scene.pop.play()
    })

    shoe2.setInteractive()
    shoe2.on('pointerup',() => {
      this.scene.shoes.setAlpha(1)
      this.scene.shoes.setTint(0x3d3d3d),
      this.scene.pop.play()
    })

    shoe3.setInteractive()
    shoe3.on('pointerup',() => {
      this.scene.shoes.setAlpha(1),
      this.scene.shoes.setTint(0xff0000),
      this.scene.pop.play()
    })

    shoe4.setInteractive()
    shoe4.on('pointerup',() => {
      this.scene.shoes.setAlpha(1),
      this.scene.shoes.setTint(0xc45f00)
      ,this.scene.pop.play()
    })

    shoe5.setInteractive()
    shoe5.on('pointerup',() => {
      this.scene.shoes.setAlpha(0),
      this.scene.pop.play()
    })

    





    


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

RoomNumberBtn.addEventListener("click", ()=>{
  menuScreenDiv.style.display="none"
  game.scene.resume("scene-game")
  const enteredRoomNumber = document.getElementById("RoomNumber").value;

  // Implement logic to transition to the specific room based on enteredRoomNumber
  console.log(`Entered room number: ${enteredRoomNumber}`); // For now, just log the number
})




const game = new Phaser.Game(config)

