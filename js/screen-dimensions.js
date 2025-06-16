let fullscreen;
let screenWidth;
let screenHeight;

/**
* This function checks if the fullscreen-setting is deposited in the local storage.
* This way, the previous fullscreen-setting is saved, so the player does not need to adjust it everytime playing.
*/
function checkScreenDimensionsSettings() {
    try { fullscreen = JSON.parse(localStorage.getItem('fullscreen')); }
    catch (error) { fullscreen = false; }
    if (fullscreen == null) fullscreen = false;
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
    adjustInGameControls();
    adjustFullscreenBtns();
    adjustMobile();
    document.getElementById("startscreen").scrollIntoView();
    document.getElementById("canvas").scrollIntoView();
}

/**
* This function sets the global screenWidth and screenHeight variables.
* If fullscreen is turned on, the screenwidth is the windows innerWidth and the screenHeight is 2/3 of the screenWidth.
* If fullscreen is turned off, the screenwidth and screenHeight are set to their default values.
*/
async function getScreenDimensions() {
    if (fullscreen || window.innerWidth <= 720 || window.matchMedia('(pointer: coarse)').matches) {
        screenWidth = window.innerWidth;
        screenHeight = window.innerWidth * 0.66;
        if (window.innerWidth > 1440) getScreenDimensionsBigWidth();
    } else {
        screenWidth = 720;
        screenHeight = 480;
    }
    if (screenHeight > window.innerHeight) getScreenDimensionsSmallHeight();
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
        document.getElementById("gameOverlaySections"),
        document.getElementById("mobileAlertFormat"),
    ];
    contentElements.forEach(element => {
        element.style.width = screenWidth + "px";
        element.style.height = screenHeight + "px";
        element.style.minHeight = screenHeight + "px";
    });
}

/** 
* This function toggles css-classes for some elements, so that they fit to the screen-dimensions (static or not).
*/
function adjustDimensionsElements() {
    let staticElements = [
        document.getElementById("startscreen"),
        document.getElementById("gameOverlay"),
        document.getElementById("mobileControls"),
        document.getElementById("mobileAlert"),
        document.getElementById("controls")
    ]
    staticElements.forEach(e => {
        if (fullscreen || screenWidth < 720 || screenHeight < 480 || window.matchMedia('(pointer: coarse)').matches) e.classList.remove("static-size");
        else e.classList.add("static-size");
    });
}

/** 
* This function adjusts the position of the mobile-controls- and controls-section, when inGame.
*/
function adjustInGameControls() {
    if (inGame) {
        document.getElementById("mobileControls").style.marginTop = -screenHeight + "px";
        document.getElementById("controls").style.marginTop = -screenHeight + "px";
    } else {
        document.getElementById("mobileControls").style.marginTop = 0;
        document.getElementById("controls").style.marginTop = 0;
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

/** 
* This function toggles the visibility of the title inGame for mobile devices.
*/
function adjustMobile() {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        if (inGame) {
            document.querySelector("body").style.overflow = "hidden";
            document.querySelector("body").style.display = "flex";
            document.querySelector("body").style.alignItems = "center";
            document.querySelector("h1").classList.add("d-none");
        } else {
            document.querySelector("body").style.overflow = "auto";
            document.querySelector("body").style.display = "block";
            document.querySelector("h1").classList.remove("d-none");
        }
    }
}