import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import DropShadowPipelinePlugin from 'phaser3-rex-plugins/plugins/dropshadowpipeline-plugin.js';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
// Scene
import TitleScene from "./scene/TitleScene";
import MainScene from "./scene/MainScene";
import BaseScene from './scene/BaseScene';

const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 380,
    backgroundColor: '#333333',
    parent: 'survival',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        TitleScene,
        MainScene,
        BaseScene,
    ],
    scale: {
        mode: Phaser.Scale.FIT, // 画面に合わせてゲーム画面大きさを変更
        autoCenter: Phaser.Scale.CENTER_BOTH, // 画面中央にゲーム画面を配置
        zoom: 2
    },
    plugins: {
        global: [
            {
                plugin: DropShadowPipelinePlugin,
                key: 'dropShadowPipeline',
                start: true
            },
            {
                plugin: VirtualJoystickPlugin,
                key: 'virtualJoystickPlugin',
                start: true
            }
        ],
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            },
            {
                plugin: UIPlugin,
                key: 'rexUI',
                mapping: 'rexUI'
            }
        ]
    }
};

const game = new Phaser.Game(config);
