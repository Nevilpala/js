const box = document.getElementById('Col-maker');
const overlay = document.getElementById('overlay');
const gameover = document.getElementById('gameover');
const back = document.getElementsByClassName('back-visible');

setTimeout(()=>{
	overlay.style.display = "none";
},2100);

const card = ["./img/A.jpg","./img/4.jpg","./img/10.jpg","./img/8.jpg"];
const block = document.getElementsByClassName('block');
const cardimg = document.getElementsByClassName('Card-Img');
const frontimg = document.getElementsByClassName('front-img');
const clickflip = document.getElementsByClassName('flip-box-inner');

const temp =[];
const card1 =[];
const card2 =[];
let check =[];


function load(){

	card1maker();
	card2maker();

	console.log("card1 : "+card1)
	console.log("card2 : "+card2)

	makingimg();

	frontimgs();
}
function card1maker(){
	for(var i=0 ; i < 4; i++){
		GenratorCard();
	}
}
function card2maker(){
	for(var i=0 ; i < 4; i++){
		GenratorCard();
	}
}
function GenratorCard(){
	let x = randomNumber(8);
	checkrepeat(x);
	temp.push(x)
}
let count=0;

function checkrepeat(num){
	if(temp.includes(num)){
		GenratorCard();
	}
	else{
		if(card1.length < 4){
			card1.push(num);
		}

		else{
			card2.push(num);
		}

	}
}


function randomNumber(range){ // n=range
	return parseInt(Math.floor( Math.random() * range));
}


function makingimg(){
	for (let i = 0; i < card.length; i++) {
		const match1 = clickflip[card1[i]].classList;
		const match2 = clickflip[card2[i]].classList;

		cardimg[card1[i]].src = card[i];
		match1.add("pair"+i);

		cardimg[card2[i]].src = card[i];
		match2.add("pair"+i);
	}
}
function frontimgs(){
	for (let i = 0; i < card.length; i++) {
		frontimg[card1[i]].src = card[i];
		frontimg[card2[i]].src = card[i];
	}
	setTimeout(()=>{
		for (let i = 0; i < frontimg.length; i++) {
			frontimg[i].src ="./img/front.png";
		}
	},2000)
}

function flipimg(temp){
	if(!temp.className.includes("lock")){
		const clas = temp.classList;
		check.push(temp);
		// lock = false;
		clas.add("lock");
		var count=0;
		console.log(temp)
		temp.style.transform="rotateY(180deg)";
		checkresult();
	}
}

function checkresult(){
	count++;
	if(count == 2){

		if(check[0].className === check[1].className){
			check[0].style.display = check[1].style.display = "none";
		}
		else{
			for(let i=0;i<clickflip.length;i++){
				
				const clasre = clickflip[i].classList;
				clasre.remove('lock');

				setTimeout(()=>{
					clickflip[i].style.transform = "";
					loselife()
				},500);
			}
		}
		count=0;
		check=[];
	}	
}	

function loselife(){
	overlay.style.display = "block";
	gameover.style.display = "block";
	gameover.addEventListener('click',()=>{restart()})
}

function restart(){
	window.location.reload();
}