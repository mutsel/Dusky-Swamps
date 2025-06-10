class MagicAttack extends ShootableObject {
    x;
    y;
    width = 50;
    height = 40;
    speed;
    character = world.character;

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

    constructor() {
        super().loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES);
        this.x = this.character.x;
        this.y = this.character.y + 10;
        this.speed = this.setSpeed(this.character, 8);
        this.otherDirection = this.character.otherDirection;
        playAudio("magicAttack");
    }

    /**
    * This function is used to animate the magic attack.
    */
    animateImages() {
        if (!world.gamePaused) {
            this.playAnimation(this.IMAGES);
        }
    }
} 