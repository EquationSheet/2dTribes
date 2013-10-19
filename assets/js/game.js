/**$( document ).ready(function(){
    var world = new World();
    console.log("HELLO BITCH!");
});**/

var GAMEWIDTH=window.innerWidth
var GAMEHEIGHT=window.innerHeight

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');

function draw(data){
    var me = data['you'];
    var playerList = data['list'];
    for (var i = 0; i < playerList.length; i++){
        player=playerList[i];
    }
}

function graphics(ctx){
    this.clear=function(color){
        ctx.filStyle=color;
        ctx.fillRect(0,0,GAMEWIDTH,GAMEHEIGHT);
        ctx.fill();
    }
    this.centerRect=function(x,y,width,height,color){
        ctx.rect();
    }
}

/*
//function World() {

    getXYCoord=function(context) {
        return context['you'];
    }

    getPlayers=function(context) {
        return context['list']
    }

    IDKey=function(context) {
        return context.you.identifier
    }

    draw=function(context,raphael) {
        var playersToDraw = getPlayers(context);
        var currCoord = getXYCoord(context);
        var selfID = IDKey(context);

        for (var i in playersToDraw) {
            player=playersToDraw[i];
            console.log(player);
            console.log("ID"+selfID);

            if (player.identifier == selfID) {
                var circle = raphael.circle(GAMEWIDTH/2,GAMEHEIGHT/2,20);
                circle.attr("fill",'#00f');
                circle.attr('stroke','#fff');
            }
            else if (Math.abs(player.x-currCoord.x) > GAMEWIDTH/2 || Math.abs(player.y-currCoord.y) > GAMEHEIGHT/2) {
                continue;
            }
            else {
                var circle = raphael.circle(currCoord.x - player.x,currCoord.y - player.y,20);
                circle.attr("fill",'#f00');
                circle.attr("stroke","#fff");
            }
        }
    }
//}

*/
