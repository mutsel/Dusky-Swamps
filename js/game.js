let canvas;
let world;
let inGame;
let controlsVisibility;

const collectedGemsImgs = [
    "url('./img/gui/win_gems/win_gems_00.png')",
    "url('./img/gui/win_gems/win_gems_01.png')",
    "url('./img/gui/win_gems/win_gems_02.png')",
    "url('./img/gui/win_gems/win_gems_03.png')",
    "url('./img/gui/win_gems/win_gems_04.png')"
];

/**
* This function is the init function for the game. All sections/menu are closed, only the startscreen is visible.
*/
function init() {
    inGame = false;
    stopAllAudios();
    closeAll();
    document.getElementById("startscreen").classList.remove("d-none");
    document.getElementById("startscreenOverview").classList.remove("d-none");
    document.getElementById("mobileControls").classList.add("d-none");
    removeEventListeners();
    checkAudioSettings();
    adjustControlsVisibility();
    checkScreenDimensionsSettings();
    adjustScreenDimensions();
    addButtonSounds();
    disableContextMenu();
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
    closeAll();
    resetCssGameStart();
    checkAudioSettings();
    adjustControlsVisibility();
    checkScreenDimensionsSettings();
    adjustScreenDimensions();
}

/**
* This function is part of the startGame()-function. resets the css-properties of some elements for the game to start properly.
*/
function resetCssGameStart() {
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("d-none");
    document.getElementById("gameOverlay").classList.remove("dark-bg");
    document.getElementById("resetBtn").classList.remove("d-none");
    document.getElementById("settingsBtn").classList.remove("d-none");
    document.getElementById("closeBtn").classList.add("d-none");
    document.getElementById("mobileControls").classList.remove("d-none");
    gemCounter.style.backgroundImage = collectedGemsImgs[0];
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
    world.gamePaused = false;
}

/**
* This function closes all menu of the game and the canvas (incl. gameOverlay) itself.
* The victory buttons are set to default (disabled).
*/
function closeAll() {
    closeGameMenu();
    closeAllStartscreenMenu();
    document.getElementById("canvas").classList.add("d-none");
    document.getElementById("gameOverlay").classList.add("d-none");
    document.getElementById("victoryRetryBtn").classList.add("disabled-btn");
    document.getElementById("victoryMainMenuBtn").classList.add("disabled-btn");
}

/**
* This function closes all sections of the startscreen and the startscreen itself.
*/
function closeAllStartscreenMenu() {
    document.getElementById("startscreen").classList.add("d-none");
    let startscreenMenu = document.querySelectorAll(".startscreen-menu");
    for (let i = 0; i < startscreenMenu.length; i++) startscreenMenu[i].classList.add("d-none");
}

/**
* This function closes all game-menu
*/
function closeGameMenu() {
    let gameMenu = document.querySelectorAll(".game-menu");
    for (let i = 0; i < gameMenu.length; i++) gameMenu[i].classList.add("d-none");
    if (inGame) playAudio("scenery");
}

/**
* This function plays a small animation, when clicking the character in the startscreen
*/
async function playStartscreenAnimation() {
    document.getElementById("characterAnimation").src = "./img/gif/character_clicked.gif";
    playAudio("characterHurt");
    await delay(700);
    document.getElementById("characterAnimation").src = "./img/gif/character.gif";
}

/**
* This function opens the how-to-play-section in the main-menu.
*/
function openHowToPlay() {
    document.getElementById("startscreenOverview").classList.add("d-none");
    document.getElementById("startscreenHowToPlay").classList.remove("d-none");
}

/**
* This function opens the about-section in the main-menu.
*/
function openAbout() {
    document.getElementById("startscreenOverview").classList.add("d-none");
    document.getElementById("startscreenAbout").classList.remove("d-none");
}

/**
* This function opens the impress-section in the about-section.
*/
function openImpress() {
    document.getElementById("startscreenOverview").classList.add("d-none");
    document.getElementById("startscreenImpress").classList.remove("d-none");
}

/**
* This function opens the settings-section in the main-menu.
*/
function openStartscreenSettings() {
    document.getElementById("startscreenOverview").classList.add("d-none");
    document.getElementById("startscreenSettings").classList.remove("d-none");
}

/**
* This function adds visibility and functionality to the game-settings or reset-options.
* 
* @param {string} contentRefId - the id of the game-menu
*/
function openGameMenu(contentRefId) {
    let contentRef = document.getElementById(contentRefId);
    contentRef.classList.remove("d-none");
    adjustGameOverlay("add");
    removeEventListeners();
}

/**
* This function adjusts the gameOverlay according to the toggle-option(add or remove).
* 
* @param {string} toggle - whether classes should be added or removed
*/
function adjustGameOverlay(toggle) {
    if (toggle == "add") {
        document.getElementById("closeBtn").classList.remove("d-none");
        document.getElementById("gameOverlay").classList.add("dark-bg");
        document.getElementById("resetBtn").classList.add("d-none");
        document.getElementById("settingsBtn").classList.add("d-none");
    } else if (toggle == "remove") {
        document.getElementById("closeBtn").classList.add("d-none");
        document.getElementById("gameOverlay").classList.remove("dark-bg");
        document.getElementById("resetBtn").classList.remove("d-none");
        document.getElementById("settingsBtn").classList.remove("d-none");
    }
}

/**
* This function shows the gameOver-screen if gameOver in the world is set to true.
*/
function gameOver() {
    gameEnd()
    document.getElementById("gameOver").classList.remove("d-none");
    playAudio("gameOver");
}

/**
* This function shows the victory-screen if victory in the world is set to true.
*/
function victory() {
    gameEnd()
    document.getElementById("victory").classList.remove("d-none");
    playAudio("victory");
    playAudio("characterHurt");
    setTimeout(() => countGems(), 1000);
}

/**
* This function adjusts the visibility and functionality of the game if the game ended (gameOver or victory)
*/
function gameEnd() {
    document.getElementById("gameOver").classList.add("d-none");
    document.getElementById("victory").classList.add("d-none");
    document.getElementById("gameSettings").classList.add("d-none");
    document.getElementById("gameResetOptions").classList.add("d-none");
    document.getElementById("gameOverlay").classList.add("dark-bg");
    document.getElementById("resetBtn").classList.add("d-none");
    document.getElementById("settingsBtn").classList.add("d-none");
    document.getElementById("closeBtn").classList.add("d-none");
    removeEventListeners();
    world.gamePaused = true;
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
        if (i > 0) playAudio("gem");
        await delay(650);
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
    try { controlsVisibility = JSON.parse(localStorage.getItem('controlsVisibility')); }
    catch (error) { controlsVisibility = true; }
    if (controlsVisibility || controlsVisibility == null) {
        controlsVisibility = true;
        document.getElementById("showControlsBtnStartscreen").classList.remove("low-opacity");
        document.getElementById("showControlsBtnGame").classList.remove("low-opacity");
        document.getElementById("controls").classList.remove("d-none");
    } else {
        document.getElementById("showControlsBtnStartscreen").classList.add("low-opacity");
        document.getElementById("showControlsBtnGame").classList.add("low-opacity");
        document.getElementById("controls").classList.add("d-none");
    }
    localStorage.setItem('controlsVisibility', JSON.stringify(controlsVisibility));
}

/**
* This function toggles the world gamePaused.
* If the game is paused, no animations or movements are possible and no mo can take damage.
*/
function toggleGamePaused() {
    world.gamePaused = !world.gamePaused;
} 