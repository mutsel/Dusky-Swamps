class AttackBar extends StatusBar {
    x = 20;
    y = 40;

    IMAGES = [
        'img/GUI/statusbars/Attack_0.png',
        'img/GUI/statusbars/Attack_25.png',
        'img/GUI/statusbars/Attack_50.png', 
        'img/GUI/statusbars/Attack_75.png',
        'img/GUI/statusbars/Attack_100.png',
    ];

    // icon = 'img/GUI/Attack.png';

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        // this.loadImage(this.icon);
        this.setPercentage(0);
    }
}