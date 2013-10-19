var socket = require("socket");
var sessionKey="";
var username="";
var command={
    keyboard:{
        "w":false,
        "a":false,
        "s":false,
        "d":false,
        " ":false,
    },
    mouse:{
        click:false,
        x:0,
        y:0,
    },
};

$("#"+CANVAS_ID).mousemove(function(e){           
    command.mouse.x = e.clientX-this.offsetLeft-Math.floor($("#"+CANVAS_ID).width()/2);
    command.mouse.y = -(e.clientY - this.offsetTop-Math.floor($("#"+CANVAS_ID).height()/2));
});

$("#"+CANVAS_ID).mouseup(function(e){
    command.mouse.click=false;
});

$("#"+CANVAS_ID).mousedown(function(e){
    command.mouse.click=true;
});

$( document ).keydown(function(e){
    var key = String.fromCharCode(e.which).toLowerCase() 
    if(isCommand(key)){
        command.keyboard[key]=true;
    }
});

$( document ).keyup(function(e){
    var key = String.fromCharCode(e.which).toLowerCase() 
    if(isCommand(key)){
        command.keyboard[key]=false;
    }
});

function isCommand(keystroke){
    command_str = "wasd "
    return command_str.indexOf(keystroke) != -1
}}