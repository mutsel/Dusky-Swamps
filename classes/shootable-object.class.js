class shootableObject extends MovableObject {
    width = 50;
    height = 40;
    speedX = 20;

    IMAGES_MAGIC_ATTACK = [
        'img/shootable-objects/magic-attack/MagicAttack_01.png',
        'img/shootable-objects/magic-attack/MagicAttack_02.png',
        'img/shootable-objects/magic-attack/MagicAttack_03.png',
        'img/shootable-objects/magic-attack/MagicAttack_04.png',
        'img/shootable-objects/magic-attack/MagicAttack_05.png',
        'img/shootable-objects/magic-attack/MagicAttack_06.png',
        'img/shootable-objects/magic-attack/MagicAttack_07.png',
        'img/shootable-objects/magic-attack/MagicAttack_08.png',
        'img/shootable-objects/magic-attack/MagicAttack_09.png',
        'img/shootable-objects/magic-attack/MagicAttack_10.png'
    ]

    constructor(x, y) {
        super().loadImage(this.IMAGES_MAGIC_ATTACK[0])
        this.loadImages(this.IMAGES_MAGIC_ATTACK);
        this.x = x;
        this.y = y;
        this.shoot(x, y+10)
    }

    shoot(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 12; 
        setInterval(() => {
            this.x += 10;
        }, 1000 / 60);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MAGIC_ATTACK);
        }, 1000 / 20)
    }
}