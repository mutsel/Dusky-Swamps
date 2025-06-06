class Level {
    enemies = [];
    sky = [];
    backgroundObjects = [];
    decoration = [];
    plattforms = [];
    collectableObjects = [];
    foregroundObjects = [];
    levelEndX = 710 * 3 + 100;
    world;

    constructor(enemies, sky, backgroundObjects, decoration, plattforms, collectableObjects, foregroundObjects) {
        this.enemies = enemies;
        this.sky = sky;
        this.backgroundObjects = backgroundObjects;
        this.decoration = decoration;
        this.plattforms = plattforms;
        this.collectableObjects = collectableObjects;
        this.foregroundObjects = foregroundObjects;
    }
}