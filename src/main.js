let config = {
    type: Phaser.AUTO, 
    width: 1400,
    height:800,
    scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: { 
        default: "arcade",
        arcade: {
            gravity: { y: 1400}, 
            debug: false
        } 
    } ,
    scene:[Menu, Instructions, Credits, Picking, PinkChamp, Endless]
};

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyJUMP;
let borderUISize = game.config.height / 20
let borderPadding = borderUISize