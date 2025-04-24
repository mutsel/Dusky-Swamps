class MagicAttack extends ShootableObject {
    x;
    y;
    width = 50;
    height = 40;
    speed = 20;

    IMAGES = [
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
        super().loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.shoot(this.x, this.y+10);
    }
}