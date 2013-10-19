constants=require('./constants.js').constants;
bullet=require('./bullet.js').bullet;
exports.Player=function(identifier,socket,name){
    //Administrvia
    this.identifier = identifier;
    this.socket=socket;
    this.command={
        keyboard:{
            'w':false,
            'a':false,
            's':false,
            'd':false,
            ' ':false,
        },
        mouse:{
            'x':0,
            'y':0,
            'click':false,
        },
    };

    //Bio Data
    this.name=name;

    //Position
    this.x=constants.spawnX;
    this.y=constants.spawnY;
    this.vx=0;
    this.vy=0;
    this.ax=0;
    this.ay=0;

    //Gameplay
    this.health=constants.startHealth;
    this.bulletList = [];

    //Util
    this.digest=function(){
        return {
            x:this.x,
            y:this.y,
            health:this.health,
            name:this.name,
            identifier:this.identifier,
            bulletList:this.bulletList
        }
    }

    this.spawnBullet=function(mouseX,mouseY,playX,playY,playVx,playVy){
       var bullet = new Bullet(playX,playY,constants.BUL_VEL*mouseX/Math.sqrt(x*x+y*y) + playVx,constants.BUL_VEL*mouseY/Math.sqrt(x*x+y*y) + playVy)
       if (this.bulletList.length >= 20) {
           bulletList.splice(0,1);
           bulletList.push(bullet);
        }
        else {
            bulletList.push(bullet);
        }
    }
}
exports.Bullet=function(socket,player) {
    this.socket = socket;
    this.player = player; //Owner of the bullet.
}
