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
        case 38:
        case 87:
            keyboard.UP = true;
            break;
        case 37:
        case 65: keyboard.LEFT = true;
            if (!world.character.isAboveGround()) {
                audios.steps.play();
                audios.steps.volume = audioVolume;
            }
            break;
        case 39:
        case 68: keyboard.RIGHT = true;
            if (!world.character.isAboveGround()) {
                audios.steps.play();
                audios.steps.volume = audioVolume;
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
    world.character.timeIdling = 0;
    switch (event.keyCode) {
        case 38:
        case 87: keyboard.UP = false;
            break;
        case 37:
        case 65: keyboard.LEFT = false;
            audios.steps.pause();
            break;
        case 39:
        case 68: keyboard.RIGHT = false;
            audios.steps.pause();
            break;
        case 40:
        case 32: keyboard.ATTACK = false;
            world.shootMagicAttack();
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
        case 'left': keyboard.LEFT = true;
            if (!world.character.isAboveGround()) {
                audios.steps.play();
                audios.steps.volume = audioVolume;
            }
            break;
        case 'right': keyboard.RIGHT = true;
            if (!world.character.isAboveGround()) {
                audios.steps.play();
                audios.steps.volume = audioVolume;
            }
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
        case 'left': keyboard.LEFT = false;
            audios.steps.pause();
            break;
        case 'right': keyboard.RIGHT = false;
            audios.steps.pause();
            break;
        case 'attack': keyboard.ATTACK = false;
            world.shootMagicAttack();
            break;
    }
}