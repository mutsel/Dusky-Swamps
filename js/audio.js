let indexAudioVolume;
let audioVolume;

const volumeRegulatorImgs = [
    "url('img/gui/volume_regulator/volume_regulator_0.png')",
    "url('img/gui/volume_regulator/volume_regulator_25.png')",
    "url('img/gui/volume_regulator/volume_regulator_50.png')",
    "url('img/gui/volume_regulator/volume_regulator_75.png')",
    "url('img/gui/volume_regulator/volume_regulator_100.png')"
];

let audios = {
    scenery: new Audio('./audio/scenery.mp3'),
    steps: new Audio('./audio/steps.mp3'),
    creakingSteps: new Audio('./audio/creaking_steps.mp3'),
    characterHurt: new Audio('./audio/character_hurt.mp3'),
    longIdle: new Audio('./audio/long_idle.mp3'),
    enemyHurtJump: new Audio('./audio/enemy_hurt_jump.mp3'),
    enemyHurtAttack: new Audio('./audio/enemy_hurt_attack.mp3'),
    frogAttack: new Audio('./audio/frog_attack.mp3'),
    cactusNoticedCharacter: new Audio('./audio/cactus_noticed_character.mp3'),
    gem: new Audio('./audio/gem.mp3'),
    magicStone: new Audio('./audio/magic_stone.mp3'),
    magicAttack: new Audio('./audio/magic_attack.mp3'),
    canonballAttack: new Audio('audio/canonball.mp3'),
    bossfight: new Audio('./audio/bossfight.mp3'),
    gameOver: new Audio('./audio/game_over.mp3'),
    victory: new Audio('./audio/victory.mp3'),
    roundBtn: new Audio('./audio/round_btn.mp3'),
    rectangleBtn: new Audio('./audio/rectangle_btn.mp3')
};

/**
* This function plays the given audio and sets its volume to the audioVolume.
*
* @param {string} audio - the name of the audio to play
*/
function playAudio(audio) {
    audios[audio].play();
    audios[audio].volume = audioVolume;
}

/**
* This function pauses all audios.
*/
function stopAllAudios() {
    for (let key in audios) {
        if (audios[key] instanceof Audio) {
            audios[key].pause();
            audios[key].volume = 0;
        }
    }
}

/**
* This function adds sound to each button. Round and rectangle buttons have different audios.
*/
function addButtonSounds() {
    const roundBtns = document.querySelectorAll('.round-btn');
    const rectangleBtns = document.querySelectorAll('.rectangle-btn');
    roundBtns.forEach(btn => btn.addEventListener('click', () => playAudio("roundBtn")));
    rectangleBtns.forEach(btn => btn.addEventListener('click', () => playAudio("rectangleBtn")));
}

/**
* This function checks if an indexAudioVolume (0-4) is deposited in the local storage .
* This way, previous audio-settings are saved, so the player does not need to adjust it everytime playing.
*/
function checkAudioSettings() {
    try { indexAudioVolume = JSON.parse(localStorage.getItem('indexAudioVolume')); }
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
    switch (method) {
        case 'decrease': if (indexAudioVolume > 0) indexAudioVolume--;
            break;
        case 'increase': if (indexAudioVolume < 4) indexAudioVolume++;
            break;
    }
    localStorage.setItem('indexAudioVolume', JSON.stringify(indexAudioVolume));
    adjustVolumeRegulatorImages()
    toggleAudioSettingsLowOpacity();
    adjustAudioVolume();
}

/**
* This function adjusts the volume-regulator images to the indexAudioVolume.
*/
function adjustVolumeRegulatorImages() {
    document.getElementById("volumeRegulatorStartscreen").style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
    document.getElementById("volumeRegulatorGame").style.backgroundImage = volumeRegulatorImgs[indexAudioVolume];
}

/**
* This function adjusts adjusts the current audio volume according to the indexAudioVolume.
* If the audio volume is equal to zero, the game goes fullMute.
*/
function adjustAudioVolume() {
    audioVolume = indexAudioVolume * 25 / 100;
    for (let i = 0; i < audios.length; i++) audios[i].volume = (indexAudioVolume * 25 / 100);
    if (inGame) adjustLoopSounds();
}

/**
* This function pauses/plays sounds that should loop.
*/
function adjustLoopSounds() {
    if (audioVolume == 0 || world.gameEndCalled) {
        audios.scenery.pause();
        audios.bossfight.pause();
    } else {
        playAudio("scenery");
        if (world.firstBossContact) {
            playAudio("bossfight");
            audios.bossfight.loop = true;
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