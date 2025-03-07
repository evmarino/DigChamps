class PinkChamp extends Phaser.Scene {
    constructor() {
        super("pinkChamp");
    }

    init(data) {
        this.selectedCharacter = data.character || 'shovelbro'; // defaulting
    }

    create() {
        this.pinkBack = this.add.image(0, 0, 'pink').setOrigin(0, 0);

        // pink rectangle flicker effect
        const pinkOverlay = this.add.rectangle(0, 0, 1400, 800, 0xcb0bfe, 0.9).setOrigin(0, 0);

        this.tweens.add({
            targets: pinkOverlay,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 6, // flash speed
            onComplete: () => {
                console.log("Transitioning to Endless Runner with:", this.selectedCharacter);
                this.scene.start('endlessscene', { character: this.selectedCharacter });
            }
        });
    }
}
