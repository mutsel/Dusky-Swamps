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

    audios = {
        scenery: new Audio('audio/scenery.mp3'),
        steps: new Audio('audio/steps.mp3'),
        gem: new Audio('audio/gem.mp3'),
        magicStone: new Audio('audio/magic_stone.mp3'),
        magicAttack: new Audio('audio/magic_attack.mp3'),
        gameOver: new Audio('audio/game_over.mp3'),
        victory: new Audio('audio/victory.mp3'),
    };

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
        this.addObjectsToMap(this.level.gems);
        this.addObjectsToMap(this.level.magicStones);
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
            this.checkCollisionMagicAttacks();
            this.checkCollisionsCollectables();
            if (this.gameOver && !this.gameEndCalled) {
                gameOver();
                this.gameEndCalled = true;
                this.audios.scenery.pause();
            } else if (this.victory && !this.gameEndCalled) {
                victory();
                this.gameEndCalled = true;
                this.audios.scenery.pause();
            }
        }, 1000 / 60);

        this.respawnScenery();
        if (audioVolume > 0) {
            this.audios.scenery.play();
            this.audios.scenery.volume = audioVolume;
            this.audios.scenery.loop = true;
        }
    }

    /**
     * This function checks for each of the enemies if the character is jumping on top of them. If so, it executes the hit()-funciton for the enemie.
     * If not, if checks if the character is colliding with an enemie. If so, it executes the hit()-funciton for the character.
     */
    checkCollisionsEnemies() {
        this.level.enemies.forEach((e) => {
            if (this.character.isJumpingOnTop(e) && e.energy > 0) {
                e.hit(55);
                this.character.speedY = 12;
                if (e instanceof Cactus) {
                    this.character.hit(25);
                    this.healthBar.setPercentage(this.character.energy);
                }
            } else if (this.character.isColliding(e) && e.energy > 0) {
                this.character.hit(25);
                this.character.speedY = -1;
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * This function checks for each of the magic attacks in the availableMagicAttacks-array, if it colliding with an enemie.
     * If so, the hit()-function for the enemie is executed and the magicAttacks disappears.
     */
    checkCollisionMagicAttacks() {
        this.availableMagicAttacks.forEach((a) => {
            this.level.enemies.forEach((e) => {
                if (a.isColliding(e)) {
                    this.availableMagicAttacks.splice(this.availableMagicAttacks.indexOf(a), 1);
                    e.hit(55);
                    return;
                }
            });
        });

    }

    /**
     * This function checks for each of the collectables (gems, magicStones) seperately, if the character is colliding with one of them.
     * If so, the collectable disappears, a sound is played and the statusbar for this collectable is updated.
     */
    checkCollisionsCollectables() {
        this.level.gems.forEach((g) => {
            if (this.character.isColliding(g)) {
                this.level.gems.splice(this.level.gems.indexOf(g), 1);
                this.gemsBar.setPercentage(this.level.gems.length * 25);
                this.audios.gem.play();
                this.audios.gem.volume = 0.5 * audioVolume;
            }
        })

        this.level.magicStones.forEach((m) => {
            if (this.character.isColliding(m) && this.attackBar.percentage < 100) {
                this.level.magicStones.splice(this.level.magicStones.indexOf(m), 1);
                this.attackBar.setPercentage(this.attackBar.percentage + 25)
                this.audios.magicStone.play();
                this.audios.magicStone.volume = audioVolume;
            }
        })
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
     * This function is used for dead enemies (enemies with an energylevel of zero) to be removed from the map.
     */
    removeDeadEnemies() {
        this.level.enemies.forEach((e) => {
            if (e.energy == 0) {
                this.level.enemies.splice(this.level.enemies.indexOf(e), 1);
            }
        });
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

            if (this.character.otherDirection) {
                this.availableMagicAttacks.push(new MagicAttack(this.character.x, this.character.y, 12));
            } else {
                this.availableMagicAttacks.push(new MagicAttack(this.character.x, this.character.y, -12));
            }

            this.audios.magicAttack.play();
            this.audios.magicAttack.volume = 0.4 * audioVolume;

            setTimeout(() => {
                this.availableMagicAttacks.shift();
                this.magicAttackAvailable = true;
            }, 800);
        }
    }
}