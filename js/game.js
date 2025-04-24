let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    // console.log(e.keyCode)
    switch (e.keyCode) {
        case 37:
        case 65: keyboard.LEFT = true;
            break;
        case 39:
        case 68: keyboard.RIGHT = true;
            break;
        case 38:
        case 87: keyboard.UP = true;
            break;
        case 40:
        case 32: keyboard.ATTACK = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
        case 65: keyboard.LEFT = false;
            break;
        case 39:
        case 68: keyboard.RIGHT = false;
            break;
        case 38:
        case 87: keyboard.UP = false;
            break;
        case 40:
        case 32: keyboard.ATTACK = false;
            break;
    }
}); 