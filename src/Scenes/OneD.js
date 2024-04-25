class OneD extends Phaser.Scene {


    constructor(){
        super("OneDScene");
    }

    preload() {
        this.load.setPath("./assets");

        this.load.atlasXML("gameSprites", "spaceShooter2_spritesheet.png", "spaceShooter2_spritesheet.xml");


    }

    create() {
        my.sprite.player = this.add.sprite(600, 700, "gameSprites", "spaceShips_002.png") ;       

        my.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        my.missiles = this.add.group({
            classType: Phaser.GameObjects.Sprite
        })
    }

    update() {
        if (my.keys.left.isDown) {
            my.sprite.player.x -= 5;
            my.sprite.player.x = Math.max(my.sprite.player.width / 2, my.sprite.player.x); 
        }
        if (my.keys.right.isDown) {
            my.sprite.player.x += 5;
            my.sprite.player.x = Math.min(this.sys.game.config.width - my.sprite.player.width / 2, my.sprite.player.x); 
        } 



        //Update missile fire
        if (my.keys.space.isDown && !this.missileFired) {
            this.fireMissile();
            this.missileFired = true; 
        }
        if (my.keys.space.isUp) {
            this.missileFired = false; 
        }

        my.missiles.getChildren().forEach(missile => {
            missile.y -= 10; 
            if (missile.y < 0) {
                missile.destroy(); 
            }
        });
    }


    fireMissile() {
        const missile = my.missiles.create(my.sprite.player.x, my.sprite.player.y, "gameSprites", "spaceMissiles_002.png");
        missile.setOrigin(0.5, 1); 

        missile.setScale(2);
   
    }


}