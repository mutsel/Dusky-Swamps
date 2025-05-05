let canvas;
let world;
let audioScenery = new Audio('audio/scenery.mp3');
audioScenery.loop = true;
let audioSteps = new Audio('audio/steps.mp3');
audioSteps.volume = 0.4;

function init() {
    document.getElementById("startscreenOverview").classList.remove("d-none");
    document.getElementById("startscreenAbout").classList.add("d-none");
    document.getElementById("startscreenSettings").classList.add("d-none");
}

function startGame() {
    initLevel();
    keyboardEventListener();
    keyboard = new Keyboard();
    document.getElementById("startscreen").classList.toggle("d-none");
    document.getElementById("canvas").classList.toggle("d-none");
    document.getElementById("gameOverlay").classList.toggle("d-none");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    audioScenery.play();
}

function openAbout() {
    document.getElementById("startscreenOverview").classList.toggle("d-none");
    document.getElementById("startscreenAbout").classList.toggle("d-none");
}

function openSettings() {
    document.getElementById("startscreenOverview").classList.toggle("d-none");
    document.getElementById("startscreenSettings").classList.toggle("d-none");
}

function keyboardEventListener() {
    window.addEventListener('keydown', (e) => {
        // console.log(e.keyCode)
        switch (e.keyCode) {
            case 37:
            case 65: keyboard.LEFT = true;
                audioSteps.play();
                break;
            case 39:
            case 68: keyboard.RIGHT = true;
                audioSteps.play();
                break;
            case 38:
            case 87: keyboard.UP = true;
                break;
            case 40:
            case 32: keyboard.ATTACK = true;
                break;
        }
    });
    
    window.addEventListener('keyup', (e) => {
        switch (e.keyCode) {
            case 37:
            case 65: keyboard.LEFT = false;
                audioSteps.pause();
                break;
            case 39:
            case 68: keyboard.RIGHT = false;
                audioSteps.pause();
                break;
            case 38:
            case 87: keyboard.UP = false;
                break;
            case 40:
            case 32: keyboard.ATTACK = false;
                break;
        }
    });
}

function muteAudio() {
    document.getElementById("muteBtn").classList.toggle("low-opacity");
}