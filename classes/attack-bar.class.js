class AttackBar extends StatusBar {
    x = 20;
    y = 40;

    IMAGES = [
        'img/GUI/Attack_100.png',
        'img/GUI/Attack_75.png',
        'img/GUI/Attack_50.png',
        'img/GUI/Attack_25.png',
        'img/GUI/Attack_0.png',
    ];

    icon = 'img/GUI/Attack.png';

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.icon);
        this.setPercentage(100);
    }
}