class HealthBar extends StatusBar {
    x = 20;
    y = 20;

    IMAGES = [
        'img/GUI/statusbars/Health_100.png',
        'img/GUI/statusbars/Health_75.png',
        'img/GUI/statusbars/Health_50.png',
        'img/GUI/statusbars/Health_25.png',
        'img/GUI/statusbars/Health_0.png',
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}