var constants = require('./constants').constants;
exports.Game=function(players){
    this.players=players;
    this.step=function(){

        //Force loop
        for (sessionKey in this.players){
            player = this.players[sessionKey];
            command = player.command;
            if(player.cooldown > 0){
                player.cooldown--;
            }
            //Reinit all accelerations
            player.ax=0;
            player.ay=0;

            //Apply Commands
            if (command.keyboard['w']){
                if (player.jetpackfuel>0){
                    player.ay+=constants.player_acceleration;
                    player.jetpackfuel-=constants.jetpackBurnRate;
                }
            }
            if (command.keyboard['a']){
                player.ax-=constants.player_acceleration;
            }
            if (command.keyboard['d']){
                player.ax+=constants.player_acceleration;
            }
            if (command.mouse.click) {
                if(player.cooldown == 0){
                    player.spawnBullet(command.mouse.x,command.mouse.y,player.x,player.y,player.vx,player.vy);
                    player.cooldown = constants.bul_cooldown;
                }
            }
            if (player.y-constants.player_height/2<=constants.ground_height){
                //Hit the ground
                if (player.jetpackfuel<constants.startJetpackFuel){
                    player.jetpackfuel+=constants.jetpackRechargeRate;
                }
                if (player.vy<0){
                    player.vy=0;
                }
                if (player.y-constants.player_height/2<0){
                    player.y=constants.player_height/2;
                }
                //Apply Friction
                if (command.keyboard[' ']){
                    player.ax-=constants.air_coef_of_friction*player.vx
                }else{
                    player.ax-=constants.ground_coef_of_friction*player.vx
                }
            }else{
                //Apply Gravity
                player.ay-=constants.gravity_acceleration;

                //Apply Friction
                player.ax-=constants.air_coef_of_friction*player.vx
                player.ay-=constants.air_coef_of_friction*player.vy
            }
        }
        //Collision detection
        for (sessionKey1 in this.players){
            player1 = this.players[sessionKey1];
            for (sessionKey2 in this.players){
                if (player1.identifier == this.players[sessionKey2].identifier) {
                    continue;
                }
                player2 = this.players[sessionKey2];

                //console.log("Player 1 vx:"+player1.vx);
                //console.log("Player 2 vx:"+player2.vx);
                //console.log("Player 1 vy:"+player1.vy);
               // //console.log("Player 2 vy:"+player2.vy);

                if (detectCollision1d(player1.x,player1.vx,constants.player_width,player2.x,player2.vx,constants.player_width) && detectCollision1d(player1.y,player1.vy,constants.player_height,player2.y,player2.vy,constants.player_height)){
                    //There is a collision. Find out if it is lateral or vertical.
                    //console.log('I detected a collision');
                    if (Math.abs(player1.y-player2.y)>=constants.player_height){
                        var temp=player1.vy;
                        player1.vy=player2.vy;
                        player2.vy=temp;
                    }else{
                        var temp=player1.vx;
                        player1.vx=player2.vx;
                        player2.vx=temp;
                    }
                }

                //Detect bullet collision
            }
        }
        for (sessionKey in this.players){
            update(this.players[sessionKey]);
            for( bullet in this.players[sessionKey].bulletList ){
                update_bullet(this.players[sessionKey].bulletList[bullet]);
            }
        }
    }
}


function update_bullet(obj){
    obj.x += obj.vx;
    obj.y += obj.vy;
}
function update(obj){
    obj.vx+=obj.ax;
    obj.vy+=obj.ay;
    obj.x+=obj.vx;
    obj.y+=obj.vy;
    //Pointless comment
}
function detectCollision1d(a,va,wa,b,vb,wb){
    if (a <= b && a+wa/2+va >= b-wb/2+vb ) {
        return true
    }
    else if (b <= a && b+wa/2+vb >= a-wa/2+va) {
        return true
    }
    return false
}
