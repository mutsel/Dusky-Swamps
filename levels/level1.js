// let level1;

// function initLevel() {}
    
let level1 = new Level(
        [
            new Cactus(),
            new Cactus(),
            new Endboss(),
        ],
        [
            new Sky(-720),
            new Sky(0),
            new Sky(720),
            new Sky(1440),
            new Sky(2160)
        ],
        [
            new BackgroundObject("trees", -720, -20),
            new BackgroundObject("water", -720, -20),

            new BackgroundObject("trees", 0, -20),
            new BackgroundObject("water", 0, -20),

            new BackgroundObject("trees", 720, -20),
            new BackgroundObject("water", 720, -20),

            new BackgroundObject("trees", 1440, -20),
            new BackgroundObject("water", 1440, -20),

            new BackgroundObject("trees", 2160, -20),
            new BackgroundObject("water", 2160, -20),

            new BackgroundObject("ground", -448, 380),
            new BackgroundObject("ground", -384, 380),
            new BackgroundObject("ground", -320, 380),
            new BackgroundObject("ground", -256, 380),
            new BackgroundObject("ground", -192, 380),
            new BackgroundObject("ground", -128, 380),
            new BackgroundObject("ground", -64, 380),
            new BackgroundObject("ground", 0, 380),
            new BackgroundObject("ground", 64, 380),
            new BackgroundObject("ground", 128, 380),
            new BackgroundObject("ground", 192, 380),
            new BackgroundObject("ground", 256, 380),
            new BackgroundObject("ground", 320, 380),
            new BackgroundObject("ground", 384, 380),
            new BackgroundObject("ground", 448, 380),
            new BackgroundObject("ground", 512, 380),
            new BackgroundObject("ground", 576, 380),
            new BackgroundObject("ground", 640, 380),
            new BackgroundObject("ground", 704, 380),
            new BackgroundObject("ground", 768, 380),
            new BackgroundObject("ground", 832, 380),
            new BackgroundObject("ground", 896, 380),
            new BackgroundObject("ground", 960, 380),
            new BackgroundObject("ground", 1024, 380),
            new BackgroundObject("ground", 1088, 380),
            new BackgroundObject("ground", 1152, 380),
            new BackgroundObject("ground", 1216, 380),
            new BackgroundObject("ground", 1280, 380),
            new BackgroundObject("ground", 1344, 380),
            new BackgroundObject("ground", 1408, 380),
            new BackgroundObject("ground", 1472, 380),
            new BackgroundObject("ground", 1536, 380),
            new BackgroundObject("ground", 1600, 380),
            new BackgroundObject("ground", 1664, 380),
            new BackgroundObject("ground", 1728, 380),
            new BackgroundObject("ground", 1792, 380),
            new BackgroundObject("ground", 1856, 380),
            new BackgroundObject("ground", 1920, 380),
            new BackgroundObject("ground", 1984, 380),
            new BackgroundObject("ground", 2048, 380),
            new BackgroundObject("ground", 2112, 380),
            new BackgroundObject("ground", 2176, 380),
        ],
        [
            new Decoration("img/scenery/decoration/Dead_Tree_03.png", 250, 300, -80),
            new Decoration("img/scenery/decoration/Bush_01.png", 100, 50, -60),
            new Decoration("img/scenery/decoration/Sign.png", 40, 40, 120),
            new Decoration("img/scenery/decoration/Grass_02.png", 25, 25, 200),
            new Decoration("img/scenery/decoration/Stump_01.png", 120, 60, 500),
            new Decoration("img/scenery/decoration/Tree_01.png", 250, 300, 560),
            new Decoration("img/scenery/decoration/Bush_02.png", 90, 40, 600),
            new Decoration("img/scenery/decoration/Grass_04.png", 25, 25, 900),
            new Decoration("img/scenery/decoration/Dead_Tree_01.png", 150, 200, 900),
            new Decoration("img/scenery/decoration/Tree_02.png", 280, 320, 1050),
            new Decoration("img/scenery/decoration/Stump_02.png", 80, 50, 1200),
            new Decoration("img/scenery/decoration/Grass_01.png", 25, 25, 1300),
            new Decoration("img/scenery/decoration/Tree_03.png", 320, 380, 1400),
            new Decoration("img/scenery/decoration/Bush_03.png", 100, 50, 1700),
            new Decoration("img/scenery/decoration/Dead_Tree_02.png", 200, 250, 1800),
            new Decoration("img/scenery/decoration/Grass_03.png", 25, 25, 1950),
        ],
        [
            new CollactableObject(280, 350),
            new CollactableObject(420, 230),
            new CollactableObject(800, 350),
            new CollactableObject(1000, 350)
        ],
        [
            new ForegroundObject(-720),
            new ForegroundObject(0),
            new ForegroundObject(720),
            new ForegroundObject(1440),
            new ForegroundObject(2160),
            new ForegroundObject(2880)
        ]);
 