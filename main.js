const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
//selects all pages
var allpages = document.querySelectorAll(".page");

/*for every item in the array allpages, the loop assigns that item to a new variable onepage -> onepage = allpages[i] */
function hideall() {
    for (let onepage of allpages) {
        onepage.style.display = "none";
    }
}

function show(pgno) {
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
    updateBoxWidth();
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});

page2btn.addEventListener("click", function () {
    show(2);
});

page3btn.addEventListener("click", function () {
    show(3);
});

hideall();//call hideall function to hide all pages

//HAMBURGER MENU

//get the "open menu" button (meant for hamIcon)
const hamBtn = document.querySelector("#hamIcon");
//connect hamBtn click to toggleMenus function
hamBtn.addEventListener("click", toggleMenus);
//get the menuItem list
const menuItemsList = document.querySelector("nav ul");
/*toggle, just like light switch, off becomes on, on becomes off*/
/*if menu is shown, hide it, if hidden, show it*/
function toggleMenus() {
    const isMenuShown = menuItemsList.classList.contains("menuShow");
    hamBtn.innerHTML = isMenuShown ? "Open Menu" : "Close Menu";
    menuItemsList.classList.toggle("menuShow");
}


//minigame

window.addEventListener("DOMContentLoaded", function() {
    updateBoxWidth();
});

const cup = document.querySelector("#cup");
var cupX = 0; //assigns initial pos of cup
var Minx = 0; var Maxx = 480;

const minigame = document.querySelector("#minigame");
const bstyle = getComputedStyle(minigame);

// Get paddings as numbers
const paddingLeft = parseFloat(bstyle.paddingLeft);
const paddingRight = parseFloat(bstyle.paddingRight);

// clientWidth includes content and padding width
const boxWidth = minigame.clientWidth - paddingLeft - paddingRight;


function updateBoxWidth(){
    const cupWidth = cup.offsetWidth;

    Maxx = boxWidth - cupWidth;
    Minx = 0;
    // Only center the cup if it hasn't been moved yet
    if (typeof updateBoxWidth.hasCentered === "undefined") {
        cupX = (boxWidth - cupWidth) / 2;
        updateBoxWidth.hasCentered = true;
    } else {
        // Clamp cupX to new bounds if window resized
        cupX = Math.max(Minx, Math.min(cupX, Maxx));
    }
    cup.style.left = cupX + "px";
}

updateBoxWidth();
window.addEventListener("resize", updateBoxWidth); //updates on window resize

const coffeebean = document.getElementById("coffeebean");
var beanX = beanY = 0;
var MoveCoffeebeanItvId;

function GetRandom(min, max) {
    //this will select a number between min and max
    return Math.round(Math.random() * (max - min)) + min;
}

function MoveCoffeebean() {
    beanY += 100;

    coffeebean.style.left = beanX + "px";
    coffeebean.style.top = beanY + "px";

    if (beanY > 480) { // adjust 400 to your container height
        clearInterval(MoveCoffeebeanItvId);
        StartCoffeebeanMove();
    }
}

function StartCoffeebeanMove(){
    const beanWidth = coffeebean.offsetWidth;
    beanX = GetRandom(0, boxWidth - beanWidth);
    beanY = 0;
    coffeebean.style.left = beanX + "px";
    coffeebean.style.top = beanY + "px";
    MoveCoffeebeanItvId = setInterval(MoveCoffeebean, 500);
}

StartCoffeebeanMove();

//var MoveCoffeebeanItvId = setInterval(MoveCoffeebean, 1500);

const scoreBox = document.getElementById("scoreBox");
//const popAudio = new Audio("popsound.mp3"); //create an new Audio Object using sound file

var score = 0;

function catchcoffeebean() {
    score++;
    //popAudio.play();
    scoreBox.innerHTML = "Score: " + score; //update html scorebox
    coffeebean.classList.add("disappear");
}


//start/stop button
const stopBtn = document.querySelector("#stopBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");

stopBtn.addEventListener("click",function () {
    clearInterval(MoveCoffeebeanItvId); //stop running the interval

})



function MoveLeft(x){
    cupX = cupX - x; //move left by x value
    cupX = Math.max(Minx, Math.min(cupX, Maxx)); //clamp value within range
    cup.style.left = cupX + "px"; //set left css property to cupx var
}

leftBtn.addEventListener("click", function() {
    MoveLeft(10) 
}); 

rightBtn.addEventListener("click", function() {
    MoveLeft(-10)
}); 

document.addEventListener("keydown",function (evt) {
    console.log(evt);
    if (evt.code == "KeyA") {
        MoveLeft(10);
    }
    if (evt.code == "KeyD") {
        MoveLeft(-10);
    }
});