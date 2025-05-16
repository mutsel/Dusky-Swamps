class MagicAttack extends ShootableObject {
    x;
    y;
    width = 50;
    height = 40;
    speed;

    IMAGES = [
        'img/shootable_objects/magic_attack/magic_attack_01.png',
        'img/shootable_objects/magic_attack/magic_attack_02.png',
        'img/shootable_objects/magic_attack/magic_attack_03.png',
        'img/shootable_objects/magic_attack/magic_attack_04.png',
        'img/shootable_objects/magic_attack/magic_attack_05.png',
        'img/shootable_objects/magic_attack/magic_attack_06.png',
        'img/shootable_objects/magic_attack/magic_attack_07.png', 
        'img/shootable_objects/magic_attack/magic_attack_08.png',
        'img/shootable_objects/magic_attack/magic_attack_09.png',
        'img/shootable_objects/magic_attack/magic_attack_10.png',
    ]

    constructor(x, y, speed) {
        super().loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y + 10;
        this.speed = speed;
        this.shoot();
    }
} 