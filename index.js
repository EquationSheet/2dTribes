var io = require('socket.io');
var async = require('async');
var http = require('http');
var constants = require('./constants.js').constants;
var requestHandler = require('./serveFiles.js').requestHandler;
var Player = require('./player.js').Player;
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
                    console.log("Creating player "+players[key]);
                    key=genSessionKey();
                    players[key] = new Player(genIdentifier(),socket,data.name);
                    socket.emit('sessionKey',{sessionKey:key});
                });
                socket.on('logout',function(data){
                    console.log("Deleting player "+players[key]);
                    delete(players[data.sessionKey]);
                });
                socket.on('command',function(data){
                    players[data.sessionKey].command=data.command;
                });
            });
        },
        function startHeartbeat(next){
            setInterval(function(){
                playerList=[];
                for (sessionKey in players){playerList.push(players[sessionKey]);}
                for (sessionKey in players){
                    player = players[sessionKey];
                    player.socket.emit('heartbeat',{
                        you:players[sessionKey],
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
    }
}
function genIdentifier(){
    if (this.count==undefined){
        this.counter=0;
        return 0;
    }
    this.counter+=1;
    return this.counter;
}
