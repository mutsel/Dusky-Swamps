let fullMute;
let indexAudioVolume;

const volumeRegulatorImgs = [
    "url('./img/GUI/volume_regulator_0.png')",
    "url('./img/GUI/volume_regulator_25.png')",
    "url('./img/GUI/volume_regulator_50.png')",
    "url('./img/GUI/volume_regulator_75.png')",
    "url('./img/GUI/volume_regulator_100.png')"
];

/**
* This function checks if fullMute-audiosettings are deposited in the local storage (true or false).
* This way, previous audio-settings are saved, so the player does not need to adjust it everytime playing.
*/
function checkLocalStorageAudioSettings() {
    try {
        indexAudioVolume = JSON.parse(localStorage.getItem('indexAudioVolume'));
    }
    catch (error) {
        indexAudioVolume = 2;
        localStorage.setItem('indexAudioVolume', JSON.stringify(indexAudioVolume));
    }
    setAudioVolume();
    fullMute = JSON.parse(localStorage.getItem('fullMute'));
    setMuteState()
}

/**
* This function toggles the fullMute-state of the game.
*/
function toggleAudio() {
    fullMute = !fullMute;
    setMuteState();
}

/**
* This function adjusts the muteBtn and the worlds audio settings to the current fullMute-state (true/false)
* The fullMute-audiosetting in the local storage is updated.
*/
function setMuteState() {
    if (fullMute == false || fullMute == null) {
        fullMute = false;
        document.getElementById("muteBtn").classList.add("low-opacity");
        if (indexAudioVolume == 0) {
            indexAudioVolume = 2;
        }
    } else {
        indexAudioVolume = 0;
        document.getElementById("muteBtn").classList.remove("low-opacity");
    }

    localStorage.setItem('indexAudioVolume', JSON.stringify(indexAudioVolume));
    localStorage.setItem('fullMute', JSON.stringify(fullMute));

    if (inGame) {
        for (let key in world.audios) {
            world.audios[key].muted = fullMute;
        }
    }
}

function setAudioVolume(method) {
    let audioVolumeContentRef = document.getElementById("volumeRegulator");
    if (indexAudioVolume == null) { indexAudioVolume = 2 }
    switch (method) {
        case 'decrease': audioVolumeContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume - 1];
            indexAudioVolume--;
            break;
        case 'increase': audioVolumeContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume + 1];
            indexAudioVolume++;
            break;
        default: audioVolumeContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
    }
    localStorage.setItem('indexAudioVolume', JSON.stringify(indexAudioVolume));
    adjustAudioVolume()
}

function adjustAudioVolume() {
    if (indexAudioVolume == 0) {
        fullMute = true;
    } else {
        fullMute = false;
    }
    setMuteState();
    if (inGame) {
        for (let key in world.audios) {
            world.audios[key].volume = (indexAudioVolume * 25 / 100);
        }
    }
}