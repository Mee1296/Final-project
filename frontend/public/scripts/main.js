import './style.css'
import Phaser, { GameObjects } from 'phaser'
import Player from './player'
import CustomizationContainer from './customizationContainer'
import chatBox from './chatBox'

const sizes = {
  width:960,
  height:540
}

const speedDown = 300;

var flipFlop;


//menuScreen , caution popup
const menuScreenDiv = document.querySelector("#menuScreenDiv")
const RoomNumberBtn = document.querySelector("#RoomNumberBtn")
let popup = document.getElementById("popup")

function roomButton() {
  popup.classList.add("open-popup")
}
function closePopup() {
  popup.classList.remove("open-popup")
}

RoomNumberBtn.addEventListener("click", ()=>{
  const enteredRoomNumber = document.getElementById("RoomNumber").value;
  const playerUserName = document.getElementById("playerName").value;
  if(enteredRoomNumber == 0 || playerUserName == "") {
    roomButton();
    setTimeout(closePopup, 1500);
  }else{
    menuScreenDiv.style.display="none"
    game.scene.resume("scene-game")
  }
  // Implement logic to transition to the specific room based on enteredRoomNumber
  console.log(`Entered room number: ${enteredRoomNumber}`);
})

//textBox in chat
// let textBox = document.getElementById("TextBox")
// function textBoxInChat() {
//   textBox.classList.add("open-TextBox")
// }



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
    this.eyeTint = 0x181818
    this.chat
    this.oldmessage = ''
    this.message
  }

  preload(){
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
    this.load.spritesheet('hairpiece','./assets/headSpritesheet2.png',{
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.spritesheet('shirt','./assets/shirtSpritesheet2.png',{
      frameWidth: 256,
      frameHeight: 512
    });
    this.load.spritesheet('pants','./assets/pantsSpritesheet2.png',{
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

    //creating jukebox
    this.jukebox.body.setCollideWorldBounds(true)
    this.jukebox.scale = ratio


    //creating cursorkeys input
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //making juke box only function when overlap
    this.physics.add.overlap(this.jukebox,this.player,this.onContact, null, this)

    //adding music particles
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

    //shirt animation 

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

    //tshirt animation
    this.anims.create({
      key: "tshirt-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shirt", {start: 14, end:17}),
      repeat: -1
    });
    this.anims.create({
      key: "tshirt-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shirt", {start: 10, end:13}),
      repeat: -1
    });

    //vest animation

    this.anims.create({
      key: "vest-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shirt", {start: 23, end:26}),
      repeat: -1
    });
    this.anims.create({
      key: "vest-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("shirt", {start: 19, end:22}),
      repeat: -1
    });

    //pants animation

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

    //skirt animation
    this.anims.create({
      key: "skirt-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("pants", {start: 14, end:17}),
      repeat: -1
    });
    this.anims.create({
      key: "skirt-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("pants", {start: 9, end:13}),
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


  //adding customization overlay
  this.customizeMenu = new CustomizationContainer(this,0,0)

  const customizeButton = this.add.group();
  const customizeRect = this.add.rectangle(0,0,225,100,0x322C2B)
  const customizeText = this.add.bitmapText(10,15,'mono','Customize','18')
  customizeText.setTint(0xE4C59E)
  customizeButton.add(customizeRect)
  customizeButton.add(customizeText)
  customizeRect.setInteractive();
  customizeRect.on('pointerup', () => { this.customizeMenu.create(),this.click.play()});

  //chatBox add
  // this.chatBox = new chatBox(this,0,0)

  // const chatBoxButton = this.add.group()
  // const chatBoxRect = this.add.rectangle(180,0,120,100,0x322C2B)
  // const chatBoxText = this.add.bitmapText(140,15,'mono','ChatBox','18')
  // chatBoxText.setTint(0xE4C59E)
  // chatBoxButton.add(chatBoxRect)
  // chatBoxButton.add(chatBoxText)
  // chatBoxRect.setInteractive()
  // chatBoxRect.on('pointerup', () => { this.chatBox.create(),this.click.play()});
  // chatBoxRect.on('pointerup', () => { 
  //   textBoxInChat()
  //   textBox.value = ""});

    //create new chat
    this.chat = this.add.text(this.player.body.position.x,this.player.body.position.y,this.message).setTint(0x000000).setOrigin(0,0).setAlign('center')
    //this.chat = this.add.text(0, 0, this.message).setTint(0x000000).setOrigin(0.5, 1).setAlign('center');

    //test for if the message pop up when it change, delete this when you update the message by input
    // this.time.addEvent({
    //   delay: 20000, 
    //   callback: () => this.message,
    //   callbackScope: this, 
    //   loop: true 
    // }); 
    
  
  }

  update(){
    this.movePlayer(); //updating player movement
    //playing music
    if(this.track1.isPlaying){
      this.emitter.start();
    }
    this.messagePopup()
    this.updateMessage()

  }

  movePlayer(){
    //jumping movement
    if(this.cursorKeys.up.isDown && this.player.body.blocked.down){
      this.playerGroup.setVelocityY(-150);
    }
    //left-right movement
    if(this.cursorKeys.left.isDown){
      this.playerGroup.setVelocityX(-this.playerSpeed); //player moving to the left
      //playing animations for playerGroup
      this.player.anims.play("left",true);
      this.eyes.setFrame(3)
      this.shoes.anims.play("shoes-left",true)
      this.acc.setFrame(this.accIndex+1)
      this.hair.setFrame(this.hairIndex+1)
      if(this.shirtIndex<18){
        this.shirt.anims.play('shirt-left',true)
      // }else if(this.shirtIndex<18){
      //   this.shirt.anims.play('tshirt-left')
      }else{
      this.shirt.anims.play("vest-left",true)
      }
      if(this.pantsIndex>8){
        this.pants.anims.play('skirt-left',true)
      }else{
        this.pants.anims.play('pants-left',true)
      }
    } else if(this.cursorKeys.right.isDown){
      this.player.anims.play("right",true); //player moving to the right
      this.playerGroup.setVelocityX(this.playerSpeed);
      this.eyes.setFrame(1)
      this.shoes.anims.play("shoes-right",true)
      this.acc.setFrame(this.accIndex+2)
      this.hair.setFrame(this.hairIndex+2)
      console.log(this.shirtIndex)
      if(this.shirtIndex<18){
        this.shirt.anims.play('shirt-right',true)
      // }else if(this.shirtIndex<16){
      //   this.shirt.anims.play('tshirt-right')
      }else{
      this.shirt.anims.play("vest-right",true)
      }
      if(this.pantsIndex>8){
        this.pants.anims.play('skirt-right',true)
      }else{
        this.pants.anims.play('pants-right',true)
      }
      
    }
    else{ //reseting player back to still
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

  onContact() { //allow jukebox to play
    this.jukebox.on('pointerup', () => {
      console.log("clicked");
      if (this.track1.isPlaying) {
        this.track1.pause();
      } else {
        this.track1.play();
      }
    });
  }
  messagePopup(){
    this.chat.setText(this.message)
    this.chat.setPosition(this.player.body.position.x,this.player.body.position.y)

    //detect message change
    if(this.message != this.oldmessage){
      this.chat.setAlpha(1)
      this.pop.play()
      this.oldmessage = this.message
      this.time.addEvent({
        delay: 15000, 
        callback: () => {this.chat.setAlpha(0), this.message = ''},
        callbackScope: this, 
        loop: true 
    });
    }
    this.updateMessage()
  }

  updateMessage() {
    const chatInput = document.getElementById("TextBox")
    const sentButton = document.getElementById("textButton")

    chatInput.addEventListener('keydown', (event)=>{
      if (event.key === 'Enter') {
        if(!flipFlop){
        const newMessage = chatInput.value
        this.message = newMessage
        console.log(this.message)
        flipFlop = true
        chatInput.value = ''
        }
      }
      // if(event.key === "Enter" && this.message != ""){
      //   this.clearChat()
      // }
      else{
        flipFlop = false;
      }
    })
    // sentButton.addEventListener('click', () => {
    //   if(!flipFlop){
    //   const newMessage = chatInput.value
    //   console.log(newMessage)
    //   this.message = newMessage
    //   flipFlop = true
    //   }
    //   else{
    //     flipFlop = false
    //   }

    // })
  }

  // clearChat() {
  //   const chatInput = document.getElementById("TextBox")
  //   chatInput.value = ""
  // }

  


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

