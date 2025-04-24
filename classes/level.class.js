class Level {
    enemies = [];
    sky = [];
    backgroundObjects = [];
    decoration = [];
    gems = [];
    magicStones = [];
    foregroundObjects = [];
    levelEndX = 710 * 3 + 100;

    constructor(enemies, sky, backgroundObjects, decoration, gems, magicStones, foregroundObjects) {
        this.enemies = enemies;
        this.sky = sky;
        this.backgroundObjects = backgroundObjects;
        this.decoration = decoration;
        this.gems = gems;
        this.magicStones = magicStones;
        this.foregroundObjects = foregroundObjects;
        this.animate(this.foregroundObjects);
        this.animate(this.backgroundObjects);
    }

    animate(objects) {
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
    }
}