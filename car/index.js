const carimg = document.getElementById('car');
const road = document.getElementById('road');
const main = document.getElementById('main');
const startgame = document.getElementById('startgame');
const lifeshow = document.getElementById('lifeshow');

const randomcar = document.getElementById('randomcar1');
const star = document.getElementById('star');
const score = document.getElementById('score');

const box = document.getElementById('game-container');

let nightlampdiv = document.getElementsByClassName('nightlampdiv');
let Ecar = document.getElementsByClassName('randomcar');
let navi = document.getElementsByClassName('navigator');

const gameover = document.getElementById('gameover');

let heart = document.getElementsByClassName('heartimg');
let tree = document.getElementsByClassName('tree');
let lamp = document.getElementsByClassName('lamp');

const overlayscore = document.getElementById('overlayscore');
const pause = document.getElementById('pause-menu');
const highscore = document.getElementById('highscore');
const showhighscore = document.getElementById('showHighscore');
const starter = document.getElementById('starter');

const nlamplen = parseInt(screen.availHeight/125);


let posx = 0;
let posy = screen.availHeight-195;
carimg.style.top = posy + 'px';

let starx = 0;
let stary = 0;
let incre = 0;

let l = true;
let r = true;
let e = true;
let d = true;
let u = true;
let space = true;
let flagimg = 0;

var clearstary = "";
var cleardaynight = "";
var clearmovey = [];
var clearlampy = [];
var clearElementY = [];

let EcarImg = ["./img/tempcar.png","./img/tempcar2.png"];
let Ecarcolor = EcarImg.length;

let lifeline = 5;
lifeshow.innerHTML = lifeline;
let count = 0
function load(){
	box.style.animationPlayState = 'paused';	
	star.style.display = "none";
	nightlamp();
	preloder();

}
function startgameplay(){
	startgame.style.display='none';
	counter();	
	daynightvision();
	setTimeout(createEnemycar,4000);
	setTimeout(starmaker,4000);
	setTimeout(moveLampY,3950);
}

function preloder(){
	const pre = document.getElementById('preload');
	const create = document.createElement('img');
	pre.appendChild(create);
	let imgs = ["./img/star.png","./img/tempcar.png","./img/tempcar2.png","./img/blast.gif"];
	for(let i=0;i<imgs.length;i++){
		create.src = imgs[i];
		create.style.maxWidth = '100%';
		create.style.height = '100%';
	}
	setTimeout(() => {
		pre.removeChild(create);
	},3000);
}

function moveUp(){
	if (u) {
		posy-=10;

		if(posy<100){
			posy = 100;
		}
		carimg.style.top = posy + 'px';
	}
	

}
function moveDown(){
	if (d) {
		posy+=10;

		if(posy > screen.availHeight-195){
			posy = screen.availHeight-195;
		}
		carimg.style.top = posy + 'px';
	}
		

}

function moveleft() {
	if(l){
		if(posx > 0){
			carimg.style.transform = 'rotate(-5deg)';
			setTimeout(staightcar,50);
		}
		posx-=80;
		if (posx < 0) {
			posx = 0;
		}
		carimg.style.left = posx + 'px';
	}
		
}

function moveright() {
	if(r){
		if(posx <240){
			carimg.style.transform = 'rotate(5deg)';
			setTimeout(staightcar,50);
		}
		posx+=80;
		if (posx > 240) {
			posx = 240;
		}
		carimg.style.left = posx + 'px';
	}
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
	stopmoveEcarY();
	stopAllItem();
	clearInterval(clearstary);
	clearInterval(cleardaynight);

	box.style.animationPlayState = 'paused';
	
}
function resume(){
	pause.style.display = 'none';
	gameover.style.display = 'none';
	counter();
	setTimeout(starmovey,4000);
	setTimeout(startmoveAllEcarY,4000);
	setTimeout(moveLampY,4000);
	daynightvision();
	
}

function counter(){
	clearInterval(clearcounter);
	keylock();
	box.style.animationPlayState = 'paused';

	let co = 3;
	var clearcounter = setInterval(() => {
		starter.innerHTML='<span class="counters">'+ co + '</span>';
		if(co >= 0){
			starter.style.display = 'flex';
			co--;

			if(co < 0){
				clearInterval(clearcounter);
				relasekeylock();
				starter.style.display = 'none';
				box.style.animationPlayState = 'running';
				co = 3;
			}
		}
	},1000);
}
window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 27: // ESC
			// lifecount();
			break;
		case 32: // SPACE
			if(space){
				pausegame();
				keylock();
			}
			break;
		case 37: // LEFT ARROW
			moveleft();
			break;
		case 38: // UP ARROW
			moveUp();
			break;
		case 39: // RIGHT ARROW
			moveright();
			break;
		case 40: // DOWN ARROW
			moveDown();
       		break;
   		case 8:  // backspace
			
   			if(flagimg == 0){
   				carimg.src = './img/car3.png';
   				flagimg = 1;
   			}
   			else if(flagimg == 1){
   				carimg.src = './img/car2.png';
   				flagimg = 2;
			}
   			else if(flagimg == 2){
   				carimg.src = './img/car4.png';
   				flagimg = 3;
			}
			else{
				carimg.src = './img/car.png';
   				flagimg = 0;
			}
			break;
	}
});

function staightcar(){
	carimg.style.transform = 'rotate(0deg)';
}


function Random(min,max){
	if(max!==undefined) return Math.floor(Math.random() * (max - min) ) + min;
	else return Math.floor(Math.random() * min);
}
function createEnemycar(){
	for (let i = 0; i < 3; i++) {
		const newEcar = document.createElement('img');
		newEcar.className = 'randomcar';
		newEcar.src= EcarImg[Random(Ecarcolor)];
		newEcar.setAttribute('draggable',false);
		road.appendChild(newEcar);
		Enemycar(newEcar,true);
	}
}
function Enemycar(setEcar,EcarFlag){
	relasekeylock();
	resetcar(setEcar);



	let EcarY = -150*Random(1,5);
	let EcarX = Math.floor((Math.random() * 4))*80;

	while(collideEcar(EcarX,EcarY)){
		EcarY = EcarY-150;
	}

	setEcar.style.left = EcarX + 'px';
	setEcar.style.top = EcarY + 'px';

	if(EcarFlag) startmovey(setEcar,EcarX,EcarY);
}
	
function startmoveAllEcarY(){
	// box.style.animationPlayState = '';

	for (let i = 0; i < Ecar.length; i++) {

		let Y = Ecar[i].style.top;
		Y = parseInt(Y.slice(0, -2));

		let X = Ecar[i].style.left;
		X = parseInt(X.slice(0, -2));

		startmovey(Ecar[i],X,Y);

	}
}
function startmovey(item,x,y){
	let EcarX = x;
	let EcarY = y;

	item.style.top = EcarY + 'px';
	item.style.left = EcarX + 'px';

	let cleary = setInterval(()=>{
		EcarY+=1+incre;
		item.style.top = EcarY + 'px';
		item.style.left = EcarX + 'px';
		if(EcarY >= (screen.availHeight+200) && lifeline >0){
			clearInterval(cleary);
			Enemycar(item,true);
		}
		scorecount(item,EcarX,EcarY);

	},10);	
	clearmovey.push(cleary);

}

function stopmoveEcarY(){
	for (let i = 0; i < clearmovey.length; i++) {
		clearInterval(clearmovey[i]);
	}
}

function blastcar(item){
	item.src = './img/blast.gif';
	item.style.width = '150px';
	item.style.height = '150px';
	item.style.transform = 'translateX(-50px)';
	box.style.animationPlayState = 'paused';
}
	
function displayAllEcar(){
	for (let i = 0; i < Ecar.length; i++) {
		Ecar[i].style.display = 'block';
	}
}
function hideAllEcar(){
	for (let i = 0; i < Ecar.length; i++) {
		Ecar[i].style.top = -150+'px';
	}
}
function resetcar(item){
	displayAllEcar();

	item.src = EcarImg[Random(Ecarcolor)];
	item.style.width = '60px';
	item.style.height = '125px';
	item.style.transform = 'translateX(0)';
	box.style.animationPlayState = 'running';
}

function scorecount(item,ranx,rany){
	const items = item.style;
	 if((rany-125) < posy && (rany+120) > posy && posx == ranx){
		stopmoveEcarY();
		clearInterval(clearstary);	
		clearInterval(cleardaynight);

		stopAllItem();
		blastcar(item); 	
		keylock();
		lifecount();
		count--;
		score.innerHTML = count;

		setTimeout(()=>Enemycar(item,false),2000);
		setTimeout(startmoveAllEcarY,2000);	

		setTimeout(starmaker,1500);
		setTimeout(moveLampY,2000);
		daynightvision();



	}
	if( (ranx-80) === posx && posy===rany && posy===rany || (ranx+80) === posx && rany == posy ) {
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

	if(count >=30&& count<50){
		incre=0.3;

	}
	else if(count >=50 && count<100){
		incre=0.5;
	}
	else if(count >=100 && count<150){
		incre=0.75;
	}
	else if(count >=150 && count<250){
		incre=1;
	}
	else if(count >=250 && count<300){
		incre=1.25;
	}
	else if(count >=300){
		incre=1.5;
	}
	else if(count >=400){
		incre=1.7;
	}
	else{
		incre=0;
	}


}
var flag = true;
function lifecount(item){
		lifeline--;
		lifeshow.innerHTML = lifeline;

		overlayscores('<img src="./img/life.png" class="heartimg img-fluid "> -1');
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
			stopmoveEcarY();
			clearInterval(clearstary);
			heart[lifeline].style.filter = "grayscale(1)";
			gameover.style.display = 'flex';
		}
		if(lifeline < 0){
			keylock();
			box.style.animationPlayState = 'paused';
			stopmoveEcarY();
			clearInterval(clearstary);
		}
}

function NewGame(all){
	relasekeylock();
	counter();
	pause.style.display = 'none';
	gameover.style.display = 'none';
	star.style.display = 'none';


	lifeline = 5;	
	lifeshow.innerHTML = lifeline;

	posx=0;
	

	posy = screen.availHeight-195;

	carimg.style.top = posy + 'px';
	carimg.style.left = posx + 'px';


	flag=true;
	if (count >0 && highscore.innerHTML<count && all!=undefined){
		highscore.innerHTML =count <10 ? '0'+count : count;
		hslock=1;
	}
	count = 0;
	flagimg = 0;
	score.innerHTML = 0;
	for(let i=0; i<heart.length;i++){
		heart[i].style.filter = "grayscale(0)";
	}
	stopmoveEcarY();
	hideAllEcar();
	clearInterval(clearstary);	
	clearInterval(checklife);	

	setTimeout(starmaker,4000);
	setTimeout(moveLampY,4000);
	setTimeout(startmoveAllEcarY,4000);
	daynightvision();

}

var hslock = 0;

function starmaker(){

	star.style.display = 'block';

	stary = -150;
	starx = Math.floor((Math.random() * 4))*80;
	star.style.left = starx + 'px';
	star.style.top = stary + 'px';
	starmovey();

}

function starmovey(){
 	clearInterval(clearstary);
 	clearstary = setInterval(starymove,8);
}

function starymove(){
	stary+=1+incre;
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
			stopmoveEcarY();
			clearInterval(clearstary);
		}
	},1000);
}

function daynightvision(){
	clearInterval(cleardaynight);
	cleardaynight = setInterval(()=>{
		if(main.className.includes("night")){
			main.classList.remove("night");
			main.classList.add("day");
			for (let i = 0; i < lamp.length; i++) {
				lamp[i].src="./img/day.png";
			}
		}
		else{
			main.classList.remove("day");
			main.classList.add("night");
			for (let i = 0; i < lamp.length; i++) {
				lamp[i].src="./img/night.png";
			}
		}

	},20000);
}

function nightlamp(){
	for (let i = 0; i < nightlampdiv.length; i++) {
		const elem = nightlampdiv[i];
		createnightlamp(elem);
	}
}

function createnightlamp(elem){
	for(let i=0;i<nlamplen;i++){
		const nlamp = document.createElement('img');

		nlamp.src = "./img/day.png";
		nlamp.className = "lamp";


		let lampY = 150*i;
		nlamp.style.top = lampY+"px";
		
		elem.appendChild(nlamp);
	}
}


function stopAllItem(){
	for (let i = 0; i < clearElementY.length; i++) {
		clearInterval(clearElementY[i]);
	}
}
function moveLampY(){
	for (let i = 0; i < lamp.length; i++){
		
		const elem = lamp[i];
		let Y = lamp[i].style.top;

		let lampY = parseInt(Y.slice(0, -2));

		let clearY = setInterval(()=>{
			lampY+=5;
			elem.style.top = lampY+"px";
			if(lampY>screen.availHeight){
				lampY=-50;
			}
		},30-(incre*8));
		clearElementY.push(clearY);

	}
}	


function collideEcar(x,y){
	
	for (var i = 0; i < Ecar.length; i++) {
		const Ecars = Ecar[i].style;

		let Xside = Ecars.left;
		ranx = parseInt(Xside.slice(0, -2));

		let Yside = Ecars.top;
		rany = parseInt(Yside.slice(0, -2));

		if (x===ranx && ((rany-50) < y && (rany+125) > y|| rany===y )) {
			return true;
		}
	}
	return false;

}
