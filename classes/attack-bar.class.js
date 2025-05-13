class AttackBar extends StatusBar {
    x = 20;
    y = 45;

    IMAGES = [
        'img/gui/statusbars/attack/attack_100.png',
        'img/gui/statusbars/attack/attack_75.png',
        'img/gui/statusbars/attack/attack_50.png', 
        'img/gui/statusbars/attack/attack_25.png',
        'img/gui/statusbars/attack/attack_0.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}