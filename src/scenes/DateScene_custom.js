import Phaser from "phaser";
import { Random } from "../objects/Utilities";
import { StateMachine, State } from "../objects/StateMachine";
import { baron, lisa, porchia } from "../objects/Convos";
import { TextButton } from "../objects/Interface";
import { reject } from "lodash-es";
// import images from "../assets/*.png";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
// const COLOR_DARK = 0x445566;
/*                  rest: {
                        fill: "#456",
                        fontSize: fontSizeInt + "px",
                    },
                    active: {
                        fill: "#b66",
                    },
                    hover: {
                        fill: "#579",
*/
let textBoxWidth;
let getRandomIndexes = (num, length) => {
    const output = [];
    //NOTE: NOT THE BEST WAY TO DO THIS
    for (let i = 0; i < num; i++) {
        let uniqueIndex = Random.integer(0, length - 1);
        while (output.includes(uniqueIndex)) {
            uniqueIndex = Random.integer(0, length - 1);
        }
        output.push(uniqueIndex);
    }
    return output;
};

export default class DateSceneCustom extends Phaser.Scene {
    constructor() {
        super("date_custom");
    }
    preload() {
        // this.load
        this.arrows = this.input.keyboard.createCursorKeys();
        this.nextPageIconWidth = this.textures.get("nextPage").source[0].width;
    }

    create(partner) {
        console.log("YOU'RE ON A DATE with", partner);
        const isCrab = partner.isCrab;
        console.log(this.sys.game.scale.gameSize);
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
        //Configs
        const topBox = {
            width: _width / 2,
            height: _height / 4,
            get startX() {
                // return 0 + this.width / 2;
                return 0;
            },
            get startY() {
                // return this.height / 2;
                return 0;
            },
        };
        const botBox = {
            width: _width / 1.75,
            height: _height / 3,
            get startX() {
                return _width - this.width;
            },
            get startY() {
                return _height - this.height;
            },
        };
        // console.log(topBox);
        // var topRect = this.add
        //     .rectangle(
        //         topBox.startX,
        //         topBox.startY,
        //         topBox.width,
        //         topBox.height,
        //         color
        //     )
        //     .setAlpha(0.8)
        //     .setOrigin(0, 0);
        var botRect = this.add
            .rectangle(
                botBox.startX,
                botBox.startY + 200,
                botBox.width,
                botBox.height - 200,
                color
            )
            .setAlpha(0.8)
            .setOrigin(0, 0);

        const botFontSize = 28;
        let chosenIndexes = getRandomIndexes(3, baron.choices.length);
        this.isTalking = false;
        let createLabels = (scene, indexes, partnerOb, x, y) => {
            let output = [];
            let fontSizeInt = botFontSize;
            let yIncrement = 0 + fontSizeInt * 1.125;
            let offset = 0;
            const style = {
                rest: {
                    fill: "#000",
                    fontSize: fontSizeInt + "px",
                },
                active: {
                    fill: "#fff",
                },
                hover: {
                    fill: "#0f0",
                },
                disable: {
                    fill: "#999",
                },
            };
            indexes.forEach((choice, index) => {
                console.log("CHOICE INDEX", choice);
                function wordWrapFunc(text, textObject) {
                    console.log("TEXT TO WRAP", text);
                    // First parameter will be the string that needs to be wrapped
                    // Second parameter will be the Text game object that is being wrapped currently

                    // This wrap just puts each word on a separate line, but you could inject your own
                    // language-specific logic here.
                    var words = text.split(" ");

                    // You can return either an array of individual lines or a string with line breaks (e.g. \n) in
                    // the correct place.
                    return words;
                }
                const text = partnerOb.choices[choice].prompt;

                const dialogueType = partnerOb.isCrab ? "crab" : "human";
                const newBtn = new TextButton(
                    scene,
                    x,
                    y + offset,
                    text,
                    style,
                    (self) => {
                        output.forEach((btn) => btn.disable());
                        createDialogueAsync(
                            this,
                            partnerOb.choices[choice].dialogue[dialogueType],
                            "Baron",
                            0,
                            topBox,
                            botBox
                        ).then(() => {
                            output.forEach((btn) => btn.enable());
                        });
                    }
                );
                output.push(newBtn);

                offset += yIncrement;
            });
            const newBtn = new TextButton(
                scene,
                x,
                y + offset,
                Random.integer(0, 100) < 10
                    ? "Ok, sea ya! I mean see you later!"
                    : "Talk to you later!",
                style,
                (self) => {
                    // this.scene.stop();
                    this.scene.stop();
                    // this.scene.wake("restaurant");
                    this.scene.resume("restaurant");
                    // this.scene.switch("restaurant");
                }
            );
            return output;
        };

        let choices = createLabels(
            this,
            chosenIndexes,
            partner,
            botBox.startX + botFontSize,
            botBox.startY + botBox.height - botFontSize * 4.9
        );

        console.log("CHOSEN INDEXES", chosenIndexes);

        // var tween = this.tweens.add({
        //     targets: dialog,
        //     scaleX: 1,
        //     scaleY: 1,
        //     ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
        //     duration: 1000,
        //     repeat: 0, // -1: infinity
        //     yoyo: false,
        // });
        const content = partner.choices[1].prompt;
        textBoxWidth = getTextBoxWidth(topBox.width - botFontSize, space, 36);
        // createTextBox(this, topBox.startX + 28, topBox.startY + 28, {
        //     wrapWidth: textBoxWidth,
        //     fixedWidth: textBoxWidth,
        //     fixedHeight: 65,
        // }).start(content + " " + content + content + content, 50);
        // createDialogue(
        //     this,
        //     partner.choices[0].dialogue.human,
        //     "Baron",
        //     0,
        //     topBox,
        //     botBox
        // );

        this.print = this.add.text(0, 0, "");
    }
    update() {
        // console.log("istalking", this.isTalking);
    }
}

var createLabel = function (scene, text) {
    console.log("THIS IN CREATELABEL", scene);
    return scene.rexUI.add.label({
        width: 40, // Minimum width of round-rectangle
        height: 40, // Minimum height of round-rectangle

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x5e92f3),

        text: scene.add.text(0, 0, text, {
            fontSize: "24px",
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        },
    });
};

var space = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,
    icon: 10,
    text: 10,
};
var getTextBoxWidth = (finalWidth, space, iconWidth = 0) => {
    const left = space?.left ? space.left : 0;
    const right = space?.right ? space.right : 0;
    const icon = space?.icon ? space.icon : 0;
    const text = space?.text ? space.text : 0;
    //iconWidth is width, icon is the padding width
    const width = finalWidth - left - right - text - icon - iconWidth;
    return width;
};
const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config, onEndCallback) {
    var wrapWidth = GetValue(config, "wrapWidth", 0);
    var fixedWidth = GetValue(config, "fixedWidth", 0);
    var fixedHeight = GetValue(config, "fixedHeight", 0);
    var textBox = scene.rexUI.add
        .textBox({
            x: x,
            y: y,

            background: scene.rexUI.add
                .roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            // icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add
                .image(0, 0, "nextPage")
                .setTint(COLOR_LIGHT)
                .setVisible(false),
            space,
        })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on(
            "pointerdown",
            function () {
                var icon = this.getElement("action").setVisible(false);
                this.resetChildVisibleState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            },
            textBox
        )
        .on(
            "pageend",
            function () {
                // if (this.isLastPage) {
                //     console.log("IS LAST PAGE");
                //     onEndCallback(textBox);
                //     return;
                // }

                var icon = this.getElement("action").setVisible(true);
                this.resetChildVisibleState(icon);
                icon.y -= 30;
                var tween = scene.tweens.add({
                    targets: icon,
                    y: "+=30", // '+=100'
                    ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false,
                });
            },
            textBox
        );
    //.on('type', function () {
    //})

    return textBox;
};
var createTextBoxBasic = function (scene, x, y, config, onEndCallback) {
    var wrapWidth = GetValue(config, "wrapWidth", 0);
    var fixedWidth = GetValue(config, "fixedWidth", 0);
    var fixedHeight = GetValue(config, "fixedHeight", 0);
    var textBox = scene.rexUI.add
        .textBox({
            x: x,
            y: y,

            background: scene.rexUI.add
                .roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            // icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add
                .image(0, 0, "nextPage")
                .setTint(COLOR_LIGHT)
                .setVisible(false),
            space,
        })
        .setOrigin(0)
        .layout();

    textBox.setInteractive();
    //.on('type', function () {
    //})

    return textBox;
};

// var createDialogue = function (scene, dialogArr, key, topBox, botBox) {
//     dialogArr.forEach((item, index) => {
//         const isLastLine = index < dialogArr.length ? false : true;
//         let callback = null;
//         if (isLastLine) {
//             callback = function (context) {
//                 context.destroy();
//             };
//         } else {
//             callback = function () {
//                 create;
//             };
//         }
//         //create top dialogue box
//         if (item[key]) {
//             //create top dialogue box
//         } else if (item.You) {
//             createTextBox(scene, topBox.startX + 28, topBox.startY + 28, {
//                 wrapWidth: textBoxWidth,
//                 fixedWidth: textBoxWidth,
//                 fixedHeight: 65,
//             }).start(content + " " + content + content + content, 50);
//         }
//     });
// };
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var createDialogue = function (
    scene,
    dialogArr,
    key,
    iteration = 0,
    topBox,
    botBox,
    talking
) {
    let config = {};
    let count = iteration;
    const isLastLine = count < dialogArr.length ? false : true;
    let callback = null;
    if (isLastLine) {
        // if (typeof talking !== "undefined") {
        //     talking = false;
        // }
        return false;
    } else {
        count += 1;
        callback = function (context) {
            // const nextLineOb = dialogArr[count];
            setTimeout(() => {
                createDialogue(scene, dialogArr, key, count, topBox, botBox);
                context.destroy();
            }, 400);
        };
    }
    let currentKey = "You";
    config = botBox;
    if (!dialogArr[iteration]?.You) {
        currentKey = key;
        config = topBox;
    }
    createTextBox(
        scene,
        config.startX + 28,
        config.startY + 28,
        {
            wrapWidth: textBoxWidth,
            fixedWidth: textBoxWidth,
            fixedHeight: 65,
        },
        callback
    ).start(dialogArr[iteration][currentKey], 40);
    return true;
};
var createDialoguePromise = function (
    scene,
    dialogArr,
    key,
    iteration = 0,
    topBox,
    botBox,
    talking
) {
    let config = {};
    let count = iteration;
    const isLastLine = count < dialogArr.length ? false : true;
    let callback = null;
    if (isLastLine) {
        // if (typeof talking !== "undefined") {
        //     talking = false;
        // }
        return false;
    } else {
        count += 1;
        callback = function (context) {
            // const nextLineOb = dialogArr[count];
            setTimeout(() => {
                createDialogue(scene, dialogArr, key, count, topBox, botBox);
                context.destroy();
            }, 400);
        };
    }
    let currentKey = "You";
    config = botBox;
    if (!dialogArr[iteration]?.You) {
        currentKey = key;
        config = topBox;
    }
    createTextBox(
        scene,
        config.startX + 28,
        config.startY + 28,
        {
            wrapWidth: textBoxWidth,
            fixedWidth: textBoxWidth,
            fixedHeight: 65,
        },
        callback
    ).start(dialogArr[iteration][currentKey], 40);
    return true;
};
////////////////////////////////////////////////////////////////////////////
var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add
        .text(0, 0, "", {
            fontSize: "20px",
            wordWrap: {
                width: wrapWidth,
            },
            maxLines: 3,
        })
        .setFixedSize(fixedWidth, fixedHeight);
};
////////////////////////////////////////////////////////////////////////////
var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, "", {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: "20px",
        wrap: {
            mode: "word",
            width: wrapWidth,
        },
        maxLines: 3,
    });
};

var createDialogueAsync = async function (
    scene,
    dialogArr,
    topKey,
    iteration = 0,
    topBox,
    botBox,
    config
) {
    return new Promise(async (resolve, reject) => {
        let count = 0;
        for (const nextLine of dialogArr) {
            count++;
            //TODO: run any callbacks per line, probably passing scene in
            config = {
                nextDelay: 1000,
                destroyDelay: 1500,
                lastDelay: 1000,
                //overwrite these defaults with anything that was passed in
                ...config,
            };
            const botKey = "You";
            let txtbox;
            let text;
            if (nextLine[topKey]) {
                txtbox = createTextBoxBasic(
                    scene,
                    topBox.startX + 28,
                    topBox.startY + 28,
                    {
                        wrapWidth: textBoxWidth,
                        fixedWidth: textBoxWidth,
                        fixedHeight: 65,
                    }
                );
                text = nextLine[topKey];
            } else {
                txtbox = createTextBoxBasic(
                    scene,
                    botBox.startX + 28,
                    botBox.startY + 28,
                    {
                        wrapWidth: textBoxWidth,
                        fixedWidth: textBoxWidth,
                        fixedHeight: 65,
                    }
                    // callback
                );
                text = nextLine[botKey];
            }
            const isLastLine = count < dialogArr.length ? false : true;
            if (isLastLine) console.log("IS LAST LINE");

            let line = new Promise((resolve, reject) => {
                let clicked = false;
                txtbox
                    .on(
                        "pointerdown",
                        function () {
                            clicked = true;
                            var icon = this.getElement("action").setVisible(
                                false
                            );
                            this.resetChildVisibleState(icon);
                            if (this.isTyping) {
                                this.stop(true);
                            } else {
                                this.typeNextPage();
                            }
                        },
                        txtbox
                    )
                    .on(
                        "pageend",
                        function (context) {
                            if (this.isLastPage) {
                                console.log("IS LAST PAGE");

                                if (clicked) {
                                    this.destroy();
                                    resolve();
                                } else if (isLastLine) {
                                    setTimeout(() => {
                                        resolve();
                                        this.destroy();
                                    }, config.lastDelay);
                                } else {
                                    setTimeout(() => {
                                        resolve();
                                    }, config.nextDelay);

                                    setTimeout(() => {
                                        this.destroy();
                                    }, config.destroyDelay);
                                }
                            }
                        },
                        txtbox
                    )
                    .start(text, 40);
            });
            await line;
            if (isLastLine) resolve();
        }
    });
};

var mockCreateTextBox = async (text, callback) => {
    return new Promise((resolve, reject) => {
        console.log(text);
        setTimeout(() => {
            callback();
        }, 500);
    });
};
var createTextBoxPromise = (
    scene,
    text,
    x,
    y,
    config,
    onEndCallback,
    pace = 40
) => {
    return new Promise((resolve, reject) => {
        // console.log(text);
        // setTimeout(() => {
        //     callback();
        // }, 500);
        createTextBox(scene, x, y, config, onEndCallback).start(text, pace);
    });
};
