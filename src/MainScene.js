import Player from "./Player";
import TownsfolkFemale from "./TownsfolkFemale";
import mapTile from "./assets/RPG Nature Tileset.png";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        Player.preload(this);
        TownsfolkFemale.preload(this);
        this.load.image('tiles', mapTile);
        let mapJson = require('./assets/map.json');
        this.load.tilemapTiledJSON('map', mapJson);
    }

    create() {
        // createMap
        const map = this.make.tilemap({
            key: 'map'
        });
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);

        const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        layer1.setCollisionByProperty({
            collides: true
        });
        this.matter.world.convertTilemapLayer(layer1);

        const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0);
        layer2.setCollisionByProperty({
            collides: true
        });
        this.matter.world.convertTilemapLayer(layer2);

        // createPlayer
        this.player = new Player({
            scene: this,
            x: 50,
            y: 50,
            texture: 'heavyknight',
            frame: 'heavyknight_idle_1',
            name: 'Knight'
        });

        // createCursor
        this.input.keyboard.createCursorKeys();
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        // Camera
        var mainCamera = this.cameras.main;
        mainCamera.startFollow(this.player, true);
        mainCamera.setBounds(0, 0, 32 * 16, 32 * 16);

        // createMob
        this.female1 = new TownsfolkFemale({
            scene: this,
            x: 100,
            y: 100,
            texture: 'female',
            frame: 'townsfolk_f_idle_1',
            name: '少女A',
            speech: 'こんにちは'
        });

        this.female2 = new TownsfolkFemale({
            scene: this,
            x: 400,
            y: 100,
            texture: 'female',
            frame: 'townsfolk_f_idle_1',
            name: '少女B',
            speech: 'あら？'
        });

        // collision event
        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: this.female1,
            callback: eventData => {
                if (eventData.bodyA.label == 'playerSensor' && eventData.bodyB.label == 'playerSensor') {
                    this.female1.ballon(true);
                }
            }
        });
        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: this.female1,
            callback: () => {
                this.female1.ballon(false);
            }
        });

        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: this.female2,
            callback: eventData => {
                if (eventData.bodyA.label == 'playerSensor' && eventData.bodyB.label == 'playerSensor') {
                    this.female2.ballon(true);
                }
            }
        });
        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: this.female2,
            callback: () => {
                this.female2.ballon(false);
            }
        });
    }

    update() {
        this.player.update();
        this.female1.update();
        this.female2.update();
    }

}