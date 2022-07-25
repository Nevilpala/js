let carimg = document.getElementById('car');
let road = document.getElementById('road');

// let randomcar = document.getElementsByClassName('randomcar');
let randomcar = document.getElementById('randomcar1');
let star = document.getElementById('star');
let score = document.getElementById('score');

let box = document.getElementById('game-container');

let gameover = document.getElementById('gameover');

let heart = document.getElementsByClassName('heartimg');
let overlayscore = document.getElementById('overlayscore');
let pause = document.getElementById('pause-menu');
let highscore = document.getElementById('highscore');
let showhighscore = document.getElementById('showHighscore');
let starter = document.getElementById('starter');



let ranx = 0 ;
let rany = -150 ;

let posx = 0;
let posy = screen.availHeight-195;
carimg.style.top = posy + 'px';

let starx = 0;
let stary = 0;

let l = true;
let r = true;
let e = true;
let d = true;
let u = true;
let space = true;

var clearstary = "";
var clearmovey = "";

let lifeline = 5;
let count = 0


counter();
function load(){
	box.style.animationPlayState = 'paused';
	randomcar.style.display = "none";
	star.style.display = "none";

	setTimeout(othercar,4000);
	setTimeout(starmaker,4000);
	setTimeout(() => {
	},4000);
	preloder()
}
function preloder(){
	const pre = document.getElementById('preload');
	const create = document.createElement('img');
	pre.appendChild(create);
	let imgs = ["./img/star.png","./img/tempcar.png","./img/blast.gif"];
	for(let i=0;i<imgs.length;i++){
		create.src = imgs[i];
		create.style.maxWidth = '100%';
		create.style.height = '100%';
	}
	setTimeout(() => {
		pre.removeChild(create)
	},3000);
}

function moveUp(){
	posy-=10;

	if(posy<100){
		posy = 100;
	}
	carimg.style.top = posy + 'px';

}
function moveDown(){
	posy+=10;

	if(posy > screen.availHeight-195){
		posy = screen.availHeight-195;
	}
	carimg.style.top = posy + 'px';

}

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
	u = false;
	d = false;
	e = false;
	space = false;
}
function relasekeylock(){

	l = true;
	r = true;
	u = true;
	d = true;
	e = true;
	space = true;

}
function pausegame(){
	keylock();
	pause.style.display = 'flex';
	clearInterval(clearmovey);
	clearInterval(clearstary);
	box.style.animationPlayState = 'paused';
	
}
function resume(){
	pause.style.display = 'none';
	gameover.style.display = 'none';
	counter();
	setTimeout(starmovey,4000);
	setTimeout(startmovey,4000);
}

function counter(){
	clearInterval(clearcounter)
	keylock();
	starter.style.display = 'none';
	box.style.animationPlayState = 'paused';

	let co = 3;
	var clearcounter = setInterval(() => {
		starter.innerHTML='<span class="counters">'+ co + '</span>';
		if(co > 0){
			starter.style.display = 'flex';	
			co--;
		}
		else{
			if(co == 0){
				clearInterval(clearcounter);
				relasekeylock();
				starter.style.display = 'none';
				box.style.animationPlayState = '';
				co = 3;
			}
		}
	},1000);
}

window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 27: // ESC
			lifecount();
			break;
		case 32: // SPACE
			if(space){
				pausegame();
				keylock();
				space = false;	
			}
			else{
				resume();
				space=true;
			}
			break;
		case 37: // LEFT ARROW
			if(l){
				if(posx > 0){
					carimg.style.transform = 'rotate(-5deg)';
					setTimeout(staightcar,50);
				}

				moveleft();
			}
			break;
		case 38: // UP ARROW
			if(u){
				moveUp();
			}
			break;
		case 39: // RIGHT ARROW
			if(r){
				if(posx <240){
					carimg.style.transform = 'rotate(5deg)';
					setTimeout(staightcar,50);
				}
				moveright();
			}
			break;
		case 40: // DOWN ARROW
			if(d){
				moveDown();
			}
       		break;
   		case 13:  // ENTER
			if(e){
				window.stop()
   			}
			break;
	}
});

function staightcar(){
	carimg.style.transform = 'rotate(0deg)';
}


function startmovey(){

	clearInterval(clearmovey);
	clearmovey = setInterval(randomcarY,10);	
}
function randomcarY(){
	rany+=1;
	randomcar.style.top = rany + 'px';

	if(rany >= screen.availHeight && lifeline >0){
		rany = -150;
		othercar();
	}
	
	scorecount();

}


function othercar(){
	randomcar.style.display = 'block';
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
	
	 if((rany-125) < posy && (rany+120) > posy && posx == ranx){
		clearInterval(clearmovey);
		clearInterval(clearstary);
		blastcar();
		keylock();
		lifecount();
		count--;
		score.innerHTML = count;
		setTimeout(othercar,2000);
		setTimeout(starmaker,1000);
	}
	if( (ranx-80) ==  posx && rany == posy|| (ranx+80) == posx && rany == posy ) {
		count+=2;
		overlayscores('+2');
		score.innerHTML=count;
	}

	if((stary-125 <posy) && (stary+50 > posy) && posx == starx){
		clearInterval(clearstary);
		star.style.display = 'none';
		stary = -150;
		starmaker();
		count+=5;
		overlayscores('+5');
		score.innerHTML = count;
	}
	if(count >0)
	score.innerHTML= count <10 ? '0'+count : count;

	if(count > highscore.innerHTML && score.innerHTML>0 && highscore.innerHTML>0 && flag==true){
		showHighscore.innerHTML = '<p class="over"> highscore</p>';
		showHighscore.style.display = 'block';
		flag=false;
		setTimeout(() => {showHighscore.style.display = 'none';},2000);
	}

}
var flag = true;
function lifecount(){
		lifeline--;
		overlayscores('-1');
		if(lifeline == 5){
			heart[lifeline].style.filter = "grayscale(0)";
		}
		else if(lifeline < 5 && lifeline > 0){
			heart[lifeline].style.filter = "grayscale(1)";
		}
		else if(lifeline == 0){	
			checklifes();
			keylock();
			box.style.animationPlayState = 'paused';
			clearInterval(clearmovey);
			clearInterval(clearstary);
			heart[lifeline].style.filter = "grayscale(1)";
			gameover.style.display = 'flex';
		}
		if(lifeline < 0){
			keylock();
			box.style.animationPlayState = 'paused';
			clearInterval(clearmovey);
			clearInterval(clearstary);
		}
}

function NewGame(){
	relasekeylock();
	pause.style.display = 'none';
	gameover.style.display = 'none';
	lifeline = 5;
	flag=true;
	if (count >0)
		highscore.innerHTML =count <10 ? '0'+count : count;
	count = 0;
	score.innerHTML = 0;
	for(let i=0; i<heart.length;i++){
		heart[i].style.filter = "grayscale(0)";
	}
	clearInterval(clearmovey);
	clearInterval(clearstary);	
	clearInterval(checklife);	
	starmaker();
	othercar();
}


function starmaker(){

	star.style.display = 'block';

	stary = -150;
	starx = Math.floor((Math.random() * 4))*80;
	star.style.left = starx + 'px';
	star.style.top = stary + 'px';
	if(starx == ranx){
		starmaker();
	}
	starmovey();

}

function starmovey(){
 	clearInterval(clearstary);
 	clearstary = setInterval(starymove,10);
}

function starymove(){
	stary+=1	;
	star.style.top = stary + 'px';

	if(stary >= screen.availHeight){
		clearInterval(clearstary);
		stary = -150;
		starmaker();
	}

}

function overlayscores(n){
	if(n < 0){
		overlayscore.style.zIndex = 3;
		overlayscore.innerHTML='<p id="over"><img src="./img/life.png">'+n+'</p>';
	}
	else{
	overlayscore.innerHTML='<p id="over">'+n+'</p>';
	}

}
var checklife = "";
function checklifes(){
	checklife = setInterval(() => {
		if(lifeline <= 0){
			keylock();
			box.style.animationPlayState = 'paused';
			clearInterval(clearmovey);
			clearInterval(clearstary);
		}
	},1000);
}