import Heavyknight from "./Heavyknight";

export default class Player extends Heavyknight {
    constructor(data) {
        super(data);
        this.direct = 'right'; // プレイヤーの方向
    }

    get velocity() {
        return this.body.velocity;
    }

    update() {
        const speed = 2;
        let playerVelocity = new Phaser.Math.Vector2();

        // ジョイスティック移動
        if (this.cursorKeys.left.isDown && this.cursorKeys.down.isDown) {
            playerVelocity.x = -1;
            playerVelocity.y = 1;
        } else if (this.cursorKeys.left.isDown && this.cursorKeys.up.isDown) {
            playerVelocity.x = -1;
            playerVelocity.y = -1;
        } else if (this.cursorKeys.right.isDown && this.cursorKeys.down.isDown) {
            playerVelocity.x = 1;
            playerVelocity.y = 1;
        } else if (this.cursorKeys.right.isDown && this.cursorKeys.up.isDown) {
            playerVelocity.x = 1;
            playerVelocity.y = -1;
        } else if (this.cursorKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.cursorKeys.right.isDown) {
            playerVelocity.x = 1;
        } else if (this.cursorKeys.down.isDown) {
            playerVelocity.y = 1;
        } else if (this.cursorKeys.up.isDown) {
            playerVelocity.y = -1;
        } 

        // キーボード移動
        if (this.inputKeys.left.isDown && this.inputKeys.down.isDown) {
            playerVelocity.x = -1;
            playerVelocity.y = 1;
        } else if (this.inputKeys.left.isDown && this.inputKeys.up.isDown) {
            playerVelocity.x = -1;
            playerVelocity.y = -1;
        } else if (this.inputKeys.right.isDown && this.inputKeys.down.isDown) {
            playerVelocity.x = 1;
            playerVelocity.y = 1;
        } else if (this.inputKeys.right.isDown && this.inputKeys.up.isDown) {
            playerVelocity.x = 1;
            playerVelocity.y = -1;
        } else if (this.inputKeys.left.isDown) {
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

        // 左向きと右向きで読み込む立ち絵を変更する
        if (this.velocity.x > 0) {
            this.direct = 'right';
        } else if (this.velocity.x < 0) {
            this.direct = 'left'
        }

        // 向きによって左右の立ち絵を切り替える
        if (Math.abs(this.velocity.x) > 0 || Math.abs(this.velocity.y) > 0) {
            this.anims.play('heavyknight_walk_' + this.direct, true);
        } else {
            this.anims.play('heavyknight_idle_' + this.direct, true);
        }

        super.update();
    }

}
