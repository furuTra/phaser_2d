import Player from "../character/Player";
import TownsfolkFemale from "../character/TownsfolkFemale";
import Info from "../utils/Info";
import Map from "../map/Map";
import Entrance from "../utils/Entrance";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        Player.preload(this);
        TownsfolkFemale.preload(this);
        Map.preload(this);
    }

    create() {
        this.map = new Map(this);
        this.map.create();

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
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 32 * 16, 32 * 16);
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

    createDialog(text, x, y) {
        var dialog = this.rexUI.add.dialog({
            x: x,
            y: y,
            background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xAAAAAA, 0.5),
            content: this.add.text(0, 0, text, {
                fontSize: '10px'
            }),
            space: {
                content: 25,
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
            expand: {
                content: true
            }
        })
        .layout()
        .popUp(500);

        return dialog;
    }

    createInfo() {
        // infoのある位置をPhysics.Matter.Sprite化
        this.map.filterObjects('InfoPoint', obj => {
            new Info({ scene: this, x: obj.x, y: obj.y, name: obj.name })
        });

        // インフォダイアログ作成関数
        let dialog;
        const infoDialog = (info, x, y) => {
            dialog = this.createDialog(info, x, y);
        };

        // インフォダイアログ除去
        const removeDialog = () => {
            dialog.scaleDownDestroy(100);
        };

        // 岩の間
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'flowerInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'flowerInfo')
            ) {
                infoDialog('花が咲いている', bodyA.position.x, bodyA.position.y);
            }
        });
        this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'flowerInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'flowerInfo')
            ) {
                removeDialog();
            }
        });

        // 看板（池）
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'fountainInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'fountainInfo')
            ) {
                infoDialog('生活水を貯める池だ', bodyA.position.x, bodyA.position.y);
            }
        });
        this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'fountainInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'fountainInfo')
            ) {
                removeDialog();
            }
        });

        // 看板（次のエリア）
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'newAreaInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'newAreaInfo')
            ) {
                infoDialog('この先危険地帯', bodyA.position.x, bodyA.position.y);
            }
        });
        this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
            if (
                (bodyA.label == 'playerSensor' && bodyB.label == 'newAreaInfo') ||
                (bodyB.label == 'playerSensor' && bodyA.label == 'newAreaInfo')
            ) {
                removeDialog();
            }
        });
    }

    createCursorKeys() {
        this.player.inputKeys = this.scene.settings.data.inputKeys;
    }

    createJoyStick() {
        this.player.cursorKeys = this.scene.settings.data.joyStick;
    }

}