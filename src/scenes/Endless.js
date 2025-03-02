
class Endless extends Phaser.Scene {
    constructor() {
        super('endlessscene');
    }

    
    create() {
        // Background
        this.background = this.add.tileSprite(0, 0, 1400, 800, 'endless').setOrigin(0, 0);
        this.backgroundSpeed = 4;

        //define keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // Player (shovelbro)
        this.player = new ShovelBro(this, 200, 450); 
        this.player.setScale(2).setSize(40,40);
        this.physics.add.collider(this.player, this.ground);

        this.player.play('walk', true)
        this.player.body.setGravityY(600)

        // Obstacles
        this.obstacles = this.physics.add.group();
        this.obstacleSpeed = -200;
        this.spawnInterval = 3500;

        // Ground
        this.floor = this.add.rectangle(this.player.x, this.player.y + 150, game.config.width + 90, 0x9D9C9D).setOrigin(0.13, 0)
        this.physics.add.existing(this.floor, true)
        this.physics.add.collider(this.player, this.floor)

        // Colliders
        this.physics.add.collider(this.obstacles, this.ground);
        this.physics.add.overlap(this.player, this.obstacles, this.handleCollision, null, this);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Music
        

        // Timers

        this.score = 0
        this.elapsedTime = 0
        this.scoreText = this.add.text(20, 20,'Time ran (in secs): 0', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS'})
        this.scoreText.setVisible(false)
        this.insructText = this.add.text(10,300,'Press space to avoid obstacles! ', { fontSize: '20px', fill: '#FFF', fontFamily: 'Comic Sans MS' })

        this.time.delayedCall(5000, () => {
            this.insructText.destroy()
        }, [], this)

        this.time.addEvent({
            delay: this.spawnInterval,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 10000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });

        // Game Over flag
        this.gameOver = false;
        this.obstacles = []
        this.obstacleSpeed = -200
        this.spawnInterval = 3500

        this.spawnObstacle()
    }

    update() {
    
    this.player.update()

    // Scrolling BG
    this.background.tilePositionX += this.backgroundSpeed;

    }

    spawnObstacle() {

        let minSpace = 300 // space between obstacles
        let obstacleY = game.config.height - borderUISize - 200
        let obstacleX = game.config.width + Phaser.Math.Between(60, 150)

        //  no overlap with  obstacles
        if (this.obstacles.some(obstacle => Math.abs(obstacle.x - obstacleX) < minSpace)) {
            return
        }

        let obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'snail').setScale(3).setSize(25,15)
        obstacle.body.setVelocityX(this.obstacleSpeed)
        obstacle.body.setImmovable(true)
        obstacle.body.allowGravity = false

        this.physics.add.collider(this.player, obstacle, this.obstacleCollision, null, this)
        this.obstacles.push(obstacle) // track obstacle

        let nextSpawn = Phaser.Math.Clamp(this.spawnInterval, 1400, 700)


        // spawn next obs
        this.time.delayedCall(this.spawnInterval, this.spawnObstacle, [], this)

        // cleanup obstacles
        this.obstacles.forEach((obstacle, index) => {
            if (obstacle.x <= -50) {
                obstacle.destroy()  
                this.obstacles.splice(index, 1)
            }
        })
    }

    increaseDifficulty() {
        this.backgroundSpeed += 0.5;
        this.obstacleSpeed -= 20;
        this.spawnInterval = Math.max(this.spawnInterval - 1000, 800);


        this.obstacles.forEach(obstacle =>{
            if(obstacle.active)
            obstacle.body.setVelocityX(this.obstacleSpeed)
        })

    }

    obstacleCollision(player, obstacle) {
        if (!this.gameOver) {
            this.gameOver = true;
            
        }
    }
}

