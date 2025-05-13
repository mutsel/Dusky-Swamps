class HealthBar extends StatusBar {
    x = 20;
    y = 20;

    IMAGES = [
        'img/gui/statusbars/health/health_100.png',
        'img/gui/statusbars/health/health_75.png',
        'img/gui/statusbars/health/health_50.png',
        'img/gui/statusbars/health/health_25.png',
        'img/gui/statusbars/health/health_0.png',
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}