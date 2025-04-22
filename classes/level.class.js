class Level {
    enemies = [];
    sky = [];
    backgroundObjects = [];
    gems = [];
    foregroundObjects = [];
    levelEndX = 710*2+100; 

    constructor (enemies, sky, backgroundObjects, gems,  foregroundObjects) {
        this.enemies = enemies;
        this.sky = sky;
        this.backgroundObjects = backgroundObjects;
        this.gems = gems;
        this.foregroundObjects = foregroundObjects
    }
}