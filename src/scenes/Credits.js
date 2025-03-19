class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        // Background
        this.add.rectangle(0, 0, 1400, 800, 0x98fffd).setOrigin(0, 0);

        // Title
        this.add.text(this.scale.width / 2, 50, "Game Credits", {
            fontSize: "48px",
            fill: "#FF4500",
            fontFamily: "Joystix",
        }).setOrigin(0.5);

        // Game Info
        this.add.text(this.scale.width / 2, 120, "Inspired by Regular Show\nVisual assets hand drawn by Evelyn Marino", {
            fontSize: "24px",
            fill: "#FF4500",
            fontFamily: "Joystix",
            align: "center"
        }).setOrigin(0.5);

        // Sound Credits
        const creditsText = [
            "Sound Credits:",
            "Game Over - freesound_community (Pixabay)",
            "8bit Music - freesound_community (Pixabay)",
            "Countdown Sound - Jesse Grum (Pixabay)",
            "Retro Jingle - freesound_community (Pixabay)",
            "Select Sound - u_2fbuaev0zn (Pixabay)"
        ];

        for (let i = 0; i < creditsText.length; i++) {
            this.add.text(this.scale.width / 2, 200 + i * 50, creditsText[i], {
                fontSize: "20px",
                fill: "#FF4500",
                fontFamily: "Joystix",
            }).setOrigin(0.5);
        }

        // "Back to Menu" Button
        const backButton = this.add.rectangle(this.scale.width / 2, 600, 300, 50, 0xFFA500)
            .setOrigin(0.5)
            .setInteractive();

        this.add.text(this.scale.width / 2, 600, "Back to Menu", {
            fontSize: "24px",
            fill: "#FFFF",
            fontFamily: "Joystix",
        }).setOrigin(0.5);

        // Clicking the button goes back to Menu Scene
        backButton.on("pointerdown", () => {
            this.scene.start("menuScene");
        });
    }
}
