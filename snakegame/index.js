
var snake = document.getElementById('snake');
var food = document.getElementById('food');
var stanby = document.getElementById('steadysnake');

var boomimg = document.getElementById('boom-img');

var box = document.getElementById('box');
var btn = document.getElementsByClassName('btn-toggle');

var score = document.getElementById('score');
var showScore = document.getElementById('overlay-score');

var helpmenu = document.getElementById('help'); 
var pausemenu = document.getElementById('pause');
var gameover = document.getElementById('gameover');

var clearRight = "";
var clearLeft = "";
var clearUp = "";
var clearDown = "";
var clearboom = "";



var foodposX = 0;
var foodposY = 0;

var posx = 200;
var posy = 200;

var scores = 0;
var tempfood = "";

function snakeGameStart(){
	tempfood =  parseInt(Math.floor((Math.random()*5.7)));
	food.src = "./img/food"+tempfood+".png";
	console.log(tempfood);


	foodposX = parseInt(Math.floor((Math.random()*screen.availWidth)));
	foodposY = parseInt(Math.floor((Math.random()*screen.availHeight)));

	if(foodposX >=100 && foodposY >=100 && foodposX <= screen.availWidth-200  && foodposY <=screen.availHeight - 250 ){

		food.style.left = foodposX + "px";
		food.style.top  = foodposY + "px";
	}
	else{
		snakeGameStart();
	}

}
boom();
var bombX = 0;
var bombY = 0;
function boom(){
	clearboom = setInterval(bombmaker,10000);
}

function bombmaker(){
	boomimg.style.display = 'block';

	bombX = parseInt(Math.floor((Math.random()*screen.availWidth - 400)));
	bombY = parseInt(Math.floor((Math.random()*screen.availHeight - 400)));

	if(bombX<=75 && bombY<=75){
		boomimg.style.left = -100 + "px";
	 	boomimg.style.top  = -100 + "px";
	}
	else{
		boomimg.style.left = bombX + "px";
	 	boomimg.style.top  = bombY + "px";
	}
	scoreboard();
 }
function restartGame(){
	resetbomb();

	posx = 200;
	posy = 200;
	snake.style.left = posx + 'px';
	snake.style.top = posy + 'px';
	snake.style.transform = "scaleX(-1)";

	stopallInterval();
	releasearrowkeylock();

	for(i=0;i<btn.length;i++){
		btn[i].disabled = false;
	}
}

function moveUpStart(){
	stopallInterval();
	clearUp = setInterval(moveUp,8);

	btnDisabled();
	btn[0].disabled = true;


}

function moveLeftStart(){
	stopallInterval();

	clearLeft = setInterval(moveLeft,8);

	btnDisabled();
	btn[1].disabled = true;

}

function moveRightStart(){
	stopallInterval();
	clearRight = setInterval(moveRight,8);

	btnDisabled()
	btn[2].disabled = true;
}

function moveDownStart(){
	stopallInterval();
	clearDown = setInterval(moveDown,8);
	
	btnDisabled();
	btn[3].disabled = true;
}
function btnDisabled(){
	for(i=0;i<btn.length;i++){
		btn[i].disabled = false;
	}
}
// MOVERIGHT
function moveRight(){
	if (posx >=0   && posx <= screen.availWidth - 200){
		posx++;

		scoreboard();
		snake.style.transform = "scaleX(-1) rotate(0deg)"
		snake.style.left = posx + 'px';
	}
	else{
		lifecount();
	}
	
}
// MOVELEFT
function moveLeft(){
	if (posx >= 0){
		posx--;

		scoreboard();
		snake.style.transform = "scaleX(1) rotate(0deg)"
		snake.style.left = posx + 'px';
	
	}
	else{
		lifecount();
	}

}
// MOVEUP
function moveUp(){
	if (posy >= 50 ){
		posy--;
	scoreboard();

		snake.style.transform = "rotate(90deg) scaleY(-1)";
		snake.style.top = posy + 'px';
	}
	else{
		lifecount();
	}


}
// MOVEDOWN
function moveDown(){
	if (posy >= 50 && posy <= screen.availHeight - 275){
		posy++;
	scoreboard();

		snake.style.transform = "rotate(-90deg) scaleY(1)";	
		snake.style.top = posy + 'px';
	}
	else{
		lifecount();
	}

}
// STOP ALL INTERTRVAL
function stopallInterval(){
	clearInterval(clearLeft);
	clearInterval(clearDown);
	clearInterval(clearRight);
	clearInterval(clearUp);
}

let l = 0;
let r = 0;
let u = 0;
let d = 0;
let flag = 0;

function releasearrowkeylock(){
	l=0;
	r=0;
	u=0;
	d=0;
}
function arrowkeylock(){
	l=1;
	r=1;
	u=1;
	d=1;
}
window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 32:
		case 27:	
				pause(pausemenu);
				stopallInterval();
			break;
		case 37:
			if(l==0){
				moveLeftStart();
				releasearrowkeylock();
				l=1;			
			}
			break;
		case 38:
			if(u==0){
				moveUpStart();
				releasearrowkeylock();
				u=1;
			}
			break;
		case 39:
			if(r==0){
	        	moveRightStart();
				releasearrowkeylock();

				r=1;
			}
			break;
		case 40:
			if(d==0){
	       		moveDownStart();	
				releasearrowkeylock();
				d=1;	
			}
       		break;
   		case 8:
   			if(flag == 0){
   				snake.src = './img/snake4.png';
   				flag = 1;
   			}
   			else if(flag == 1){
   				snake.src = './img/snake2.png';
   				flag = 2;
			}
			else{
				snake.src = './img/snake3.png';
   				flag = 0;

			}
			break;
	}
});


let temp = 0;
var count =0;

function scoreboard(){

	if((bombX -  80) < posx && (bombX + 80) > posx && (bombY - 50) < posy && (bombY + 50) > posy){
		boomblast();
		delaytime(lifecount,1000);
	}
	if((foodposX -  80) < posx && (foodposX + 50) > posx && (foodposY - 50) < posy && (foodposY + 50) > posy){
		
		if(tempfood == 5){
			overlayScore('+5');
			count+=5
		}
		else{
			overlayScore('+2');
			count+=2;
		}
		snakeGameStart();
		score.value = count;
	}
}

function boomblast(){
	boomimg.src = "./img/blast.gif";
}
function resetbomb(){
	boomimg.src = "./img/bomb.png";
}

function delaytime(functionname,entertimedelay){
	arrowkeylock();
	stopallInterval();
	setTimeout(functionname,entertimedelay);
}
function overlayScore(n){
	showScore.innerHTML = "<p id='displayscore'></p>";
	var displayscore = document.getElementById('displayscore');

	if(n < 0){
		displayscore.style.color = 'rgba(255,0,0,0.8)';
	}
	displayscore.innerHTML = n;
}

var lifeline = 5;
var heart = document.getElementsByClassName('heartimg');


function lifecount(){

	if(score.value > 50 && score.value < 100){
		count-=2;
		overlayScore(-2);
	}
	else if(score.value >= 100 && score.value <150){
		count-=3;
		overlayScore(-3);
	}
	else if(score.value >= 150  && score.value < 200){
		count-=5;
		overlayScore(-5);
	}
	else if(score.value >= 200 ){
		count-=10;
		overlayScore(-10);
	}
	else{
		count--;
		overlayScore(-1);
	}

	score.value = count;

	lifeline--;

	stopallInterval();
	arrowkeylock();

	if(lifeline < 5 && lifeline > 0){
		delaytime(restartGame,1200);
		heart[lifeline].style.filter = "grayscale(1)";
	}
	else if(lifeline == 0){
		heart[lifeline].style.filter = "grayscale(1)";
		gameover.style.display = 'block';	
	}


	bombX = -500;
	bombY = -500;
	boomimg.style.display = 'none';

	clearInterval(clearboom);
	delaytime(boom,1000);
}

function pause(input){
	clearInterval(clearboom);
	stopallInterval();
	arrowkeylock();
	input.style.display = "block";
}

function resume(){
	pausemenu.style.display = "none";
	helpmenu.style.display = "none";
	releasearrowkeylock();
	boom();
}
function NewGame(){
	window.location.reload();
}