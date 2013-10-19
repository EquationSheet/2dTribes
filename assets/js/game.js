var world = new World();

function World() {

    this.getXYCoord=function(context) {
        return context['you'];
    }

    this.getPlayers=function(context) {
        return [context['list']]
    }

    this.IDKey=function(context) {
        return context['identifier']
    }

    this.draw=function(context) {
        var playersToDraw = this.getPlayers(context);
        var currCoord = this.getXYCoord(context);
        var canvas = Raphael(screen.width/2,screen.height/2,screen.width,screen.height)

        for (var player in playersToDraw) {
            if (player.identifier == selfID) {
                var circle = canvas.circle(screen.width/2,screen.height/2,20);
                circle.attr("fill",'#00f');
                circle.attr('stroke','#fff');
            }
            else if (Math.abs(player.x-currCoord.x) > screen.width/2 || Math.abs(player.y-currCoord.y) > screen.height/2) {
                continue;
            }
            else {
                var circle = canvas.circle(currCoord.x - player.x,currCoord.y - player.y,20);
                circle.attr("fill",'#f00');
                circle.attr("stroke","#fff");
            }
        }
    }
}


