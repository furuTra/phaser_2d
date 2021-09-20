import female from "./assets/townsfolk_female/female.png";

export default class TownsfolkFemale extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
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
    }

    static preload(scene) {
        let femaleJson = require('./assets/townsfolk_female/female_atlas.json');
        let femaleAnim = require('./assets/townsfolk_female/female_anim.json');
        scene.load.atlas('female', female, femaleJson);
        scene.load.animation('female_anim', femaleAnim);
    }

    update() {
        this.anims.play('female_idle', true);
    }
}