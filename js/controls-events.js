/**
* This eventListener called on keydown prevents default behavior for buttons.
* Like this, accidentaly clicked buttons by pressing a key are not happening.
*/
window.addEventListener('keydown', (e) => { if (document.activeElement.tagName == 'BUTTON') e.preventDefault() });

/**
* This function prevents the default behavior (a context menu), when longer clicking an object.
*/
function disableContextMenu() {
    document.querySelectorAll('main').forEach(element => {
        element.addEventListener('contextmenu', (e) => {e.preventDefault();});
    });
}

/**
* This function adds the keydown- and keyup-eventListeners for the game.
*/
function addEventListeners() {
    window.addEventListener('keydown', keyDownEvents);
    window.addEventListener('keyup', keyUpEvents);
    toggleMobileControls(false);
}

/**
* This function removes the keydown- and keyup-eventListeners for the game.
* This way, the player is not able to move the character while being in the startscreen or a menu.
*/
function removeEventListeners() {
    window.removeEventListener('keydown', keyDownEvents);
    window.removeEventListener('keyup', keyUpEvents);
    toggleMobileControls(true);
    cancelEvents();
}

/**
* This function stops the music and sets all keyboard-constants to false. 
* This way, the character and the music stops, when a menu opens.
*/
function cancelEvents() {
    if (inGame) {
        audios.steps.pause();
        audios.scenery.pause();
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
    world.character.timeIdling = 0;
    switch (event.keyCode) {
        case 38: case 87: keyboard.UP = true;
            break;
        case 37: case 65: keyboardLeftTriggered();
            break;
        case 39: case 68: keyboardRightTriggered();
            break;
        case 40: case 32: keyboard.ATTACK = true;
            break;
    }
}

/**
* This function sets the accoring constant for a pressed key to false (keyup).
* The walking-sounds if the character was previously walking. 
* A magicAttack is shot, after the spacebar is set to false.
*/
function keyUpEvents() {
    world.character.timeIdling = 0;
    switch (event.keyCode) {
        case 38: case 87: keyboard.UP = false;
            break;
        case 37: case 65: keyboardLeftCancelled();
            break;
        case 39: case 68: keyboardRightCancelled();
            break;
        case 40: case 32: keyboardAttackCancelled();
            break;
    }
}

/**
* This function has the same functionality as the keyDownEvents()-function, but for the mobile-controls-buttons instead of the keys.
*/
function mobileControlsMousedown(key) {
    world.character.timeIdling = 0;
    switch (key) {
        case 'up': keyboard.UP = true;
            break;
        case 'left': keyboardLeftTriggered();
            break;
        case 'right': keyboardRightTriggered();
            break;
        case 'attack': keyboard.ATTACK = true;
            break;
    }
}

/**
* This function has the same functionality as the keyUpEvents()-function, but for the mobile-controls-buttons instead of the keys.
*/
function mobileControlsMouseup(key) {
    world.character.timeIdling = 0;
    audios.steps.pause();
    switch (key) {
        case 'up': keyboard.UP = false;
            break;
        case 'left': keyboardLeftCancelled();
            break;
        case 'right': keyboardRightCancelled();
            break;
        case 'attack': keyboardAttackCancelled();
            break;
    }
}

/**
* This function is executed, when the player presses/clicks the key/button to move left.
*/
function keyboardLeftTriggered() {
    keyboard.LEFT = true;
    keyboard.RIGHT = false;
    if (!world.character.isAboveGround()) playAudio("steps");
}

/**
* This function is executed, when the player presses/clicks the key/button to move right.
*/
function keyboardRightTriggered() {
    keyboard.RIGHT = true;
    keyboard.LEFT = false;
    if (!world.character.isAboveGround()) playAudio("steps");
}

/**
* This function is executed, when the player leaves the key/button to stop moving left.
*/
function keyboardLeftCancelled() {
    keyboard.LEFT = false;
    audios.steps.pause();
}

/**
* This function is executed, when the player leaves the key/button to stop moving right.
*/
function keyboardRightCancelled() {
    keyboard.RIGHT = false;
    audios.steps.pause();
}

/**
* This function is executed, when the player leaves the key/button to attack.
*/
function keyboardAttackCancelled() {
    keyboard.ATTACK = false;
    world.attackBar.shootMagicAttack();
}

/**
* This function toggles the mobile-controls-btns-disabled-state.
*
* @param {boolean} boolean - true or false
*/
function toggleMobileControls(boolean) {
    let mobileControlBtns = document.querySelectorAll(".mobile-control-btn");
    mobileControlBtns.forEach(btn => btn.disabled = boolean);
}