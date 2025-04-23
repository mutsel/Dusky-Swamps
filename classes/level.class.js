class Level {
    enemies = [];
    sky = [];
    backgroundObjects = [];
    decoration = [];
    collectableObjects = [];
    foregroundObjects = [];
    levelEndX = 710 * 2 + 100;

    constructor(enemies, sky, backgroundObjects, decoration, collectableObjects, foregroundObjects) {
        this.enemies = enemies;
        this.sky = sky;
        this.backgroundObjects = backgroundObjects;
        this.decoration = decoration;
        this.collectableObjects = collectableObjects;
        this.foregroundObjects = foregroundObjects;
        this.animate(this.foregroundObjects);
        this.animate(this.backgroundObjects);
    }

    animate(objects) {
        setInterval(() => {
            objects.forEach((o) => {
                if (o.category !== "ground") {
                    if (keyboard.LEFT && this.world.character.x > 0) {
                        o.moveRight();
                    }
                    if (keyboard.RIGHT && this.world.character.x < this.levelEndX) {
                        o.moveLeft();
                    }
                }
            });
        }, 1000 / 60);
    }
}