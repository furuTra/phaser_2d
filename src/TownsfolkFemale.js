import female from "./assets/townsfolk_female/female.png";
import Character from "./Character";

export default class TownsfolkFemale extends Character {
    constructor(data) {
        super(data);
    }

    static preload(scene) {
        let femaleJson = require('./assets/townsfolk_female/townsfolk_female_atlas.json');
        let femaleAnim = require('./assets/townsfolk_female/townsfolk_female_anim.json');
        scene.load.atlas('townsfolk_female', female, femaleJson);
        scene.load.animation('townsfolk_female', femaleAnim);
    }

    update() {
        super.update('townsfolk_female_idle');
    }
}
