exports.Game=function(players){
    this.players=players;
    this.step=function(){

        //Force loop
        for (sessionKey in this.players){
            player = this.players[sessionKey];
            command = player.command;

            //Reinit all accelerations
            player.ax=0;
            player.ay=0;

            //Apply Commands
            if (command.keyboard['w']){
                player.ay+=constants.player_acceleration;
            }
            if (command.keyboard['a']){
                player.ax-=constants.player_acceleration;
            }
            if (command.keyboard['d']){
                player.ax+=constants.player_acceleration;
            }

            if (player.y-constants.player_height/2<=constants.ground_height){
                //Hit the ground
                if (player.vy<0){
                    player.vy=0;
                }
                if (player.y<0){
                    player.y=0;
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
                player2 = this.players[sessionKey2];
                if (player1.identifier != player2.identifier){
                    if (detectCollision1d(player1.x,player1.vx,constants.player_width,player2.x,player2.vx,constants.player_width) && detectCollision1d(player1.y,player1.vy,constants.player_height,player2.y,player2.vy,constants.player_height)){
                        //There is a collision. Find out if it is lateral or vertical.
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
                }
            }
        }
        for (sessionKey in this.players){
            update(this.players[sessionKey]);
        }
    }
}

function update(obj){
    obj.vx+=obj.ax;
    obj.vy+=obj.ay;
    obj.x+=obj.vx;
    obj.y+=obj.vy;
    //Pointless comment
}
function detectCollision1d(a,va,wa,b,vb,wb){
    if (a+wa/2<b-wb/2 && a+wa/2+va>b-wb/2+vb){
        console.log("t");
        return true;
    }
    if (b+wb/2<a-wa/2 && b+wb/2+vb>a-wa/2+va){
        console.log("t");
        return true;
    }
    console.log("f");
    return false
}
