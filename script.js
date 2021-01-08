document.getElementById("e").onclick = function (){
    alert("Hello");
}

document.getElementById("f").onclick = function (){
    console.log("Hello my name is....");
    console.log("Counting Monkey: 1");
    console.log("Counting Monkey: 2");
    console.log("Counting Monkey: 3");
}

document.getElementById("g").onclick = function (){
    document.getElementById("r1c2").style.backgroundColor = "yellow";
}

document.getElementById("h").onclick = function (){
    document.getElementById("r1c2").style.backgroundColor = "white";
    document.getElementById("r1c2").innerHTML = "";
    document.getElementById("r1c4").innerHTML = '<img id="monkey" src="monkey.jpg">';
}