const level1 = new Level(
    [
        new Cactus(),
        new Cactus(),
        new Endboss(),
    ],
    [
        new Sky(-720),
        new Sky(0),
        new Sky(720),
        new Sky(1440)
    ],
    [
        new BackgroundObject("img/scenery/swamp_trees_1.png", -720, -20, 720, 480),
        new BackgroundObject("img/scenery/swamp_water.png", -720, -20, 720, 480),

        new BackgroundObject("img/scenery/swamp_trees_1.png", 0, -20, 720, 480),
        new BackgroundObject("img/scenery/swamp_water.png", 0, -20, 720, 480),

        new BackgroundObject("img/scenery/swamp_trees_1.png", 720, -20, 720, 480),
        new BackgroundObject("img/scenery/swamp_water.png", 720, -20, 720, 480),

        new BackgroundObject("img/scenery/swamp_trees_1.png", 1440, -20, 720, 480),
        new BackgroundObject("img/scenery/swamp_water.png", 1440, -20, 720, 480),

        new BackgroundObject("img/scenery/Ground.png", -448, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", -384, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", -320, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", -256, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", -192, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", -128, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", -64, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 0, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 64, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 128, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 192, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 256, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 320, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 384, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 448, 380, 64, 128),
        new BackgroundObject("img/scenery/Ground.png", 512, 380, 64, 128),
    ],
    [
        new Gem(280, 350),
        new Gem(420, 230),
        new Gem(800, 350),
        new Gem(1000, 350)
    ],
    [
        new ForegroundObject(-720),
        new ForegroundObject(0),
        new ForegroundObject(720),
        new ForegroundObject(1440)
    ]);