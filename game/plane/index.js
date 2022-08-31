const planeImg = document.getElementById('plane-img');
const enemyImg = document.getElementById('enemy-img');
const missileImg = document.getElementById('missile-img');
const gamearea = document.getElementById('gamearea');
const target = document.getElementById('target');
const overlay = document.getElementById('overlay');
// const p2 = document.getElementById('point2');
// const p1 = document.getElementById('point1');
const bulletfire = document.getElementsByClassName('bullet');


// const newgame = {
	
// }

let planeposX  = 0;
let planeposY = screen.availHeight - 122*2;

let enemyposX  = 0;
const enemyposY = 120;

let flag = true;
let bright = 100;
let enemylife = 0;


let clearbullet="";
let clearfire = "";
let clearlauch = "";


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
		planeposX-=5;
	planeImg.style.left = planeposX + 'px';
}
function moveRight() {
	if(planeposX < ((screen.availWidth - screen.availWidth*0.6)+30))
		planeposX+=5;
	planeImg.style.left = planeposX + 'px';
}
document.addEventListener('keydown',function(e){
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
})

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
				check(bulletposX,bulletposY);
			}
		},10)
	}
}
document.addEventListener('visibilitychange', function(){
	if (document.visibilityState === 'visible') {
		launchermissile();
		missileImg.style.display="";
	} 
	else {
		missileImg.style.display="none";
		// showmenu('pause');
		clearInterval(clearbullet);
	}
});
enemyplane()
function enemyplane(){

	planerestore();
	const temp = parseInt(Math.floor(Math.random()*(screen.availWidth - screen.availWidth*0.6)+30));
	enemyposX = temp;

	enemyImg.style.left = enemyposX + 'px';
	enemyImg.style.top = 0 + 'px';


	missileImg.style.top = 0 + 'px';
	missileImg.style.left = enemyposX+ 'px';


}
function planerestore(){
	enemyImg.style.filter = "brightness(100%)"
	bright = 100;
	// enemyImg.style.top = -100 + 'px';

}

function check(bulletposX,bulletposY){
	// console.log(enemyposY,bulletposY)	
	if(enemyposX < bulletposX+50 && enemyposX +80 > bulletposX+50 && enemyposY == bulletposY){
		if(enemylife >= 10){

			enemylife = 0;
			enemyplane();	
			clearInterval(clearlauch)	
		}
		bright -=5;
		enemyImg.style.filter = "brightness(" +bright+"%)";
		
		enemylife++;
		console.log('ENEMYLIFE',enemylife);
	}

}
function launchermissile(){
	clearlauch = setInterval(()=>{
		target.style.display = "none";
		missilereset();
		setTimeout(() =>{
			missile();
			target.style.display = "block";
		}, 2000);
	},5000)
}
function missile(){
	let X = planeposX;
	let Y = planeposY;

	// const rocket = document.createElement('img');
	// rocket.src = "./img/missile.png";
	// rocket.id="missile-img"
	// gamearea.appendChild(rocket);


	target.style.top = Y + 'px';
	target.style.left = X+25+ 'px';

	missileImg.style.transition="4s ease";

	missileImg.style.top = Y + 'px';
	missileImg.style.left = X+40+ 'px';

	setTimeout(()=>{
		target.style.display = "none";
	}, 2000);
	setTimeout(()=>{
		// target.style.display = "block";
		missileblast()
		setTimeout(()=>{
			missileImg.style.display = "none";
			missileImg.style.top = 0 + 'px';
			missileImg.style.left = enemyposX+ 'px';
			missilereset();
		}, 1000);
		setTimeout(()=>{
			// target.style.display = "none";
			missileImg.style.display = "";
		}, 2000);
	}, 3700);


}

function missileblast(){
	missileImg.src = "./img/blast.gif";
	missileImg.style.height = "100px"
	missileImg.style.width = "100px"

}

function missilereset(){
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
			flagstart = false;
		}
	}
}

function startgame(){
	const act = document.getElementsByClassName('active')[0];
	let i=3;
	var  clearstart = setInterval(()=>{
		if(i<=0){
			overlay.innerHTML="";
			clearInterval(clearstart);
			overlay.style.display="none";
		}
		overlay.innerHTML = '<div class="text-center text-danger blinker"><h1 class="display-1  fw-bold">Let\'s Begin</h1><h1 class="display-5 text-info fw-bold">'+(i--)+'</h1></div>';
	},1000);
	act.click();
	setTimeout(()=>{
		overlay.innerHTML="";
		Bulletmaker();
		launchermissile()
	},4000)
}

function refresh(){
	location.reload();
}