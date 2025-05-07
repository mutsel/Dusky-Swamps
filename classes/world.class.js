class World {
    character = new Character();
    healthBar = new HealthBar();
    attackBar = new AttackBar();
    gemsBar = new GemsBar();
    availableMagicAttacks = [];
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
    };

    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    firstBossContact = false;
    gameOver = false;
    victory = false;
    magicAttackAvailable = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.world = this;
        this.level.enemies[this.level.enemies.length - 1].world = this;
    }

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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisionsEnemies();
            this.checkCollisionsCollectables();
            this.checkCollisionMagicAttacks();
        }, 1000 / 60);

        this.respawnScenery();
        this.audios.scenery.play();
        this.audios.scenery.loop = true;
    }

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
            this.audios.magicAttack.volume = 0.4;

            setTimeout(() => {
                this.availableMagicAttacks.shift();
                this.magicAttackAvailable = true;
            }, 800);
        }
    }

    checkCollisionsEnemies() {
        this.level.enemies.forEach((e) => {
            if (this.character.isJumpingOnTop(e)) {
                e.hit(55);
                // if (e instanceof Endboss) {
                this.character.speedY = 12;
                // this.keyboard.LEFT = true;
                // this.keyboard.RIGHT = false;
                // setTimeout(() => {
                //     this.keyboard.LEFT = false;
                // }, 500);
                // } else {
                //     this.character.speedY = 8;
                // }
            } else if (this.character.isColliding(e)) {
                this.character.hit(25);
                this.character.speedY = -1;
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionMagicAttacks() {
        this.availableMagicAttacks.forEach((a) => {
            this.level.enemies.forEach((e) => {
                if (a.isColliding(e)) {
                    console.log(a)
                    this.availableMagicAttacks.splice(this.availableMagicAttacks.indexOf(a), 1);
                    e.hit(55);
                    return;
                }
            });
        });

    }

    removeDeadEnemies() {
        this.level.enemies.forEach((e) => {
            if (e.energy == 0) {
                this.level.enemies.splice(this.level.enemies.indexOf(e), 1);
            }
        });
    }

    checkCollisionsCollectables() {
        this.level.gems.forEach((g) => {
            if (this.character.isColliding(g)) {
                this.level.gems.splice(this.level.gems.indexOf(g), 1);
                this.gemsBar.setPercentage(this.level.gems.length * 25);
                this.audios.gem.play();
                this.audios.gem.volume = 0.5;
            }
        })

        this.level.magicStones.forEach((m) => {
            if (this.character.isColliding(m) && this.attackBar.percentage < 100) {
                this.level.magicStones.splice(this.level.magicStones.indexOf(m), 1);
                this.attackBar.setPercentage(this.attackBar.percentage + 25)
                this.audios.magicStone.play();
            }
        })
    }

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
}