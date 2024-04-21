// TODO0: change the BACKEND_URL to your EC2 public IPv4
export const BACKEND_URL = "http://localhost:3222";

// TODO0: change element in MEMBERS to your group members.
// WARNING: the _id parameters is required.
export const config = {
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