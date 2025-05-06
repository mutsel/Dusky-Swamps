let canvas;
let world;
audioOn = true;

window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName == 'BUTTON') {
        e.preventDefault();
    }
});

function init() {
    document.getElementById("startscreen").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.add("d-none");
    document.getElementById("canvas").classList.add("d-none");
    removeEventListeners();
}

function startGame() {
    initLevel();
    addEventListeners();
    keyboard = new Keyboard();
    document.getElementById("startscreen").classList.add("d-none");
    document.getElementById("gameOver").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("dark-bg");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.gameOver = false;
    checkGameOver();
}

function openAbout() {
    document.getElementById("startscreenOverview").classList.toggle("d-none");
    document.getElementById("startscreenAbout").classList.toggle("d-none");
}

function openStartscreenSettings() {
    document.getElementById("startscreenOverview").classList.toggle("d-none");
    document.getElementById("startscreenSettings").classList.toggle("d-none");
}

function addEventListeners() {
    window.addEventListener('keydown', keyDownEvents);
    window.addEventListener('keyup', keyUpEvents);
}

function removeEventListeners() {
    window.removeEventListener('keydown', keyDownEvents)
    window.removeEventListener('keyup', keyUpEvents)
}

function keyDownEvents() {
    switch (event.keyCode) {
        case 38:
        case 87: keyboard.UP = true;
            break;
        case 37:
        case 65: keyboard.LEFT = true;
            if (!world.character.isAboveGround() && audioOn) {
                world.audios.steps.play();
            }
            break;
        case 39:
        case 68: keyboard.RIGHT = true;
            if (!world.character.isAboveGround() && audioOn) {
                world.audios.steps.play();
            }
            break;
        case 40:
        case 32: keyboard.ATTACK = true;
            break;
    }
}

function keyUpEvents() {
    switch (event.keyCode) {
        case 38:
        case 87: keyboard.UP = false;
            break;
        case 37:
        case 65: keyboard.LEFT = false;
            world.audios.steps.pause();
            break;
        case 39:
        case 68: keyboard.RIGHT = false;
            world.audios.steps.pause();
            break;
        case 40:
        case 32: keyboard.ATTACK = false;
            break;
    }
}

function toggleAudio() {
    console.log(event.keyCode)
    if (audioOn) {
        muteAudio();
        return audioOn = false;
    } else {
        unmuteAudio();
        return audioOn = true;
    }
}

function muteAudio() {
    document.getElementById("muteBtn").classList.remove("low-opacity");
    for (let key in world.audios) {
        world.audios[key].muted = true;
    }
}

function unmuteAudio() {
    document.getElementById("muteBtn").classList.add("low-opacity");
    for (let key in world.audios) {
        world.audios[key].muted = false;
    }
}

function openGameSettings() {
    document.getElementById("gameSettings").classList.toggle("d-none");
    document.getElementById("gameOverlay").classList.toggle("dark-bg");
}

function checkGameOver() {
    setInterval(() => {
        if (world.gameOver === true) {
            document.getElementById("gameOver").classList.remove("d-none");
            document.getElementById("gameOverlay").classList.add("dark-bg");
            removeEventListeners();
        }
    }, 100);
}