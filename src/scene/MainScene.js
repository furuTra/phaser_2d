import Player from "../character/Player";
import TownsfolkFemale from "../character/TownsfolkFemale";
import Info from "../utils/Info";
import Entrance from "../utils/Entrance";
import mapTile from "../assets/RPG Nature Tileset.png";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        Player.preload(this);
        TownsfolkFemale.preload(this);
        this.load.image('tiles', mapTile);
        let mapJson = require('../assets/map.json');
        this.load.tilemapTiledJSON('map', mapJson);
    }

    create() {
        this.createMap();

        this.createInfo();

        this.createEntrance();

        // createShadow
        this.dropShadowPipeline = this.plugins.get('dropShadowPipeline');

        // createPlayer
        this.player = new Player({
            scene: this,
            x: 50,
            y: 50,
            texture: 'heavyknight',
            frame: 'heavyknight_idle_1',
            name: 'Knight'
        });

        this.createCamera();

        this.createJoyStick();

        this.createCursorKeys();

        // createMob
        this.female1 = new TownsfolkFemale({
            scene: this,
            x: 100,
            y: 100,
            texture: 'female',
            frame: 'townsfolk_f_idle_1',
            name: '少女A',
            speech: 'よく来たわね'
        });

        this.female2 = new TownsfolkFemale({
            scene: this,
            x: 400,
            y: 100,
            texture: 'female',
            frame: 'townsfolk_f_idle_1',
            name: '少女B',
            speech: 'あらあら？'
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
    
    createCamera() {
        let mainCamera = this.cameras.main;
        mainCamera.startFollow(this.player, true);
        mainCamera.setBounds(0, 0, 32 * 16, 32 * 16);
    }

    createMap() {
        this.map = this.make.tilemap({
            key: 'map'
        });
        const tileset = this.map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);

        const layer1 = this.map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        layer1.setCollisionByProperty({
            collides: true
        });
        this.matter.world.convertTilemapLayer(layer1);

        const layer2 = this.map.createStaticLayer('Tile Layer 2', tileset, 0, 0);
        layer2.setCollisionByProperty({
            collides: true
        });
        this.matter.world.convertTilemapLayer(layer2);
    }

    createEntrance() {
        this.map.filterObjects('MovePoint', obj => {
            new Entrance({ scene: this, x: obj.x, y: obj.y, width: obj.width, height: obj.height, name: obj.name })
        });

        // 次のエリアに進む前に、目印を出す。
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'preNextArea') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'preNextArea')
            ) {
                console.log('preNextArea');
            }
        });

        // 次のエリア表示
        const nextScene = () => {
            this.scene.start('TitleScene');
        };

        // 次のエリアに進む
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerCollider' && bodyB.label == 'nextArea') ||
                (bodyB.label == 'playerCollider' && bodyA.label == 'nextArea')
            ) {
                nextScene();
            }
        });

    }

    createInfo() {
        // infoのある位置をPhysics.Matter.Sprite化
        this.map.filterObjects('InfoPoint', obj => {
            new Info({ scene: this, x: obj.x, y: obj.y, name: obj.name })
        });

        // 岩の間
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'flowerInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'flowerInfo')
            ) {
                console.log('flowerInfo');
            }            
        });

        // 看板（池）
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'fountainInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'fountainInfo')
            ) {
                console.log('fountainInfo');
            }            
        });

        // 看板（次のエリア）
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'newAreaInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'newAreaInfo')
            ) {
                console.log('newAreaInfo');
            }            
        });
    }

    createCursorKeys() {
        this.input.keyboard.createCursorKeys();
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

    createJoyStick() {
        var baseJoyStick = this.add.circle(0, 0, 30, 0x888888);
        var thumbJoyStick = this.add.circle(0, 0, 15, 0xcccccc);
        this.dropShadowPipeline.add(baseJoyStick, {
            distance: 4,
            angle: 270,
            shadowColor: '#666666',
            alpha: 0.5,
            blur: 0
        });
        this.dropShadowPipeline.add(thumbJoyStick, {
            distance: 4,
            angle: 270,
            shadowColor: '#666666',
            alpha: 0.5,
            blur: 0
        });
        var joyStick = this.plugins.get('virtualJoystickPlugin').add(this, {
            x: 350,
            y: 350,
            radius: 15,
            base: baseJoyStick,
            thumb: thumbJoyStick
        });
        this.player.cursorKeys = joyStick.createCursorKeys();
    }

}