let canvas;
let world;
let fullMute;

collectedGemsImgs = [
    "url('./img/GUI/menus/win_gems_00.png')",
    "url('./img/GUI/menus/win_gems_01.png')",
    "url('./img/GUI/menus/win_gems_02.png')",
    "url('./img/GUI/menus/win_gems_03.png')",
    "url('./img/GUI/menus/win_gems_04.png')"
]

/**
* This eventListener called on keydown prevents default behavior for buttons.
* Like this, accidentaly clicked buttons by pressing a key are not happening.
*/
window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName == 'BUTTON') {
        e.preventDefault();
    }
});

/**
* This function is the init function for the game. All sections/menu are closed, only the startscreen is visible.
*/
function init() {
    closeAllStartscreenMenu();
    closeAllGameMenu();
    document.getElementById("startscreen").classList.remove("d-none");
    document.getElementById("startscreenOverview").classList.remove("d-none");
    removeEventListeners();
}

/**
* This function is executed when the player starts a game. All sections and menues are closed, only the canvas and the gameOverlay are visible.
* the world, the canvas and the keyboard and its eventListeners are created/activated and all variables are set to false (default).
*/
function startGame() {
    initLevel();
    addEventListeners();
    keyboard = new Keyboard();
    closeAllStartscreenMenu();
    closeAllGameMenu();
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
    gameEndCalled = false;
}

/**
* This function closes all sections of the startscreen and the startscreen itself.
*/
function closeAllStartscreenMenu() {
    document.getElementById("startscreen").classList.add("d-none");
    let startscreenMenu = document.querySelectorAll(".startscreen-menu");
    for (let i = 0; i < startscreenMenu.length; i++) {
        startscreenMenu[i].classList.add("d-none")
    }  
}

/**
* This function closes all menu of the game and the canvas (incl. gameOverlay) itself.
*/
function closeAllGameMenu() {
    document.getElementById("canvas").classList.add("d-none");
    document.getElementById("gameOverlay").classList.add("d-none");
    let gameMenu = document.querySelectorAll(".game-menu");
    for (let i = 0; i < gameMenu.length; i++) {
        gameMenu[i].classList.add("d-none")
    }  
}

/**
* This function checks if fullMute-audiosettings are deposited in the local storage (true or false).
* This way, previous audio-settings are saved, so the player does not need to adjust it everytime playing.
*/
function checkLocalStorageAudioSettings() {
    fullMute = JSON.parse(localStorage.getItem('fullMute'));
    toggleAudio();
}

/**
* This function opens the about-section in the main-menu.
*/
function openAbout() {
    document.getElementById("startscreenOverview").classList.toggle("d-none");
    document.getElementById("startscreenAbout").classList.toggle("d-none");
}

/**
* This function opens the settings-section in the main-menu.
*/
function openStartscreenSettings() {
    document.getElementById("startscreenOverview").classList.toggle("d-none");
    document.getElementById("startscreenSettings").classList.toggle("d-none");
}

/**
* This function adds the keydown- and keyup-eventListeners for the game.
*/
function addEventListeners() {
    window.addEventListener('keydown', keyDownEvents);
    window.addEventListener('keyup', keyUpEvents);
}

/**
* This function removes the keydown- and keyup-eventListeners for the game.
* This way, the player is not able to move the character while being in the startscreen or a menu.
*/
function removeEventListeners() {
    window.removeEventListener('keydown', keyDownEvents);
    window.removeEventListener('keyup', keyUpEvents);
    cancelEvents()
}

/**
* This function stops the music and sets all keyboard-constants to false.
* This way, the character and the music stops, when a menu opens.
*/
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

/**
* This function sets the accoring constant for a pressed key to true (keydown).
* If the character touches ground and walks, a sound is played.
*/
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

/**
* This function sets the accoring constant for a pressed key to false (keyup).
* The walking-sounds if the character was previously walking. 
* A magicAttack is shot, after the spacebar is set to false.
*/
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

/**
* This function toggles the fullMute-state of the game.
*/
function toggleAudio() {
    if (fullMute) {
        muteAudio();
        return fullMute = false;
    } else {
        unmuteAudio();
        return fullMute = true;
    }
}

/**
* This function adjusts the muteBtn and unmutes all audios.
* The fullMute-audiosetting in the local storage is updated.
*/
function unmuteAudio() {
    document.getElementById("muteBtn").classList.add("low-opacity");
    for (let key in world.audios) {
        world.audios[key].muted = false;
    }
    localStorage.setItem('fullMute', JSON.stringify(fullMute));
}

/**
* This function adjusts the muteBtn and mutes all audios.
* The fullMute-audiosetting in the local storage is updated.
*/
function muteAudio() {
    document.getElementById("muteBtn").classList.remove("low-opacity");
    for (let key in world.audios) {
        world.audios[key].muted = true;
    }
    localStorage.setItem('fullMute', JSON.stringify(fullMute));
}

/**
* This function toggles the visibility and functionality of the game-settings.
*/
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

/**
* This function shows the gameOver-screen if gameOver in the world is set to true.
*/
function gameOver() {
    gameEnd()
    document.getElementById("gameOver").classList.remove("d-none");
    world.audios.gameOver.play();
}

/**
* This function shows the victory-screen if victory in the world is set to true.
*/
function victory() {
    gameEnd()
    document.getElementById("victory").classList.remove("d-none");
    world.audios.victory.play();
    setTimeout(() => {
        countGems();
    }, 1000);
}

/**
* This function adjusts the visibility and functionality of the game if the game ended (gameOver or victory)
*/
function gameEnd() {
    document.getElementById("gameOver").classList.add("d-none");
    document.getElementById("victory").classList.add("d-none");
    document.getElementById("gameSettings").classList.add("d-none");
    document.getElementById("gameOverlay").classList.add("dark-bg");
    document.getElementById("settingsBtn").hidden = true;
    removeEventListeners();
}

/**
* This function is part of the checkVictory()-function an adjusts the image of the gemCounter.
* This way, the  number of gems collected is shown.
*/
async function countGems() {
    let gemCounter = document.getElementById("gemCounter");
    let collectedGems = 4 - (world.gemsBar.percentage / 100 * 4);
    for (let i = 0; i <= collectedGems; i++) {
        gemCounter.style.backgroundImage = collectedGemsImgs[i];
        if (i > 0) {
            world.audios.gem.play();
        }
        await delay(600);
    }
}

/**
* This function is a support function and is executed when a delay is needed.
* 
* @param {number} ms - the delay-time in milliseconds
*/
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}