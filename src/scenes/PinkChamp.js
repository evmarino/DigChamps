class PinkChamp extends Phaser.Scene {
    constructor() {
        super("pinkChamp");
    }

    create() {
        
        this.pinkBack = this.add.image(0, 0, 'pink').setOrigin(0, 0);
       
        // pink rectangle 
        const pinkOverlay = this.add.rectangle(0, 0, 1400, 800, 0xcb0bfe, 0.9).setOrigin(0, 0);
        
        // flicker effect 
            this.tweens.add({
            targets: pinkOverlay,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 6, // flicker amt
            onComplete: () => {
                // main game scene
                this.scene.start('endlessscene');
                    }
                });
            }
        }