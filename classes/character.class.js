class Character extends MovableObject {
    y = 200;
    width = 35;
    height = 50;
    speed = 5;

    IMAGES_FALL = [
        'img/character/Fall.png'
    ]
    IMAGES_JUMP = [
        'img/character/Jump.png'
    ]
    IMAGES_RUN = [
        'img/character/Run/Run_01.png',
        'img/character/Run/Run_02.png',
        'img/character/Run/Run_03.png',
        'img/character/Run/Run_04.png',
        'img/character/Run/Run_05.png',
        'img/character/Run/Run_06.png',
        'img/character/Run/Run_07.png',
        'img/character/Run/Run_08.png',
        'img/character/Run/Run_09.png',
        'img/character/Run/Run_10.png',
        'img/character/Run/Run_11.png',
        'img/character/Run/Run_12.png',
    ];
    IMAGES_ATTACK = [
        'img/character/Hit/Hit_03.png',
        'img/character/Hit/Hit_04.png',
        'img/character/Hit/Hit_05.png',
        'img/character/Hit/Hit_06.png',
        'img/character/Hit/Hit_07.png',
    ];
    IMAGES_IDLE = [
        'img/character/Idle/Idle_01.png',
        'img/character/Idle/Idle_02.png',
        'img/character/Idle/Idle_03.png',
        'img/character/Idle/Idle_04.png',
        'img/character/Idle/Idle_05.png',
        'img/character/Idle/Idle_06.png',
        'img/character/Idle/Idle_07.png',
        'img/character/Idle/Idle_08.png',
        'img/character/Idle/Idle_09.png',
        'img/character/Idle/Idle_10.png',
        'img/character/Idle/Idle_11.png',
    ];
    IMAGES_HIT = [
        'img/character/Hit/Hit_01.png',
        'img/character/Hit/Hit_02.png',
        'img/character/Hit/Hit_03.png',
        'img/character/Hit/Hit_04.png',
        'img/character/Hit/Hit_05.png',
        'img/character/Hit/Hit_06.png',
        'img/character/Hit/Hit_07.png',
    ];
    IMAGES_DEAD = [
        'img/character/Dead/Disappearing_01.png',
        'img/character/Dead/Disappearing_02.png',
        'img/character/Dead/Disappearing_03.png',
        'img/character/Dead/Disappearing_04.png',
        'img/character/Dead/Disappearing_05.png',
        'img/character/Dead/Disappearing_06.png',
        'img/character/Dead/Disappearing_07.png',
        // 'img/character/Dead/Appearing_01.png',
        // 'img/character/Dead/Appearing_02.png',
        // 'img/character/Dead/Appearing_03.png',
        // 'img/character/Dead/Appearing_04.png',
        // 'img/character/Dead/Appearing_05.png',
        // 'img/character/Dead/Appearing_06.png',
        // 'img/character/Dead/Appearing_07.png',
    ];
    world;

    constructor() {
        super().loadImage("img/character/Fall.png");
        this.loadImages(this.IMAGES_FALL);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        //decrease/increase x-coordinate
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.moveRight();
                this.otherDirection = false;
            } else if (this.world.keyboard.LEFT && ((!this.world.firstBossContact && this.x > 0) || (this.world.firstBossContact && this.x > 1540))) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.speedY = 10;
            }

            if (!this.world.firstBossContact) {
                this.world.cameraX = -this.x + 100;
            }

        }, 1000 / 60);

        // animations(dead, hurt, jump, fall, run, attack, idle)
        let i = 0;
        setInterval(() => {
            if (this.isDead() && i < 6) {
                this.playAnimation(this.IMAGES_DEAD);
                i++
            } else if (this.isDead()) {
                i++
            } else if (this.isHurt && this.energy > 0) {
                this.playAnimation(this.IMAGES_HIT);
            }
            else if (this.isAboveGround()) {
                if (this.speedY > 0) {
                    this.playAnimation(this.IMAGES_JUMP);
                } else {
                    this.playAnimation(this.IMAGES_FALL);
                }
            } else if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMAGES_RUN);
            } else if (this.world.keyboard.ATTACK) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            else if (!(this.world.keyboard.LEFT && this.world.keyboard.RIGHT && this.world.keyboard.UP && this.world.keyboard.ATTACK)) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 10);
    }
}