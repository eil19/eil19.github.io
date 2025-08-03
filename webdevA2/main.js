const btnFS = document.querySelector("#btnFS");

function toggleFS(){
    const isFS = btnFS.classList.contains("FS");
    btnFS.innerHTML = isFS ? "Fullscreen" : "Exit Fullscreen";
    btnFS.classList.toggle("FS");
    
    if(isFS){
        exitFullscreen();       
    }else enterFullscreen();
}

btnFS.addEventListener("click", toggleFS);

function enterFullscreen() { //must be called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

//page management system
//selects all pages
var allpages = document.querySelectorAll(".page");
const page1 = document.querySelector("#page1");
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

//event delegation of buttons to show pages
const navContainer = document.querySelector("#navbar");

navContainer.addEventListener("click", function(event) {
    // Check if the clicked element is one of our page buttons
    if (event.target.id === "page1btn") {
        show(1);
    } else if (event.target.id === "page2btn") {
        show(2);
    } else if (event.target.id === "page3btn") {
        show(3);
    }    
});

hideall();//call hideall function to hide all pages


//HAMBURGER MENU

//get the "open menu" button (meant for hamIcon)
const hamBtn = document.querySelector("#hamIcon");
//connect hamBtn click to toggleMenus function
hamBtn.addEventListener("click", toggleMenus);
//get the menuItem list
const menuItemsList = document.querySelector("#navbar");
/*toggle, just like light switch, off becomes on, on becomes off*/
/*if menu is shown, hide it, if hidden, show it*/
function toggleMenus() {
    const isMenuShown = menuItemsList.classList.contains("menuShow");
    hamBtn.innerHTML = isMenuShown ? "Open Menu" : "Close Menu";
    menuItemsList.classList.toggle("menuShow");
}



//minigame

//at the start when page loads/reload
window.addEventListener("DOMContentLoaded", function() {
    updateBoxWidth();
    page1.style.display = "block";
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
const cupWidth = cup.offsetWidth;

function updateBoxWidth(){
    Maxx = boxWidth - cupWidth;
    Minx = 0;

    //typeof returns a string of the type of obj -> boolean
    //when u try to access a property that doesnt exist, js returns undefined

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
//updates on window resize
window.addEventListener("resize", function(){
    updateBoxWidth();
    page1.style.display = "block";
}); 

const coffeebean = document.getElementById("coffeebean");
var beanX = 0; var beanY = 0;
var MoveCoffeebeanItvId;

function GetRandom(min, max) {
    //this will select a number between min and max
    return Math.round(Math.random() * (max - min)) + min;
}

function MoveCoffeebean() {
    if(gameEnd) return;
    beanY += 100;
    coffeebean.classList.add("rotate");

    checkcatch();
    if (catched) {
        catchcoffeebean();
        catched = false;
        clearInterval(MoveCoffeebeanItvId);
        MoveCoffeebeanItvId = null;
        setTimeout(StartCoffeebeanMove, 500);
        return;
    }

    if(beanY == 400){
        coffeebean.classList.remove("rotate");
        coffeebean.classList.add("disappear");
    }

    if (beanY > 400) { // adjust 400 to your container height
        clearInterval(MoveCoffeebeanItvId);
        MoveCoffeebeanItvId = null;
        StartCoffeebeanMove();
    }

    coffeebean.style.left = beanX + "px";
    coffeebean.style.top = beanY + "px";
    
}

function StartCoffeebeanMove(){
    // Clear any existing interval first
    if (MoveCoffeebeanItvId) {
        clearInterval(MoveCoffeebeanItvId);
    }

    coffeebean.classList.remove("disappear");
    const beanWidth = coffeebean.offsetWidth;
    beanX = GetRandom(0, boxWidth - beanWidth);
    beanY = 0;
    coffeebean.style.left = beanX + "px";
    coffeebean.style.top = beanY + "px";
    MoveCoffeebeanItvId = setInterval(MoveCoffeebean, 500);
}

const scoreBox = document.getElementById("scoreBox");
//const popAudio = new Audio("popsound.mp3"); //create an new Audio Object using sound file

var score = 0;
let catched = false;

function checkcatch(){
    catched = false;

    const cupTop = cup.offsetTop;
    const cupBottom = cupTop + cup.offsetHeight;
    const cupLeft = cupX;
    const cupRight = cupX + cup.offsetWidth;

    const beanTop = beanY;
    const beanBottom = beanY + coffeebean.offsetHeight;
    const beanLeft = beanX;
    const beanRight = beanX + coffeebean.offsetWidth;

    if (beanBottom >= cupTop && beanTop <= cupBottom && beanRight >= cupLeft && beanLeft <= cupRight) {
        catched = true;
    }
}

checkcatch();

const catchAudio = new Audio("audio/popsound.mp3");

function catchcoffeebean() {
    score++;
    catchAudio.play();

    coffeebean.classList.add("disappear");
    coffeebean.classList.remove("rotate");

    scoreBox.innerHTML = "Score: " + score; //update html scorebox
    catched = false;

    if(score >= 10) {
        gameEnd = true;
        scoreBox.innerHTML = "Score: " + score + " Congrats! You won!";
    }
}


//start/stop button
const gameBtn = document.querySelector("#gameBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");


gameBtn.addEventListener("click", startgame);

let gamestarted = false;
let gameEnd = false;

function startgame(){
    gameEnd = false;
    const gameOn = gameBtn.classList.contains("gameOn");
    gameBtn.classList.toggle("gameOn");
    gameBtn.innerHTML = gameOn ? "Start!" : "Restart!";

    //check if game has started
    if(gamestarted){
        clearInterval(MoveCoffeebeanItvId);
        setTimeout(StartCoffeebeanMove, 500);
        gamestarted = false;
    } else 
        gamestarted = true;
        StartCoffeebeanMove();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
}



function MoveLeft(x){
    cupX = cupX - x; //move left by x value
    cupX = Math.max(Minx, Math.min(cupX, Maxx)); //clamp value within range
    cup.style.left = cupX + "px"; //set left css property to cupx var
}

leftBtn.addEventListener("click", function() {
    MoveLeft(10);
}); 

rightBtn.addEventListener("click", function() {
    MoveLeft(-10);
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
