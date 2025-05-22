let fullscreen;
let screenWidth;
let screenHeight;

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
* This function executes the screen-dimensions-functions, so that the screenHeight and -Width are adjusted to the settings and window-size.
* The viewport is adjusted to the canvas and startscreen, if necessary (i.e. if the viewport is too small to also show the game title).
*/
async function adjustScreenDimensions() {
    await getScreenDimensions();
    adjustDimensionsContent();
    adjustDimensionsElements();
    adjustFullscreenBtns();
    document.getElementById("startscreen").scrollIntoView();
    document.getElementById("canvas").scrollIntoView();
}

/**
* This function sets the global screenWidth and screenHeight variables.
* If fullscreen is turned on, the screenwidth is the windows innerWidth and the screenHeight is 2/3 of the screenWidth.
* If fullscreen is turned off, the screenwidth and screenHeight are set to their default values.
*/
async function getScreenDimensions() {
    if (fullscreen || window.innerWidth <= 720) {
        screenWidth = window.innerWidth;
        screenHeight = window.innerWidth * 0.66;
        if (window.innerWidth > 1440) {
            getScreenDimensionsBigWidth();
        }
    } else {
        screenWidth = 720;
        screenHeight = 480;
    }
    if (screenHeight > window.innerHeight) {
        getScreenDimensionsSmallHeight();
    }
}

/**
* This function sets the screen-dimensions values to their max-values for larger window-widths.
*/
function getScreenDimensionsBigWidth() {
    screenWidth = 1440;
    screenHeight = 950.4;
}

/**
* This function is used for viewports which are much wider then they are high.
* It sets the screenHeight-value to the windows height. The screenWidth is adjusted accordingly.
*/
function getScreenDimensionsSmallHeight() {
    screenHeight = window.innerHeight;
    screenWidth = screenHeight * 1.5;
}

/**
* This function adjusts the content-width to the screenWidth,
* The contents elements are also adjusted to the screenWidth and -Height.
*/
function adjustDimensionsContent() {
    document.getElementById("content").style.width = screenWidth + "px";
    let contentElements = [
        document.getElementById("canvas"),
        document.getElementById("startscreen"),
        document.getElementById("gameOverlaySections")
    ];
    contentElements.forEach(element => {
        element.style.width = screenWidth + "px";
        element.style.height = screenHeight + "px";
    });
}

/** 
* This function toggles css-classes for some content-elements, so that they fit to the screen-dimensions.
*/
function adjustDimensionsElements() {
    if (fullscreen || screenWidth < 720) {
        document.getElementById("startscreen").classList.remove("static-size");
        document.getElementById("gameOverlay").classList.remove("static-size");
        document.getElementById("mobileControls").classList.remove("static-size");
        document.getElementById("controls").classList.remove("static-size");
    } else {
        document.getElementById("startscreen").classList.add("static-size");
        document.getElementById("gameOverlay").classList.add("static-size");
        document.getElementById("mobileControls").classList.add("static-size");
        document.getElementById("controls").classList.add("static-size");
    }
}

/** 
* This function toggles the low-opacity of the fullscreen-buttons.
*/
function adjustFullscreenBtns() {
    if (fullscreen) {
        document.getElementById("fullscreenBtnStartscreen").classList.remove("low-opacity");
        document.getElementById("fullscreenBtnGame").classList.remove("low-opacity");
    } else {
        document.getElementById("fullscreenBtnStartscreen").classList.add("low-opacity");
        document.getElementById("fullscreenBtnGame").classList.add("low-opacity");
    }
}