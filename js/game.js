let canvas;
let world;
let inGame;
let controlsVisibility;
let fullscreen;
let screenWidth;
let screenHeight;

const collectedGemsImgs = [
    "url('./img/GUI/menus/win_gems_00.png')",
    "url('./img/GUI/menus/win_gems_01.png')",
    "url('./img/GUI/menus/win_gems_02.png')",
    "url('./img/GUI/menus/win_gems_03.png')",
    "url('./img/GUI/menus/win_gems_04.png')"
];

/**
* This function is the init function for the game. All sections/menu are closed, only the startscreen is visible.
*/
function init() {
    inGame = false;
    closeAllStartscreenMenu();
    closeAllGameMenu();
    document.getElementById("startscreen").classList.remove("d-none");
    document.getElementById("startscreenOverview").classList.remove("d-none");
    // document.getElementById("mobileControls").classList.add("d-none");
    removeEventListeners();
    checkAudioSettings();
    adjustControlsVisibility();
    checkScreenDimensionsSettings();
}

/**
* This function is executed when the player starts a game. All sections and menues are closed, only the canvas and the gameOverlay are visible.
* the world, the canvas and the keyboard and its eventListeners are created/activated and all variables are set to false (default).
*/
function startGame() {
    inGame = true;
    initLevel();
    createWorld();
    addEventListeners();
    closeAllStartscreenMenu();
    closeAllGameMenu();
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("mobileControls").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("dark-bg");
    document.getElementById("settingsBtn").classList.remove("close-btn");
    document.getElementById("settingsBtn").hidden = false;
    gemCounter.style.backgroundImage = collectedGemsImgs[0];
    checkAudioSettings();
}

/**
* This function is part of the startGame()-function. It creates the necessary Objects and sets the worlds variables to false.
*/
function createWorld() {
    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
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
    document.getElementById("victoryRetryBtn").classList.add("disabled-btn");
    document.getElementById("victoryMainMenuBtn").classList.add("disabled-btn");
    document.getElementById("mobileControls").classList.remove("d-none");
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
* This function toggles the visibility and functionality of the game-settings.
*/
function toggleGameSettings() {
    document.getElementById("gameSettings").classList.toggle("d-none");
    document.getElementById("gameOverlay").classList.toggle("dark-bg");
    document.getElementById("settingsBtn").classList.toggle("close-btn");
    document.getElementById("mobileControls").classList.toggle("d-none");
    if (document.getElementById("gameSettings").classList.contains("d-none")) {
        addEventListeners();
        world.audios.scenery.play();
        world.audios.scenery.volume = audioVolume;
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
    world.audios.gameOver.volume = audioVolume;
}

/**
* This function shows the victory-screen if victory in the world is set to true.
*/
function victory() {
    gameEnd()
    document.getElementById("victory").classList.remove("d-none");
    world.audios.victory.play();
    world.audios.victory.volume = audioVolume;
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
    document.getElementById("mobileControls").classList.add("d-none");
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
            world.audios.gem.volume = audioVolume;
        }
        await delay(600);
    }
    enableVictoryButtons();
}

/**
* This function removes the disabled-btn-class for the victory-buttons
*/
function enableVictoryButtons() {
    document.getElementById("victoryRetryBtn").classList.remove("disabled-btn");
    document.getElementById("victoryMainMenuBtn").classList.remove("disabled-btn");
}

/**
* This function is a support function and is executed when a delay is needed.
* 
* @param {number} ms - the delay-time in milliseconds
*/
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* This function toggles the visibility of the controls under the canvas.
*/
function toggleControlsVisibility() {
    controlsVisibility = !controlsVisibility;
    localStorage.setItem('controlsVisibility', JSON.stringify(controlsVisibility));
    adjustControlsVisibility();
}

/**
* This function adjusts the controls visibility to th current controlsVisibility-state.
* The state is saved in the local storage.
*/
function adjustControlsVisibility() {
    try {
        controlsVisibility = JSON.parse(localStorage.getItem('controlsVisibility'));
    }
    catch (error) {
        controlsVisibility = true;
    }
    if (controlsVisibility || controlsVisibility == null) {
        controlsVisibility = true;
        document.getElementById("showControlsBtn").classList.remove("low-opacity");
        document.getElementById("controls").classList.remove("d-none");
    } else {
        document.getElementById("showControlsBtn").classList.add("low-opacity");
        document.getElementById("controls").classList.add("d-none");
    }
    localStorage.setItem('controlsVisibility', JSON.stringify(controlsVisibility));
}

/**
* This function checks if the fullscreen-setting is deposited in the local storage.
* This way, the previous fullscreen-setting is saved, so the player does not need to adjust it everytime playing.
*/
function checkScreenDimensionsSettings() {
    try {
        fullscreen = JSON.parse(localStorage.getItem('fullscreen'));
    }
    catch (error) {
        fullscreen = false;
    }
    if (fullscreen == null) { fullscreen = false }
    localStorage.setItem('fullscreen', JSON.stringify(fullscreen));
    adjustScreenDimensions();
}

/**
* This function is used to toggle the fullscreen-setting between true and false and saves it in the local storage.
*/
function toggleFullscreen() {
    fullscreen = !fullscreen;
    localStorage.setItem('fullscreen', JSON.stringify(fullscreen));
    adjustScreenDimensions();
}

/**
* This function adjusts the height and width for some elements to the global screenWidth and screenHeight variables.
* The position of some elements is adjusted as well.
*/
function adjustScreenDimensions() {
    getScreenDimensions()
    let fullscreenElements = [
        document.getElementById("canvas"),
        document.getElementById("startscreen"),
        document.getElementById("gameOverlay")
    ];
    fullscreenElements.forEach(element => {
        element.style.width = screenWidth + "px";
        element.style.height = screenHeight + "px";
    });
    document.getElementById("controls").style.top = (screenHeight + 140) + "px";
    document.getElementById("mobileControls").style.width = screenWidth + "px";
    document.getElementById("mobileControls").style.top = screenHeight + "px";
}

/**
* This function sets the global screenWidth and screenHeight variables.
* If fullscreen is turned off, the screenwidth and screenHeight are set to their default values.
* If fullscreen is turned on, the screenwidth is the windows innerWidth and the screenHeight is 2/3 of the screenWidth.
* In case of the screenHeight is above the windows innerHeight, the screenHeight is set equal to the windows innerHeight and the screenWidth is 1.5 times the screenHeight.
*/
function getScreenDimensions() {
    if (fullscreen) {
        document.getElementById("fullscreenBtn").classList.remove("low-opacity");
        screenWidth = window.innerWidth;
        screenHeight = (window.innerWidth * 0.66);
        if (window.innerHeight < window.innerWidth * 0.66) {
            screenWidth = (window.innerHeight * 1.5);
            screenHeight = window.innerHeight;
        }
    } else {
        document.getElementById("fullscreenBtn").classList.add("low-opacity");
        screenWidth = 720;
        screenHeight = 480;
    }
}