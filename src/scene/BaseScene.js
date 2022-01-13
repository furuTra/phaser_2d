export default class BaseScene extends Phaser.Scene {
    constructor() {
        super('BaseScene');
    }

    create() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x008080, 0.2);
        graphics.fillRect(0, 0, 100, 380);

        let data = {
            joyStick: this.createJoyStick()
        };

        this.scene.launch('MainScene', data);
    }

    createJoyStick() {
        let baseJoyStick = this.add.circle(0, 0, 30, 0x888888);
        let thumbJoyStick = this.add.circle(0, 0, 15, 0xcccccc);
        let dropShadowPipeline = this.plugins.get('dropShadowPipeline');
        dropShadowPipeline.add(baseJoyStick, {
            distance: 4,
            angle: 270,
            shadowColor: '#666666',
            alpha: 0.5,
            blur: 0
        });
        dropShadowPipeline.add(thumbJoyStick, {
            distance: 4,
            angle: 270,
            shadowColor: '#666666',
            alpha: 0.5,
            blur: 0
        });
        let joyStick = this.plugins.get('virtualJoystickPlugin').add(this, {
            x: 50,
            y: 350,
            radius: 15,
            base: baseJoyStick,
            thumb: thumbJoyStick
        });

        return joyStick;
    }
}
