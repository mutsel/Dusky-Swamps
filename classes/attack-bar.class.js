class AttackBar extends StatusBar {
    x = 20;
    y = 45;
    world;

    IMAGES = [
        'img/gui/statusbars/attack/attack_100.png',
        'img/gui/statusbars/attack/attack_75.png',
        'img/gui/statusbars/attack/attack_50.png',
        'img/gui/statusbars/attack/attack_25.png',
        'img/gui/statusbars/attack/attack_0.png',
    ];

    constructor() {
        super();
        this.loadImages();
        this.setPercentage(100);
    }

    /**
     * This function is used, when the player collects a magic stone.
     * The attack-bar is updated and the magic stone is no longer available.
     * 
     * @param {Object} c - a collectable object
     */
    characterCollectsMagicStone(c) {
        this.setPercentage(this.percentage + 25);
        playAudio("magicStone");
        c.isAvailable = false;
    }

    /**
    * This function is used to be able to shoot magicAttacks if an attack is available and the attackbar-percentage is above zero.
    * The magicAttackAvailable is set to false and the attackbar is updated.
    * The shootable object is created, it moves in the direction the character faces and the audio is played.
    * Eventually (after 0.8 seconds), the magicAttackAvailable is set back to true and the magicAttack disappears.
    */
    shootMagicAttack() {
        if (this.percentage > 0 && this.world.magicAttackAvailable) {
            this.world.magicAttackAvailable = false;
            this.setPercentage(this.percentage - 25)
            let newMagicAttack = new MagicAttack();
            this.world.availableMagicAttacks.push(newMagicAttack);
            this.world.setStoppableInterval(newMagicAttack.animateImages, 1000 / 60, newMagicAttack);
            this.world.setStoppableInterval(newMagicAttack.animateMovement, 1000 / 60, newMagicAttack);
            this.removeMagicAttack();
        }
    }

    removeMagicAttack() {
        setTimeout(() => {
            this.world.availableMagicAttacks.shift();
            this.world.magicAttackAvailable = true;
        }, 600);
    }
} 