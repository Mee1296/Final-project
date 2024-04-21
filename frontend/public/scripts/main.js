import './style.css'
import Phaser, { GameObjects } from 'phaser'
import Player from './player'
import CustomizationContainer from './customizationContainer'

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
    this.acc
    this.accIndex = 0
    this.hair
    this.hairIndex = 39
    this.hairColor = 0
    this.shirtIndex = 0
    this.shirtColor = 0
    this.pantsIndex = 0
    this.pantsColor = 0
    this.display

    this.skinTint = 0xffffff

    this.eyeTint = 0x181818
    this.shoeTint = 0xffffff
    this.shoeAlpha = 0
    
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
    this.load.spritesheet('hairpiece','./assets/headSpritesheet.png',{
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.spritesheet('shirt','./assets/shirtSpritesheet.png',{
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.spritesheet('pants','./assets/pantsSpritesheet.png',{
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.spritesheet('acc','./assets/accSpritesheet.png',{
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

    this.anims.create({
      key: "shirt-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shirt", {start: this.shirtIndex+5, end:this.shirtIndex+8}),
      repeat: -1
    });
    this.anims.create({
      key: "shirt-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shirt", {start: this.shirtIndex+1, end:this.shirtIndex+4}),
      repeat: -1
    });

    this.anims.create({
      key: "pants-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("pants", {start: this.pantsIndex+5, end:this.pantsIndex+8}),
      repeat: -1
    });
    this.anims.create({
      key: "pants-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("pants", {start: this.pantsIndex+1, end:this.pantsIndex+4}),
      repeat: -1
    });







  
  //Player Group for customization


  this.eyes = this.physics.add.sprite(sizes.width/2,sizes.height/2,"eyes",0).setTint(0x181818)
  this.eyes.scale = ratio
  this.eyes.setCollideWorldBounds(true)

  this.shoes = this.physics.add.sprite(sizes.width/2,sizes.height/2,"shoes",0).setAlpha(0)
  this.shoes.scale = ratio
  this.shoes.setCollideWorldBounds(true)

  this.shirt = this.physics.add.sprite(sizes.width/2,sizes.height/2,'shirt',1)
  this.shirt.scale = ratio
  this.shirt.setCollideWorldBounds(true)

  this.acc = this.physics.add.sprite(sizes.width/2,sizes.height/2,'acc',this.accIndex)
  this.acc.scale = ratio
  this.acc.setCollideWorldBounds(true)

  this.hair = this.physics.add.sprite(sizes.width/2,sizes.height/2,'hairpiece',this.hairIndex)
  this.hair.scale = ratio
  this.hair.setCollideWorldBounds(true)

  this.pants = this.physics.add.sprite(sizes.width/2,sizes.height/2,"pants",this.pantsIndex)
  this.pants.scale = ratio
  this.pants.setCollideWorldBounds(true)


  this.playerGroup = this.physics.add.group({ collideWorldBounds: true })
  this.playerGroup.add(this.player)
  this.playerGroup.add(this.eyes)
  this.playerGroup.add(this.shoes)
  this.playerGroup.add(this.shirt)
  this.playerGroup.add(this.acc)
  this.playerGroup.add(this.hair)
  this.playerGroup.add(this.pants)

  this.customizeMenu = new CustomizationContainer(this,0,0)

  
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
      this.acc.setFrame(this.accIndex+1)
      this.hair.setFrame(this.hairIndex+1)
      this.shirt.anims.play("shirt-left",true)
      this.pants.anims.play('pants-left',true)
    } else if(this.cursorKeys.right.isDown){
      this.player.anims.play("right",true);
      this.playerGroup.setVelocityX(this.playerSpeed);
      this.eyes.setFrame(1)
      this.shoes.anims.play("shoes-right",true)
      this.acc.setFrame(this.accIndex+2)
      this.hair.setFrame(this.hairIndex+2)
      this.shirt.anims.play("shirt-right",true)
      this.pants.anims.play('pants-right',true)
    }
    else{
      this.playerGroup.setVelocityX(0)
      this.player.anims.pause();
      this.player.setFrame(0);
      this.eyes.setFrame(0)
      this.shoes.setFrame(0)
      this.acc.setFrame(this.accIndex)
      this.hair.setFrame(this.hairIndex)
      this.shirt.setFrame(this.shirtIndex)
      this.pants.setFrame(this.pantsIndex)

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

let popup = document.getElementById("popup")

function roomButton() {
  popup.classList.add("open-popup")
}
function closePopup() {
  popup.classList.remove("open-popup")
}

RoomNumberBtn.addEventListener("click", ()=>{
  const enteredRoomNumber = document.getElementById("RoomNumber").value;
  if(enteredRoomNumber == 0) {
    roomButton();
    setTimeout(closePopup, 1000);
  }else{
    menuScreenDiv.style.display="none"
    game.scene.resume("scene-game")
  }
  // Implement logic to transition to the specific room based on enteredRoomNumber
  console.log(`Entered room number: ${enteredRoomNumber}`); // For now, just log the number
})




const game = new Phaser.Game(config)

