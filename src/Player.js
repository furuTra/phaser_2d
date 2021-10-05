import heavyknight from "./assets/heavyknight/heavyknight.png";
import HealthBar from "./HealthBar";

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, name } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.text = this.scene.add.text(x - 12, y - 18, name, { font: '10px Arial', fill: '#FFFFFF' });
        this.hp = new HealthBar(scene, x, y, 100);
        this.scene.add.existing(this);
        this.direct = 'right'; // プレイヤーの方向
        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(
            this.x,
            this.y,
            12, 
            {
                isSensor: false, // 物理判定がある
                label: 'playerCollider'
            }
        );
        var playerSensor = Bodies.circle(
            this.x,
            this.y,
            24,
            {
                isSensor: true, 
                label: 'playerSensor'
            }
        );
        const computedBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(computedBody);
        this.setFixedRotation();
    }

    static preload(scene) {
        let heavyknightJson = require('./assets/heavyknight/heavyknight_atlas.json');
        let heavyknightAnim = require('./assets/heavyknight/heavyknight_anim.json');
        scene.load.atlas('heavyknight', heavyknight, heavyknightJson);
        scene.load.animation('heavyknight_anim', heavyknightAnim);
    }

    get velocity() {
        return this.body.velocity;
    }

    update() {
        const speed = 2;
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

        if (this.velocity.x > 0) {
            this.direct = 'right';
        } else if (this.velocity.x < 0) {
            this.direct = 'left'
        }

        if (Math.abs(this.velocity.x) > 0 || Math.abs(this.velocity.y) > 0) {
            this.anims.play('heavyknight_walk_' + this.direct, true);
        } else {
            this.anims.play('heavyknight_idle_' + this.direct, true);
        }

        this.text.setPosition(this.body.position.x - 12, this.body.position.y - 18);
        this.hp.position(this.body.position.x - 25, this.body.position.y + 18);
    }
}