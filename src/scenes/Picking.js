class Picking extends Phaser.Scene {
    constructor() {
        super("pickingScene");
    }
   
    create() {
        this.backgroundColor = this.add.rectangle(0, 0, 1400, 800, 0x98fffd).setOrigin(0, 0).setAlpha(1)
        this.backgroundArt = this.add.image(0,0, 'pickPlayer').setOrigin(0,0).setAlpha(1)

        this.cameras.main.setZoom(1); // default cam
        this.cameras.main.setBounds(0, 0, 1400, 800); // camera limits
       

        //player sprite - both options
        this.blueshovel = this.add.image(this.scale.width / 2, this.scale.height / 2, 'shovel')
        .setOrigin(0.4, 0.5)
        .setScale(6)
        .setAlpha(0)

        this.redaxe = this.add.image(this.scale.width / 2, this.scale.height / 2, 'axe')
        .setOrigin(0.63, 0.5)
        .setScale(6)
        .setAlpha(0)

        //player hit boxes
        this.redbox = this.add.rectangle(this.scale.width / 2 + 110, this.scale.height / 2, 200, 400, 0xFF0000, 0.5)
        .setOrigin(0.5, 0.5)
        .setScale(1, 1)
        .setInteractive() //makes it clickable

        this.bluebox = this.add.rectangle(this.scale.width / 2 - 100, this.scale.height / 2, 200, 400, 0x003d80, 0.5)
        .setOrigin(0.5, 0.5)
        .setScale(1, 1)
        .setInteractive()

        // instruction text
       this.playerSelect = this.add.text(this.scale.width/2, this.scale.height - 100, 'PLAYER 1: SELECT YOUR PLAYER',{
            fontFamily: 'Joystix',
            fontSize: '32px',
            color: '#800080'
        }).setOrigin(0.5)

        //picking character 
        this.redbox.on('pointerdown', () => {
            console.log("Red Box Clicked! Fading out background & fading in Player Option 2.");
            this.fadeTransition(this.redaxe, "AXEBRO SELECTED", "#003d80");

        });

        this.bluebox.on('pointerdown', () => {
            console.log("Blue Box Clicked! Fading out background & fading in Player Option 1.");
            this.fadeTransition(this.blueshovel, "SHOVELBRO SELECTED", "#FF0000");
        
        });   
    }
    fadeTransition(selectedPlayer, text, color) {
        this.playerSelect.setAlpha(0); // hide instruction text
    
        this.tweens.add({
            targets: [this.backgroundArt], // dackground fades out
            alpha: 0,
            duration: 500,
        });
    
        this.tweens.chain({
            targets: [this.redbox, this.bluebox], // boxes merge into Purple
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
                            .setAlpha(1); // purple box appears
                    }
                },
                {
                    alpha: 0, // purple box starts fading out
                    duration: 500,
                    onComplete: () => {
                        console.log("Purple box fading out...");
                        if (this.purplebox) {
                            this.purplebox.setAlpha(0); // hide purple box
                            this.purplebox.destroy(); 
                            this.purplebox = null; 
                        }
                    }
                }
            ]
        });
    
        selectedPlayer.setAlpha(1); // selected player
    
        // text at the bottom of the screen 
        this.time.delayedCall(1000, () => {  
            console.log("Showing selected text...");
            let selectedText = this.add.text(this.scale.width / 2, this.scale.height - 100, text, {
                fontFamily: 'Joystix',
                fontSize: '32px',
                color: color
            }).setOrigin(0.5);
    
            selectedText.setDepth(1000); //text is on top
            selectedText.setAlpha(1);
            selectedText.setVisible(true);
        });
    }
}