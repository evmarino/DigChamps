class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    create() {
        
        this.add.rectangle(0, 0, 1400, 800, 0x98fffd).setOrigin(0, 0); 

      
        this.add.text(this.scale.width / 2, 100, 'How to Play DigChamps!', {
            fontSize: '40px',
            fill: '#FFA500',
            fontFamily: 'Joystix'
        }).setOrigin(0.5);

        
        this.add.text(this.scale.width / 2, 250, 
            'DigChamps is a two-player game.\n' +
            ' * Player 1 will go first and try to survive as long as possible.\n' +
            ' * After Player 1 dies, Player 2 gets a turn.\n' +
            ' * Avoid underground snails and try to beat Player 1’s time!\n' +
            ' * Press SPACE to jump over obstacles!\n' +
            ' * Double, even triple (woahh) jumping is allowed',
        {
            fontSize: '24px',
            fill: '#FF4500',
            fontFamily: 'Joystix',
            align: 'center'
        }).setOrigin(0.5);

       
        this.add.text(this.scale.width / 2, 600, 'Click to Start!', {
            fontSize: '30px',
            fill: '#FFA500',
            fontFamily: 'Joystix'
        }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.scene.start("pickingScene"); // character selection
        });
    }
}
