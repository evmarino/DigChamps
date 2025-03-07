class Picking extends Phaser.Scene {
    constructor() {
        super("pickingScene");
    }
   
    create() {
        this.backgroundColor = this.add.rectangle(0, 0, 1400, 800, 0x98fffd).setOrigin(0, 0).setAlpha(1);
        this.backgroundArt = this.add.image(0, 0, 'pickPlayer').setOrigin(0, 0).setAlpha(1);

        this.cameras.main.setZoom(1);
        this.cameras.main.setBounds(0, 0, 1400, 800);

        // player sprite options
        this.blueshovel = this.add.image(this.scale.width / 2, this.scale.height / 2, 'shovel')
            .setOrigin(0.4, 0.5)
            .setScale(6)
            .setAlpha(0);

        this.redaxe = this.add.image(this.scale.width / 2, this.scale.height / 2, 'axe')
            .setOrigin(0.63, 0.5)
            .setScale(6)
            .setAlpha(0);

        // player selection hitboxes
        this.redbox = this.add.rectangle(this.scale.width / 2 + 110, this.scale.height / 2, 200, 400, 0xFF0000, 0.5)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        this.bluebox = this.add.rectangle(this.scale.width / 2 - 100, this.scale.height / 2, 200, 400, 0x003d80, 0.5)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        // instruction text
        this.playerSelect = this.add.text(this.scale.width / 2, this.scale.height - 100, 'PLAYER 1: SELECT YOUR PLAYER', {
            fontFamily: 'Joystix',
            fontSize: '32px',
            color: '#800080'
        }).setOrigin(0.5);

        // player selection 
        this.redbox.on('pointerdown', () => {
            console.log("Red Box Clicked! Fading out background & fading in Player Option 2.");
            this.fadeTransition(this.redaxe, "AXEBRO SELECTED", "#003d80", "axebro");
        });

        this.bluebox.on('pointerdown', () => {
            console.log("Blue Box Clicked! Fading out background & fading in Player Option 1.");
            this.fadeTransition(this.blueshovel, "SHOVELBRO SELECTED", "#FF0000", "shovelbro");
        });
    }

    fadeTransition(selectedPlayer, text, color, characterName) {
        this.playerSelect.setAlpha(0);

        console.log("Setting selected player:", characterName);
        this.registry.set('selectedPlayer', characterName);
        console.log("Stored selected player as:", this.registry.get('selectedPlayer'));

        this.tweens.add({
            targets: [this.backgroundArt],
            alpha: 0,
            duration: 500,
        });

        this.tweens.chain({
            targets: [this.redbox, this.bluebox],
            tweens: [
                {
                    x: this.scale.width / 2,
                    scaleX: 1.5,
                    fillColor: 0x800080,
                    duration: 500,
                    onComplete: () => {
                        console.log("Purple box created.");
                        this.purplebox = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 300, 400, 0x800080, 0.5)
                            .setOrigin(0.5, 0.5)
                            .setAlpha(1);
                    }
                },
                {
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        console.log("Purple box fading out...");
                        if (this.purplebox) {
                            this.purplebox.setAlpha(0);
                            this.purplebox.destroy();
                            this.purplebox = null;
                        }
                    }
                }
            ]
        });

        selectedPlayer.setAlpha(1);

        // player text
        this.time.delayedCall(1000, () => {
            console.log("Showing selected text...");
            let selectedText = this.add.text(this.scale.width / 2, this.scale.height - 100, text, {
                fontFamily: 'Joystix',
                fontSize: '32px',
                color: color
            }).setOrigin(0.5);

            selectedText.setDepth(1000);
            selectedText.setAlpha(1);
            selectedText.setVisible(true);

            // Fade out 
            this.time.delayedCall(1000, () => {
                console.log("Fading out screen before switching to PinkChamp...");
                this.cameras.main.fadeOut(800, 0, 0, 0);
            });

            // PinkChamp Scene before Endless Runner
            this.time.delayedCall(1800, () => {
                let storedCharacter = this.registry.get('selectedPlayer');
                this.scene.start("pinkChamp", { character: storedCharacter });
            });
        });
    }
}
