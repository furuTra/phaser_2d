import HealthBar from "./HealthBar";

export default class Character extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, name } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        // 物理判定のある物体を作成
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

        // matterオブジェクトをGameObjectにする
        var charaBody = this.setExistingBody(computedBody);

        // オブジェクトの回転を直す
        this.setFixedRotation();

        // キャラ名を表示
        this.charaName = this.scene.add.text(x - 12, y - 18, name, { font: '10px Arial', fill: '#FFFFFF' });

        // HPバーを表示
        this.hp = new HealthBar(scene, x, y, 100);

        // キャラの影を追加
        this.scene.dropShadowPipeline.add(charaBody, {
            distance: 4,
            angle: 270,
            shadowColor: '#666666',
            alpha: 0.5,
            blur: 0
        });
    }

    update() {
        // キャラ名をキャラの位置に合わせて表示
        this.charaName.setPosition(this.body.position.x - 12, this.body.position.y - 18);

        // HPバーをキャラの位置に合わせて表示
        this.hp.position(this.body.position.x - 25, this.body.position.y + 18);
    }
}