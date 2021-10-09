import HealthBar from "./HealthBar";

export default class Character extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, name } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
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
        this.text = this.scene.add.text(x - 12, y - 18, name, { font: '10px Arial', fill: '#FFFFFF' });
        this.hp = new HealthBar(scene, x, y, 100);
    }

    update(idleFrame) {
        this.anims.play(idleFrame, true);
        this.text.setPosition(this.body.position.x - 12, this.body.position.y - 18);
        this.hp.position(this.body.position.x - 25, this.body.position.y + 18);
    }
}