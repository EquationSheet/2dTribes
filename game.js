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
            if (command['w']){
                player.ay+=constants.player_acceleration;
            }
            if (command['a']){
                player.ax-=constants.player_acceleration;
            }
            if (command['d']){
                player.ax+=constants.player_acceleration;
            }

            if (player.y-constants.player_height/2<=constants.ground_height){
                //Apply Friction
                if (command[' ']){
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
    }
}

function update(obj){
    obj.vx+=obj.ax;
    obj.vy+=obj.ay;
    obj.x+=obj.vx;
    obj.y+=obj.vy;
    //Pointless comment
}
