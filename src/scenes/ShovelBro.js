class ShovelBro extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'shovelbro', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(0);
        this.setCollideWorldBounds(true);
        this.jumpCount = 0;

        this.scene = scene;
        this.jumpSound = this.scene.sound.add('click');
        this.createAnimations();
    }

    createAnimations() {
        if (!this.scene.anims.exists('shovelbro_walk')) {
            console.log("Creating shovelbro_walk animation...");
            this.scene.anims.create({
                key: 'shovelbro_walk',
                frames: this.scene.anims.generateFrameNumbers('shovelbro', { frames: [1, 2, 3, 1, 2, 3] }),
                frameRate: 24,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('shovelbro_jump')) {
            console.log("Creating shovelbro_jump animation...");
            this.scene.anims.create({
                key: 'shovelbro_jump',
                frames: [{ key: 'shovelbro', frame: 0 }],
                frameRate: 1,
                repeat: 0
            });
        }
    }

    update() {
        if (!this.body) return;

        if (Phaser.Input.Keyboard.JustDown(keyJUMP) && this.jumpCount < 10) {
            this.play('shovelbro_jump', true);
            this.playerJumps();
            this.jumpCount++;
            this.jumpSound.play();
        } else if (this.body.touching.down && this.anims.currentAnim?.key !== 'shovelbro_walk') {
            this.play('shovelbro_walk', true);
            this.jumpCount = 0;
        }
    }

    playerJumps() {
        this.setVelocityY(-650);
    }
}
