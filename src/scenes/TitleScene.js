import Phaser from "phaser";
import { Random } from "../objects/Utilities";
import { StateMachine, State } from "../objects/StateMachine";
import { baron, lisa, porchia } from "../objects/Convos";
import { TextButton } from "../objects/Interface";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super("title");
    }
    preload() {
        // this.load
    }

    create(choices) {
        // Have Cool/funny bg image, maybe some parrallel fx goin on or some particles spewing?
        const size = this.sys.game.scale.gameSize;
        let { _width, _height } = size;

        var color = Phaser.Display.Color.HSVToRGB(0.1, 80, 50).color;
        this.mcImgHeight = this.textures.get(
            "mc-convo-lower-left"
        ).source[0].height;
        this.mcImgWidth = this.textures.get(
            "mc-convo-lower-left"
        ).source[0].width;

        this.tableFgImgHeight = this.textures.get("table-fg").source[0].height;
        this.tableFgImgWidth = this.textures.get("table-fg").source[0].width;

        this.tableBgImgHeight = this.textures.get("table-bg").source[0].height;
        this.tableBgImgWidth = this.textures.get("table-bg").source[0].width;

        this.add
            .image(0, _height - this.tableBgImgHeight, "table-bg")
            .setOrigin(0, 0);
        this.add
            .image(0, _height - this.tableFgImgHeight, "table-fg")
            .setOrigin(0, 0);
        this.add
            .image(0, _height - this.mcImgHeight, "mc-convo-lower-left")
            .setOrigin(0, 0);
        // Have two (text) buttons
        const btnFontSize = 56;
        // New Game
        this.newGameBtn = new TextButton(
            this,
            _width / 1.29,
            _height / 2,
            "New Game",
            {
                rest: { fill: "#AD4C17", fontSize: btnFontSize + "px" },
                hover: { fill: "#AD9717" },
            },
            () => this.scene.start("restaurant")
        ).setOrigin(0.5, 0.5);
        // Quit
        this.exitGameBtn = new TextButton(
            this,
            _width / 1.29,
            _height / 2 + btnFontSize,
            "Quit",
            {
                rest: { fill: "#AD4C17", fontSize: btnFontSize + "px" },
                hover: { fill: "#AD9717" },
            },
            () => this.game.destroy(true)
        ).setOrigin(0.5, 0.5);
    }
    update() {}
}
