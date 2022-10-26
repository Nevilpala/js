var v="";
var answer = "";	
var temp="";

function calc(op){
	// x=document.getElementsByClassName('num');
	v=op.innerHTML;

	temp+=v;
	display();
}
function display(){
	document.getElementById('txt').value = temp;

	
	var sc = document.getElementById("txt").value;
	document.addEventListener("keypress", function(e) {
	  if (e.key === "Enter") {
	    ans_calc();
	  }
	});

}
function ans_calc(){
	var eq=document.getElementById('txt').value;
	answer = eval(eq);

	document.getElementById("ans").innerHTML=answer;
}

function backspace(){
 	temp=temp.substring(0, temp.length - 1);
	document.getElementById('txt').value = temp;
}


function clearall(){
	temp="";
	answer="";
	// var eq=document.getElementById('txt').value;
	// document.getElementById('txt').value = eq.substring(0, eq.length - eq.length);
	// location.reload();

	document.getElementById('txt').value = temp;
	document.getElementById('ans').innerHTML = answer;


}
