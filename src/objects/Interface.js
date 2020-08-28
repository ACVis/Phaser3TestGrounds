const defaultStyle = {
    fontFamily: "Courier",
    fontSize: "16px",
    fontStyle: "",
    backgroundColor: null,
    color: "#fff",
    stroke: "#fff",
    strokeThickness: 0,
    shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#000",
        blur: 0,
        stroke: false,
        fill: false,
    },
    align: "left", // 'left'|'center'|'right'|'justify'
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: "|MÉqgy",
    wordWrap: {
        width: null,
        callback: null,
        callbackScope: null,
        useAdvancedWrap: false,
    },
    metrics: false,
    // metrics: {
    //     ascent: 0,
    //     descent: 0,
    //     fontSize: 0
    // }
    // resolution: 1
};

export class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, callback) {
        super(scene, x, y, text, style.rest ? style.rest : style);
        this.restStyle = style.rest ? style.rest : style;
        this.disableStyle = style.disable ? style.disable : style;
        this.activeStyle = style.active ? style.active : style;
        this.hoverStyle = style.hover ? style.hover : style;

        this.enabled = true;
        this.setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.enterButtonHoverState())
            .on("pointerout", () => {
                if (this.enabled) this.enterButtonRestState();
            })
            .on("pointerdown", () => this.enterButtonActiveState())
            .on("pointerup", () => {
                this.enterButtonHoverState();
                callback(this);
            });
        scene.add.existing(this);
    }
    enable(style) {
        this.setInteractive();
        this.enabled = true;
        this.enterButtonRestState(style);
    }
    disable(style) {
        this.disableInteractive();
        //disableInteractive doesnt stop interaction until the next tick, so we set our own flag
        this.enabled = false;
        this.setStyle({ ...this.disableStyle, ...style });
    }
    enterButtonHoverState(style) {
        // this.setStyle({ fill: "#ff0" });
        this.setStyle({ ...this.hoverStyle, ...style });
    }

    enterButtonRestState(style) {
        // this.setStyle({ fill: "#0f0" });
        console.log("REST STATE");
        this.setStyle({ ...this.restStyle, ...style });
    }

    enterButtonActiveState(style) {
        // this.setStyle({ fill: "#0ff" });
        this.setStyle({ ...this.activeStyle, ...style });
    }

    //the setInteractive State callbacks would have to use a style config object that these could set, this.hoverConfig etc
    //    setButtonHoverState(style) {
    //        // this.setStyle({ fill: "#ff0" });
    //        this.setStyle({
    //            ...style,
    //            fill: style.hoverStyle ? style.hoverStyle : this.hoverStyle,
    //        });
    //    }
    //    setButtonRestState(style) {
    //        // this.setStyle({ fill: "#0f0" });
    //        this.setStyle({
    //            ...style,
    //            fill: style.restStyle ? style.restStyle : this.restStyle,
    //        });
    //    }

    //    setButtonActiveState(style) {
    //        // this.setStyle({ fill: "#0ff" });
    //        this.setStyle({
    //            ...style,
    //            fill: style.activeStyle
    //                ? style.activeStyle
    //                : this.activeStyle,
    //        });
    //    }
}
