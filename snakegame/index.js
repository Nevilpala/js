var snake = document.getElementById('snake');
var box = document.getElementById('box');
var boomimg = document.getElementById('boom-img');

var btn = document.getElementsByClassName('btn-toggle');
var food = document.getElementById('food');
var score = document.getElementById('score');
var showScore = document.getElementById('overlay-score');

var pausemenu = document.getElementById('pause');
var gameover = document.getElementById('gameover');

var clearVibrate = 0;
var clearRight = "";
var clearLeft = "";
var clearUp = "";
var clearDown = "";
var clearboom = "";

var vibrate = 0;

var clearfood = "";

var foodposX = 0;
var foodposY = 0;

var posx = 200;
var posy = 200;

var life = 3;
var scores = 0;
function snakeGameStart(){


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
	scoreboard();
	boomimg.style.display = 'block';

	bombX = parseInt(Math.floor((Math.random()*screen.availWidth - 400)));
	bombY = parseInt(Math.floor((Math.random()*screen.availHeight - 400)));

		boomimg.style.left = bombX + "px";
		boomimg.style.top  = bombY + "px";

}

function restartGame(){
	boomimg.src="./img/bomb.png";
	posx = 200;
	posy = 200;
	snake.style.left = posx + 'px';
	snake.style.top = posy + 'px';
	snake.style.transform = "scaleX(-1)";
	clearallInterval();
	clearkeyboolean();
	for(i=0;i<btn.length;i++){
		btn[i].disabled = false;
	}
}

function moveUpStart(){
	clearallInterval();

	clearUp = setInterval(moveUp,8);
	btn[0].disabled = true;
	btn[1].disabled = false;
	btn[2].disabled = false;
	btn[3].disabled = false;


}

function moveLeftStart(){
	clearallInterval();

	clearLeft = setInterval(moveLeft,8);

	btn[0].disabled = false;
	btn[1].disabled = true;
	btn[2].disabled = false;
	btn[3].disabled = false;

}

function moveRightStart(){
	clearallInterval();
	clearRight = setInterval(moveRight,8);

	btn[0].disabled = false;
	btn[1].disabled = false;
	btn[2].disabled = true;
	btn[3].disabled = false;
}

function moveDownStart(){
	clearallInterval();

	clearDown = setInterval(moveDown,8);


	clearkeyboolean();
	btn[3].disabled = true;

}




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
function clearallInterval(){
	clearInterval(clearLeft);
	clearInterval(clearDown);
	clearInterval(clearRight);
	clearInterval(clearUp);
}
function clearkeyboolean(){
	l=0;
	r=0;
	u=0;
	d=0;
}
function unclearkeyboolean(){
	l=1;
	r=1;
	u=1;
	d=1;
}
function allpostion(){

	console.log((foodposX -  50),(foodposX + 50),posx, (foodposY - 50),(foodposY + 50),posy);
}
let l = 0;
let r = 0;
let u = 0;
let d = 0;
window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 32:
		case 27:	
				pause();
				clearallInterval();
				clearInterval(clearboom);
			break;
		case 37:
			if(l==0){
				moveLeftStart();
				clearkeyboolean();
				l=1;			
			}
			break;
		case 38:
			if(u==0){
				moveUpStart();
				clearkeyboolean();
				u=1;
			}
			break;
		case 39:
			if(r==0){
	        	moveRightStart();
				clearkeyboolean();

				r=1;
			}
			break;
		case 40:
			if(d==0){
	       		moveDownStart();	

				clearkeyboolean();

				d=1;	
			}
       		break;
	}
});


let temp = 0;
var count =0;

function scoreboard(){

	if((bombX -  80) < posx && (bombX + 80) > posx && (bombY - 50) < posy && (bombY + 50) > posy){
		count--;
		boomimg.src = "./img/blast.gif";
		score.value = count;
		clearallInterval();
		delaytime();
	}
	if((foodposX -  80) < posx && (foodposX + 50) > posx && (foodposY - 50) < posy && (foodposY + 50) > posy){
		snakeGameStart();

		overlayScore('+2');
		count+=2;
		score.value = count;
	}
}
function delaytime(){
	setTimeout(lifecount,2500);
}
function overlayScore(n){
	showScore.innerHTML = "<p id='displayscore'></p>";

	var displayscore = document.getElementById('displayscore');

	if(n == '-1'){
		displayscore.style.color = 'rgba(255,0,0,0.8)';
	}
	displayscore.innerHTML = n;
}

var lifeline = 5;
var heart = document.getElementsByClassName('heartimg');
function lifecount(){

	boomimg.style.display = 'none';

	lifeline--;
	overlayScore('-1');
	if(lifeline<5 && lifeline>0){
		restartGame();
		clearallInterval();
		clearkeyboolean();
		heart[lifeline].style.filter = "grayscale(1)";
	}
	else if(lifeline == 0){
		gameover.style.display = 'block';	
	}


}
function pause(){
	pausemenu.style.display = "block";
	clearallInterval();
	unclearkeyboolean();
}

function resume(){
	pausemenu.style.display = "none";
	clearkeyboolean();
	boom();
}
function NewGame(){
	window.location.reload();
}