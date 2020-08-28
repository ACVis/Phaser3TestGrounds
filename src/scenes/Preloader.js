import Phaser from "phaser";
import images from "../assets/images/*.png";
import spritesheets from "../assets/*.png";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }
    preload() {
        // IMAGES //
        this.load.image("nextPage", images.arrow_down_left);

        this.load.image("mc-convo-lower-left", images.mc_convo_lower_left);
        this.load.image("table-bg", images.table_bg);
        this.load.image("table-fg", images.table_fg);

        // SPRITESHEETS //
        this.load.spritesheet("mc-walk-down", spritesheets.mc_walk_down, {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("mc-walk-up", spritesheets.mc_walk_up, {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("mc-walk-right", spritesheets.mc_walk_right, {
            frameWidth: 32,
            frameHeight: 32,
            // startFrame: 0,
            // endFrame: 8,
        });
        this.load.spritesheet("mc-walk-left", spritesheets.mc_walk_left, {
            frameWidth: 32,
            frameHeight: 32,
            // startFrame: 0,
            // endFrame: 8,
        });

        //BARON
        this.load.spritesheet("baron-idle-down", spritesheets.baron_idle_down, {
            frameWidth: 32,
            frameHeight: 32,
            // startFrame: 0,
            // endFrame: 8,
        });

        //LISA
        this.load.spritesheet("lisa-idle-down", spritesheets.lisa_idle_down, {
            frameWidth: 32,
            frameHeight: 32,
            // startFrame: 0,
            // endFrame: 8,
        });
        //LISA
        this.load.spritesheet(
            "porchia-idle-down",
            spritesheets.porchia_idle_down,
            {
                frameWidth: 32,
                frameHeight: 32,
                // startFrame: 0,
                // endFrame: 8,
            }
        );
    }

    create() {
        this.scene.start("title");
    }
}
