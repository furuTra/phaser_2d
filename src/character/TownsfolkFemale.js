import female from "../assets/townsfolk_female/townsfolk_female.png";
import Character from "./Character";

export default class TownsfolkFemale extends Character {
    constructor(data) {
        super(data);
        this.x = data.x;
        this.y = data.y;
        var { bubble, content } = this.createBubble(
            this.x - 12,
            this.y + 18,
            70,
            30,
            data.speech
        );
        this.bubble = bubble;
        this.speech = content;
    }

    static preload(scene) {
        let femaleJson = require('../assets/townsfolk_female/townsfolk_female_atlas.json');
        let femaleAnim = require('../assets/townsfolk_female/townsfolk_female_anim.json');
        scene.load.atlas('townsfolk_female', female, femaleJson);
        scene.load.animation('townsfolk_female', femaleAnim);
    }

    update() {
        // 吹き出しの位置
        this.bubble.setPosition(this.body.position.x - 12, this.body.position.y + 18);
        // セリフの位置
        var { bubbleContentPostionX, bubbleContentPostionY } = this.bubbleContentPostion(this.body.position.x - 12, this.body.position.y + 18, 70, 30, this.speech);
        this.speech.setPosition(bubbleContentPostionX, bubbleContentPostionY);
        // 表示するアニメ
        this.anims.play('townsfolk_female_idle', true);
        super.update();
    }

    // 吹き出し表示/非表示を設定
    ballon(isShow) {
        this.bubble.setVisible(isShow);
        this.speech.setVisible(isShow);
    }

    // 吹き出し作成
    createBubble(x, y, bubbleWidth, bubbleHeight, msg) {
        var bubble = this.createBubbleFrame(x, y, bubbleWidth, bubbleHeight);

        var content = this.createSpeech(x, y, bubbleWidth, bubbleHeight, msg);

        // 吹き出しとセリフ
        return {
            bubble,
            content
        };
    }

    // セリフ
    createSpeech(x, y, bubbleWidth, bubbleHeight, msg) {
        var bubblePadding = 10;
        var content = this.scene.add.text(0, 0, msg, { fontFamily: 'Arial', fontSize: 10, color: '#000000', align: 'left', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

        var b = content.getBounds();

        var { bubbleContentPostionX, bubbleContentPostionY } = this.bubbleContentPostion(x, y, bubbleWidth, bubbleHeight, b)
        content.setPosition(bubbleContentPostionX, bubbleContentPostionY).setVisible(false);

        return content;
    }

    // 吹き出し枠作成
    createBubbleFrame(x, y, bubbleWidth, bubbleHeight) {
        var bubble = this.scene.add.graphics({ x: x, y: y });
        var arrowHeight = bubbleHeight / 5;

        //  Bubble shadow
        bubble.fillStyle(0x222222, 0.5);
        bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

        //  Bubble color
        bubble.fillStyle(0xffffff, 1);

        //  Bubble shape and outline
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

        //  Calculate arrow coordinates
        var point1X = Math.floor(bubbleWidth / 7);
        var point1Y = 6;
        var point2X = Math.floor((bubbleWidth / 7) * 2);
        var point2Y = 6;
        var point3X = Math.floor(bubbleWidth / 7);
        var point3Y = Math.floor(- arrowHeight);

        //  Bubble arrow fill
        bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);

        return bubble.setVisible(false);
    }

    // 吹き出し内のセリフ位置を設定
    bubbleContentPostion(x, y, bubbleWidth, bubbleHeight, b) {
        var bubbleContentPostionX = x + (bubbleWidth / 2) - (b.width / 2);
        var bubbleContentPostionY = y + (bubbleHeight / 2) - (b.height / 2);
        // 吹き出し内のセリフ位置
        return {
            bubbleContentPostionX,
            bubbleContentPostionY
        };
    }
}
