class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Title assets
        this.load.image('title', './Assets/DCtitle.png');
        this.load.image('lettertitle', './Assets/lettertitle.png');
        this.load.image('colortitle', './Assets/colorchamptitle.png');
        this.load.image('maintitle', './Assets/DCtitle.png');

        // Player assets
        this.load.image('pickPlayer', './Assets/digbro.png');
        this.load.image('shovel', './Assets/shovellift.png');
        this.load.image('axe', './Assets/pickaxelift.png');
        this.load.spritesheet('shovelbro', './Assets/shovelbro.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('axebro', './Assets/axebro.png', { frameWidth: 64, frameHeight: 64 });

        // Background for endless
        this.load.image('pink', './Assets/DCpink.png');
        this.load.image('cloud', './Assets/cloud.png');
        this.load.image('snail', './Assets/snail.png');
        this.load.image('endless', './Assets/endless.png');

        // Audio
        this.load.audio('click', './Assets/clicksound.mp3');
        this.load.audio('countdown', './Assets/countdown.mp3');
        this.load.audio('gameoverMusic', './Assets/gameover.mp3');
        this.load.audio('maintheme', './Assets/maintheme.mp3');
        this.load.audio('playerselectMusic', './Assets/playerselect.mp3');
        this.load.audio('dcjingle', './Assets/dcjingle.mp3');
    }

    create() {
        // Audio
        this.clickSound = this.sound.add('click');
        this.mainSound = this.sound.add("maintheme");
        this.dcjingle = this.sound.add('dcjingle');
        this.dcjingle.play();

        // Main Title
        this.Mtitle = this.add.image(0, 0, 'maintitle').setOrigin(0, 0).setAlpha(0).setScale(1);

        // Letter Title
        this.title = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'lettertitle')
            .setOrigin(0.5, 0.5)
            .setScale(5.4);

        // Color Title
        this.title2 = this.add.image(0, 0, 'colortitle').setOrigin(0, 0).setScale(1);

        this.add.text(530, 530, 'Click anywhere to play', { 
            fontSize: '24px', 
            fill: '#FFF', 
            fontFamily: 'Joystix' 
        });

        // 
        const instructionsButton = this.add.rectangle(600, 650, 320, 40, 0x98fffd) 
            .setOrigin(0.13, 0.3)
            .setInteractive();
        
        this.add.text(600, 650, 'How to Play', { 
            fontSize: '24px', 
            fill: '#FFA500', 
            fontFamily: 'Joystix' 
        });

       
        const creditsButton = this.add.rectangle(600, 700, 320, 40, 0xFFA500) 
            .setOrigin(0.13, 0.3)
            .setInteractive();
        
        this.add.text(600, 700, 'Credits', { 
            fontSize: '24px', 
            fill: '#98fffd',
            fontFamily: 'Joystix' 
        });

        // Set Depth
        this.title.setDepth(1);

        // Flickering Effect 
        this.tweens.add({
            targets: this.title,
            alpha: 0,
            duration: 300,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                // Fade Out 
                this.tweens.add({
                    targets: [this.title, this.title2],
                    alpha: 0,
                    duration: 1000,
                });

                // Main Title
                this.tweens.add({
                    targets: this.Mtitle,
                    alpha: 1,
                    duration: 10,
                    delay: 200,
                    onComplete: () => {
                        // Click to play
                        this.input.on('pointerdown', (pointer) => {
                            const { x, y } = pointer;

                            // Check if the click is inside "How to Play" button
                            if (x > 440 && x < 760 && y > 630 && y < 670) {
                                this.clickSound.play();
                                this.dcjingle.stop();
                                this.scene.start("instructionsScene");
                            }
                            // Check if the click is inside "Credits" button
                            else if (x > 440 && x < 760 && y > 680 && y < 720) {
                                this.clickSound.play();
                                this.dcjingle.stop();
                                this.scene.start("creditsScene");
                            }
                            // Click anywhere else to start the game
                            else {
                                this.clickSound.play();
                                this.dcjingle.stop();
                                this.scene.start("pickingScene");
                            }
                        });
                    }
                });
            }
        });

        // Define Keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
}
