var io = require('socket.io');
var async = require('async');
var http = require('http');
var constants = require('./constants.js').constants;
var requestHandler = require('./serveFiles.js').requestHandler;



async.series([
        function printStarting(next){
            console.log("Server starting...");
            next();
        },
        function serveFiles(next){
            var server = http.createServer(requestHandler).listen(constants.port,function(){console.log("http started.");next();});
        },
        function finish(next){
            console.log("Server started.");
            console.log("Listening at http://localhost:1759");
            console.log("Press Ctrl-c to stop.");
        }
]);
