import Phaser from "phaser";

const createMainCharacterAnims = (anims) => {
    // 0.2 create animations
    anims.create({
        key: "anim-mc-idle-down",
        frames: anims.generateFrameNumbers("mc-walk-down"),
        frameRate: 1,
        repeat: -1,
    });
    anims.create({
        key: "anim-mc-walk-down",
        frames: anims.generateFrameNumbers("mc-walk-down"),
        frameRate: 8,
        repeat: -1,
    });
    anims.create({
        key: "anim-mc-walk-up",
        frames: anims.generateFrameNumbers("mc-walk-up"),
        frameRate: 8,
        repeat: -1,
    });
    anims.create({
        key: "anim-mc-walk-right",
        frames: anims.generateFrameNumbers("mc-walk-right"),
        frameRate: 8,
        repeat: -1,
    });
    anims.create({
        key: "anim-mc-walk-left",
        frames: anims.generateFrameNumbers("mc-walk-left"),
        frameRate: 8,
        repeat: -1,
    });

    // BARON
    anims.create({
        key: "anim-baron-idle-down",
        frames: anims.generateFrameNumbers("baron-idle-down"),
        frameRate: 1,
        repeat: -1,
    });

    // LISA
    anims.create({
        key: "anim-lisa-idle-down",
        frames: anims.generateFrameNumbers("lisa-idle-down"),
        frameRate: 1,
        repeat: -1,
    });

    // PORCHIA
    anims.create({
        key: "anim-porchia-idle-down",
        frames: anims.generateFrameNumbers("porchia-idle-down"),
        frameRate: 4,
        repeat: -1,
    });

    // anims.create({
    //     key: "faune-idle-side",
    //     frames: [{ key: "faune", frame: "walk-side-3.png" }],
    // });

    // anims.create({
    //     key: "faune-run-down",
    //     frames: anims.generateFrameNames("faune", {
    //         start: 1,
    //         end: 8,
    //         prefix: "run-down-",
    //         suffix: ".png",
    //     }),
    //     repeat: -1,
    //     frameRate: 15,
    // });
};
export { createMainCharacterAnims };
