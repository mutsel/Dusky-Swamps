class World {
    character = new Character();
    healthBar = new HealthBar();
    attackBar = new AttackBar();
    gemsBar = new GemsBar();
    // icon = {
    //     x:100, y:100, width:100, height:100, img:'img/GUI/Gems.png'
    // }
    // gemsIcon = new Image(this.x= 100, this.y=100, this.width= 100, this.height=100, this.img = 'img/GUI/Gems.png');
    // this.gemsIcon.src = 'img/GUI/Gems.png';
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
        // console.log(this.gemsBar);
        // console.log(this.icon);
        // console.log(this.ctx); 
    }

    setWorld() {
        this.character.world = this;
        this.level.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.sky);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.gems);
        this.addToMap(this.character);

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

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((e) => {
                if (this.character.isColliding(e)) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            });
            this.level.gems.forEach((g) => {
                if (this.character.isColliding(g)) {
                    this.level.gems.splice(this.level.gems.indexOf(g), 1);
                    this.gemsBar.setPercentage((this.level.gems.length)/4*100);
                }
            })
        }, 100);
    }
}