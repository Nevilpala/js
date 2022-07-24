let p1 = document.getElementById('player1');
let p2 = document.getElementById('player2');
let td = document.getElementsByTagName('td');

var swap = 0;  
var flag = 0;
var lock = 0;

var mat = new Array(3);
var temp;
// Create two dimensional array
for (var i = 0; i < mat.length; i++) {
	mat[i] = [];
}
function load(){

}

function StartGame(n){

	if(td[n].innerHTML == "" && lock==0){
		if(flag == 0 ){
			td[n].innerHTML = '<img src="./img/circle.png">';
			td[n].className = 'circle';
			p1.classList.remove("active");
			p2.className += " active";
			flag = 1;
		}
		else{
			p1.className += " active";
			p2.classList.remove("active");
			// p2.className.replace(" active", "");
			td[n].innerHTML = '<img src="./img/cross.png">';
			td[n].className = 'cross';
			flag = 0;
		}
		createTableToMatrix();
	}
		scorecount();
}

function createTableToMatrix(){
	var k=0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			mat[i][j] = td[k].className	;
			k++;
		}
	}


}

function matToTable(){
	var k=0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			td[k].className = mat[i][j];
			k++;
		}
	}
}

function scorecount(){

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {

			if(mat[i][0] == mat[i][1] && mat[i][0] == mat[i][2] && mat[i][0]!="" && mat[i][1]!="" && mat[i][2]!="" ){
				mat[i][0] = "bg-success";mat[i][1] = "bg-success";mat[i][2] = "bg-success";
				lock=1;
			}
			else if(mat[0][j] == mat[1][j] && mat[0][j] == mat[2][j] && mat[0][j]!="" && mat[1][j]!="" && mat[2][j]!=""){
				mat[0][j] = "bg-success";mat[1][j] = "bg-success";mat[2][j] = "bg-success";
				lock=1;
			}
			else if(mat[0][0] == mat[1][1] && mat[0][0] == mat[2][2] && mat[0][0]!="" && mat[1][1]!="" && mat[2][2]!=""){
				mat[0][0] = "bg-success";mat[1][1] = "bg-success";mat[2][2] = "bg-success";
				lock=1;

			}
			else if(mat[0][2] == mat[1][1] && mat[0][2] == mat[2][0] && mat[0][2]!="" && mat[1][1]!="" && mat[2][0]!="") {
				mat[0][2] = "bg-success";mat[1][1] = "bg-success"; mat[2][0]= "bg-success";
				lock=1;
			}
			if(mat[i][j]!=""){
				alert()
			}
			matToTable();
		}
	}

}

function NewGame(){
	lock=0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			mat[i][j] = "";
		}
	}
	for (let i = 0; i < td.length; i++) {
		td[i].className = "";
		td[i].innerHTML = "";	
	}

	flag =0;
	console.log(mat,td)
}

