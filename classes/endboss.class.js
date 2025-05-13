class Endboss extends MovableObject {
    width = 80;
    height = 80;
    y = 0 - this.height;
    speed = 6;
    energy = 250;
    world;

    IMAGES_ATTACK = [
        'img/enemies/endboss/Attack/Attack_01.png',
        'img/enemies/endboss/Attack/Attack_02.png',
        'img/enemies/endboss/Attack/Attack_03.png',
        'img/enemies/endboss/Attack/Attack_04.png',
        'img/enemies/endboss/Attack/Attack_05.png',
        'img/enemies/endboss/Attack/Attack_06.png',
        'img/enemies/endboss/Attack/Attack_07.png',
    ];

    IMAGES_DEAD = [
        'img/enemies/endboss/Hit/Hit_05.png',
        'img/enemies/endboss/Hit/Hit_04.png',
        'img/enemies/endboss/Hit/Hit_03.png',
        'img/enemies/endboss/Hit/Hit_02.png',
        'img/enemies/endboss/Hit/Hit_01.png',
        'img/dead_animation_universal/disappearing_01.png',
        'img/dead_animation_universal/disappearing_02.png',
        'img/dead_animation_universal/disappearing_03.png',
        'img/dead_animation_universal/disappearing_04.png',
        'img/dead_animation_universal/disappearing_05.png',
        'img/dead_animation_universal/dead.png',
    ];

    IMAGES_HIT = [
        'img/enemies/endboss/Hit/Hit_01.png',
        'img/enemies/endboss/Hit/Hit_02.png',
        'img/enemies/endboss/Hit/Hit_03.png',
        'img/enemies/endboss/Hit/Hit_04.png',
        'img/enemies/endboss/Hit/Hit_05.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/endboss/Idle/Idle_01.png',
        'img/enemies/endboss/Idle/Idle_02.png',
        'img/enemies/endboss/Idle/Idle_03.png',
        'img/enemies/endboss/Idle/Idle_04.png',
        'img/enemies/endboss/Idle/Idle_05.png',
        'img/enemies/endboss/Idle/Idle_06.png',
        'img/enemies/endboss/Idle/Idle_07.png',
        'img/enemies/endboss/Idle/Idle_08.png',
        'img/enemies/endboss/Idle/Idle_09.png',
        'img/enemies/endboss/Idle/Idle_10.png',
        'img/enemies/endboss/Idle/Idle_11.png',
    ];

    IMAGES_RUN = [
        'img/enemies/endboss/Run/Walk_01.png',
        'img/enemies/endboss/Run/Walk_02.png',
        'img/enemies/endboss/Run/Walk_03.png',
        'img/enemies/endboss/Run/Walk_04.png',
        'img/enemies/endboss/Run/Walk_05.png',
        'img/enemies/endboss/Run/Walk_06.png',
        'img/enemies/endboss/Run/Walk_07.png',
        'img/enemies/endboss/Run/Walk_08.png',
        'img/enemies/endboss/Run/Walk_09.png',
        'img/enemies/endboss/Run/Walk_10.png',
        'img/enemies/endboss/Run/Walk_11.png',
        'img/enemies/endboss/Run/Walk_12.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_RUN);
        this.x = 2350;
        this.animate();
        this.applyGravity();
    }

    /**
    * This function is used to animate the movable Object (intro, movement and animation)
    */
    animate() {
        let i = 0;
        let j = 0;
        setInterval(() => {
            if (i < 24) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_RUN);
            } else if (i < 31) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                if (this.isDead() && j < 10) {
                    this.playAnimation(this.IMAGES_DEAD);
                    j++
                } else if (this.isDead()) {
                    this.loadImage('img/dead_animation_universal/dead.png');
                    this.world.removeDeadEnemies();
                    this.world.victory = true;
                } else if (this.isHurt) {
                    this.playAnimation(this.IMAGES_HIT);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
            i++

            if (this.world.character.x > 1620 && !this.world.firstBossContact) {
                i = 0;
                this.world.firstBossContact = true;
            }
        }, 1000 / 12);
    }
}