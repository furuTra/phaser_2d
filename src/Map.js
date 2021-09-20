import mapTile from "./assets/RPG Nature Tileset.png";

export default class Map {
    constructor(data) {
        let { scene } = data;

    }

    static preload(scene) {
        this.load.image('tiles', mapTile);
        let mapJson = require('./assets/map.json');
        this.load.tilemapTiledJSON('map', mapJson);
    }
}