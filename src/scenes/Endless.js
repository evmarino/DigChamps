class Endless extends Phaser.Scene {
    constructor() {
        super('endlessscene');
    }

    init(data) {
        this.selectedCharacter = data.character || 'shovelbro'; // defaulted character
    }

    create() {
        console.log("Endless Runner starts with:", this.selectedCharacter);

        this.background = this.add.tileSprite(0, 0, 1400, 800, 'endless').setOrigin(0, 0);
        this.backgroundSpeed = 4;

        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // picks player 1 based on selection
        if (this.selectedCharacter === 'shovelbro') {
            this.player1 = new ShovelBro(this, 200, 450);
            this.player1.play('walk', true);
        } else {
            this.player1 = new AxeBro(this, 200, 450);
            this.player1.play('axebro_walk', true);
        }

        this.player1.setScale(2).setSize(40, 40);
        this.player1.body.setGravityY(600);

        // Player 2 is the opposite character
        this.player2Character = (this.selectedCharacter === 'shovelbro') ? 'axebro' : 'shovelbro';
        

        if (this.player2Character === 'shovelbro') {
            this.player2 = new ShovelBro(this, -100, -100);
        } else {
            this.player2 = new AxeBro(this, -100, -100);
        }
        this.player2.setAlpha(0);
        this.player2.setScale(2).setSize(40, 40);
        this.player2.body.setGravityY(600)

        // Obstacles
        this.obstacles = [];
        this.obstacleSpeed = -200;
        this.spawnInterval = 3500;

        this.floor = this.add.rectangle(this.player1.x, this.player1.y + 150, game.config.width + 90, 0x9D9C9D).setOrigin(0.13, 0);
        this.physics.add.existing(this.floor, true);
        this.physics.add.collider(this.player1, this.floor);
        this.physics.add.collider(this.player2, this.floor);

        this.time.addEvent({
            delay: 10000,
            callback: () => this.increaseDifficulty(),
            callbackScope: this,
            loop: true
        });

        this.gameOver = false;
        this.spawnObstacle();
    }

    update() {
        this.player1.update();
        this.background.tilePositionX += this.backgroundSpeed;
    }

    spawnObstacle() {
        let minSpace = 300;
        let obstacleY = game.config.height - borderUISize - 200;
        let obstacleX = game.config.width + Phaser.Math.Between(60, 150);

        // no overlap with existing obstacles
        if (this.obstacles.some(obstacle => Math.abs(obstacle.x - obstacleX) < minSpace)) {
            return;
        }

        let obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'snail').setScale(3).setSize(25, 15);
        obstacle.body.setVelocityX(this.obstacleSpeed);
        obstacle.body.setImmovable(true);
        obstacle.body.allowGravity = false;

        this.physics.add.collider(this.player1, obstacle, () => this.obstacleCollision(), null, this);
        this.obstacles.push(obstacle);

        // spawn the next obstacle
        this.time.delayedCall(this.spawnInterval, () => this.spawnObstacle(), [], this);

        // cleanup obstacles
        this.obstacles.forEach((obstacle, index) => {
            if (obstacle.x <= -50) {
                obstacle.destroy();
                this.obstacles.splice(index, 1);
            }
        });
    }

    increaseDifficulty() {
        this.backgroundSpeed += 0.5;
        this.obstacleSpeed -= 20;
        this.spawnInterval = Math.max(this.spawnInterval - 1000, 800);

        this.obstacles.forEach(obstacle => {
            if (obstacle.active) obstacle.body.setVelocityX(this.obstacleSpeed);
        });
    }

    obstacleCollision() {
        if (!this.gameOver) {
            this.gameOver = true;
            console.log("Player 1 Died! Switching to Player 2...");

            this.player2.setPosition(this.player1.x, this.player1.y);
            this.player2.setAlpha(1);
            this.player2.play(this.player2Character === 'shovelbro' ? 'walk' : 'axebro_walk', true);

            this.player1.destroy();
            this.player1 = this.player2;
        }
    }
}
