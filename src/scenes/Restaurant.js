import Phaser, { Tilemaps } from "phaser";
import { CST } from "../objects/Constants";
import { Player } from "../objects/Player";
import { Entity } from "../objects/Entity";
import { StateMachine, State } from "../objects/StateMachine";
import images from "../assets/*.png";
import tileset from "../assets/tileset/*.png";
import Map1 from "../assets/tileset/Map1.json";
import * as partners from "../objects/Convos";
import { TextButton } from "../objects/Interface";
import { Utils } from "../objects/Utilities";
import { createMainCharacterAnims } from "../objects/Anims";

class DefaultControlState extends State {
    constructor(config) {
        super(config);
    }
    handleInput = (keyevent) => {
        this.subject.handleInput(keyevent);

        if ("activates menu somehow") {
            this.transition(STATE_LIST.menu);
        }
    };
    update() {
        this.subject.update();
    }
}
class InventoryControlState extends State {
    handleInput(keyevent) {}
    update() {}
}
class MenuControlState extends State {
    handleInput(keyevent) {}
    update() {}
}
const STATE_LIST = {
    default: DefaultControlState,
    inventory: InventoryControlState,
    menu: MenuControlState,
};

export default class Restaurant extends Phaser.Scene {
    constructor() {
        super("restaurant");
    }
    preload() {
        this.load.tilemapTiledJSON("map1", Map1);
        this.load.image("tileset_neon", tileset.tileset_neon);
        this.load.image("tileset_neon_alex", tileset.tileset_neon_alex);
        this.arrows = this.input.keyboard.createCursorKeys();
    }
    create() {
        createMainCharacterAnims(this.anims);
        //Set Scene debug mode
        this.debug = true;
        if (this.debug) console.log("DEBUG MODE");

        //CREATE MAP
        // let map = this.add.tilemap("dmap");
        let map = this.add.tilemap("map1");
        this.map = map;

        //Get Player Spawn
        // const playerLayer = map.getObjectLayer("Player");
        const playerSpawn = map.findObject(
            "objects",
            (obj) => obj.name == "StartPosition"
        );
        const Date1Object = map.findObject(
            "objects",
            (obj) => obj.name == "Date1"
        );
        const Date2Object = map.findObject(
            "objects",
            (obj) => obj.name == "Date2"
        );
        const Date3Object = map.findObject(
            "objects",
            (obj) => obj.name == "Date3"
        );
        console.log(playerSpawn);
        console.log(Date1Object);
        console.log(Date2Object);
        console.log(Date3Object);

        //CREATE TILESETS
        // const tiles2 = map.addTilesetImage("tileset_dungeon", "tiles");
        const tileSetNeon = map.addTilesetImage("tileset_neon");
        const tileSetNeonAlex = map.addTilesetImage("tileset_neon_alex");

        //CREATE LAYERS and add tilesets to them
        //EACH TILELAYER/SPRITE OBJECT WILL RENDER ON TOP OF EACH OTHER
        //LAST ADDED LAYER RENDERS OVER ALL OTHERS
        //ORDER MATTERS
        //Create but Don't show collision layer (don't give it a tilset)
        const collisionLayer = map.createStaticLayer("collision");
        const belowLayer = map.createStaticLayer("below", [
            tileSetNeon,
            tileSetNeonAlex,
        ]);
        const middleLayer = map.createStaticLayer("middle", [
            tileSetNeon,
            tileSetNeonAlex,
        ]);
        //Create NPCs
        this.Date1 = new Entity(
            this,
            Date1Object.x,
            Date1Object.y,
            "baron-idle-down",
            { debug: true },
            0
        ).setName("Date1");
        this.anims.play("anim-baron-idle-down", this.Date1);
        this.Date1.body.setSize(32, 32);

        this.Date2 = new Entity(
            this,
            Date2Object.x,
            Date2Object.y,
            "lisa-idle-down",
            { debug: true },
            1
        ).setName("Date2");
        this.anims.play("anim-lisa-idle-down", this.Date2);
        this.Date2.body.setImmovable();

        this.Date3 = new Entity(
            this,
            Date3Object.x,
            Date3Object.y,
            "mc-walk-down",
            { debug: true },
            1
        ).setName("Date3");
        this.anims.play("anim-porchia-idle-down", this.Date3);
        this.Date3.body.setImmovable();
        // const dateGroup = this.physics.add.group([this.Date1, this.Date2, this.Date3]);

        //Create Player

        // this.player = this.add.player(
        //     playerSpawn.x,
        //     playerSpawn.y,
        //     "mc_walk_down"
        // );
        this.player = new Player(
            this,
            playerSpawn.x,
            playerSpawn.y,
            "mc_walk_down"
        );
        this.player.body.setSize(32, 32);
        const aboveLayer = map.createStaticLayer("above", [
            tileSetNeon,
            tileSetNeonAlex,
        ]);
        // Utils.setLayerDebug(this, collisionLayer);

        //Set Player debug mode
        this.player.debug = true;
        //SET COLLISION AND OVERLAP
        collisionLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, collisionLayer);
        this.physics.add.overlap(this.player, this.Date1);
        this.physics.add.overlap(this.player, this.Date2);
        this.physics.add.overlap(this.player, this.Date3);
        // this.physics.add.overlap(this.player, dateGroup); //Doesn't work for some reason

        console.log("Scene DisplayList: ", this.children);
        console.log("Physics Bodies: ", this.physics.world.bodies);
        // Set default state for controls
        this.ControlState = new StateMachine(STATE_LIST.default, STATE_LIST, {
            scene: this,
            subject: this.player,
        });

        // Handle Turns/Actions?
        let dates = [this.Date1, this.Date2, this.Date3];
        //Set all dates to crab
        dates.forEach((date) => (date.isCrab = true));
        //Pick one to be human
        const human = Utils.Random.pick(dates);
        human.isCrab = false;
        console.log("Dates Array", dates);

        //Create UI
        this.dateBaronBtn = new TextButton(
            this,
            this.Date1.x - 32,
            this.Date1.y - 32 - 8,
            "Dialogue",
            { fill: "#0f0", fontSize: "16px" },
            () => {
                this.physics.pause();
                this.scene.pause();
                this.scene.start(
                    "date_custom",
                    Object.assign(partners.baron, { isCrab: true })
                );
            }
        );
        this.dateBaronBtn.visible = false;

        this.dateLisaBtn = new TextButton(
            this,
            this.Date2.x - 32,
            this.Date2.y - 32 - 8,
            "Dialogue",
            { fill: "#0f0", fontSize: "16px" },
            () => {
                // this.scene.sleep();
                this.scene.switch(
                    "date_custom",
                    Object.assign(partners.lisa, { isCrab: true })
                );
            }
        );
        this.dateLisaBtn.visible = false;

        this.datePorchiaBtn = new TextButton(
            this,
            this.Date3.x - 32,
            this.Date3.y - 32 - 8,
            "Dialogue",
            { fill: "#0f0", fontSize: "16px" },
            () =>
                // this.scene.sleep();
                this.scene.start(
                    "date_custom",
                    Object.assign(partners.porchia, { isCrab: true })
                )
        );
        this.datePorchiaBtn.visible = false;

        //Setup cameras
        const camera = this.cameras.main;
        this.cameras.main
            .setZoom(3)
            .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
            // .centerOn(this.player.x, this.scale.y);
            .startFollow(this.player);
        // OR
        // .centerToBounds()

        //ON WAKE
        this.events.on(
            "wake",
            () => {
                // this.player.enableBody();
                // this.physics.world.enable(this.player

                //IF BELOW UNCOMMENTED, will see physics error
                this.physics.resume();
            },
            this
        );
        //ON RESUME
        this.events.on(
            "resume",
            () => {
                // this.player.enableBody();
                // this.physics.world.enable(this.player

                //IF BELOW UNCOMMENTED, will see physics error
                this.add.existing(this.player);
                this.physics.add.existing(this.player);
                this.physics.resume();
            },
            this
        );
    }

    update() {
        if (checkOverlap(this.player, this.Date1)) {
            this.dateBaronBtn.visible = true;
        } else {
            this.dateBaronBtn.visible = false;
        }
        if (checkOverlap(this.player, this.Date2)) {
            this.dateLisaBtn.visible = true;
        } else {
            this.dateLisaBtn.visible = false;
        }
        if (checkOverlap(this.player, this.Date3)) {
            this.datePorchiaBtn.visible = true;
        } else {
            this.datePorchiaBtn.visible = false;
        }

        this.ControlState.handleInput(this.arrows);
        this.ControlState.update();
    }
}
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}
