class CanonballAttack extends ShootableObject {
    x;
    y;
    width = 20;
    height = 20;
    speed = 10;

    audio = new Audio('audio/canonball.mp3')
    
    constructor(x, y) {
        super().loadImage('img/shootable_objects/cannonball_01.png')
        this.x = x;
        this.y = y;
        this.shoot();
        this.applyGravity();
    } 
} 