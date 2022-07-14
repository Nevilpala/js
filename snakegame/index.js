var snake = document.getElementById('snake');
var btn = document.getElementsByTagName('button');
var food = document.getElementById('food');
var clearVibrate = 0;
var clearRight = "";
var clearLeft = "";
var clearUp = "";
var clearDown = "";
var vibrate = 0;

var clearfood = "";

var foodposX = 0;
var foodposY = 0;

var posx = 0;
var posy = 0;

function snakevibrateStart(){

	// clearVibrate = setInterval(snakevibrateY,500);

	foodposX = Math.floor(Math.random()*1050);
	foodposY = Math.floor(Math.random()*400);

	food.style.left = foodposX + "px";
	food.style.top  = foodposY + "px";
	scoreboard();			
}

function snakefoodposition(){

}

// function snakevibrateY(){
// 	if(vibrate == 0){
// 		snake.style.transform = "scaleY(1)";
// 		vibrate = 1;
// 	}
// 	else{
// 		snake.style.transform = "scaleY(-1)";
// 		vibrate = 0;
// 	}
// }

function moveUpStart(){
	clearUp = setInterval(moveUp,1);

	clearInterval(clearLeft);
	clearInterval(clearRight);
	clearInterval(clearDown);

	btn[0].disabled = true;
	btn[1].disabled = false;
	btn[2].disabled = false;
	btn[3].disabled = false;


}

function moveLeftStart(){
	clearLeft = setInterval(moveLeft,1);

	clearInterval(clearRight);
	clearInterval(clearUp);
	clearInterval(clearDown);

	btn[0].disabled = false;
	btn[1].disabled = true;
	btn[2].disabled = false;
	btn[3].disabled = false;

}

function moveRightStart(){
	clearRight = setInterval(moveRight,1);

	clearInterval(clearLeft);
	clearInterval(clearUp);
	clearInterval(clearDown);

	btn[0].disabled = false;
	btn[1].disabled = false;
	btn[2].disabled = true;
	btn[3].disabled = false;
}

function moveDownStart(){
	clearDown = setInterval(moveDown,1);

	clearInterval(clearLeft);
	clearInterval(clearRight);
	clearInterval(clearUp);

	btn[0].disabled = false;
	btn[1].disabled = false;
	btn[2].disabled = false;
	btn[3].disabled = true;

}




function moveRight(){
	if (posx >= 0   && posx <= 1150){
		posx++;

		snake.style.transform = "scaleX(-1) rotate(0deg)"
		snake.style.left = posx + 'px';
	}
	
}
function moveLeft(){
	if (posx >= 0){
		posx--;

		snake.style.transform = "scaleX(1) rotate(0deg)"
		snake.style.left = posx + 'px';
	
	}
	else
		posx = 0;

}
function moveUp(){
	if (posy >= 0 ){
		posy--;

		snake.style.transform = "rotate(90deg) scaleY(-1)";
		snake.style.top = posy + 'px';
	}
	else
		posy = 5;


}
function moveDown(){
	if (posy >= 0 && posy <= 500){
		posy++;

		snake.style.transform = "rotate(-90deg) scaleY(1)";	
		snake.style.top = posy + 'px';
	}

}
function clearallInterval(){
	clearInterval(clearLeft);
	clearInterval(clearDown);
	clearInterval(clearRight);
	clearInterval(clearUp);
}

let l = 0;
let r = 0;
let u = 0;
let d = 0;
window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 32:
		case 27:
				clearallInterval();
					l=0;
					r=0;
					u=0;
					d=0;
					console.clear();


			console.log(posx);
			console.log(foodposX);
			console.log(posy);
			console.log(foodposY);	
			console.log( temp);
			break;
		case 37:
			if(l==0){
				moveLeftStart();
				l=1;
				r=0;
				u=0;
				d=0;
			}
			break;
		case 38:
			if(u==0){
				moveUpStart();
				l=0;
				r=0;
				u=1;
				d=0;
			}
			break;
		case 39:
			if(r==0){
	        	moveRightStart();
				l=0;
				r=1;
				u=0;
				d=0;
			}
			break;
		case 40:
			if(d==0){
	       		moveDownStart();	
				l=0;
				r=0;
				u=0;
				d=1;	
			}
       		break;
	}
});


let temp = 0;
function scoreboard(){
	temp = (foodposX - posx) + (foodposY - posy);
	console.log(temp);
	if(temp > 0 && temp < 100){
		// snakevibrateStart();
		// food.style.display = "none";
		clearallInterval();
	}	
}
