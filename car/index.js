var carimg = document.getElementById('car');
var road = document.getElementById('road');

// var randomcar = document.getElementsByClassName('randomcar');
var randomcar = document.getElementById('randomcar1');
var randomcar2 = document.getElementById('randomcar2').style.display='none';
var randomcar3 = document.getElementById('randomcar3').style.display='none';
var box = document.getElementById('game-container');
var gameover = document.getElementById('gameover');
var heart = document.getElementsByClassName('heartimg');

let ranx = 0 ;
let rany = -150 ;

let posx = 0;
let posy = 0;

let l = true;
let r = true;
let e = true;
let space = true;

let lifeline = 1;

function moveleft() {
	posx-=80;
	if (posx < 0) {
		posx = 0;
	}
	carimg.style.left = posx + 'px';
}
function moveright() {
	posx+=80;
	if (posx > 240) {
		posx = 240;
	}
	carimg.style.left = posx + 'px';
}


function keylock(){

	l = false;
	r = false;
	e = false;
	space = false;

}
function relasekeylock(){

	l = true;
	r = true;
	e = true;
	space = true;

}


window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 27: // ESC
			document.getElementsByTagName('script')[0].src = './index2.js';
			break;
		case 32: // SPACE
			clearInterval(clearmovey);
			break;
		case 37: // LEFT ARROW
			if(l){
				if(posx > 0){
					carimg.style.transform = 'rotate(-10deg)'
					setTimeout(staightcar,100);
				}

				moveleft();
			}
			break;
		case 38: // UP ARROW
			
			break;
		case 39: // RIGHT ARROW
			if(r){
				if(posx <240){
					carimg.style.transform = 'rotate(10deg)'
					setTimeout(staightcar,100);
				}

				moveright();
			}
			break;
		case 40: // DOWN ARROW
       		break;
   		case 13:  // ENTER
			if(e){
				startmovey()
   			}
			break;
	}
});

function staightcar(){
	carimg.style.transform = 'rotate(0deg)'
}

var clearmovey="";
function startmovey(){
	clearInterval(clearmovey);

	clearmovey = setInterval(() => {

	rany+=1;
	randomcar.style.top = rany + 'px';
		if(rany >= screen.availHeight){
			othercar();
			rany = -150;
		}
		scorecount();
	
	},10);

	
}


// setTimeout(othercar,1000);	
othercar();
function othercar(){
	relasekeylock();
	resetcar();
		rany = -150;
		ranx = Math.floor((Math.random() * 4))*80;
		randomcar.style.left = ranx + 'px';
		randomcar.style.top = rany + 'px';
	startmovey();

}

function blastcar(){
	randomcar.src = './img/blast.gif';
	randomcar.style.width = '150px';
	randomcar.style.height = '150px';
	randomcar.style.transform = 'translateX(-50px)';
	box.style.animationPlayState = 'paused';
}
function resetcar(){

	randomcar.src = './img/tempcar.png';
	randomcar.style.width = '60px';
	randomcar.style.height = '125px';
	randomcar.style.transform = 'translateX(0)';
	box.style.animationPlayState = 'running';

}

function scorecount(){
	if((rany-50) < (screen.availHeight - 125) && (rany+185) > (screen.availHeight - 125) && posx == ranx){
		clearInterval(clearmovey);
		blastcar();
		keylock();
		lifecount();
		setTimeout(othercar,2000);
	}
}
function lifecount(){
		lifeline--;
		if(lifeline == 5){
			heart[lifeline].style.filter = "grayscale(0)";
		}
		else if(lifeline < 5 && lifeline > 0){
			heart[lifeline].style.filter = "grayscale(1)";

		}
		else if(lifeline <= 0){
			heart[lifeline].style.filter = "grayscale(1)";
			gameover.style.display = 'flex';
			keylock();
			box.style.animationPlayState = 'paused';
			clearInterval(clearmovey);
		}
}

function NewGame(){
	relasekeylock();
	gameover.style.display = 'none';
	lifeline = 5;
	for(let i=0; i<heart.length;i++){
		heart[i].style.filter = "grayscale(0)";
	}

}