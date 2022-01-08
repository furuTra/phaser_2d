export default class HealthBar {
    constructor(scene, x, y, value) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        // HP
        this.value = value;
        // HPバー長さ
        this.hpBarLen = 50
        // HPあたりのHPバーの長さ
        this.p = this.hpBarLen / value;
        this.draw(this.x, this.y);
        scene.add.existing(this.bar);
    }

    decrease(amount) {
        this.value -= amount;
        if (this.value < 0) {
            this.value = 0;
        }
        this.draw(this.x, this.y);
        return (this.value === 0);
    }

    position(x, y) {
        this.x = x;
        this.y = y;
        this.draw(this.x, this.y)
    }

    draw(x, y) {
        this.bar.clear();
        // HPバー外枠
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(x, y, (this.hpBarLen + 2), 4);

        // HPバー空
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(x + 1, y + 1, this.hpBarLen, 2);

        if (this.value < 30) {
            // HPが3割を切ると黄色になる
            this.bar.fillStyle(0x00ffff);
        } else if (this.value < 10) {
            // HPが1割を切ると赤色になる
            this.bar.fillStyle(0x0000ff);
        } else {
            this.bar.fillStyle(0x00ff00);
        }
        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(x + 1, y + 1, d, 2);
    }
}
