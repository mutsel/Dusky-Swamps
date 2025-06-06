class CanonballAttack extends ShootableObject {
    x;
    y;
    width = 20;
    height = 20;
    endboss = world.level.enemies[world.level.enemies.length - 1];
    imagePath = './img/shootable_objects/cannonball.png';

    constructor() {
        super().loadImage(this.imagePath)
        this.x = this.setX();
        this.y = this.endboss.y + 15;
        this.speed = this.setSpeed(this.endboss, -10);
        playAudio("canonballAttack");
    }

    /**
    * This function returns the canonballAttacks x-value, depending on the endboss position.
    */
    setX() {
        if (this.endboss.otherDirection) {
            return this.endboss.x + this.endboss.width - this.width;
        }
        return this.endboss.x;
    }
}  