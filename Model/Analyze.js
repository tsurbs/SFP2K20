//var rarray = [["196,43",25],["72,69",25],["159,14",-8],["247,13",25],["246,50",-101],["63,113",25],["237,52",25],["106,78",25],["248,54",25],["235,48",25],["99,107",25],["227,9",25],["168,11",25],["253,54",25],["66,80",25],["219,9",25],["195,53",25],["200,16",-731],["120,116",24],["76,99",25],["213,16",-1487],["255,58",25],["196,60",25],["200,62",25],["118,126",23]]
var scorearray = []
for (var j = 126; j >= 1; j--) {
	//console.log(j)
var fs = require("fs");
var text = fs.readFileSync("./"+String(j)+".txt").toString('utf-8');
var array = JSON.parse("[" + text + "]");
var health = 0;
var num = 0;
var rarray = []
for (var i =  0; i <= array[0].length - 1; i++) {
	rarray.push([])
	//console.log([array[0][i][0].split(",")])
	rarray[i].push(array[0][i][0].split(","))
}//console.log(rrarray)
//console.log(array)
for (var i = rarray.length - 1; i >= 1; i--) {
	if(Math.sqrt(((parseInt(rarray[i][0])-parseInt(rarray[0][0]))^2+parseInt(rarray[i][1])-parseInt(rarray[0][1]))^2)<=50){
		//console.log()
		if(array[0][i][1]>0){health+=array[0][i][1]}
		num++
	}
}
console.log(health, num)
scorearray.push([health/num, rarray[0][0]])
if(j==1){
require('fs').writeFile('./RESULTS.txt', JSON.stringify(scorearray), function (err) {if (err) {console.error('Crap happens');}});	
}
}