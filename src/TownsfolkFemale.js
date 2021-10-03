import female from "./assets/townsfolk_female/female.png";

export default class TownsfolkFemale extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, name } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.text = this.scene.add.text(x - 12, y - 18, name, { font: '10px Arial', fill: '#00ff00' });
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
    }

    static preload(scene) {
        let femaleJson = require('./assets/townsfolk_female/female_atlas.json');
        let femaleAnim = require('./assets/townsfolk_female/female_anim.json');
        scene.load.atlas('female', female, femaleJson);
        scene.load.animation('female_anim', femaleAnim);
    }

    update() {
        this.anims.play('female_idle', true);
        this.text.setPosition(this.body.position.x - 12, this.body.position.y - 18);
    }
}