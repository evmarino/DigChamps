class Endless extends Phaser.Scene {
    constructor() {
        super('endlessscene')
    }

    init(data) {

        //default
        this.selectedCharacter = data.character || 'shovelbro'
        this.currentPlayer = 1
        this.player1Time = 0
        this.player2Time = 0
        this.obstacles = []

        //Difficulty Values 
        this.baseBackgroundSpeed = 4
        this.baseObstacleSpeed = -200
        this.baseSpawnInterval = 3500
    }

    create() {
        console.log(`Endless Runner starts with: ${this.selectedCharacter}`)

        //audio
        this.maintheme = this.sound.add('maintheme', { loop: true, volume: 0.5 })
        this.gameOverSound = this.sound.add('gameoverMusic', {volume: 0.2})
        this.countdown = this.sound.add('countdown',{volume:1})

        this.maintheme.play()

        // Background
        this.background = this.add.tileSprite(0, 0, 1400, 800, 'endless').setOrigin(0, 0)
        this.backgroundSpeed = this.baseBackgroundSpeed

        // Define keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // Floor
        this.floor = this.add.rectangle(200, 600, game.config.width + 90, 20, 0x9D9C9D).setOrigin(0.13, 0)
        this.floor.setAlpha(0)
        this.physics.add.existing(this.floor, true)

        // Start Player 1
        this.startPlayer(this.selectedCharacter)

        // Obstacles
        this.obstacleSpeed = this.baseObstacleSpeed;
        this.spawnInterval = this.baseSpawnInterval;

        this.time.addEvent({
            delay: this.spawnInterval,
            callback: () => this.spawnObstacle(),
            callbackScope: this,
            loop: true
        })

        // Difficulty Increase
        this.difficultyEvent = this.time.addEvent({
            delay: 10000,
            callback: () => this.increaseDifficulty(),
            callbackScope: this,
            loop: true
        })

        // Time Tracking
        this.elapsedTime = 0;
        this.scoreText = this.add.text(20, 20, 'Seconds Ran: 0', { fontSize: '24px', fill: '#FFF', fontFamily: 'Joystix' })

        this.timeTracker = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.elapsedTime += 1;
                this.scoreText.setText(`Seconds Ran: ${this.elapsedTime}`)
            },
            callbackScope: this,
            loop: true
        })

        this.gameOver = false;
    }

    startPlayer(character) {
        console.log(`Starting Player as: ${character}`)
        if (character === 'shovelbro') {
            this.player = new ShovelBro(this, 200, 450)
        } else {
            this.player = new AxeBro(this, 200, 450)
        }

        this.player.setScale(2).setSize(40, 40)
        this.player.body.setGravityY(600)
        this.physics.add.collider(this.player, this.floor)
        this.player.play(`${character}_walk`, true)
    }

    update() {
        if (!this.gameOver) {
            this.player.update();
            this.background.tilePositionX += this.backgroundSpeed
        }
    }

    spawnObstacle() {
        let minSpace = 300
        let obstacleY = 550
        let obstacleX = game.config.width + Phaser.Math.Between(60, 150)

        if (this.obstacles.some(obstacle => Math.abs(obstacle.x - obstacleX) < minSpace)) {
            return;
        }

        let obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'snail').setScale(3).setSize(25, 15)
        obstacle.body.setVelocityX(this.obstacleSpeed)
        obstacle.body.setImmovable(true)
        obstacle.body.allowGravity = false

        this.physics.add.collider(this.player, obstacle, () => this.obstacleCollision(), null, this)
        this.obstacles.push(obstacle)

        // Cleanup old obstacles
        this.obstacles = this.obstacles.filter(obstacle => {
            if (obstacle.x <= -50) {
                obstacle.destroy()
                return false
            }
            return true
        });
    }

    increaseDifficulty() {
        this.backgroundSpeed += 0.5
        this.obstacleSpeed -= 20
        this.spawnInterval = Math.max(this.spawnInterval - 500, 800)

        this.obstacles.forEach(obstacle => {
            if (obstacle.active) obstacle.body.setVelocityX(this.obstacleSpeed)
        });

        console.log(`Difficulty Increased! Speed: ${this.obstacleSpeed}, Spawn Interval: ${this.spawnInterval}`)
    }

    obstacleCollision() {
        if (!this.gameOver) {
            this.gameOver = true
            this.timeTracker.remove(false)
            this.difficultyEvent.remove(false)  // Stop difficulty increase

            let playerTime = this.elapsedTime

            if (this.currentPlayer === 1) {
                this.player1Time = playerTime
                this.showTransitionScreen()
            } else {
                this.player2Time = playerTime
                this.showScoreboard()
            }
        }
    }

    showTransitionScreen() {
        this.countdown.play({ volume: 0.1 })

        let gameOverText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, "GAME OVER", {
            fontFamily: 'Joystix',
            fontSize: '48px',
            color: '#FF0000'
        }).setOrigin(0.5)

        let nextText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 20, "Player 2 Starting in 3...2...1", {
            fontFamily: 'Joystix',
            fontSize: '24px',
            color: '#FFFFFF'
        }).setOrigin(0.5)

        this.time.delayedCall(3000, () => {
            gameOverText.destroy()
            nextText.destroy()

            this.tweens.add({
                targets: this.maintheme,
                volume: 0.5, //OG volume
                duration: 500
            }); 

            this.restartForPlayer2()
        });
    }

    restartForPlayer2() {
        this.currentPlayer = 2;
        this.elapsedTime = 0;
        this.obstacles.forEach(obstacle => obstacle.destroy())
        this.obstacles = []

        this.player.destroy()

        // Reset difficulty settings
        this.backgroundSpeed = this.baseBackgroundSpeed;
        this.obstacleSpeed = this.baseObstacleSpeed;
        this.spawnInterval = this.baseSpawnInterval;

        // Start Player 2
        let nextCharacter = (this.selectedCharacter === 'shovelbro') ? 'axebro' : 'shovelbro';
        this.startPlayer(nextCharacter)

        
        this.difficultyEvent = this.time.addEvent({
            delay: 10000,
            callback: () => this.increaseDifficulty(),
            callbackScope: this,
            loop: true
        });

        // Restart Time Tracker
        this.timeTracker = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.elapsedTime += 1
                this.scoreText.setText(`Seconds Ran: ${this.elapsedTime}`)
            },
            callbackScope: this,
            loop: true
        });

        this.gameOver = false
    }

    showScoreboard() {

        this.maintheme.stop()
        
        this.gameOverSound.play()
        

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, "FINAL SCORE", {
            fontFamily: 'Joystix',
            fontSize: '48px',
            color: '#FF0000'
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, this.scale.height / 2, `Player 1 Time: ${this.player1Time} sec`, {
            fontFamily: 'Joystix',
            fontSize: '24px',
            color: '#FFFFFF'
        }).setOrigin(0.5)

        this.add.text(this.scale.width / 2, this.scale.height / 2 + 30, `Player 2 Time: ${this.player2Time} sec`, {
            fontFamily: 'Joystix',
            fontSize: '24px',
            color: '#FFFFFF'
        }).setOrigin(0.5)

    }
}
