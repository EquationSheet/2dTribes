constants=require('./constants.js').constants;
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
}


