// Images and Warning Messages
const personImage = '<img id="person" src="person.jpg">';
const monkeyImage = '<img id="monkey" src="monkey.jpg">';
const leftBoatImage = '<img class="boat" src="leftBoat.jpg">';
const rightBoatImage = '<img class="boat" src="rightBoat.jpg">';
const boatMsg = 'Must have at least 1 object your boat';
const leftMsg = 'Left Side: More monkey than People';
const rightMsg = 'Right Side: More monkey than People';

// Variables indicating body's locations; left or right side
let personPosition = ["", "left", "left", "left"];
let monkeyPosition = ["", "left", "left", "left"];
let boatSide = "left";

// Variable for the count; no. of steps, no. of body on the each side and on the boat
let steps=1;

let boat = {
    count:0,
    monkey:0,
    person:0
}
let left = {
    monkey:0,
    person:0
}
let right = {
    monkey:0,
    person:0
}

// Putting a body on the boat
function clickFunction (o,r,id,current) {

    if (document.getElementById(id).style.backgroundColor === "yellow") {
        document.getElementById(id).style.backgroundColor = "ghostwhite";
        boat.count = boat.count - 1;         
        
        if (o === "person") {
            boat.person = boat.person - 1;   
            personPosition[r] = boatSide;  
        } else {
            boat.monkey = boat.monkey - 1;
            monkeyPosition[r] = boatSide;  
        }          

    } else if (boat.count ===2 ) alert('Boat can hold no more than 2 bodies');
    else {
        document.getElementById(id).style.backgroundColor = "yellow";            
        boat.count = boat.count + 1;
        boat[o] = boat[o] + 1;
        if (o === "person") {
            //boat.person = boat.person + 1;
            if (boatSide === "left") personPosition[r] = "left to right" 
            else personPosition[r] = "right to left"
        } else {
            //boat.monkey = boat.monkey + 1;
            if (boatSide === "left") monkeyPosition[r] = "left to right" 
            else monkeyPosition[r] = "right to left"
        }

    }
}

// Respond when user select or deselect a body to put on the boat
function setClick (o, r,id, current) {
    let reponse; // boolean variable

    response = (boatSide === current) &&  ( (o==="person" && personPosition[r] === current) ||(o==="monkey" && monkeyPosition[r] === current) )

     if (!response) {
        document.getElementById(id).style.backgroundColor = "ghostwhite";
        document.getElementById(id).onclick = function () {};
    } else {        
        document.getElementById(id).onclick = function () {
            clickFunction(o,r,id,current);
        }
    } 
}

// Display the game panel
function panel(r,o, current, action){   
    let image,id;

    if (action === "leave") {
        image = "";
    }
    else {
      (o === "person") ? image = personImage : image = monkeyImage;
    }
   
    if (current==="left" && o === "person") id = "r" + r + "c1";
    else if (current==="left" && o === "monkey") id = "r" + r + "c2";
    else if (current==="right" && o === "person") id = "r" + r + "c3";
    else if (current==="right" && o === "monkey") id = "r" + r + "c4";

    if (action !== "stay") {
        document.getElementById(id).innerHTML = image;
        document.getElementById(id).style.color = "black";  
    }

    setClick(o, r, id, current);
}

// Setup the initial game panel with body positions
function initialize () {

    for (r=1; r<= 3; r++) {
       panel(r,'person','left', 'init'); 
       panel(r,'monkey','left', 'init'); 
         }
    left.monkey = 3;
    left.person = 3;
}

// Check the rules and displayy warning messages
function checkRule () {
    let monkeyTot, personTot;
    let rule;    
    let leftMonkey, leftPerson, rightMonkey, rightPerson;
    let leftRule, rightRule;

    if (boatSide === "left") {
        leftMonkey = left.monkey - boat.monkey;
        leftPerson = left.person - boat.person;
        rightMonkey = right.monkey + boat.monkey;
        rightPerson = right.person + boat.person;
    } else {
        rightMonkey = right.monkey - boat.monkey;
        rightPerson = right.person - boat.person;
        leftMonkey = left.monkey + boat.monkey;
        leftPerson = left.person + boat.person;
    }
    leftRule = (leftPerson === 0) || ((leftMonkey <= leftPerson));
    rightRule = (rightPerson === 0) || ((rightMonkey <= rightPerson));
    if (!leftRule) return(leftMsg);
    else if (!rightRule) return(rightMsg);
    else return("");
}

// Switch the boat position; left or right
function switchSide() {
    if (boatSide === "left") {      
        document.getElementById("go").innerHTML = "&laquo;&laquo;&laquo; Return....." + rightBoatImage;
        boatSide = "right";
    } else {
        document.getElementById("go").innerHTML = leftBoatImage + ".....Cross &raquo;&raquo;&raquo;"
        boatSide = "left";
    }
}

// Boarding and paddle the boat to the other side
function boarding () {

    function crossRiver () {
        let toSide;    
        ++steps;
 
        toSide = boatSide;
        switchSide();
    
        for (r=1; r <=3; r++) {
            
            if ((personPosition[r] === "left to right") || (personPosition[r] === "right to left")) {
                personPosition[r] = boatSide;
                panel(r,"person",boatSide, "arrive");
                panel(r,"person",toSide, "leave");
            } else {
                panel(r,"person",boatSide, "stay");
                panel(r,"person",toSide, "stay");
            }
            
            if ((monkeyPosition[r] === "left to right") || (monkeyPosition[r] === "right to left")) {
                monkeyPosition[r] = boatSide;
                panel(r,"monkey",boatSide, "arrive");
                panel(r,"monkey",toSide, "leave");
            } else {
                panel(r,"monkey",boatSide, "stay");
                panel(r,"monkey",toSide, "stay");
            }
        }
    }

    let errorMsg;

    if (boat.count === 0) errorMsg = boatMsg;
    else errorMsg = checkRule();

    if (errorMsg !== "") {
        alert(errorMsg);
    } else {
        if (boatSide === "left"){
            left.monkey -= boat.monkey;
            left.person -= boat.person;
            right.monkey += boat.monkey;
            right.person += boat.person
        } else {
            right.monkey -= boat.monkey;
            right.person -= boat.person;
            left.monkey += boat.monkey;
            left.person += boat.person
        }

        boat.count = 0;
        boat.monkey = 0;
        boat.person = 0;
        crossRiver();     
    }
}

// Setup the game and user events
initialize();
document.getElementById("go").addEventListener("click", boarding);

//To illustrate the correct steps
document.getElementById("button").onclick = function (){

    switch (steps){
        case 1:                        
            clickFunction("person", 1,"r1c1", "left"); 
            clickFunction("monkey", 1,"r1c2", "left");
            document.getElementById("button").innerHTML = "Steps: "+ steps;
            break;
        case 2:            
            clickFunction("person", 1,"r1c3", "right");
            document.getElementById("button").innerHTML = "Steps: "+ steps;             
        break;  
        case 3:
            clickFunction("monkey", 2,"r2c2", "left"); 
            clickFunction("monkey", 3,"r3c2", "left");
            document.getElementById("button").innerHTML = "Steps: "+ steps;            
        break;
        case 4:
            clickFunction("monkey", 3,"r3c4", "right");
            document.getElementById("button").innerHTML = "Steps: "+ steps;             
        break;
        case 5:
            clickFunction("person", 1,"r1c1", "left"); 
            clickFunction("person", 2,"r2c1", "left");
            document.getElementById("button").innerHTML = "Steps: "+ steps;            
        break;
        case 6:
            clickFunction("person", 2,"r2c3", "right"); 
            clickFunction("monkey", 2,"r2c4", "right"); 
            document.getElementById("button").innerHTML = "Steps: "+ steps;                         
        break;
        case 7:
            clickFunction("person", 2,"r2c1", "left"); 
            clickFunction("person", 3,"r3c1", "left"); 
            document.getElementById("button").innerHTML = "Steps: "+ steps;               
        break;
        case 8:
            clickFunction("monkey", 1,"r1c4", "right"); 
            document.getElementById("button").innerHTML = "Steps: "+ steps; 
        break;
        case 9:
            clickFunction("monkey", 1,"r1c2", "left"); 
            clickFunction("monkey", 2,"r2c2", "left");
            document.getElementById("button").innerHTML = "Steps: "+ steps;                
        break;
        case 10:
            clickFunction("monkey", 2,"r2c4", "right");
            document.getElementById("button").innerHTML = "Steps: "+ steps;  
        break;
        case 11:
            clickFunction("monkey", 2,"r2c2", "left"); 
            clickFunction("monkey", 3,"r3c2", "left"); 
            document.getElementById("button").innerHTML = "Steps: "+ steps;              
        break;                            

        default:
    }

}