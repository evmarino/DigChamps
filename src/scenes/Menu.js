class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
       
        //title assets
        this.load.image('title', './Assets/DCtitle.png');
        this.load.image('lettertitle', './Assets/lettertitle.png');
        this.load.image('colortitle', './Assets/colorchamptitle.png');
        this.load.image('maintitle', './Assets/DCtitle.png');

        //Player assets
        this.load.image('pickPlayer', './Assets/digbro.png');
        this.load.image('shovel', './Assets/shovellift.png');
        this.load.image('axe', './Assets/pickaxelift.png');
        this.load.spritesheet('shovelbro', './Assets/shovelbro.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('axebro', './Assets/axebro.png', { frameWidth: 64, frameHeight: 64 });

        //background for endless
        this.load.image('pink', './Assets/DCpink.png');
        this.load.image('cloud', './Assets/cloud.png');
        this.load.image('snail', './Assets/snail.png');
        this.load.image('endless', './Assets/endless.png');

        //audio
        this.load.audio('click', './Assets/clicksound.mp3');
        this.load.audio('countdown', './Assets/countdown.mp3');
        this.load.audio('gameoverMusic', './Assets/gameover.mp3');
        this.load.audio('maintheme', './Assets/maintheme.mp3');
        this.load.audio('playerselectMusic', './Assets/playerselect.mp3');
        this.load.audio('dcjingle', './Assets/dcjingle.mp3');

    }

    create() {

        this.clickSound = this.sound.add('click')
        this.mainSound = this.sound.add("maintheme")
        this.dcjingle = this.sound.add('dcjingle')
        this.dcjingle.play()

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

        this.add.text(580, 530, 'click to play', { fontSize: '24px', fill: '#FFF', fontFamily: 'Joystix' })

        this.floor = this.add.rectangle(600, 650, 320, 40,0x98fffd).setOrigin(0.13, 0.3)
        this.floor = this.add.rectangle(600, 700, 320, 40,0xFFA500).setOrigin(0.13, 0.3)
        this.add.text(600, 650, 'How to play', { fontSize: '24px', fill: '#FFA500', fontFamily: 'Joystix' })
        this.add.text(600, 700, 'Credits', { fontSize: '24px', fill: '#98fffd', fontFamily: 'Joystix' })

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
                    duration: 10,  
                    delay: 200, 
                    onComplete: () => {

                        //click to start 
                        this.input.once('pointerdown', () => {
                            this.clickSound.play()
                            this.dcjingle.stop()
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
