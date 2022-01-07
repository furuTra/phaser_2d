import heavyknight from "../assets/heavyknight/heavyknight.png";
import Character from "./Character";

export default class Heavyknight extends Character {
    constructor(data) {
        super(data);
    }

    static preload(scene) {
        let heavyknightJson = require('../assets/heavyknight/heavyknight_atlas.json');
        let heavyknightAnim = require('../assets/heavyknight/heavyknight_anim.json');
        scene.load.atlas('heavyknight', heavyknight, heavyknightJson);
        scene.load.animation('heavyknight_anim', heavyknightAnim);
    }

    update() {
        super.update('heavyknight_idle_right');
    }
}