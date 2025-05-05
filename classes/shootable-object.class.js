class ShootableObject extends MovableObject {
    x;
    y;
    speed;
    audio;

    constructor(x, y, speed, audio) {
        super();
        this.x = x; 
        this.y = y;
        this.speed = speed;
        this.audio = audio;
    }

    shoot() {
        setInterval(() => {
            this.x -= this.speed;
            this.otherDirection = true;
        }, 1000 / 60);
        this.audio.play();
        if (this instanceof MagicAttack) {
            this.animate();
        }
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000 / 20)
    }
}