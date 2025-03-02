class Picking extends Phaser.Scene{
    constructor() {
        super("pickingScene")
    }

    create(){
        this.playerMenu = this.add.image(0, 0, 'players').setOrigin(0,0)

        this.input.once('pointerdown', () => {
            this.scene.start("pinkChamp")
        })
    }

}