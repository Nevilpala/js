// var corosel = document.getElementById('');
var item = document.getElementsByClassName('item');
var item2 = document.getElementsByClassName('item2');
var randomimg = document.getElementById('randomimg');
var overlay = document.getElementById('overlay');
var win = document.getElementsByClassName('winner');

let i=0;
var temp = "";
let flag = true;
var sec = 0;

item[i].style.display = 'block';
var img = ["paper" ,"rock" ,"scissor"];

function allnull(state){
	if(state==="player"){
		for(let k=0;k<item.length;k++){
			item[k].style.display = 'none';
		}
	}
	if(state === "ran"){
		for(let k=0;k<item2.length;k++){
			item2[k].style.display = 'none';
		}
	}
}

function prev(){
	allnull("player");	
	i--;
	if(i<0){
		i=item.length -1;	
	}
	item[i].style.display = 'block';


}
function next(){
	allnull("player");
	i++;
	if(i==item.length){
		i=0;
	}

	item[i].style.display = 'block';

}

var temp = 0;
let clearcorosel="";

function compare(){
	for(let w of win){
		w.style.display="none";
	}
	if (flag) {
		flag=false;
		com_player();
	}
}

function com_player(){
	var sec = Math.floor(Math.random()*1000)+100;
	sec = sec - sec%100;


	clearcorosel = setInterval(()=>{
		allnull("ran");
		item2[temp].style.display = 'block';
		temp++;
		temp=(temp+1)%3;

	},100);
	setTimeout(()=>clearInterval(clearcorosel),sec);
	setTimeout(check,sec+500);
}
function check(){
	const enemy = (temp+1)%3;
	imgDnone();
	if(i == enemy){
		overlay.style.display = 'block';
		overlay.innerHTML = '<p class="zoomout">DRAW</p>';
	}
	else if(i == 0 && enemy == 2 || i == 1 && enemy == 0 || i == 2 && enemy == 1){
		imgDnone();
		win[1].style.display = 'block';
	}
	else{
		imgDnone();
		win[0].style.display = 'block';
	}
	flag=true;
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