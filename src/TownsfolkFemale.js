import female from "./assets/townsfolk_female/townsfolk_female.png";
import Character from "./Character";

export default class TownsfolkFemale extends Character {
    constructor(data) {
        super(data);
        this.x = data.x;
        this.y = data.y;
        this.speech = this.scene.add.text(
            this.x - 12,
            this.y + 18,
            'こんにちは',
            { 
                font: '10px Arial',
                fill: '#FFFFFF'
            }
        );
        this.speech.setVisible(false);
    }

    static preload(scene) {
        let femaleJson = require('./assets/townsfolk_female/townsfolk_female_atlas.json');
        let femaleAnim = require('./assets/townsfolk_female/townsfolk_female_anim.json');
        scene.load.atlas('townsfolk_female', female, femaleJson);
        scene.load.animation('townsfolk_female', femaleAnim);
    }

    update() {
        this.speech.setPosition(this.body.position.x - 12, this.body.position.y + 18);
        this.anims.play('townsfolk_female_idle', true);
        super.update();
    }

    ballon(isShow) {
        this.speech.setVisible(isShow);
    }
}
