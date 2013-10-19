var raphael=require('./raphael.js').raphael;
var Player = require('./player.js').Player;
var constants=require('./constants.js').constants;

function World(sessions) {
    this.sessions = sessions;

    this.getXYCoord=function(context) {
        return context['you'];
    }

    this.getPlayers=function(context) {
        return [context['list']]
    }

    this.IDKey=function(context) {
        return context['identifier']
    }

    this.getRelativeCoordinateFilter=function(context) {
        var currCoord = this.getXYCoord(context);
        var players = this.getPlayers(context);
        var selfID = this.IDKey(context);
        for player in players {
            if (player.identifier == selfID) {
                players.remove(player);           
            }
            else if (Math.abs(player.x-currCoord.x) > canvas.width/2 || Math.abs(player.y-currCoord.y) > canvas.height/2) {
                players.remove(player)
            }
            else {
                player.x = canvas.width/2 + player.x-currCoord.x
                player.y = canvas.height/2 + player.y-currCoord.y
            }
        }
        return players
    }

    this.draw = function(context) {

    }


}


