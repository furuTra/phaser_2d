export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        const { width, height } = this.game.canvas;
        this.add.text(width/2, height/2+60, 'Click Anywhere').setOrigin(0.5);

        const zone = this.add.zone(width/2, height/2, width, height);
        zone.setInteractive({
            useHandCursor: true  // マウスオーバーでカーソルが指マークになる
        });
      
        // ZoneをクリックしたらMainSceneに遷移
        zone.on('pointerdown', () => {
            this.scene.start('BaseScene');
        });
    }
}
