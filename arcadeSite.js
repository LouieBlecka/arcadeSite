"use strict"

window.addEventListener("load", init);

function init(){
    let game_1_start = document.getElementById("button1");
    let game_2_start = document.getElementById("button2");
    let game_3_start = document.getElementById("button3");

    game_1_start.addEventListener("click", game1Start);
    game_2_start.addEventListener("click", game2Start);
    game_3_start.addEventListener("click", game3Start);
}

async function game1Start(){
    //GameStartingConfig
    if(document.getElementById("game1") != null){
        document.getElementById("game1").replaceChildren();
    }
    if(document.getElementById("game2") != null) {
        document.getElementById("game2").replaceChildren();
    }
    if(document.getElementById("game3") != null) {
        document.getElementById("game3").replaceChildren();
    }
    let game1 = document.createElement("div");
    game1.setAttribute("id", "game1");
    document.getElementById("container").appendChild(game1);
    let answers = [];
    let userInputs = [];
    let initiateGameOver = false;
    answers.push(Math.floor(Math.random() * 4));

    let buttonSpace = document.createElement("div");
    buttonSpace.setAttribute("id", "centeredSimonSays");
    document.getElementById("game1").appendChild(buttonSpace);
    buttonCreation();
    do {
        //flashing sequence
        await delay(4000);
        await flashingSequence(answers);
        //UserInputing/Checking
        initiateGameOver = await pressingSequence(answers, userInputs);
        answers.push(Math.floor(Math.random() * 4));
        userInputs = [];
    } while(!initiateGameOver);
    gameOverSequence(answers);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buttonCreation(){
    let buttonRed = document.createElement("button");
    assignButton(buttonRed, 1);
    let buttonBlue = document.createElement("button");
    assignButton(buttonBlue, 2);
    let buttonGreen = document.createElement("button");
    assignButton(buttonGreen, 3);
    let buttonYellow = document.createElement("button");
    assignButton(buttonYellow, 4);
}

function assignButton(buttonName , num) {
    buttonName.setAttribute("id", "simonSays" + num);
    document.getElementById("centeredSimonSays").appendChild(buttonName);
}
async function flashingSequence(answers) {
    for(let i = 0; i < answers.length; i++) {
        await delay(1000);
        if(answers[i] == 0) {
            await flashButtonRed();
        } else if(answers[i] == 1) {
            await flashButtonBlue();
        } else if(answers[i] == 2) {
            await flashButtonGreen();
        } else if(answers[i] == 3) {
            await flashButtonYellow();
        } else {
            console.log("answer out of expected range");
        }
    }
}

async function flashButtonRed(){
    document.getElementById("simonSays1").style.backgroundColor = "#ff0000";
    await delay(500);
    unflashButtonRed();
}
function unflashButtonRed(){
    document.getElementById("simonSays1").style.backgroundColor = "#900000";
}
async function flashButtonBlue(){
    document.getElementById("simonSays2").style.backgroundColor = "#0000ff";
    await delay(500);
    unflashButtonBlue();
}
function unflashButtonBlue(){
    document.getElementById("simonSays2").style.backgroundColor = "#000090";
}
async function flashButtonGreen(){
    document.getElementById("simonSays3").style.backgroundColor = "#00ff00";
    await delay(500);
    unflashButtonGreen();
}
function unflashButtonGreen(){
    document.getElementById("simonSays3").style.backgroundColor = "#008000";
}
async function flashButtonYellow(){
    document.getElementById("simonSays4").style.backgroundColor = "#ffff00";
    await delay(500);
    unflashButtonYellow();
}
function unflashButtonYellow(){
    document.getElementById("simonSays4").style.backgroundColor = "#909000";
}

async function pressingSequence(answers, userInputs) {
    let buttonRed = document.getElementById("simonSays1");
    let buttonBlue = document.getElementById("simonSays2");
    let buttonGreen = document.getElementById("simonSays3");
    let buttonYellow = document.getElementById("simonSays4");

    for(let i=0; i < answers.length; i++) {
        let userPress = await getNextButton(buttonRed, buttonBlue, buttonGreen, buttonYellow, userInputs);
        userInputs.push(userPress);
        if(userInputs[i] != answers[i]) {
            return true;
        }
    }
    return false;
}

async function getNextButton(buttonRed, buttonBlue, buttonGreen, buttonYellow, userInputs) {
    return new Promise((resolve) => {
        let userPress = null;
        function pushRed(){
            userPress = 0;
            removeListeners(buttonRed, buttonBlue, buttonGreen, buttonYellow, userPress);
        };
        
        function pushBlue(){
            userPress = 1;
            removeListeners(buttonRed, buttonBlue, buttonGreen, buttonYellow, userPress);
        };
    
        function pushGreen(){
            userPress = 2;
            removeListeners(buttonRed, buttonBlue, buttonGreen, buttonYellow, userPress);
        };
   
        function pushYellow(){
            userPress = 3;
            removeListeners(buttonRed, buttonBlue, buttonGreen, buttonYellow, userPress);
        };

        buttonRed.addEventListener("click", pushRed);
        buttonBlue.addEventListener("click", pushBlue);
        buttonGreen.addEventListener("click", pushGreen);
        buttonYellow.addEventListener("click", pushYellow);

        function removeListeners(buttonRed, buttonBlue, buttonGreen, buttonYellow, userPress) {
            buttonRed.removeEventListener("click", pushRed);
            buttonBlue.removeEventListener("click", pushBlue);
            buttonGreen.removeEventListener("click", pushGreen);
            buttonYellow.removeEventListener("click", pushYellow);
            resolve(userPress);
        }
    });
}

function gameOverSequence(answers){
    document.getElementById("simonSays1").remove();
    document.getElementById("simonSays2").remove();
    document.getElementById("simonSays3").remove();
    document.getElementById("simonSays4").remove();

    let gameOverText = document.createElement("p");
    gameOverText.setAttribute("id", "game_over");

    document.getElementById("centeredSimonSays").appendChild(gameOverText);
    gameOverText.innerHTML = ("Game Over! \nFinal Score: " + (answers.length - 2));
}

function game2Start(){
    if(document.getElementById("game1") != null){
        document.getElementById("game1").replaceChildren();
    }
    if(document.getElementById("game2") != null) {
        document.getElementById("game2").replaceChildren();
    }
    if(document.getElementById("game3") != null) {
        document.getElementById("game3").replaceChildren();
    }
    let game2 = document.createElement("div");
    game2.setAttribute("id", "game2");
    document.getElementById("container").appendChild(game2);
    let game2Space = document.createElement("div");
    game2Space.setAttribute("id", "game2Space");
    document.getElementById("game2").appendChild(game2Space);
    let numRolled = Math.floor(Math.random() * 6);
    let die;
    if(numRolled == 0) {
        die = document.createElement("img");
        die.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Die_face_1b.svg/1024px-Die_face_1b.svg.png");
    } else if (numRolled == 1) {
        die = document.createElement("img");
        die.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Die_face_2b.svg/2048px-Die_face_2b.svg.png");
    } else if (numRolled == 2) {
        die = document.createElement("img");
        die.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Die_face_3b.svg/2048px-Die_face_3b.svg.png");
    } else if (numRolled == 3) {
        die = document.createElement("img");
        die.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Die_face_4b.svg/2048px-Die_face_4b.svg.png");
    } else if (numRolled == 4) {
        die = document.createElement("img");
        die.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Die_face_5b.svg/1200px-Die_face_5b.svg.png");
    } else if (numRolled == 5) {
        die = document.createElement("img");
        die.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Die_face_6b.svg/2048px-Die_face_6b.svg.png");
    } else {
        console.log("Number Rolled is out of Scope");
    }
    document.getElementById("game2Space").appendChild(die);
}
function game3Start(){
    if(document.getElementById("game1") != null){
        document.getElementById("game1").replaceChildren();
    }
    if(document.getElementById("game2") != null) {
        document.getElementById("game2").replaceChildren();
    }
    if(document.getElementById("game3") != null) {
        document.getElementById("game3").replaceChildren();
    }
    let game3 = document.createElement("div");
    game3.setAttribute("id", "game3");
    document.getElementById("container").appendChild(game3);
}