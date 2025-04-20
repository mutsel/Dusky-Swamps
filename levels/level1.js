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
       
        new BackgroundObject("img/scenery/Tile_02.png", -448, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", -384, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", -320, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", -256, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", -192, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", -128, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", -64, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 0, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 64, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 128, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 192, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 256, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 320, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 384, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 448, 380, 64, 64),
        new BackgroundObject("img/scenery/Tile_02.png", 512, 380, 64, 64),

        new BackgroundObject("img/scenery/Tile_12.png", -448, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", -384, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", -320, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", -256, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", -192, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", -128, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", -64, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 0, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 64, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 128, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 192, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 256, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 320, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 384, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 448, 444, 64, 64),
        new BackgroundObject("img/scenery/Tile_12.png", 512, 444, 64, 64),
    ],
    [
        new ForegroundObject(-720),
        new ForegroundObject(0),
        new ForegroundObject(720),
        new ForegroundObject(1440)
    ]);