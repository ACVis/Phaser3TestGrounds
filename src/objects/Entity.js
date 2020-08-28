import Phaser from "phaser";
import { CST } from "../objects/Constants";
import { Utils } from "./Utilities";

class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureName, config = {}, frame) {
        super(scene, x, y, textureName, frame);

        this.debug = config?.debug ? true : false;
        if (this.debug) console.log("Entity Created: ", this);

        this.width = CST.TILE_SIZE;
        // this.setOrigin(0, 0);

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //  Or this, the end result is the same
        // scene.sys.displayList.add(this);
        // scene.sys.updateList.add(this);
        // scene.sys.arcadePhysics.world.enableBody(this, 0);
    }
    // create() {
    // 3.2 add to scene
    // scene.add.existing(this);
    // }
    // update() {
    //take turn
    // }
}

export { Entity };
