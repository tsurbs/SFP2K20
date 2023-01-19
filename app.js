var express = require('express');
var app = express();
var serv = require('http').Server(app);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.get('/',function(req,res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

app.set('port', process.env.PORT || 2000);
app.set('host', process.env.HOST || '0.0.0.0')
serv.listen(app.get('port'), app.get('host'), function(){
  console.log("Express server listening on port " + app.get('port')+"and host"+app.get('host'));
});

var USER_LIST = [];
var SOCKET_LIST = [];

var map_data;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    map_data = JSON.parse(this.responseText);
    console.log("next")
console.log(map_data.map.length);

  }
};
xmlhttp.open("GET", "https://raw.githubusercontent.com/goldprogrammer/genuisgames/master/rgbamapixelvals.txt#", true);
xmlhttp.send()

/*function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}*/

function newuser(id){
	var self = {
		x:250,
		y:250,
		id:id,
		theta:0,
		number:String(Math.floor(Math.random()*10))
	}
	return self;
}

function checkLegal(x, y){
	console.log(String(map_data.map[(y-1)*1320+x]))
	console.log(x+","+y)
	if(String(map_data.map[(y-1)*1320+x]) === "0,255,0,255"){return true;}
	else if(String(map_data.map[(y-1)*1320+x]) != "0,0,0,0"){return false;}
	else{return true}

}

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	var user = newuser(socket.id);
	socket.emit("newUser", user.number)
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;

	console.log(user)
	USER_LIST[socket.id] = user;

	socket.on("keylr", function(pos){
		console.log(pos)
		if(pos==="left"){
				user.theta--}
		if(pos==="right"){
				user.theta++}
	})
	socket.on("keyud", function(pos){
		console.log(user.theta)
		if(user.theta<0){
			if(user.theta/4 == Math.floor(user.theta/4)) {
				if(pos==="up" && checkLegal(user.x, user.y-5)){
						user.y-=5		}
				else if(pos==="down" && checkLegal(user.x, user.y+5)){
						user.y+=5		}
			}else if((user.theta+1)/4 == Math.floor((user.theta+1)/4)) {
				if(pos==="up" && checkLegal(user.x-5, user.y)){
						user.x-=5		}
				else if(pos==="down" && checkLegal(user.x+5, user.y)){
						user.x+=5		}
			}else if((user.theta+2)/4 == Math.floor((user.theta+2)/4)) {
				if(pos==="up" && checkLegal(user.x, user.y+5)){
						user.y+=5		}
				else if(pos==="down" && checkLegal(user.x, user.y-5)){
						user.y-=5		}
			}else if((user.theta+3)/4 == Math.floor((user.theta+3)/4)){
				if(pos==="up" && checkLegal(user.x+5, user.y)){
						user.x+=5		}
				else if(pos==="down" && checkLegal(user.x-5, user.y)){
						user.x-=5		}
			};
		}else{
			if(user.theta/4 == Math.floor(user.theta/4)) {
				if(pos==="up" && checkLegal(user.x, user.y-5)){
					user.y-=5		}
				else if(pos==="down" && checkLegal(user.x, user.y+5)){
						user.y+=5		}
			}else if((user.theta-1)/4 == Math.floor((user.theta-1)/4)) {
				if(pos==="up" && checkLegal(user.x+5, user.y)){
						user.x+=5		}
				else if(pos==="down" && checkLegal(user.x-5, user.y)){
						user.x-=5		}
			}else if((user.theta-2)/4 == Math.floor((user.theta-2)/4)) {
				if(pos==="up" && checkLegal(user.x, user.y+5)){
						user.y+=5		}
				else if(pos==="down" && checkLegal(user.x, user.y-5)){
						user.y-=5		}
			}else if((user.theta-3)/4 == Math.floor((user.theta-3)/4)){
				if(pos==="up" && checkLegal(user.x-5, user.y)){
						user.x-=5		}
				else if(pos==="down" && checkLegal(user.x+5, user.y)){
						user.x+=5		}
			};
		}
	});

	socket.on('disconnect', function(){
		delete SOCKET_LIST[socket.id];
		delete USER_LIST[socket.id];
	})

	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
	})
});

setInterval(function(){
	var pack = [];
	for(var i in USER_LIST){
		var user = USER_LIST[i];
		//console.log(String(user.y))
		pack.push({
			x:user.x,
			y:user.y,
			theta:user.theta,
			number:user.number
		})
	}for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('newPoss',pack);
	}
},1000/25);