
var snake = document.getElementById('snake');
var food = document.getElementById('food');

var boomimg = document.getElementById('boom-img');

var btn = document.getElementsByClassName('btn-toggle');

var score = document.getElementById('score');
var showScore = document.getElementById('overlay-score');

var helpmenu = document.getElementById('help'); 
var pausemenu = document.getElementById('pause');
var gameover = document.getElementById('gameover');
var highscore = document.getElementById('highscore');
var highscoreDisplay = document.getElementById('highscoreDisplay');

var clearRight = "";
var clearLeft = "";
var clearUp = "";
var clearDown = "";
var clearboom = "";


let temp = 0;
let count =0;

let foodposX = 0;
let foodposY = 0;

let bombX = 0;
let bombY = 0;

let posx = 200;
let posy = 200;

let scores = 0;
var tempfood = "";
let increment = 0;


let lifeline = 5;

function snakeGameStart(){
 	snake.style.display = "block";
	food.style.display = "block";

	tempfood =  parseInt(Math.floor((Math.random()*5.5)));

	food.src = "./img/food"+tempfood+".png";
	foodmaker();
}
function foodmaker(){
	foodposX = parseInt(Math.floor((Math.random()*screen.availWidth)));
	foodposY = parseInt(Math.floor((Math.random()*screen.availHeight)));

	if(foodposX >=100 && foodposY >=100 && foodposX <= screen.availWidth-200  && foodposY <=screen.availHeight - 250 ){
		food.style.left = foodposX + "px";
		food.style.top  = foodposY + "px";
	}
	else{
		foodmaker();
	}
}
boom();
function boom(){
	clearboom = setInterval(bombmaker,12000);
}
function bombmaker(){
	boomimg.style.display = 'block';

	bombX = Math.abs(Math.floor((Math.random()*screen.availWidth - 400)));
	bombY = Math.abs(Math.floor((Math.random()*screen.availHeight - 400)));


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
function recallGameSanke(){
	resetbomb();

	posx = 200;
	posy = 200;
	snake.style.left = posx + 'px';
	snake.style.top = posy + 'px';
	snake.style.transform = "scaleX(-1)";

	stopallInterval();
	releasearrowkeylock();
	btnDisabled();
}


function delaytime(functionname,entertimedelay){
	arrowkeylock();
	stopallInterval();
	setTimeout(functionname,entertimedelay);
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
		posx+=1+increment;

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
		posx-= 1+increment;

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
		posy-=1+increment;
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
		posy+=1+increment;
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
let flagimg = 0;
let space = 0;

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
		case 27:
		case 32:
			if (space==0) {	
				pause(pausemenu);
				stopallInterval();
				space = 1;
			}
			else
			{
				resume();
				space =  0;
			}
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
   			if(flagimg == 0){
   				snake.src = './img/snake4.png';
   				flagimg = 1;
   			}
   			else if(flagimg == 1){
   				snake.src = './img/snake2.png';
   				flagimg = 2;
			}
			else if(flagimg == 2){
   				snake.src = './img/snake1.png';
   				flagimg = 3;
			}
			else{
				snake.src = './img/snake3.png';
   				flagimg = 0;
			}
			break;
	}
});

let checkonetime = 0;


function scoreboard(){

	if((bombX -  70) < posx && (bombX + 55) > posx && (bombY - 50) < posy && (bombY + 50) > posy){
		boomblast();
		delaytime(lifecount,1200);
	}
	if((foodposX -  80) < posx && (foodposX + 55) > posx && (foodposY - 50) < posy && (foodposY + 50) > posy){
		
		if(tempfood == 5){
			overlayScore('+5');
			count+=5;
		}
		else{
			overlayScore('+2');
			count+=2;
		}
		snakeGameStart();
		score.value = count;
	}
	if(score.value >= 25 && score.value < 50){
		increment=0.10;
	}
	if(score.value >= 50 && score.value < 100){
		increment=0.25;
	}
	else if(score.value >= 100 && score.value < 125){
		increment=0.35;
	}
	else if(score.value >= 125 && score.value < 150){
		increment=0.45;
	}
	else if(score.value >= 150 && score.value < 175){
		increment=0.55;
	}
	else if(score.value >= 175 && score.value < 200){
		increment=0.65;
	}
	else if(score.value >= 200){
		increment=0.80;
	}
	else if(score.value >= 300){
		increment=1;
	}
	else{
		increment=0;
	}


	if (checkonetime == 0) {
		if(score.value > highscore.innerHTML && score.value >0 && highscore.innerHTML>0){
			highscoreDisplay.style.display = 'block';
			checkonetime++;
		}
	}


}

function boomblast(){
	boomimg.src = "./img/blast.gif";
	boomimg.style.width = 150+'px';
	boomimg.style.height = 100+'px';
}
function resetbomb(){
	boomimg.style.height = 50+'px';
	boomimg.style.width = 100+'px';
	boomimg.src = "./img/bomb.png";
}
function overlayScore(n){
	showScore.innerHTML = "<p id='displayscore'></p>";
	var displayscore = document.getElementById('displayscore');

	if(n < 0){
		displayscore.style.color = 'rgba(255,0,0,0.8)';
	}
	displayscore.innerHTML =n;
}

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

	if(lifeline == 5){
		heart[lifeline].style.filter = "grayscale(0)";
	}
	else if(lifeline < 5 && lifeline > 0){
		delaytime(recallGameSanke,1200);
		heart[lifeline].style.filter = "grayscale(1)";

	}
	else if(lifeline <= 0){
		stopallInterval();
		arrowkeylock();
		heart[lifeline].style.filter = "grayscale(1)";
		gameover.style.display = 'block';	
		space = 1;
		const newgame = document.getElementById('NewGame');
		window.addEventListener("keypress", function(e){
			if (e.key === "Enter")
				newgame.click();
		});
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
var clearCountDown = "";
var countmenu = document.getElementById('countdown-menu');
var countdown = document.getElementById('countdown');

function resume(){	
	pausemenu.style.display = "none";
	helpmenu.style.display = "none";
	releasearrowkeylock();
	boom();
}

var highscorevalue = "";


function NewGame(){





	pausemenu.style.display = "none";
	helpmenu.style.display = "none";
	gameover.style.display = "none";
 	food.style.display = "none";
 	snake.style.display = "none";

	bombX = -500;
	bombY = -500;
	boomimg.style.display = 'none';
 	clearInterval(clearboom);
 	boom();

	releasearrowkeylock();
	stopallInterval();
	resetbomb();

 	if(score.value > highscore.innerHTML && score.value > 0){
		highscore.innerHTML = score.value;
	}
	checkonetime =0;
 	scores = 0;
 	count = 0;
 	score.value = 0;
 	snakeGameStart();
 	recallGameSanke();

 	lifeline=5;

 	for(i=0; i<heart.length;i++){
		heart[i].style.filter = "grayscale(0)";

 	}
}