var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var fs = require('fs');

var c = 0;
var o = true;
var map_data;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    map_data = JSON.parse(this.responseText);
    //document.getElementById("demo").innerHTML = myObj.name;
    console.log("next")
console.log(map_data.Map.length);
start()

  }
};
xmlhttp.open("GET", "https://raw.githubusercontent.com/goldprogrammer/genuisgames/master/bestest_pixel_image_ever.txt#", true);
xmlhttp.send()

function checkLegal(x, y){
	//console.log(String(map_data.Map[(y-1)*263+x]))
	//console.log(x+","+y)
	if(String(map_data.Map[(y-1)*263+x]) === "0,255,0,255"){return false;}
	else if(String(map_data.Map[(y-1)*263+x]) != "0,0,0,0"){return false;}
	else{return true}

}function checkLegal2(x, y){
	//console.log(String(map_data.Map[(y-1)*263+x]))
	//console.log(x+","+y)
	if(String(map_data.Map[(y-1)*263+x]) === "0,255,0,255"){return true;}
	else if(String(map_data.Map[(y-1)*263+x]) != "0,0,0,0"){return false;}
	else{return true}

}
var ogpos = []
var agents = []

Ao = parseInt(Math.floor(Math.random()*3))
	if(Ao == 0){console.log(Ao)
		agents.push(newAgent(0, Math.floor(Math.random()*68)+61, Math.floor(Math.random()*67)+68))
	}else if(Ao == 1){console.log(Ao)
		agents.push(newAgent(0, Math.floor(Math.random()*68)+191, Math.floor(Math.random()*23)+42))
	}else if(Ao == 2){console.log(Ao)
		agents.push(newAgent(0, Math.floor(Math.random()*93)+155, Math.floor(Math.random()*17)+8))
	}

var Tx, Ty;


function newAgent(id,Vx,Vy){
	var self = {
		x:Vx,
		y:Vy,
		id:id,
		theta:0,
		health:25,
		direction:"L",
		number:String(Math.floor(Math.random()*10))
	}
	return self;
}
var psi_map = [[]];
var agent_psi_maps = [[]]
var agent_psi_map = [[]]
function create_map(map){//console.log("a")
	for (var i = map.length - 1; i >= 0; i--) {map[i].push([])
		for(var k=0; k < 263; k++){map[i].push([])
			for (var j = 0; j < 131; j++) {
				map[i][k].push(0)
			}
		}
	}//console.log(fill_psi())
}
function fill_psi(Tx, Ty, map){
	id = 0;
	if(typeof agent_psi_map[0][Tx] !== "undefined"&& typeof agent_psi_map[0][Tx][Ty] !== "undefined" && checkLegal(Tx, Ty)){
		map[id][Tx][Ty] = 100;
	}
		for(i = 0; i<=100; i++){
			//console.log(i)
			for(h=0; h<=3; h++){
				for(k = 0; k <= 2*(i+1); k++){
					//console.log(k)
					l = Math.floor(i)
				 	if(h==0 && typeof(map[id][Tx+i-1]) !== "undefined"){
				 		if(typeof(map[id][Tx+i-1][Ty+k-l-1]) !== "undefined"){
				 			if(checkLegal(Tx+i-1, Ty+k-l-1)){
				 			map[id][Tx+i-1][Ty+k-l-1] = 100/i;
				 		}
				 		}
				 	}else if(h==1 && typeof(map[id][Tx-i]) !== "undefined"){
				 		//console.log("||"+String(map[id][Tx-i][Ty+k-l-1])
				 	if(typeof(map[id][Tx-i][Ty+k-l-1]) !== "undefined"){
				 		//console.log(String(map[id][Tx-i][Ty+k-l-1]))
				 		if(checkLegal(Tx-i, Ty+k-l-1)){map[id][Tx-i][Ty+k-l-1] = 100/i;}
				 	}
				 	}else if(h==2 && typeof(map[id][Tx+k-l-1]) !== "undefined"){	
				 		if(typeof(map[id][Tx+k-l-1][Ty+i-1]) !== "undefined"){
				 			if(checkLegal(Tx+k-l-1, Ty+i-1)){map[id][Tx+k-l-1][Ty+i-1] = 100/i;}
			 			}
				 	}else if(h==3 && typeof(map[id][Tx+k-l-1]) !== "undefined"){
				 		if(typeof(map[id][Tx+k-l-1][Ty-i-1]) !== "undefined"){
				 			if(checkLegal(Tx+k-l-1, Ty-i-1)){map[id][Tx+k-l-1][Ty-i-1] = 100/i;}
				 		}
				 	}
				}
			}
		}
}function fill_psi_agents(Tx, Ty, map, id){
	//console.log(map)
	if(typeof agent_psi_map[0][Tx] !== "undefined"&& typeof agent_psi_map[0][Tx][Ty] !== "undefined" && checkLegal(Tx, Ty)){
		map[id][Tx][Ty] = agents[id].health*4;
	}
		for(i = 0; i<=100; i++){
			//console.log(i)
			for(h=0; h<=3; h++){
				for(k = 0; k <= 2*(i+1); k++){
					//console.log(k)
					l = Math.floor(i)
				 	if(h==0 && typeof(map[id][Tx+i-1]) !== "undefined"){
				 		if(typeof(map[id][Tx+i-1][Ty+k-l-1]) !== "undefined"){
				 			if(checkLegal(Tx+i-1, Ty+k-l-1)){
				 			map[id][Tx+i-1][Ty+k-l-1] = agents[id].health*4/i;
				 		}
				 		}
				 	}else if(h==1 && typeof(map[id][Tx-i]) !== "undefined"){
				 		//console.log("||"+String(map[id][Tx-i][Ty+k-l-1])
				 	if(typeof(map[id][Tx-i][Ty+k-l-1]) !== "undefined"){
				 		//console.log(String(map[id][Tx-i][Ty+k-l-1]))
				 		if(checkLegal(Tx-i, Ty+k-l-1)){map[id][Tx-i][Ty+k-l-1] = agents[id].health*4/i;}
				 	}
				 	}else if(h==2 && typeof(map[id][Tx+k-l-1]) !== "undefined"){	
				 		if(typeof(map[id][Tx+k-l-1][Ty+i-1]) !== "undefined"){
				 			if(checkLegal(Tx+k-l-1, Ty+i-1)){map[id][Tx+k-l-1][Ty+i-1] = agents[id].health*4/i;}
			 			}
				 	}else if(h==3 && typeof(map[id][Tx+k-l-1]) !== "undefined"){
				 		if(typeof(map[id][Tx+k-l-1][Ty-i-1]) !== "undefined"){
				 			if(checkLegal(Tx+k-l-1, Ty-i-1)){map[id][Tx+k-l-1][Ty-i-1] = agents[id].health*4/i;}
				 		}
				 	}
				}
			}
		}//console.log("hahahhaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+String(id))
		require('fs').writeFile(


    	'./array'+String(id)+'.txt',

    	JSON.stringify(agent_psi_map),

    	function (err) {
        if (err) {
            console.error('Crap happens');
        }
   		}
	);
}
//var iterations = 1;

//Iteration loops
function start() {
for (var i = 1; i <= 25; i++) {
	var f = parseInt(Math.floor(Math.random()*3))
	if(f == 0){//console.log(f)
		var a=parseInt(Math.floor(Math.random()*68+61))
		var b=parseInt(Math.floor(Math.random()*67+68))
		agents.push(newAgent(i, a, b))
	}else if(f == 1){//console.log(f)
		var a=parseInt(Math.floor(Math.random()*68+191))
		var b=parseInt(Math.floor(Math.random()*23+42))
		agents.push(newAgent(i, a, b))
	}else if(f == 2){
		var a=parseInt(Math.floor(Math.random()*93+155))
		var b=parseInt(Math.floor(Math.random()*17+8))
		agents.push(newAgent(i, a, b))
		console.log(agents[i].x+","+ agents[i].y+","+ a+","+ b)
	}
	if(o){console.log("yee")
		ogpos.push([agents[i].x+","+agents[i].y])
		if(i==25){o=false}
	}
	//console.log(agents[i].x)
	agent_psi_maps.push([])
	//agents[i].number = i;
	//psi_map.push([])
}
create_map(psi_map)
create_map(agent_psi_maps)
create_map(agent_psi_map)
for (var q = 300 - 1; q >= 0; q--) {console.log(q)
		//console.log(agent_psi_maps[i].length)
		fill_psi(agents[0].x, agents[0].y, psi_map, i)
		for (var i = agents.length - 1; i >= 0; i--) {
			if(i == 0){fillall()}
			else{
				fill_psi_agents(agents[i].x, agents[i].y, agent_psi_maps, i)
			}
		}
	function fillall(){
		//console.log(agent_psi_maps.length)
		for (var i = agent_psi_maps.length - 1; i >= -1; i--) {
			if(i==-1){if(q == 299){require('fs').writeFile('./arrayog.txt', JSON.stringify(agent_psi_map), function (err) {if (err) {console.error('Crap happens');}});}
			else if(q==0){
				require('fs').writeFile('./array.txt', JSON.stringify(agent_psi_map), function (err) {if (err) {console.error('Crap happens');}});

				for (var j = agents.length - 2; j >= 0; j--) {
					ogpos[j].push(agents[j+1].health)
				}

				require('fs').writeFile('./array'+new Date().toLocaleString()+'.txt', JSON.stringify(ogpos), function (err) {if (err) {console.error('Crap happens');}});
			}
		}else{
			for (var j = 264-2; j >= 0; j--) {
				//console.log(j+","+agent_psi_maps[i][j].length)
				for (var k = 131 - 1; k >= 0; k--) {
					//console.log(agent_psi_map[0][j][k] + agent_psi_maps[i][j][k])					
					agent_psi_map[0][j][k] += agent_psi_maps[i][j][k]
					//console.log(agent_psi_map[0][j][k])
				}
			}
		}
	}
	}for (var i = agents.length - 1; i >= 0; i--) {
		if(i==0){
			for(var j = 4 - 1; j >= 0; j--) {var l,r,d,u=0;
				if(typeof agent_psi_map[0][agents[i].x-1] !== "undefined"&& typeof agent_psi_map[0][agents[i].x-1][agents[i].y] !== "undefined" && checkLegal(agents[i].x-1,agents[i].y)){
					l = agent_psi_map[0][agents[i].x-1][agents[i].y]
				}
				if(typeof agent_psi_map[0][agents[i].x+1] !== "undefined"&& typeof agent_psi_map[0][agents[i].x+1][agents[i].y] !== "undefined" && checkLegal(agents[i].x+1,agents[i].y)){
					r = agent_psi_map[0][agents[i].x+1][agents[i].y]
				}
				if(typeof agent_psi_map[0][agents[i].x] !== "undefined"&& typeof agent_psi_map[0][agents[i].x][agents[i].y+1] !== "undefined" && checkLegal(agents[i].x,agents[i].y+1)){
					d = agent_psi_map[0][agents[i].x][agents[i].y+1]
				}
				if(typeof agent_psi_map[0][agents[i].x] !== "undefined"&& typeof agent_psi_map[0][agents[i].x][agents[i].y-1] !== "undefined" && checkLegal(agents[i].x,agents[i].y-1)){
					u = agent_psi_map[0][agents[i].x][agents[i].y-1]
				}
				if(l>=r && l>=d && l>=u){agents[i].direction = "L"}
				else if(r>=l && r>=d && r>=u){agents[i].direction = "R"} 
				else if(u>=l && u>=d && u>=r){agents[i].direction = "U"}
				else if(r>=l && r>=d && r>=u){agents[i].direction = "D"} 
			}
		}else{
			for(var j = 4 - 1; j >= 0; j--) {var l,r,d,u=1000;
				if(typeof psi_map[0][agents[i].x-1] !== "undefined"&& typeof psi_map[0][agents[i].x-1][agents[i].y] !== "undefined" && checkLegal2(agents[i].x-1,agents[i].y)){
					l = psi_map[0][agents[i].x-1][agents[i].y]
				}
				if(typeof psi_map[0][agents[i].x+1] !== "undefined"&& typeof psi_map[0][agents[i].x+1][agents[i].y] !== "undefined" && checkLegal2(agents[i].x+1,agents[i].y)){
					r = psi_map[0][agents[i].x+1][agents[i].y]
				}
				if(typeof psi_map[0][agents[i].x] !== "undefined"&& typeof psi_map[0][agents[i].x][agents[i].y+1] !== "undefined" && checkLegal2(agents[i].x,agents[i].y+1)){
					d = psi_map[0][agents[i].x][agents[i].y+1]
				}
				if(typeof psi_map[0][agents[i].x] !== "undefined"&& typeof psi_map[0][agents[i].x][agents[i].y-1] !== "undefined" && checkLegal2(agents[i].x,agents[i].y-1)){
					u = psi_map[0][agents[i].x][agents[i].y-1]
				}
				if(l<=r && l<=d && l<=u){agents[i].direction = "L"}
				else if(r<=l && r<=d && r<=u){agents[i].direction = "R"} 
				else if(u<=l && u<=d && u<=r){agents[i].direction = "U"}
				else if(r<=l && r<=d && r<=u){agents[i].direction = "D"} 
			}
		}	
	}
		for (var j = agents.length - 1; j >= 0; j--) {
			if(agents[j].direction === "L"){agents[j].x+=1; console.log("L")}
			if(agents[j].direction === "R"){agents[j].x-=1; console.log("R")}
			if(agents[j].direction === "D"){agents[j].y+=1; console.log("D")}
			if(agents[j].direction === "U"){agents[j].y-=1; console.log("U")}
			slope = (agents[j].y-agents[0].y)/(agents[j].x-agents[0].x)
			for(var r = agents[j].x-agents[0].x; r>=0; r--){
				if(checkLegal(r+agents[j].y, Math.floor(r*slope))){c++}
				else if(checkLegal(r+agents[j].y, Math.ceil(r*slope))){c++}
				if(c == agents[j].x-agents[0].x){agents[j].health--}
			}
		}
		psi_map = [[]];
		agent_psi_maps = [[]]
		agent_psi_map = [[]]
		for (var i = 1; i <= 25; i++) {
			//agents.push(newAgent(i))
			//console.log(agents[i].x)
			agent_psi_maps.push([])
			//agents[i].number = i;
			//psi_map.push([])
		}
		create_map(psi_map)
		create_map(agent_psi_maps)
		create_map(agent_psi_map)
	}
}
/*setInterval(function(){
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
},1000/25);*/