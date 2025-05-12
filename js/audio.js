let indexAudioVolume;
let audioVolume;

const volumeRegulatorImgs = [
    "url('./img/GUI/volume_regulator_0.png')",
    "url('./img/GUI/volume_regulator_25.png')",
    "url('./img/GUI/volume_regulator_50.png')",
    "url('./img/GUI/volume_regulator_75.png')",
    "url('./img/GUI/volume_regulator_100.png')"
];

/**
* This function checks if an indexAudioVolume (0-4) is deposited in the local storage .
* This way, previous audio-settings are saved, so the player does not need to adjust it everytime playing.
*/
function checkAudioSettings() {
    try {
        indexAudioVolume = JSON.parse(localStorage.getItem('indexAudioVolume'));
    }
    catch (error) {
        indexAudioVolume = 2;
        audioVolume = 0.5;
        localStorage.setItem('indexAudioVolume', JSON.stringify(indexAudioVolume));
    }
    if (indexAudioVolume == null) { indexAudioVolume = 2 }
    setAudioVolume();
}

/**
* This function toggles the fullMute-state of the game.
*/
function toggleAudio() {
    if (indexAudioVolume !== 0) {
        indexAudioVolume = 0;
        audioVolume = 0;
    } else {
        indexAudioVolume = 2;
        audioVolume = 0.5;
    }
    setAudioVolume();
    toggleAudioSettingsLowOpacity();
}

/**
* This function adjusts the volumeRegulator to the current indexAudioVolume.
* 
* @param {string} method - if the indexAudioVolume should decrease or increse. If it's empty, it should not change.
*/
function setAudioVolume(method) {
    let audioVolumeContentRef = document.getElementById("volumeRegulator");
    switch (method) {
        case 'decrease': if (indexAudioVolume > 0) { indexAudioVolume-- };
            audioVolumeContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
            break;
        case 'increase': if (indexAudioVolume < 4) { indexAudioVolume++ };
            audioVolumeContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
            break;
        default: audioVolumeContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
    }
    localStorage.setItem('indexAudioVolume', JSON.stringify(indexAudioVolume));
    toggleAudioSettingsLowOpacity();
    adjustAudioVolume();
}

/**
* This function adjusts adjusts the current audio volume according to the indexAudioVolume.
* If the audio volume is equal to zero, the game goes fullMute.
*/
function adjustAudioVolume() {
    audioVolume = indexAudioVolume * 25 / 100;
    if (inGame) {
        for (let i = 0; i < world.audios.length; i++) {
            world.audios[i].volume = (indexAudioVolume * 25 / 100);
        }
        if (audioVolume == 0 || world.gameEndCalled) {
            world.audios.scenery.pause();
        } else {
            world.audios.scenery.play();
        }
    }
}

/**
* This function toggles the userFeedback for the volumeRegulator and mute-btns.
* This way, the player can easily see, if the audio settings are turned on or off.
*/
function toggleAudioSettingsLowOpacity() {
    if (indexAudioVolume == 0) {
        document.getElementById("volumeRegulator").classList.add("low-opacity");
        document.getElementById("muteBtnStartscreen").classList.remove("low-opacity");
        document.getElementById("muteBtn").classList.remove("low-opacity");
    } else {
        document.getElementById("volumeRegulator").classList.remove("low-opacity");
        document.getElementById("muteBtnStartscreen").classList.add("low-opacity");
        document.getElementById("muteBtn").classList.add("low-opacity");
    }
}