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
        this.animate(this.foregroundObjects);
        this.animate(this.backgroundObjects);
    }

    /**
     * This function is used to animate fore- and background-objects to give the illusion of depth (parallaxe).
     * When the player reaches the endboss-area, the objects stop moving.
     * 
     * @param {Object} objects - the fore- and background-objects to be animated
     */
    animate(objects) {
        // const sceneryAnimationInterval = 
        setInterval(() => {
            objects.forEach((o) => {
                if (o.category !== "ground") {
                    if (keyboard.LEFT && this.world.character.x > 0  && !this.world.firstBossContact) {
                        o.moveRight();
                    }
                    if (keyboard.RIGHT && !this.world.firstBossContact) {
                        o.moveLeft();
                    }
                }
            });
        }, 1000 / 60);
        // this.world.intervals.push(sceneryAnimationInterval);
    }
}