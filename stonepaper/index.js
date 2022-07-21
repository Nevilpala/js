// var corosel = document.getElementById('');
var item = document.getElementsByClassName('item');
var randomimg = document.getElementById('randomimg');
var overlay = document.getElementById('overlay');
var win = document.getElementsByClassName('winner');

let i=0;
item[i].style.display = 'block';
var img = ["paper" ,"rock" ,"scissor"];

function allnull(){
	for(var i=0;i<item.length;i++){
		item[i].style.display = 'none';
	}
}

function prev(){
	allnull();	
	i--;
	if(i<0){
		i=item.length -1;	
	}
	console.log(i);
	item[i].style.display = 'block';


}
function next(){
	allnull();
	i++;
	if(i==item.length){
		i=0;
	}
	console.log(i);

	item[i].style.display = 'block';

}

var temp = "";
function compare(){
	com_player();
	setTimeout(check,100);
}

function com_player(){
	temp = Math.floor(Math.random()*2.5);	
	let see = img[temp];
	randomimg.innerHTML = '<img src="./img/'+see+'.png">';

}

function check(){
	imgDnone();
	if(i == temp){
		overlay.style.display = 'block';
		overlay.innerHTML = '<p class="zoomout">DRAW</p>';
	}
	else if(i == 0 && temp == 2 || i == 1 && temp == 0 || i == 2 && temp == 1){
		imgDnone();
		win[1].style.display = 'block';
	}
	else{
		imgDnone();
		win[0].style.display = 'block';

	}

	// setTimeout(clearAll,1000);
}

function imgDnone(){
	for(var i=0;i<win.length;i++){
		win[i].style.display = 'none';
	}

	overlay.style.display = 'none';

}

function clearAll(){
	for(var i=0;i<win.length;i++){
		win[i].style.display = 'none';
	}

	overlay.style.display = 'none';
	randomimg.innerHTML = '';

}

window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 27: // ESC
		case 32: // SPACE
			break;
		case 37: // LEFT ARROW
			prev();
			break;
		case 38: // UP ARROW
			
			break;
		case 39: // RIGHT ARROW
			next();
			break;
		case 40: // DOWN ARROW
       		break;
   		case 13:  // ENTER
   			compare();
			break;
	}
});