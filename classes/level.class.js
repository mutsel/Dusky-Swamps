class Level {
    enemies = [];
    sky = [];
    backgroundObjects = [];
    levelEndX = 710*2+100;

    constructor (enemies, sky, backgroundObjects, foregroundObjects) {
        this.enemies = enemies;
        this.sky = sky;
        this.backgroundObjects = backgroundObjects;
        this.foregroundObjects = foregroundObjects;
    }
}