import Phaser from 'phaser';
import * as PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import MainScene from "./MainScene";

const config = {
    type: Phaser.AUTO,
    width: 380,
    height: 380,
    backgroundColor: '#333333',
    parent: 'survival',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        MainScene
    ],
    scale: {
        zoom: 2
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
};

const game = new Phaser.Game(config);
