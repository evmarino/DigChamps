class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
       
        this.load.image('title', './Assets/DCtitle.png');
        this.load.image('lettertitle', './Assets/lettertitle.png');
        this.load.image('colortitle', './Assets/colorchamptitle.png');
        this.load.image('maintitle', './Assets/DCtitle.png')

        this.load.image('pickPlayer', './Assets/digbro.png')
        this.load.image('shovel', './Assets/shovellift.png');
        this.load.image('axe', './Assets/pickaxelift.png');
        this.load.spritesheet('shovelbro', './Assets/shovelbro.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('axebro', './Assets/axebro.png', { frameWidth: 64, frameHeight: 64 });

        this.load.image('pink', './Assets/DCpink.png');
        this.load.image('cloud', './Assets/cloud.png');
        this.load.image('snail', './Assets/snail.png');
        this.load.image('endless', './Assets/endless.png');
        
    }

    create() {
        //main title
        this.Mtitle = this.add.image(0, 0, 'maintitle')
            .setOrigin(0, 0)
            .setAlpha(0)
            .setScale(1)

        // Letter title 
        this.title = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'lettertitle')
            .setOrigin(0.5, 0.5)
            .setScale(5.4)

        // Color title 
        this.title2 = this.add.image(0, 0, 'colortitle').setOrigin(0, 0).setScale(1)

        // overlapping titles
        this.title.setDepth(1);

        // flickering effect for the block letter title
        this.tweens.add({
            targets: this.title,
            alpha: 0,        
            duration: 300,   
            yoyo: true,      
            repeat: 3,       
            onComplete: () => {  
                // fading out of letter & color title while main title fades in
                this.tweens.add({
                    targets: [this.title, this.title2],
                    alpha: 0,
                    duration: 1000,  // 1 second fade out
                });

                // Main title transition
                this.tweens.add({
                    targets: this.Mtitle,
                    alpha: 1,
                    duration: 10,  // 1 second fade in
                    delay: 200, 
                    onComplete: () => {

                        //click to start 
                        this.input.once('pointerdown', () => {
                            this.scene.start("pickingScene")
                        });

                    }
                })
            }
        })
        // Define keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
}
