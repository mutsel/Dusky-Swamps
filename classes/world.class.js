class World {
    intervals = [];
    character = new Character();
    healthBar = new HealthBar();
    attackBar = new AttackBar();
    gemsBar = new GemsBar();
    endbossHealthbar = new EndbossHealthBar();
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
    bossFightStarted = false;
    gameOver = false;
    victory = false;
    gameEndCalled = false;
    gamePaused = false;

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
        this.healthBar.world = this;
        this.attackBar.world = this;
        this.gemsBar.world = this;
    }

    /**
     * This function adds every necessary movable object to the map.
     * Beforehand, the canvas is cleared and the camera is positioned.
     * Static objects are drawn afterwards to be visible the whole time.
     * This function is repeated permanently.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.drawFlexibleObjects();
        this.drawFixedObjects();
        this.ctx.translate(-this.cameraX, 0);
        this.repeatDrawing();
    }

    /**
     * This function adds all flexible/moving objects to the canvas.
     */
    drawFlexibleObjects() {
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
        this.addObjectsToMap(this.level.foregroundObjects);
    }

    /**
     * This function adds all fixed/static objects to the canvas.
     * Therefore, the context needs to be adjusted beforehand and afterwards.
     */
    drawFixedObjects() {
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.attackBar);
        this.addToMap(this.gemsBar);
        if (this.bossFightStarted) {
            this.addToMap(this.endbossHealthbar);
        }
        this.ctx.translate(this.cameraX, 0);
    }

    /**
     * This function executes the callback-function.
     */
    repeatDrawing() {
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
     * This function sets an interval-function and pushes it in the worlds interval-array.
     * 
     * @param {function} fn - the function, that should be called
     * @param {number} time - the execution interval in milliseconds
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervals.push(id);
    }

    /**
     * This function stops the game by clearing all intervals.
     */
    stopGame() {
        // console.log(this.intervals);
        this.intervals.forEach(clearInterval);
    }

    /**
     * This function runs the game. It executes the checkCollision-functions, checks if the game ends and is used for the scenery.
     */
    run() {
        // if (!this.gamePaused) {
        this.setStoppableInterval(this.respawnPassiveEntities, 20000);
        this.setStoppableInterval(this.checkRespawnSky, 1000 / 60);
        this.setStoppableInterval(this.checkCollisionsEnemies, 1000 / 60);
        this.setStoppableInterval(this.checkCollisionShootableObjects, 1000 / 60);
        this.setStoppableInterval(this.checkCollisionsCollectables, 1000 / 60);
        this.setStoppableInterval(this.checkCharacterNearbyEnemy, 1000 / 60);
        this.setStoppableInterval(this.checkGameEnd, 1000 / 60);
        // }
    }

    /**
     * This function checks if the game did not already ended and if victory or gameOver are set to true.
     * If so, it executes the according function.
     */
    checkGameEnd() {
        if (!this.gamePaused) {
            if (this.gameOver && !this.gameEndCalled) {
                gameOver();
                this.gameEndCalled = true;
                adjustLoopSounds();
            } else if (this.victory && !this.gameEndCalled) {
                victory();
                this.gameEndCalled = true;
                adjustLoopSounds();
            };
        }
    }

    /**
     * This function checks for each of the enemies if the character is jumping on top of them. If so, it executes the hit()-funciton for the enemie.
     * If not, if checks if the character is colliding with an enemie. If so, it executes the hit()-funciton for the character.
     */
    checkCollisionsEnemies() {
        if (!this.gamePaused) {
            this.level.enemies.forEach((e) => {
                if (this.character.isJumpingOnTop(e) && e.energy > 0) {
                    this.characterJumpsOnEnemy(e)
                } else if (this.character.isColliding(e) && e.energy > 0) {
                    this.characterCollidesWithEnemy();
                }
            });
        }
    }

    /**
     * This function is used, when the character jumps on top of an enemy.
     * The enemy suffers damage and the character bounces back.
     * If the enemy is a cactus, the character also suffers damage.
     * If the enemy is the endboss, the endboss healthbar is adjusted.
     * 
     * @param {Object} e - an enemy
     */
    characterJumpsOnEnemy(e) {
        e.hit(50);
        this.character.speedY = 12;
        playAudio("enemyHurtJump");
        if (e instanceof Cactus) {
            this.character.hit(25);
            this.healthBar.setPercentage(this.character.energy);
        }
        if (e instanceof Endboss) {
            this.endbossHealthbar.setPercentageEndboss(e.energy / 2.5);
        }
    }

    /**
     * This function is used, when the character collides with an enemy.
     * The character suffers damage and its speed is reduced.
     */
    characterCollidesWithEnemy() {
        this.character.hit(25);
        this.character.speedY = -1;
        this.healthBar.setPercentage(this.character.energy);
    }

    /**
     * This function checks for each of the magic attacks in the availableMagicAttacks-array, if it is colliding with an enemy.
     * If so, the according function is executed.
     */
    checkCollisionShootableObjects() {
        if (!this.gamePaused) {
            this.availableMagicAttacks.forEach((a) => {
                this.level.enemies.forEach((e) => {
                    if (a.isColliding(e) && e.energy > 0) {
                        this.magicAttackHitEnemy(a, e);
                    }
                });
            });
            this.canonballAttacks.forEach((c) => {
                if (c.isColliding(this.character)) {
                    this.canonballAttackHitCharacter(c);
                }
            });
        }
    }

    /**
     * This function is used, when a magic attack hits an enemy.
     * The enemy suffers damage and the magic attack is removed.
     * 
     * @param {Object} a - a magic attack
     * @param {Object} e - en enemy
     */
    magicAttackHitEnemy(a, e) {
        e.hit(50);
        playAudio("enemyHurtAttack");
        if (e instanceof Endboss) {
            this.endbossHealthbar.setPercentageEndboss(e.energy / 2.5);
        }
        setTimeout(() => {
            this.availableMagicAttacks.splice(this.availableMagicAttacks.indexOf(a), 1);
        }, 20);
    }

    /**
     * This function is used, when a canonball attack hits the character.
     * The character suffers damage and the canonball attack is removed.
     * 
     * @param {Object} c - a canonball attack
     */
    canonballAttackHitCharacter(c) {
        this.character.hit(25);
        this.healthBar.setPercentage(this.healthBar.percentage - 25)
        this.canonballAttacks.splice(this.canonballAttacks.indexOf(c), 1);
    }

    /**
     * This function checks for each of the collectables (gems, magicStones), if the character is colliding with one of them.
     * If so, the according function is executed.
     */
    checkCollisionsCollectables() {
        if (!this.gamePaused) {
            this.level.collectableObjects.forEach((c) => {
                if (this.character.isColliding(c)) {
                    if (c.type == "gem") {
                        this.gemsBar.characterCollectsGem(c)
                    } else if (c.type == "magicStone" && this.attackBar.percentage < 100) {
                        this.attackBar.characterCollectsMagicStone(c)
                    }
                    this.level.collectableObjects = this.level.collectableObjects.filter(c => c.isAvailable);
                }
            });
        }
    }

    /**
    * This function sets characterNearby to true, if the character is nearby an enemy.
    * After that, this value is set back to false.
    */
    checkCharacterNearbyEnemy() {
        if (!this.gamePaused) {
            this.level.enemies.forEach((e) => {
                if (e instanceof Frog) {
                    if (this.characterIsNearbyFrog(e)) {
                        return e.characterNearby = true;
                    }
                }
                if (e instanceof Cactus) {
                    if (this.characterIsNearbyCactus(e)) {
                        return e.characterNearby = true;
                    }
                }
                e.characterNearby = false;
                e.characterNoticed = false;
            });
        }
    }

    /**
     * This function returns true, if the character is within the attack-area of a frog and if one of the following two conditions is fullfilled:
     * The character is above the frog or the character is jumping.
     * 
     * @param {Object} e - an enemy of the type Frog
     */
    characterIsNearbyFrog(e) {
        return (this.character.x >= e.x - e.attackArea
            && this.character.x + this.character.width <= e.x + e.width + e.attackArea)
            && (this.character.y <= e.y + e.height || this.character.isJumping);
    }

    /**
     * This function returns true, if the character is within the attack-area of a cactus.
     * 
     * @param {Object} e - an enemy of the type Cactus
     */
    characterIsNearbyCactus(e) {
        return this.character.x + this.character.width >= e.leftBorder
            && this.character.x <= e.rightBorder;
    }

    /**
    * This function spawns a new swarm of passive entities every 20 seconds.
    * They only serve decoration purposes.
    */
    respawnPassiveEntities() {
        if (!this.gamePaused) {
            this.passiveEntities.push(new PassiveEntity(2800));
            this.passiveEntities.push(new PassiveEntity(2800));
            this.passiveEntities.push(new PassiveEntity(2800));
        }
    }

    /**
    * This function checks, if the previous sky-img has exceeded the x-value of 2900.
    * If so, a new sky-img is created.
    */
    checkRespawnSky() {
        if (!this.gamePaused) {
            let lastSkyImg = this.level.sky[this.level.sky.length - 1];
            if (lastSkyImg.x + lastSkyImg.width <= 2900) {
                this.level.sky.push(new Sky(lastSkyImg.x + 700));
            }
        }
    }

    /**
     * This function removes dead enemies (enemies with an energylevel of zero) from the map.
     */
    removeDeadEnemy() {
        this.level.enemies = this.level.enemies.filter(enemy => enemy.isAlive);
    }
}