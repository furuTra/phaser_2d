import mapTile from "../assets/RPG Nature Tileset.png";

export default class Map {
    constructor(scene) {
        this.scene = scene;
    }

    static preload (scene) {
        scene.load.image('tiles', mapTile);
        let mapJson = require('../assets/map.json');
        scene.load.tilemapTiledJSON('map', mapJson);
    }

    create () {
        this.scene.map = this.scene.make.tilemap({
            key: 'map'
        });

        let layer1 = this.createLayer('Tile Layer 1');
        this.scene.matter.world.convertTilemapLayer(layer1);

        let layer2 = this.createLayer('Tile Layer 2');
        this.scene.matter.world.convertTilemapLayer(layer2);
    }

    createLayer(layerName) {
        let tileset = this.scene.map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);
        let layer = this.scene.map.createStaticLayer(layerName, tileset, 0, 0);
        layer.setCollisionByProperty({
            collides: true
        });
        return layer;
    }
}