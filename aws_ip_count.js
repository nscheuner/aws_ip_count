var fs = require('fs');
var request = require('request');
var out = fs.createWriteStream('ip-ranges.json');
var temp = "";
var count16 = 0;
var count17 = 0;
var count18 = 0;
var count19 = 0;
var count20 = 0;
var count21 = 0;
var count22 = 0;
var count23 = 0;
var count24 = 0;
var count25 = 0;
var count26 = 0;

var dll_stream = request('https://ip-ranges.amazonaws.com/ip-ranges.json')
.on('response', function(response){
  if (response.statusCode != 200){
  console.log("Incorrect ressource link, exiting now");
  process.exit(0);
  }
}).pipe(out);
dll_stream.on('finish', function () {
jsondata = fs.readFileSync('ip-ranges.json');
data = JSON.parse(jsondata);


loop(0);
});
function loop(i){
	if (i == data.prefixes.length) total();
		else{
			temp = data.prefixes[i].ip_prefix;
			if (temp.match(/\/16/g)) count16++;
			if (temp.match(/\/17/g)) count17++;
			if (temp.match(/\/18/g)) count18++;
			if (temp.match(/\/19/g)) count19++;
			if (temp.match(/\/20/g)) count20++;
			if (temp.match(/\/21/g)) count21++;
			if (temp.match(/\/22/g)) count22++;
			if (temp.match(/\/23/g)) count23++;
			if (temp.match(/\/24/g)) count24++;
			if (temp.match(/\/25/g)) count25++;
			if (temp.match(/\/26/g)) count26++;

			loop(i+1);
		}
		
}

function total (){
	total = count16*65536+count17*32768+count18*16384+count19*8192+count20*4096+count21*2048
	+count22*1024+count23*512+count24*256+count25*128+count26*64;
	console.log("At " + data.createDate + " Amazon owns: " + total + " IPv4 adresses");
	process.exit(0);
}
