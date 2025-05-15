let indexAudioVolume;
let audioVolume;

const volumeRegulatorImgs = [
    "url('img/gui/volume_regulator/volume_regulator_0.png')",
    "url('img/gui/volume_regulator/volume_regulator_25.png')",
    "url('img/gui/volume_regulator/volume_regulator_50.png')",
    "url('img/gui/volume_regulator/volume_regulator_75.png')",
    "url('img/gui/volume_regulator/volume_regulator_100.png')"
];

audios = {
    scenery: new Audio('./audio/scenery.mp3'),
    steps: new Audio('./audio/steps.mp3'),
    gem: new Audio('./audio/gem.mp3'),
    magicStone: new Audio('./audio/magic_stone.mp3'),
    magicAttack: new Audio('./audio/magic_attack.mp3'),
    gameOver: new Audio('./audio/game_over.mp3'),
    victory: new Audio('./audio/victory.mp3'),
    roundBtn: new Audio('./audio/round_btn.mp3'),
    rectangleBtn: new Audio('./audio/rectangle_btn.mp3'),
};


function addButtonSounds() {
    const roundBtns = document.querySelectorAll('.round-btn');
    const rectangleBtns = document.querySelectorAll('.rectangle-btn');
    roundBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            audios.roundBtn.play();
            audios.roundBtn.volume = audioVolume;
        });
    });
    rectangleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            audios.rectangleBtn.play();
            audios.rectangleBtn.volume = audioVolume;
        });
    });
}

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
    let volumeStartscreenContentRef = document.getElementById("volumeRegulatorStartscreen");
    let volumeGameContentRef = document.getElementById("volumeRegulatorGame");
    switch (method) {
        case 'decrease': if (indexAudioVolume > 0) { indexAudioVolume-- };
            volumeStartscreenContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
            volumeGameContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
            break;
        case 'increase': if (indexAudioVolume < 4) { indexAudioVolume++ };
            volumeStartscreenContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
            volumeGameContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
            break;
        default:
            volumeStartscreenContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
            volumeGameContentRef.style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
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
        for (let i = 0; i < audios.length; i++) {
            audios[i].volume = (indexAudioVolume * 25 / 100);
        }
        if (audioVolume == 0 || world.gameEndCalled) {
            audios.scenery.pause();
        } else {
            audios.scenery.play();
        }
    }
}

/**
* This function toggles the userFeedback for the volumeRegulator and mute-btns.
* This way, the player can easily see, if the audio settings are turned on or off.
*/
function toggleAudioSettingsLowOpacity() {
    if (indexAudioVolume == 0) {
        document.getElementById("volumeRegulatorStartscreen").classList.add("low-opacity");
        document.getElementById("volumeRegulatorGame").classList.add("low-opacity");
        document.getElementById("muteBtnStartscreen").classList.remove("low-opacity");
        document.getElementById("muteBtnGame").classList.remove("low-opacity");
    } else {
        document.getElementById("volumeRegulatorStartscreen").classList.remove("low-opacity");
        document.getElementById("volumeRegulatorGame").classList.remove("low-opacity");
        document.getElementById("muteBtnStartscreen").classList.add("low-opacity");
        document.getElementById("muteBtnGame").classList.add("low-opacity");
    }
}