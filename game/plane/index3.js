const planeImg = document.getElementById('plane-img');
const enemyImg = document.getElementById('enemy-img');
const gamearea = document.getElementById('gamearea');
const target = document.getElementById('target');
const overlay = document.getElementById('overlay');
const showscore = document.getElementById('score');
const p2 = document.getElementById('point2');
const p1 = document.getElementById('point1');
const bulletfire = document.getElementsByClassName('bullet');


// const newgame = {
	
// }

let planeposX  = 0;
let planeposY = screen.availHeight - 122*2;

let enemyposX  = 0;
const enemyposY = 120;

let flag = true;
let flagkey = false;
let flag_star = true;
let flag_missile = true;
let bright = 100;
let enemylife = 0;
let scorecount = 0;


let clearbullet="";
let clearfire = "";
let clearlauch = "";
let clearstar="";
let clearstarmove="";



const gamepart = {
	pause : function(){
		clearInterval(clearbullet);
		clearInterval(clearfire);
		clearInterval(clearlauch);
		// clearInterval()
	}
}

setTimeout(()=>{
	document.getElementById('loader').remove()
}, 5200);

function load(){}

function moveLeft(){
	if(planeposX > 0)
		planeposX-=8;
	planeImg.style.left = planeposX + 'px';
}
function moveRight() {
	if(planeposX < (gamearea.clientWidth-100))
		planeposX+=8;
	planeImg.style.left = planeposX + 'px';
}
document.addEventListener('keydown',function(e){
	if(flagkey){
		switch(e.keyCode){
			case 8: //BACKSPACE
			// clearInterval(clearbullet)
			// clearInterval(clearfire)
				gamepart.pause()
				break;
			case 13: //ENTER
				e.preventDefault();
				// Bulletmaker();
				break;
			case 16:
				Bulletfiring()
				break;
			case 32: //SPACE
				clearInterval(clearbullet)
				clearInterval(clearfire)
				console.clear()
				break;
			case 37: // L
				e.preventDefault();
				moveLeft();
				break;
	
			case 39://R
				e.preventDefault();
				moveRight();
				break;
		}
	}
});
document.addEventListener('visibilitychange', function(){
	if (document.visibilityState === 'visible') {
		star();
		Bulletmaker()

	} 
	else {
		clearInterval(clearstar);
		clearInterval(clearbullet);
	}
});
document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);

function Bulletmaker(){
	clearInterval(clearbullet);
	// bulletfire.map(item=>item.style.display = "none")
	setTimeout(()=>{
		clearbullet = setInterval(Bulletfiring,300)
	},500)
}

function Bulletfiring(){
	var bullet = document.createElement('div');
	bullet.className ="bullet";
	gamearea.appendChild(bullet);

	let bulletposY = screen.availHeight-280;

	if(bulletposY%2!=0){
		bulletposY++;
	}

	const bulletposX = planeposX;

	bullet.style.left = planeposX + 50+ 'px';
	bullet.style.top = bulletposY + 'px';

	if(flag){
		clearfire = setInterval(()=>{
			if(bulletposY >= -50 && flag){
				bulletposY-=2;
				bullet.style.top = bulletposY + 'px';
				check('bullet',bulletposX,bulletposY);
			}
		},10)
	}
}
// 

enemyplane();
function enemyplane(){
	enemyImg.style.display = "";

	planerestore();
	const temp = parseInt(Math.floor(Math.random()*(gamearea.clientWidth-100)+30));
	enemyposX = temp;

	// enemyImg.style.left = enemyposX + 'px';
	// enemyImg.style.top =  '-100px';
	// enemyImg.style.transition=".5s ease";
	enemyImg.style.left = enemyposX + 'px';
	enemyImg.style.top = 0 + 'px';
}
function planerestore(){
	enemyImg.style.filter = "brightness(100%)"
	bright = 100;
}
let hit = 0
function check(name, posX,posY,elem,checkflag){
	// console.log(enemyposY,bulletposY)	
	if(name=="bullet" && enemyposX < posX+50 && enemyposX +80 > posX+50 && enemyposY == posY){
		if(enemylife >= 10){
			enemyImg.style.display = "none";
			enemylife = 0;
			enemyplane();	
			clearInterval(clearlauch)	
		}
		bright -=5;
		enemyImg.style.filter = "brightness(" +bright+"%)";
		enemylife++;
		// console.log('ENEMYLIFE',enemylife);
	}

	// if(name==="star" && planeposX < posX && planeposX+100 > posX && planeposY+25 ==posY && checkflag){
	if(name==="star" && planeposX < posX && planeposX+100 > posX && planeposY<=posY && planeposY+100>=posY){
		elem.remove();
		scorecount++;
		showscore.innerHTML="<stong>SCORE : "+scorecount+"</strong>";
		console.log(scorecount);
		flag_star=false;
	}	
	if(name==="missile"){
		p1.style.top = posY+"px";
		p1.style.left = posX+"px";

		p2.style.top = planeposY+"px";
		p2.style.left = planeposX+"px";

		console.log(posX,planeposX,posY,planeposY)

	}
	if(name==="missile" && planeposX < posX && planeposX+100 > posX && planeposY<=posY && planeposY + 100>=posY){
		hit++;
		showscore.innerHTML="<stong>HIT : "+hit+"</strong>";
		console.log('hit',hit);
	}

}
function launchermissile(){
	clearlauch = setInterval(()=>{
		console.log('hi')
		target.style.display = "none";
		createmissile();
		missilereset();
		setTimeout(() =>{
			missile();
			target.style.display = "block";
		}, 3000);
	},5000)
}
function createmissile(){
	const rocket = document.createElement('img');
	rocket.src = "./img/missile.png";
	rocket.id="missile-img"
	rocket.className="rocket";
	gamearea.appendChild(rocket);

	rocket.style.top = 0 + 'px';
	rocket.style.left = enemyposX + 'px';
}
function missile(){
	// flag_missile = true;
	const rocket = document.getElementById('missile-img');

	let X = planeposX;
	let Y = planeposY;


	target.style.top = Y + 'px';
	target.style.left = X+25+ 'px';

	const angle = Math.atan((enemyposX - X) / (Y))*(180/Math.PI);
	rocket.style.transform = "rotate("+ angle+"deg)"
	rocket.style.transition="4s ease-in";

	rocket.style.top = Y + 'px';	
	rocket.style.left = X+40+ 'px';


	// if(flag_missile){
	setTimeout(()=>{
		check('missile',X,Y,rocket)
	},3900);
	// }
	// if(flag_missile){check("missile",X,Y,rocket)}
		// console.log(X,Y)
	// setTimeout(()=>{
	// 	target.style.display = "none";
	// }, 2000);
	setTimeout(()=>{
		missileblast();
		setTimeout(()=>{
			missilereset();
			rocket.remove();
		}, 1000);

	}, 3900);


}

function missileblast(rocket){
	const missileImg = document.getElementById('missile-img');

	missileImg.src = "./img/blast.gif";
	missileImg.style.height = "100px"
	missileImg.style.width = "100px"

}

function missilereset(rocket){
	const missileImg = document.getElementById('missile-img');

	missileImg.src = "./img/missile.png";
	missileImg.style.width = "25px"
	missileImg.style.height = "75px"
	missileImg.className = "";

}


function closemenu(name){
	document.getElementById(name).style.display = "none";
}

function showmenu(name){
	document.getElementById(name).style.display = "flex";
}


const startbtn = document.getElementsByClassName('startbtn');
const start = document.getElementById('start');
let flagstart = true;

if(flagstart){
	document.onkeydown = (e)=>{
		if(e.keyCode ==38){
			startbtn[1].classList.remove('active');
			startbtn[0].classList.add('active');
		}
		else if(e.keyCode ==40 ){
			startbtn[0].classList.remove('active');
			startbtn[1].classList.add('active');
			
		}
		if(e.keyCode == 13 && flagstart){
			const act = document.getElementsByClassName('active')[0];
			act.click();

		}
	}
}

function startgame(){
	flagstart = false;
	let i=3;
	var  clearstart = setInterval(()=>{
		if(i<=0){
			overlay.innerHTML="";
			clearInterval(clearstart);
			overlay.style.display="none";

		}
		// overlay.innerHTML = '<div class="text-center text-danger blinker"><h1 class="display-1  fw-bold">Let\'s Begin</h1><h1 class="display-5 text-info fw-bold">'+(i--)+'</h1></div>';
	},1000);
	// setTimeout(()=>{
		overlay.innerHTML="";
		Bulletmaker();
		launchermissile();
		star()
		flagkey=true;
	// },4000)

}

function refresh(){
	location.reload();
}

function star(){

	clearstar = setInterval(starmaker,1000);	
}
function starmaker(){
	flag_star = true;
	const star = document.createElement('img');
	star.src="./img/star.png";
	star.className="star";
	gamearea.appendChild(star);

	let posX = Math.floor(Math.random()*(gamearea.clientWidth-100));
	let posY = -50;
	
	const angle = Math.floor(Math.random()*60);
	// const angle =planeposX;
	star.style.transform = "rotate("+angle+"deg)";


	star.style.left = posX + 'px';
	star.style.top = posY + 'px';


	clearstarmove = setInterval(()=>{

		if(angle%2===0){
			posX -=1;
			star.style.left = posX + 'px';

		}
		else{
			posX +=1;
			star.style.left = posX + 'px';

		}

		posY+=2;
		star.style.top = posY + 'px';

		if(posY > gamearea.clientHeight+50 || posX > gamearea.clientWidth+50 || posX < -50  ){
			star.remove()
		}
		else{
			if(flag_star){check('star',posX,posY,star);}
		}
	},10);

}