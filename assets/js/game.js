/**$( document ).ready(function(){
    var world = new World();
    console.log("HELLO BITCH!");
});**/

//function World() {

    getXYCoord=function(context) {
        return context['you'];
    }

    getPlayers=function(context) {
        return [context['list']]
    }

    IDKey=function(context) {
        return context['identifier']
    }

    draw=function(context,raphael) {
        var playersToDraw = getPlayers(context);
        var currCoord = getXYCoord(context);
        var selfID = IDKey(context);

        for (var player in playersToDraw) {
            if (player.identifier == selfID) {
                var circle = raphael.circle(screen.width/2,screen.height/2,20);
                circle.attr("fill",'#00f');
                circle.attr('stroke','#fff');
            }
            else if (Math.abs(player.x-currCoord.x) > screen.width/2 || Math.abs(player.y-currCoord.y) > screen.height/2) {
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


