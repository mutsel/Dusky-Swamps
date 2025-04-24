class CanonballAttack extends ShootableObject {
    width = 20;
    height = 20;
    speedX = 20;

    constructor(x, y) {
        super().loadImage('img/shootable-objects/magic-attack/Cannonball_01.png')
        this.x = x;
        this.y = y;
        this.shoot(x, y+10);
    }
}