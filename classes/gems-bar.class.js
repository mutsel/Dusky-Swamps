class GemsBar extends StatusBar {
    x = 18;
    y = 70;
    world;

    IMAGES = [
        'img/gui/statusbars/gems/gems_0.png',
        'img/gui/statusbars/gems/gems_25.png',
        'img/gui/statusbars/gems/gems_50.png',
        'img/gui/statusbars/gems/gems_75.png',
        'img/gui/statusbars/gems/gems_100.png',
    ];

    constructor() {
        super();
        this.loadImages();
        this.setPercentage(100);
    }

    /**
     * This function is used, when the player collects a gem.
     * The gems-bar is updated and the gem is no longer available.
     * 
     * @param {Object} c - a collectable object
     */
    characterCollectsGem(c) {
        let numberOfGems = this.world.level.collectableObjects.filter((c) => c.type == "gem").length - 1;
        this.setPercentage(numberOfGems * 25);
        playAudio("gem");
        c.isAvailable = false;
    }
} 