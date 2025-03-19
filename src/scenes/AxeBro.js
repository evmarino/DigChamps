class AxeBro extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'axebro', 0);

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
        if (!this.scene.anims.exists('axebro_walk')) {
            console.log("Creating axebro_walk animation...");
            this.scene.anims.create({
                key: 'axebro_walk',
                frames: this.scene.anims.generateFrameNumbers('axebro', { frames: [0, 1, 2, 3, 0, 1, 2, 3] }),
                frameRate: 24,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('axebro_jump')) {
            console.log("Creating axebro_jump animation...");
            this.scene.anims.create({
                key: 'axebro_jump',
                frames: [{ key: 'axebro', frame: 0 }],
                frameRate: 1,
                repeat: 0
            });
        }
    }

    update() {
        if (!this.body) return;

        if (Phaser.Input.Keyboard.JustDown(keyJUMP) && this.jumpCount < 3) {
            this.play('axebro_jump', true);
            this.playerJumps();
            this.jumpCount++;
            this.jumpSound.play();
        } else if (this.body.touching.down && this.anims.currentAnim?.key !== 'axebro_walk') {
            this.play('axebro_walk', true);
            this.jumpCount = 0;
        }
    }

    playerJumps() {
        this.setVelocityY(-650);
    }
}
