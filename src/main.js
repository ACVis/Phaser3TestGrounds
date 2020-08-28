import Phaser from "phaser";
import { CST } from "./objects/Constants";
import Preloader from "./scenes/Preloader";
import Restaurant from "./scenes/Restaurant";
import TitleScene from "./scenes/TitleScene";
import DateSceneCustom from "./scenes/DateScene_custom";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

export default new Phaser.Game({
    backgroundColor: "#3498db",
    scene: [Preloader, TitleScene, Restaurant, DateSceneCustom],
    physics: { default: "arcade", arcade: { debug: true } },
    parent: "game",
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    plugins: {
        scene: [
            {
                key: "rexUI",
                plugin: RexUIPlugin,
                mapping: "rexUI",
            },
        ],
    },
});
