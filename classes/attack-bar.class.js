class AttackBar extends StatusBar {
    x = 20;
    y = 45;

    IMAGES = [
        'img/GUI/statusbars/Attack_100.png',
        'img/GUI/statusbars/Attack_75.png',
        'img/GUI/statusbars/Attack_50.png', 
        'img/GUI/statusbars/Attack_25.png',
        'img/GUI/statusbars/Attack_0.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}