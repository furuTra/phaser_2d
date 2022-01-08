export default class Entrance extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, width, height, name } = data;
        super(scene.matter.world, x, y);
        this.scene.add.existing(this);

        // 情報の位置に物理判定を持たせ、衝突判定を設ける
        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var collider = Bodies.rectangle(
            (this.x + width/2),
            (this.y + height/2),
            width,
            height,
            {
                isSensor: true,
                isStatic: true,
                label: name
            }
        );
        const computedBody = Body.create({ parts: [collider] });

        // matterオブジェクトをGameObjectにする
        this.setExistingBody(computedBody);
    }

}
