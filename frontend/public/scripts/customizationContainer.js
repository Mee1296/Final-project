const sizes = {
    width:960,
    height:540
  }

const characterRatio = 0.6

class CustomizationContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
      super(scene, x, y);
  
    }
    preload(){
    }
    create(){
      const arrowY = 64
      const leftArrowX = 25
      const rightArrowX = leftArrowX+210
      const arrowGap = 45

      const colorArray = [0xffffff,0x181818,0xB8B8B8,0xff0000,0xff8d00,0xffdf00,
        0x02ff00,0x008000,0x00d9ff,0x006dff,0x7e47ff,0xef7aff,0xb55700]
      const hairColorArray = [0xffffff,0x181818,0x3d3d3d,0x593722,0xfcba03,0xE17D17,0xff0000,0xff8d00,0xffdf00,
            0x02ff00,0x008000,0x00d9ff,0x006dff,0x7e47ff,0xef7aff,0xb55700]


        // creating customization overlay as container
    
      const container = this.scene.add.container(this.x,this.y)
  
      const rect = this.scene.add.rectangle(0,0,sizes.width/3+10,sizes.height,0xA79277,1).setOrigin(0,0)
      const exit = this.scene.add.image(sizes.width/3-20,30,'exit').setScale(0.2)
      const heading = this.scene.add.bitmapText(100,30,'mono','CUSTOMIZE',20)
      const displayRect = this.scene.add.rectangle(74,60,158,320,0x000000,1).setOrigin(0,0)


      //displaying character in displayRect
      const characterDisplay = this.scene.add.image(74,60,'baseplayer').setOrigin(0,0).setScale(characterRatio).setTint(this.scene.skinTint)
      const characterHairDisplay = this.scene.add.sprite(74,60,'hairpiece',this.scene.hairIndex).setOrigin(0,0).setScale(characterRatio).setTint(hairColorArray.at(this.scene.hairColor))
      const characterShirtDisplay = this.scene.add.sprite(74,60,'shirt',this.scene.shirtIndex).setOrigin(0,0).setScale(characterRatio).setTint(colorArray.at(this.scene.shirtColor))
      const characterPantsDisplay = this.scene.add.sprite(74,60,'pants',this.scene.pantsIndex).setOrigin(0,0).setScale(characterRatio).setTint(colorArray.at(this.scene.pantsColor))
      const characterAccDisplay = this.scene.add.sprite(74,60,'acc',this.scene.accIndex).setOrigin(0,0).setScale(characterRatio)
      const characterEyeDisplay = this.scene.add.sprite(74,60,'eyes',0).setOrigin(0,0).setScale(characterRatio).setTint(this.scene.eyeTint)
      const characterShoeDisplay = this.scene.add.sprite(74,60,"shoes",0).setOrigin(0,0).setScale(characterRatio).setAlpha(this.scene.shoeAlpha).setTint(this.scene.shoeTint)
  
      //adding arrows
      const leftarrow1 =  this.scene.add.image(leftArrowX,arrowY,'leftarrow').setOrigin(0,0).setScale(0.17).setTint(0x08ff00)
      const rightarrow1 =  this.scene.add.image(rightArrowX,arrowY,'rightarrow').setOrigin(0,0).setScale(0.17).setTint(0x08ff00)
      const leftarrow2 =  this.scene.add.image(leftArrowX,arrowY+(arrowGap),'leftarrow').setOrigin(0,0).setScale(0.17).setTint(0xfc97ff)
      const rightarrow2 =  this.scene.add.image(rightArrowX,arrowY+(arrowGap),'rightarrow').setOrigin(0,0).setScale(0.17).setTint(0xfc97ff)
      const leftarrow3 =  this.scene.add.image(leftArrowX,arrowY+(arrowGap*2),'leftarrow').setOrigin(0,0).setScale(0.17).setTint(0x08ff00)
      const rightarrow3 =  this.scene.add.image(rightArrowX,arrowY+(arrowGap*2),'rightarrow').setOrigin(0,0).setScale(0.17).setTint(0x08ff00)
      const leftarrow4 =  this.scene.add.image(leftArrowX,arrowY+(arrowGap*3),'leftarrow').setOrigin(0,0).setScale(0.17).setTint(0xfc97ff)
      const rightarrow4 =  this.scene.add.image(rightArrowX,arrowY+(arrowGap*3),'rightarrow').setOrigin(0,0).setScale(0.17).setTint(0xfc97ff)
      const leftarrow5 =  this.scene.add.image(leftArrowX,arrowY+(arrowGap*4),'leftarrow').setOrigin(0,0).setScale(0.17).setTint(0x08ff00)
      const rightarrow5 =  this.scene.add.image(rightArrowX,arrowY+(arrowGap*4),'rightarrow').setOrigin(0,0).setScale(0.17).setTint(0x08ff00)
      const leftarrow6 =  this.scene.add.image(leftArrowX,arrowY+(arrowGap*5),'leftarrow').setOrigin(0,0).setScale(0.17).setTint(0xfc97ff)
      const rightarrow6 =  this.scene.add.image(rightArrowX,arrowY+(arrowGap*5),'rightarrow').setOrigin(0,0).setScale(0.17).setTint(0xfc97ff)
      const leftarrow7 =  this.scene.add.image(leftArrowX,arrowY+(arrowGap*6),'leftarrow').setOrigin(0,0).setScale(0.17).setTint(0xfcff00)
      const rightarrow7 =  this.scene.add.image(rightArrowX,arrowY+(arrowGap*6),'rightarrow').setOrigin(0,0).setScale(0.17).setTint(0xfcff00)
  
      //adding skincolor
      const skinColor = this.scene.add.bitmapText(10,410,'mono','Skin Color',20).setOrigin(0,0)
      const blackBox1 = this.scene.add.rectangle(130,400,193,40,0x000000,1).setOrigin(0,0)
      const skin1 = this.scene.add.rectangle(133,402.5,35,35,0xffdbac,1).setOrigin(0,0)
      const skin2 = this.scene.add.rectangle(171,402.5,35,35,0xffbc6e,1).setOrigin(0,0)
      const skin3 = this.scene.add.rectangle(209,402.5,35,35,0xe1a363,1).setOrigin(0,0)
      const skin4 = this.scene.add.rectangle(247,402.5,35,35,0xbf7848,1).setOrigin(0,0)
      const skin5 = this.scene.add.rectangle(285,402.5,35,35,0x985d37,1).setOrigin(0,0)
  
      
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
  
      
      //adding everything to the container
      container.add(rect)
      container.add(exit)
      container.add(heading)
      container.add(displayRect)

      container.add(characterDisplay)
      container.add(characterEyeDisplay)
      container.add(characterShirtDisplay)
      container.add(characterAccDisplay)
      container.add(characterHairDisplay)
      container.add(characterPantsDisplay)
      container.add(characterShoeDisplay)
      
  
      container.add(leftarrow1)
      container.add(rightarrow1)
      container.add(leftarrow2)
      container.add(rightarrow2)
      container.add(leftarrow3)
      container.add(rightarrow3)
      container.add(leftarrow4)
      container.add(rightarrow4)
      container.add(leftarrow5)
      container.add(rightarrow5)
      container.add(leftarrow6)
      container.add(rightarrow6)
      container.add(leftarrow7)
      container.add(rightarrow7)
  
      container.add(skinColor)
      container.add(blackBox1)
      container.add(skin1)
      container.add(skin2)
      container.add(skin3)
      container.add(skin4)
      container.add(skin5)
  
  
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
        
      //creating exit button
      exit.setInteractive();
      exit.on('pointerup', () => { container.destroy(),this.scene.click.play()});
  
      //hair changer
      leftarrow1.setInteractive();
      leftarrow1.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.hairIndex-3 < 0){
          this.scene.hairIndex = 39
        }else{
          this.scene.hairIndex -= 3
        }
        characterHairDisplay.setFrame(this.scene.hairIndex)
      });
      rightarrow1.setInteractive();
      rightarrow1.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.hairIndex+3>39){
          this.scene.hairIndex = 0
        }else{
          this.scene.hairIndex +=3 
        }

        //change display
        characterHairDisplay.setFrame(this.scene.hairIndex)
      });
  
      //hair color changer
      leftarrow2.setInteractive();
      leftarrow2.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.hairColor-1 < 0){
          this.scene.hairColor = hairColorArray.length-1
        }else{
          this.scene.hairColor--
        }
        this.scene.hair.setTint(hairColorArray.at(this.scene.hairColor))
        characterHairDisplay.setTint(hairColorArray.at(this.scene.hairColor))
      });
      rightarrow2.setInteractive();
      rightarrow2.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.hairColor+1>=hairColorArray.length){
            this.scene.hairColor = 0
          }else{
            this.scene.hairColor++
          }
          console.log(hairColorArray.at(this.scene.hairColor))
          this.scene.hair.setTint(hairColorArray.at(this.scene.hairColor))
          characterHairDisplay.setTint(hairColorArray.at(this.scene.hairColor))
      });
  
      //top changer
      leftarrow3.setInteractive();
      leftarrow3.on('pointerup', () => { 
          this.scene.pop.play()
        //console.log('Left Arrow3 Pressed!')
        if(this.scene.shirtIndex-9<0){
          this.scene.shirtIndex = 27
        }else{
          this.scene.shirtIndex -= 9
        }
        if(this.scene.shirtIndex === 27){
            this.scene.shirt.setAlpha(0)
            console.log('hello')
        }else{
            this.scene.shirt.setAlpha(1)
        }
        this.scene.shirt.setFrame(this.scene.shirtIndex)
        characterShirtDisplay.setFrame(this.scene.shirtIndex)
      });
      rightarrow3.setInteractive();
      rightarrow3.on('pointerup', () => { 
        this.scene.pop.play()
        //console.log('Right Arrow3 Pressed!')
        if(this.scene.shirtIndex+9>35){
          this.scene.shirtIndex = 0
        }else{
          this.scene.shirtIndex += 9
        }
        if(this.scene.shirtIndex === 27){
            this.scene.shirt.setAlpha(0)
            console.log('hello')
        }else{
            this.scene.shirt.setAlpha(1)
        }
        this.scene.shirt.setFrame(this.scene.shirtIndex)
        characterShirtDisplay.setFrame(this.scene.shirtIndex)
      });
  
      //top color changer
      leftarrow4.setInteractive();
      leftarrow4.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.shirtColor-1 < 0){
          this.scene.shirtColor = colorArray.length-1
        }else{
          this.scene.shirtColor--
        }
        this.scene.shirt.setTint(colorArray.at(this.scene.shirtColor))
        characterShirtDisplay.setTint(colorArray.at(this.scene.shirtColor))
  
      });
      rightarrow4.setInteractive();
      rightarrow4.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.shirtColor+1>=colorArray.length){
          this.scene.shirtColor = 0
        }else{
          this.scene.shirtColor++
        }
        this.scene.shirt.setTint(colorArray.at(this.scene.shirtColor))
        characterShirtDisplay.setTint(colorArray.at(this.scene.shirtColor))
      });
  
      //pants changer
      leftarrow5.setInteractive();
      leftarrow5.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.pantsIndex-9<0){
          this.scene.pantsIndex = 9
        }else{
          this.scene.pantsIndex -= 9
        }
        this.scene.pants.setFrame(this.scene.pantsIndex)
        characterPantsDisplay.setFrame(this.scene.pantsIndex)
      });
      rightarrow5.setInteractive();
      rightarrow5.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.pantsIndex+9>17){
          this.scene.pantsIndex = 0
        }else{
          this.scene.pantsIndex += 9
        }
        this.scene.pants.setFrame(this.scene.pantsIndex)
        characterPantsDisplay.setFrame(this.scene.pantsIndex)
      });
  
      //pants color changer
      leftarrow6.setInteractive();
      leftarrow6.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.pantsColor-1 < 0){
          this.scene.pantsColor = colorArray.length-1
        }else{
          this.scene.pantsColor--
        }
        this.scene.pants.setTint(colorArray.at(this.scene.pantsColor))
        characterPantsDisplay.setTint(colorArray.at(this.scene.pantsColor))
      });
      rightarrow6.setInteractive();
      rightarrow6.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.pantsColor+1>=colorArray.length){
          this.scene.pantsColor = 0
        }else{
          this.scene.pantsColor++
        }
        this.scene.pants.setTint(colorArray.at(this.scene.pantsColor))
        characterPantsDisplay.setTint(colorArray.at(this.scene.pantsColor))
      });

      //acc selector
      leftarrow7.setInteractive();
      leftarrow7.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.accIndex-3 < 0){
          this.scene.accIndex = 36
        }else{
          this.scene.accIndex -= 3
        }
        characterAccDisplay.setFrame(this.scene.accIndex)
      });
      rightarrow7.setInteractive();
      rightarrow7.on('pointerup', () => { 
        this.scene.pop.play()
        if(this.scene.accIndex+3>36){
          this.scene.accIndex = 0
        }else{
          this.scene.accIndex +=3 
        }
        characterAccDisplay.setFrame(this.scene.accIndex)
      });
  
      //skin color
  
      skin1.setInteractive()
      skin1.on('pointerup',() => {
        this.scene.player.setTint(0xffffff)
        characterDisplay.setTint(0xffffff)
        this.scene.skinTint = 0xffffff
        ,this.scene.pop.play()
      })
  
      skin2.setInteractive()
      skin2.on('pointerup',() => {
        this.scene.player.setTint(0xFfda9f)
        characterDisplay.setTint(0xFfda9f)
        this.scene.skinTint = 0xFfda9f
        ,this.scene.pop.play()
      })
  
      skin3.setInteractive()
      skin3.on('pointerup',() => {
        this.scene.player.setTint(0xe1bd8e)
        characterDisplay.setTint(0xe1bd8e)
        this.scene.skinTint = 0xe1bd84
        ,this.scene.pop.play()
      })
  
      skin4.setInteractive()
      skin4.on('pointerup',() => {
        this.scene.player.setTint(0xBf8b68)
        characterDisplay.setTint(0xBf8b68)
        this.scene.skinTint = 0xBf8b68
        ,this.scene.pop.play()
      })
  
      skin5.setInteractive()
      skin5.on('pointerup',() => {
        this.scene.player.setTint(0x986c4f)
        characterDisplay.setTint(0x986c4f)
        this.scene.skinTint = 0x986c4f
        ,this.scene.pop.play()
      })
  
  
      //eye color
  
      eye1.setInteractive()
      eye1.on('pointerup',() => {
        this.scene.eyes.setTint(0x181818)
        characterEyeDisplay.setTint(0x181818)
        this.scene.eyeTint = 0x1818181
        ,this.scene.pop.play()
      })
  
      eye2.setInteractive()
      eye2.on('pointerup',() => {
        this.scene.eyes.setTint(0x593722)
        characterEyeDisplay.setTint(0x593722)
        this.scene.eyeTint = 0x593722
        ,this.scene.pop.play()
      })
  
      eye3.setInteractive()
      eye3.on('pointerup',() => {
        this.scene.eyes.setTint(0x79a3dd)
        characterEyeDisplay.setTint(0x79a3dd)
        this.scene.eyeTint = 0x79a3dd
        ,this.scene.pop.play()
      })
  
      eye4.setInteractive()
      eye4.on('pointerup',() => {
        this.scene.eyes.setTint(0xA58454)
        characterEyeDisplay.setTint(0xA58454)
        this.scene.eyeTint = 0xA58454
        ,this.scene.pop.play()
      })
  
      eye5.setInteractive()
      eye5.on('pointerup',() => {
        this.scene.eyes.setTint(0x568A62)
        characterEyeDisplay.setTint(0x568A62)
        this.scene.eyeTint = 0x568a62
        ,this.scene.pop.play()
      })
  
  
  
      //shoe color
      shoe1.setInteractive()
      shoe1.on('pointerup',() => {
        this.scene.shoes.setAlpha(1),
        this.scene.shoes.setTint(0xffffff),
        characterShoeDisplay.setAlpha(1).setTint(0xffffff)
        this.scene.shoeAlpha = 1
        this.scene.shoeTint = 0xffffff
        this.scene.pop.play()
      })
  
      shoe2.setInteractive()
      shoe2.on('pointerup',() => {
        this.scene.shoes.setAlpha(1)
        this.scene.shoes.setTint(0x3d3d3d),
        characterShoeDisplay.setAlpha(1).setTint(0x3d3d3d)
        this.scene.shoeAlpha = 1
        this.scene.shoeTint = 0x3d3d3d
        this.scene.pop.play()
      })
  
      shoe3.setInteractive()
      shoe3.on('pointerup',() => {
        this.scene.shoes.setAlpha(1),
        this.scene.shoes.setTint(0xff0000),
        characterShoeDisplay.setAlpha(1).setTint(0xff0000)
        this.scene.shoeAlpha = 1
        this.scene.shoeTint = 0xff0000
        this.scene.pop.play()
      })
  
      shoe4.setInteractive()
      shoe4.on('pointerup',() => {
        this.scene.shoes.setAlpha(1),
        this.scene.shoes.setTint(0xc45f00)
        characterShoeDisplay.setAlpha(1).setTint(0xc45f00)
        this.scene.shoeAlpha = 1
        this.scene.shoeTint = 0xc45f00
        ,this.scene.pop.play()
      })
  
      shoe5.setInteractive()
      shoe5.on('pointerup',() => {
        this.scene.shoes.setAlpha(0),
        characterShoeDisplay.setAlpha(0)
        this.scene.shoeAlpha = 0
        this.scene.pop.play()
      })
  
      
  

      
  
  
    }
  }


  

export default CustomizationContainer