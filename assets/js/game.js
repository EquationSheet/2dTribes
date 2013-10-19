/**$( document ).ready(function(){
  var world = new World();
  console.log("HELLO BITCH!");
  });**/

var GAMEWIDTH, GAMEHEIGHT, canvas, ctx, graphics

$(document).ready(function(){
    GAMEWIDTH=window.innerWidth;
    GAMEHEIGHT=window.innerHeight;

    canvas = document.getElementById("canvas");
    canvas.width=GAMEWIDTH;
    canvas.height=GAMEHEIGHT;
    ctx = canvas.getContext('2d');
    graphics = new Graphics(ctx,canvas);
});

function draw(data){
    var me = data['you'];
    var playerList = data['list'];

    graphics.clear('black');

    for (var i = 0; i < playerList.length; i++){
        player=playerList[i];
        if (player.identifier == me.identifier){
            graphics.rect(0,0,player_width,player_height,'white','black')
            graphics.string(player.x-me.x-(player.name.length/2)*5,player.y-me.y+11,'white',player.name)
        }else{
            graphics.rect(player.x-me.x,player.y-me.y,player_width,player_height,'red','black')
            graphics.string(player.x-me.x-(player.name.length/2)*5,player.y-me.y+11,'white',player.name)
        }
        console.log(player.bulletList);
        for(var j = 0; j < player.bulletList.length; j++){
            var cur_bullet = player.bulletList[j];
            graphics.bullet(cur_bullet.x,cur_bullet.y);
        }
    }
    //Draw ground
    graphics.rect(0,-me.y-canvas.height/2,canvas.width,canvas.height,'white','grey')
}

function Graphics(ctx,cvs){
    this.ctx=ctx;
    this.cvs=cvs;
    this.clear=function(color){
		this.ctx.fillStyle=color;
		this.ctx.fillRect(0,0,cvs.width,cvs.height);
    }
	this.rect=function(x,y,width,height,lineColor,fillColor){
		this.ctx.save();
		this.ctx.lineWidth=.5;
		this.ctx.translate(this.cvs.width/2+x,this.cvs.height/2-y);
		if (fillColor){
			this.ctx.fillStyle=fillColor;
			this.ctx.fillRect(-width/2,-height/2,width,height);
		}
		if (lineColor){
			this.ctx.strokeStyle=lineColor;
			this.ctx.strokeRect(-width/2,-height/2,width,height);
		}
		this.ctx.restore();
	}
	this.circle=function(x,y,angle,radius,lineColor,fillColor){
		this.arcCircle(x,y,angle,2*Math.PI,radius,lineColor,fillColor);
	}
	this.arcCircle=function(x,y,angle,angleSweep,radius,lineColor,fillColor){
		this.ctx.beginPath();
		if (angleSweep!=2*Math.PI){
			this.ctx.moveTo(this.cvs.width/2+x, this.cvs.height/2-y);
		}
		this.ctx.arc(this.cvs.width/2+x,this.cvs.height/2-y,radius,angle,angle+angleSweep,false);
		if (angleSweep!=2*Math.PI){
			this.ctx.lineTo(this.cvs.width/2+x, this.cvs.height/2-y);
		}
		this.ctx.lineWidth=.5;
		if (lineColor){
			this.ctx.strokeStyle=lineColor;
			this.ctx.stroke();
		}
		if (fillColor){
			this.ctx.fillStyle=fillColor;
			this.ctx.fill();
		}
	}
	this.string=function(x,y,lineColor,s){
		this.ctx.strokeStyle=lineColor;
		this.ctx.strokeText(s,this.cvs.width/2+x,this.cvs.height/2-y);
	}
    this.bullet=function(x,y){
        var color = 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+','+255.0+')';
        this.circle(x,y,0,BULLET_RADIUS,color,color);
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
