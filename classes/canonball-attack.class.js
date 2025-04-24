class CanonballAttack extends ShootableObject {
    x;
    y;
    width = 20;
    height = 20;
    speed = 20;
    
    constructor(x, y) {
        super().loadImage('img/shootable-objects/magic-attack/Cannonball_01.png')
        this.x = x;
        this.y = y;
        this.shoot(this.x, this.y+10);
    } 
}