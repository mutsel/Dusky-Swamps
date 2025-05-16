class CanonballAttack extends ShootableObject {
    x;
    y;
    width = 20;
    height = 20;

    audio = new Audio('audio/canonball.mp3')

    constructor(x, y, speed) {
        super().loadImage('./img/shootable_objects/cannonball.png')
        this.x = x;
        this.y = y + 15;
        this.speed = speed;
        this.shoot();
    }
}  