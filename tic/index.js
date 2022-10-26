const p1 = document.getElementById('player1');
const p2 = document.getElementById('player2');
const win1 = document.getElementById('win1');
const win2 = document.getElementById('win2');
const main = document.getElementById('main');
const winbox = document.getElementById('winbox');
const won = document.getElementById('won');
const td = document.getElementsByTagName('td');
const playername = document.getElementsByClassName('playername');
const btnplayer = document.getElementsByClassName('btnplayer');

let computer = false;
let swap = 0;  
let flag = 0;
let lock = 0;

let win = "";

let mat = new Array(3);
let temp;
// Create two dimensional array
for (let i = 0; i < mat.length; i++) {
	mat[i] = [];
}


function changename(e){
	const pname =  prompt("Enter Name");
	playername[e].innerHTML=pname===""?"PLAYER "+(e+1) :pname.toUpperCase();
}
function load(){
	const bufer = document.createElement('div');
	bufer.innerHTML = '<img src="./img/circle.png">'+'<img src="./img/cross.png">';
	bufer.className='buffer';
	main.appendChild(bufer);

	setTimeout(()=>{bufer.remove()},5000);
}

function StartGame(n){

	if(td[n].innerHTML == "" && lock===0){
		if(flag === 0){
			td[n].innerHTML = '<img src="./img/circle.png">';
			td[n].className = 'circle';
			p1.classList.remove("active");
			p2.className += " active";
			flag = 1;
		}
		else{
			p1.className += " active";
			p2.classList.remove("active");
			td[n].innerHTML = '<img src="./img/cross.png">';
			td[n].className = 'cross';
			flag = 0;

		}
		createTableToMatrix();
				scorecount();

		

	}
}

function createTableToMatrix(){
	let k=0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			mat[i][j] = td[k].className	;
			k++;
		}
	}


}

function matToTable(){
	let k=0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			td[k].className = mat[i][j];
			k++;
		}
	}
}

let winner = 0;
let img = "";

function scorecount(){

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if(mat[i][0] == mat[i][1] && mat[i][0] == mat[i][2] && mat[i][0]!="" && mat[i][1]!="" && mat[i][2]!="" ){
				setTimeout(()=>gameWinner(flag),700);
				win = mat[i][0]; mat[i][0] = "bg-success";mat[i][1] = "bg-success";mat[i][2] = "bg-success";
				lock=1;

			}
			else if(mat[0][j] == mat[1][j] && mat[0][j] == mat[2][j] && mat[0][j]!="" && mat[1][j]!="" && mat[2][j]!=""){
				win = mat[0][j]; mat[0][j] = "bg-success";mat[1][j] = "bg-success";mat[2][j] = "bg-success";
				setTimeout(()=>gameWinner(flag),700);
				lock=1;
			}
			else if(mat[0][0] == mat[1][1] && mat[0][0] == mat[2][2] && mat[0][0]!="" && mat[1][1]!="" && mat[2][2]!=""){
				win = mat[1][1]; mat[0][0] = "bg-success";mat[1][1] = "bg-success";mat[2][2] = "bg-success";
				setTimeout(()=>gameWinner(flag),700);
				lock=1;

			}
			else if(mat[0][2] == mat[1][1] && mat[0][2] == mat[2][0] && mat[0][2]!="" && mat[1][1]!="" && mat[2][0]!="") {
				win = mat[1][1]; mat[0][2] = "bg-success";mat[1][1] = "bg-success"; mat[2][0]= "bg-success";
				setTimeout(()=>gameWinner(flag),700);
				lock=1;
			}
			matToTable();
		}
	}
}
function gameWinner(winname){
	winbox.style.display="block";
	const p1 = playername[0].innerHTML;
	const p2 = playername[1].innerHTML;
	won.innerHTML= (flag==0?p2:p1);
}

function NewGame(){
	winbox.style.display="none";

	lock=0;
	winner = 0
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			mat[i][j] = "";
		}
	}
	for (let i = 0; i < td.length; i++) {
		td[i].className = "";
		td[i].innerHTML = "";	
	}
	p1.className += " active";
	p2.classList.remove("active");

	flag =0;
	img.src= "";

}

// function  matrixtotable(x,y){
// 	var k=0;
// 	for (let i = 0; i < 3; i++) {
// 		for (let j = 0; j < 3; j++) {
// 			if(x==i && y == j){
// 				return k;
// 			}
// 			k++;
// 		}
// 	}
// }
// function computerplayer(comp){
// 	comp.disabled=true;
// 	computer=true;	
// }
// function computerplayer_turn(){
// 	var x = Math.floor(Math.random()*3);
// 	var y = Math.floor(Math.random()*3);

// 	if (mat[x][y] === ""  || mat[x][y] === undefined  ){
// 		// p1.className += " active";
// 		// p2.classList.remove("active");
// 		var t = matrixtotable(x,y);
// 		console.log(t)
// 		td[t].innerHTML = '<img src="./img/cross.png">';
// 		td[t].className = 'cross';
// 	}
// 	else{
// 		computerplayer_turn();
// 	}
// // }
// function clickfunc(clickfuncname,doc){
// 	if(doc===""|| doc===undefined){
// 		document.addEventListener('keydown',(e)=>{
// 			if(e.keyCode===13){
// 				clickfuncname.click();
// 			}
// 		})
// 	}
// 	else{
// 		doc.addEventListener('keydown',(e)=>{
// 			if(e.keyCode===13){
// 				clickfuncname.click();
// 			}
// 		})
// 	}
		
// }