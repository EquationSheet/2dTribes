var io = require('socket.io');
var async = require('async');
var http = require('http');
var constants = require('./constants.js').constants;
var requestHandler = require('./serveFiles.js').requestHandler;
var Player = require('./player.js').Player;
var Bullet = require('./bullet.js').Bullet;
var Game = require('./game.js').Game;


var allSockets;
var game;
var players={};
var identifiers={}

async.series([
        function printStarting(next){
            console.log("Server starting...");
            next();
        },
        function makeGame(next){
            game = new Game(players);
            next();
        },
        function serveFiles(next){
            var server = http.createServer(requestHandler).listen(constants.port,function(){console.log("http started.");next();});
            allSockets=io.listen(server,{'log':false}).on('connection',function(socket){
                socket.on('login',function(data){
                    key=genSessionKey();
                    players[key] = new Player(genIdentifier(),socket,data.name);
                    console.log("Creating player "+players[key]);
                    socket.emit('sessionKey',{sessionKey:key});
                });
                socket.on('logout',function(data){
                    console.log("logout recieved")
                    if (data.sessionKey!=undefined){
                        delete(players[data.sessionKey]);
                    }
                });
                socket.on('command',function(data){
                    players[data.sessionKey].command=data.command;
                });
            });
        },
        function startHeartbeat(next){
            setInterval(function(){
                //for (sessionKey in players){
                    //console.log(players[sessionKey].name+" "+players[sessionKey].identifier+" "+": ("+players[sessionKey].x+","+players[sessionKey].y+")")
                //}
                playerList=[];
                for (sessionKey in players){
                    playerList.push(players[sessionKey].digest());
                }
                for (sessionKey in players){
                    player = players[sessionKey];
                    player.socket.emit('heartbeat',{
                    you:players[sessionKey].digest(),
                    list:playerList, 
                    });
                }
                game.step();
            },constants.heartbeat_period);
            next();
        },
        function finish(next){
            console.log("Server started.");
            console.log("Listening at http://localhost:1759");
            console.log("Press Ctrl-c to stop.");
        }
]);

function genSessionKey(){
    var key = Math.floor(Math.random()*500000923).toString(16);
    if (key in players){
        return genSessionKey();
    }
    return key;
}
var count=-1
function genIdentifier(){
    count+=1;
    return count;
}
