var socket = io.connect('http://localhost');

var sessionKey="";
var username="";
var raphael;
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

$( document ).ready(function(){
    $("#uname_modal").modal({
        //backdrop:'static'
    });
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
    command_str = "wasd ";
    return command_str.indexOf(keystroke) != -1;
}

socket.on("sessionKey",function(data){
    sessionKey = data.sessionKey;
});

socket.on("heartbeat",function(data){
    socket.emit('command',{
        'command':command,
        'sessionKey':sessionKey
    });
    draw(data);
});

function login(){
    username=$("#uname_input").val();
    socket.emit('login',{name:username});
    $("#uname_modal").modal('hide');
    $("#canvas").mousemove(function(e){           
        command.mouse.x = e.clientX-this.offsetLeft-Math.floor($("#"+CANVAS_ID).width()/2);
        command.mouse.y = -(e.clientY - this.offsetTop-Math.floor($("#"+CANVAS_ID).height()/2));
        console.log("x: " + command.mouse.x);
        console.log("y: " + command.mouse.y);
    });

    $("#"+CANVAS_ID).mouseup(function(e){
        command.mouse.click=false;
    });

    $("#"+CANVAS_ID).mousedown(function(e){
        command.mouse.click=true;
        console.log("clicked")
    });
}

window.onunload=function(){
    if (sessionKey!=undefined){
        socket.emit('logout',{sessionKey:sessionKey});
    }
}
