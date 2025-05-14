let fullscreen;
let screenWidth;
let screenHeight;
let scale;

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
    document.getElementById("content").style.width = screenWidth + "px";
    let fullscreenElements = [
        document.getElementById("canvas"),
        document.getElementById("startscreen"),
        document.getElementById("gameOverlaySections")
    ];
    fullscreenElements.forEach(element => {
        element.style.width = screenWidth + "px";
        element.style.height = screenHeight + "px";
    });
    scaleElements();
    adjustDimensionsElements();
}

/**
* This function sets the global screenWidth and screenHeight variables.
* If fullscreen is turned off, the screenwidth and screenHeight are set to their default values.
* If fullscreen is turned on, the screenwidth is the windows innerWidth and the screenHeight is 2/3 of the screenWidth.
*/
function getScreenDimensions() {
    if (fullscreen) {
        document.getElementById("fullscreenBtnStartscreen").classList.remove("low-opacity");
        document.getElementById("fullscreenBtnGame").classList.remove("low-opacity");
        screenWidth = window.innerWidth;
        screenHeight = (window.innerWidth * 0.66);
        getScreenDimensionsEdgeCases();
    } else {
        document.getElementById("fullscreenBtnStartscreen").classList.add("low-opacity");
        document.getElementById("fullscreenBtnGame").classList.add("low-opacity");
        if (window.innerWidth >= 720) {
            screenWidth = 720;
            screenHeight = 480;
        } else {
            screenWidth = window.innerWidth;
            screenHeight = (window.innerWidth * 0.66);
        }
    }
}

/**
* This function sets the global screenWidth and screenHeight variables for edge cases (i.e. extraordinary window-dimensions).
* In case of the screenHeight is above the windows innerHeight - 240, the screenHeight is set equal to the windows innerHeight and the screenWidth is 1.5 times the screenHeight.
*/
function getScreenDimensionsEdgeCases() {
    if (window.innerHeight - 240 < window.innerWidth * 0.66) {
        screenHeight = window.innerHeight - 240;
        screenWidth = ((window.innerHeight - 240) * 1.5);
    }
    if (screenWidth > 1440) {
        screenWidth = 1440;
        screenHeight = 950.4;
    }
}

/**
* This function scales some elements, so that they fit to the screen-dimensions.
*/
function scaleElements() {
    scale = screenWidth / 720;
    let scaleableElements = [
        document.getElementById("startscreenOverview"),
    ]
    scaleableElements.forEach(element => { element.style.scale = scale; });
    document.querySelectorAll(".controls-section").forEach(element => { element.style.scale = scale; });
}

/**
* This function adjusts the height and width of some elements, so that they fit to the screen-dimensions.
*/
function adjustDimensionsElements() {
    if (fullscreen || screenWidth < 720) {
        document.getElementById("startscreenHowToPlay").classList.remove("static-startscreen-section");
        document.getElementById("startscreenAbout").classList.remove("static-startscreen-section");
        document.getElementById("startscreenSettings").classList.remove("static-settings");
        document.getElementById("gameSettings").classList.remove("static-settings");
        document.getElementById("gameResetOptions").classList.remove("static-reset-options");
        document.getElementById("gameBtns").classList.remove("static-game-btns");
        document.getElementById("mobileControlsBtns").classList.remove("static-mobile-controls");
        document.getElementById("gameOver").classList.remove("static-game-over");
        document.getElementById("victory").classList.remove("static-victory");
    } else {
        document.getElementById("startscreenHowToPlay").classList.add("static-startscreen-section");
        document.getElementById("startscreenAbout").classList.add("static-startscreen-section");
        document.getElementById("startscreenSettings").classList.add("static-settings");
        document.getElementById("gameSettings").classList.add("static-settings");
        document.getElementById("gameResetOptions").classList.add("static-reset-options");
        document.getElementById("gameBtns").classList.add("static-game-btns");
        document.getElementById("mobileControlsBtns").classList.add("static-mobile-controls");
        document.getElementById("gameOver").classList.add("static-game-over");
        document.getElementById("victory").classList.add("static-victory");
    }
}