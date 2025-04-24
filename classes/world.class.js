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
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    firstBossContact = false;

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
            this.checkCollisions();
            this.checkShootableObjects();
        }, 100);
        this.respawnScenery();
    }

    //for enemies and gems
    checkCollisions() {
        this.level.enemies.forEach((e) => {
            if (this.character.isColliding(e)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });

        this.level.gems.forEach((g) => {
            if (this.character.isColliding(g)) {
                let i = this.level.gems.indexOf(g);
                this.level.gems.splice(i, 1);
                this.gemsBar.setPercentage(this.level.gems.length * 25);
            }
        })

        this.level.magicStones.forEach((m) => {
            if (this.character.isColliding(m) && this.availableMagicAttacks.length !== 0) {
                let i = this.level.magicStones.indexOf(m);
                this.level.magicStones.splice(i, 1);
                this.availableMagicAttacks.splice(0, 1);
                this.attackBar.setPercentage(this.availableMagicAttacks.length / 4 * 100);

            }
        })
    }

    checkShootableObjects() {
        if (this.keyboard.ATTACK && this.availableMagicAttacks.length < 4) {
            this.availableMagicAttacks.push(new MagicAttack(this.character.x, this.character.y));
            this.attackBar.setPercentage(this.availableMagicAttacks.length / 4 * 100);
        }
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