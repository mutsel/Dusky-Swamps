class World {
    character = new Character();
    healthBar = new HealthBar();
    attackBar = new AttackBar();
    gemsBar = new GemsBar();
    availableMagicAttacks = [];
    magicAttackAvailable = true;
    canonballAttacks = [];
    passiveEntities = [
        new PassiveEntity(250),
        new PassiveEntity(250),
        new PassiveEntity(250),
        new PassiveEntity(1100),
        new PassiveEntity(1100),
        new PassiveEntity(1100),
        new PassiveEntity(2000),
        new PassiveEntity(2000),
        new PassiveEntity(2000),
        new PassiveEntity(2800),
        new PassiveEntity(2800),
        new PassiveEntity(2800)
    ];

    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    firstBossContact = false;
    gameOver = false;
    victory = false;
    gameEndCalled = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
     * This function sets this object as the world object for different other objects.
     * This way, those other objects are able to access methods and variables of this object.
     */
    setWorld() {
        this.character.world = this;
        this.level.world = this;
    }

    /**
     * This function adds every necessary movable object to the map.
     * Beforehand, the canvas is cleared and the camera is positioned.
     * Static objects are drawn afterwards to be visible the whole time.
     * This function is repeated over and over.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.sky);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.passiveEntities);
        this.addObjectsToMap(this.level.decoration);
        this.addObjectsToMap(this.level.plattforms);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.availableMagicAttacks);
        this.addObjectsToMap(this.canonballAttacks);

        this.ctx.translate(-this.cameraX, 0);
        // Space for fixed objects
        this.addToMap(this.healthBar);
        this.addToMap(this.attackBar);
        this.addToMap(this.gemsBar);

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.foregroundObjects);

        this.ctx.translate(-this.cameraX, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function is part of the draw()-function and it executes the addToMap()-function for each of the objects from the objects-array
     * 
     * @param {Object} objects - a list of objects from the same type
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * This function is part of the draw()-function and adds every object to the map(canvas).
     * if the object faces the different direction, it is flipped beforehand and flipped back afterwards.
     * 
     * @param {Object} mo - a movable object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function is part of the addToMap()-function and it flips the image of an object facing the other direction.
     * This way the left and right side are swapped.
     * 
     * @param {Object} mo - a movable object 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function is part of the addToMap()-function and it flips the image of an object facing the other direction back.
     * This way the left and right side are the same as before.
     * 
     * @param {Object} mo - a movable object 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function runs the game. It executes the checkCollision-functions, checks if the game ends and is used for the scenery.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsEnemies();
            this.checkCollisionShootableObjects();
            this.checkCollisionsCollectables();
            if (this.gameOver && !this.gameEndCalled) {
                gameOver();
                this.gameEndCalled = true;
                adjustLoopSounds();
            } else if (this.victory && !this.gameEndCalled) {
                victory();
                this.gameEndCalled = true;
                adjustLoopSounds();
            }
            this.checkCharacterNearbyEnemy();
        }, 1000 / 60);

        this.respawnScenery();
    }

    /**
     * This function checks for each of the enemies if the character is jumping on top of them. If so, it executes the hit()-funciton for the enemie.
     * If not, if checks if the character is colliding with an enemie. If so, it executes the hit()-funciton for the character.
     */
    checkCollisionsEnemies() {
        this.level.enemies.forEach(async (e) => {
            if (this.character.isJumpingOnTop(e) && e.energy > 0) {
                await e.hit(55);
                this.character.speedY = 12;
                if (e instanceof Cactus) {
                    await this.character.hit(25);
                    this.healthBar.setPercentage(this.character.energy);
                }
            } else if (this.character.isColliding(e) && e.energy > 0) {
                await this.character.hit(25);
                this.character.speedY = -1;
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * This function checks for each of the magic attacks in the availableMagicAttacks-array, if it colliding with an enemie.
     * If so, the hit()-function for the enemie is executed and the magicAttacks disappears.
     */
    checkCollisionShootableObjects() {
        this.availableMagicAttacks.forEach((a) => {
            this.level.enemies.forEach((e) => {
                if (a.isColliding(e)) {
                    this.availableMagicAttacks.splice(this.availableMagicAttacks.indexOf(a), 1);
                    e.hit(55);
                    return;
                }
            });
        });
        this.canonballAttacks.forEach((c) => {
            if (c.isColliding(this.character)) {
                this.character.hit(25);
                this.healthBar.setPercentage(this.healthBar.percentage - 25)
                this.canonballAttacks.splice(this.canonballAttacks.indexOf(c), 1);
                return;
            }
        });
    }

    /**
     * This function checks for each of the collectables (gems, magicStones), if the character is colliding with one of them.
     * If so, the collectable disappears, a sound is played and the statusbar for this collectable is updated.
     */
    checkCollisionsCollectables() {
        this.level.collectableObjects.forEach((c) => {
            if (this.character.isColliding(c)) {
                if (c.type == "gem") {
                    let numberOfGems = this.level.collectableObjects.filter((c) => c.type == "gem").length - 1;
                    this.gemsBar.setPercentage(numberOfGems * 25);
                    audios.gem.play();
                    audios.gem.volume = 0.5 * audioVolume;
                    c.isAvailable = false;
                } else if (c.type == "magicStone" && this.attackBar.percentage < 100) {
                    this.attackBar.setPercentage(this.attackBar.percentage + 25);
                    audios.magicStone.play();
                    audios.magicStone.volume = audioVolume;
                    c.isAvailable = false;
                }
                this.level.collectableObjects = this.level.collectableObjects.filter(c => c.isAvailable);
            }
        })
    }

    /**
    * This function sets the enmies characterisNearby-variable to true, if the character is nearby and to false, if the charcter is not.
    * The charater is labeled as nearby, if its x-value is higher or lower by the attackArea of each Enemy. Furhermore, one of two conditions must be fullfilled:
    * The characters y-value is lower of the enemies y-value or the character is jumping.
    */
    checkCharacterNearbyEnemy() {
        this.level.enemies.forEach((e) => {
            if (e instanceof Frog) {
                if ((this.character.x >= e.x - e.attackArea
                    && this.character.x + this.character.width <= e.x + e.width + e.attackArea)
                    && (this.character.y <= e.y + e.height || this.character.isJumping)) {
                    return e.characterNearby = true;
                }
            }
            if (e instanceof Cactus) {
                if (this.character.x + this.character.width >= e.leftBorder
                    && this.character.x <= e.rightBorder) {
                    return e.characterNearby = true;
                }
            }
            e.characterNearby = false;
        });
    }

    /**
     * This function spawns a new swarm of passive entities every 20 seconds and a new sky every 230 seconds.
     * They only serve decoration purposes.
     */
    respawnScenery() {
        setInterval(() => {
            this.passiveEntities.push(new PassiveEntity(2800));
            this.passiveEntities.push(new PassiveEntity(2800));
            this.passiveEntities.push(new PassiveEntity(2800))
        }, 20000);
        setInterval(() => {
            this.level.sky.push(new Sky(2880));
        }, 230000);
    }

    /**
     * This function removes dead enemies (enemies with an energylevel of zero) from the map.
     */
    removeDeadEnemy() {
        this.level.enemies = this.level.enemies.filter(enemy => enemy.isAlive);
    }

    /**
    * This function is used to be able to shoot magicAttacks if an attack is available and the attackbar-percentage is above zero.
    * The magicAttackAvailable is set to false and the attackbar is updated.
    * The shootable object is created, it moves in the direction the character faces and the audio is played.
    * Eventually (after 0.8 seconds), the magicAttackAvailable is set back to true and the magicAttack disappears.
    */
    shootMagicAttack() {
        if (this.attackBar.percentage > 0 && this.magicAttackAvailable) {
            this.magicAttackAvailable = false;
            this.attackBar.setPercentage(this.attackBar.percentage - 25)
            this.availableMagicAttacks.push(new MagicAttack());
            setTimeout(() => {
                this.availableMagicAttacks.shift();
                this.magicAttackAvailable = true;
            }, 800);
        }
    }
}