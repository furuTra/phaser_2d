import heavyknight from "./assets/heavyknight.png";

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
    }

    static preload(scene) {
        let heavyknightJson = require('./assets/heavyknight_atlas.json');
        let heavyknightAnim = require('./assets/heavyknight_anim.json');
        scene.load.atlas('heavyKnight', heavyknight, heavyknightJson);
        scene.load.animation('heavyKnightAnim', heavyknightAnim);
    }

    update() {
        // this.anims.play('heavyknight_idle', true);
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        } else if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
    }
}