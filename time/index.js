const Deg_s =  document.getElementById('s');
const Deg_h =  document.getElementById('h');
const Deg_m =  document.getElementById('m');
const arrow =  document.getElementById('clockcontainer');

let s = 90;
let m = 90;
let h = 90;


const clears = setInterval(() => {
	const d = new Date();
	s = d.getSeconds()*6;
	m = d.getMinutes()*6;
	h = (d.getHours()>12 ? (d.getHours() - 12) : d.getHours())*30;
	h = h + (m/360)*30;

	console.log(h/30,m/6,s/6);
	Deg_s.style.transform = 'rotate('+(s-90)+'deg)';
	Deg_h.style.transform = 'rotate('+(h-90)+'deg)';
	Deg_m.style.transform = 'rotate('+(m-90)+'deg)';
},500);

let a=[];
let b = 0;
let c = 0;
let x = 0;
for(let i=0;i<60;i++){
	a[i] = document.createElement('span');
	b=i*6;
	if(i%5==0 || i==0){
		a[i].className = 'arrow2';
		x = 'translateX(130px) '
	}
	else{
		a[i].className = 'arrow';
		x = 'translateX(140px) '
	}
	a[i].style.transform = x+'rotate('+(b)+'deg)';
	arrow.appendChild(a[i]);
}
let n=[];
let num=[];
for(let i=1;i<=12;i++){

	n[i] = document.createElement('span');
	num[i] = document.createElement('span');

	num[i].className = 'num';
	n[i].className = 'number';

	num[i].innerText = (i+3)%12 ==0 ? 12:(i+3)%12 ;

	c=i*30;
	x = 'translate(110px) ';

	n[i].style.transform = x+'rotate('+(c-5)+'deg)';
	num[i].style.transform = 'rotate('+(-c+4)+'deg)';



	arrow.appendChild(n[i]);
	n[i].appendChild(num[i]);
}
