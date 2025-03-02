class ShovelBro extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y, 'shovelbro', 0)


        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setVelocityX(0);         
        this.setCollideWorldBounds(true)
        this.jumpCount = 0
        
        this.scene = scene
        this.createAnimations()
    }

    //sprite animations
    createAnimations() {
    if (!this.scene.anims.exists('walk')) {
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('shovelbro', { frames: [1, 2, 3, 1, 2, 3,] }),
            frameRate: 24,
            repeat: -1
        });
    }
    
    if (!this.scene.anims.exists('idle')) {
        this.scene.anims.create({
            key: 'idle',
            frames: [{ key: 'shovelbro', frame: 0 }],
            frameRate: 1,
            repeat: -1
        });
    }
    
    if (!this.scene.anims.exists('jump')) {
        this.scene.anims.create({
            key: 'jump',
            frames: [{ key: 'shovelbro', frame: 0 }],
            frameRate: 1,
            repeat: 0
        });
    
}
}

    update(){
        // player jumping
    if (Phaser.Input.Keyboard.JustDown(keyJUMP) && this.jumpCount < 10) {
        this.play('jump', true)
        this.playerJumps()
         this.jumpCount++
         } 
         else if (this.body.touching.down && this.anims.currentAnim?.key !== 'walk') {
            this.play('walk', true)
            this.jumpCount = 0
}

}

    playerJumps() {
        this.setVelocityY(-650)
}
}
