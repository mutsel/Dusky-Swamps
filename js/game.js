let canvas;
let world;
let fullMute;

window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName == 'BUTTON') {
        e.preventDefault();
    }
});

function init() {
    document.getElementById("startscreen").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.add("d-none");
    document.getElementById("victory").classList.add("d-none");
    document.getElementById("canvas").classList.add("d-none");
    document.getElementById("startscreenOverview").classList.remove("d-none");
    document.getElementById("startscreenSettings").classList.add("d-none");
    document.getElementById("startscreenAbout").classList.add("d-none");
    removeEventListeners();
}

function startGame() {
    initLevel();
    addEventListeners();
    keyboard = new Keyboard();
    document.getElementById("startscreen").classList.add("d-none");
    document.getElementById("gameOver").classList.add("d-none");
    document.getElementById("victory").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("dark-bg");
    document.getElementById("settingsBtn").classList.remove("close-btn");
    document.getElementById("settingsBtn").hidden = false;
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    checkLocalStorageAudioSettings();
    world.firstBossContact = false;
    world.gameOver = false;
    world.victory = false;
    checkVictory();
}

function checkLocalStorageAudioSettings() {
    fullMute = JSON.parse(localStorage.getItem('fullMute'));
    toggleAudio()
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
    window.removeEventListener('keydown', keyDownEvents);
    window.removeEventListener('keyup', keyUpEvents);
    cancelEvents()
}

function cancelEvents() {
    if (world) {
        world.audios.steps.pause();
        world.audios.scenery.pause();
        keyboard.UP = false;
        keyboard.LEFT = false;
        keyboard.RIGHT = false;
        keyboard.ATTACK = false;
    }
}

function keyDownEvents() {
    switch (event.keyCode) {
        case 38:
        case 87: keyboard.UP = true;
            break;
        case 37:
        case 65: keyboard.LEFT = true;
            if (!world.character.isAboveGround()) {
                world.audios.steps.play();
            }
            break;
        case 39:
        case 68: keyboard.RIGHT = true;
            if (!world.character.isAboveGround()) {
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
            world.shootMagicAttack();
            break;
    }
}

function toggleAudio() {
    if (fullMute) {
        muteAudio();
        return fullMute = false;
    } else {
        unmuteAudio();
        return fullMute = true;
    }
}

function unmuteAudio() {
    document.getElementById("muteBtn").classList.add("low-opacity");
    for (let key in world.audios) {
        world.audios[key].muted = false;
    }
    localStorage.setItem('fullMute', JSON.stringify(fullMute));
}

function muteAudio() {
    document.getElementById("muteBtn").classList.remove("low-opacity");
    for (let key in world.audios) {
        world.audios[key].muted = true;
    }
    localStorage.setItem('fullMute', JSON.stringify(fullMute));
}

function toggleGameSettings() {
    document.getElementById("gameSettings").classList.toggle("d-none");
    document.getElementById("gameOverlay").classList.toggle("dark-bg");
    document.getElementById("settingsBtn").classList.toggle("close-btn");
    if (document.getElementById("gameSettings").classList.contains("d-none")) {
        addEventListeners();
        world.audios.scenery.play();
    } else {
        removeEventListeners();
    }
}

function gameOver() {
    if (world.gameOver === true) {
        document.getElementById("gameSettings").classList.add("d-none");
        document.getElementById("gameOver").classList.remove("d-none");
        document.getElementById("gameOverlay").classList.add("dark-bg");
        document.getElementById("settingsBtn").hidden = true;
        removeEventListeners();
    }
}

function checkVictory() {
    setInterval(() => {
        if (world.victory === true) {
            document.getElementById("gameSettings").classList.add("d-none");
            document.getElementById("gameOver").classList.add("d-none");
            document.getElementById("victory").classList.remove("d-none");
            document.getElementById("gameOverlay").classList.add("dark-bg");
            document.getElementById("settingsBtn").hidden = true;
            removeEventListeners();
            countGems();
        }
    }, 100);
}

function countGems() {
    let gemCounter = document.getElementById("gemCounter");
    let missingGemsInPercent = world.gemsBar.percentage;
    switch (missingGemsInPercent) {
        default:
        case 100:
            gemCounter.style.backgroundImage = "url('./img/GUI/menus/win_gems_00.png')";
            break;
        case 75:
            gemCounter.style.backgroundImage = "url('./img/GUI/menus/win_gems_01.png')";
            break;
        case 50:
            gemCounter.style.backgroundImage = "url('./img/GUI/menus/win_gems_02.png')";
            break;
        case 25:
            gemCounter.style.backgroundImage = "url('./img/GUI/menus/win_gems_03.png')";
            break;
        case 0:
            gemCounter.style.backgroundImage = "url('./img/GUI/menus/win_gems_04.png')";
            break;
    }
}