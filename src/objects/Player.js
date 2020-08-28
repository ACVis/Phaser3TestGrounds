import Phaser from "phaser";
import { Entity } from "./Entity";
import { CST } from "./Constants";
import { StateMachine, State } from "./StateMachine";
import { Utils } from "./Utilities";

class DefaultState extends State {
    constructor(config) {
        super(config);
    }

    handleInput = (input) => {
        const { x, y } = this.subject;

        // if (input.code == "ArrowRight") {
        //     // this.takeTurn();
        //     this.subject.x += CST.TILE_SIZE;
        //     console.log(this.subject.width, this.subject.displayWidth);

        //     console.log("right up!");
        // } else if (input.code == "ArrowDown") {
        //     // this.takeTurn();
        //     this.subject.y += CST.TILE_SIZE;

        //     console.log("down down!");
        // } else if (input.code == "ArrowLeft") {
        //     // this.takeTurn();
        //     this.subject.x -= CST.TILE_SIZE;
        //     console.log("right up!");
        // } else if (input.code == "ArrowUp") {
        //     // this.takeTurn();
        //     this.subject.y -= CST.TILE_SIZE;

        //     console.log("down up!");
        // }

        // if (!arrows) {
        //     return;
        // }

        // const speed = 100;

        // if (leftDown) {
        //     // this.anims.play("faune-run-side", true);
        //     this.subject.setVelocity(-speed, 0);

        //     this.subject.scaleX = -1;
        //     this.subject.body.offset.x = 24; // ???
        // } else if (rightDown) {
        //     // this.subject.anims.play("faune-run-side", true);
        //     this.subject.setVelocity(speed, 0);

        //     this.subject.scaleX = 1;
        //     this.subject.body.offset.x = 8; /// ???
        // } else if (upDown) {
        //     // this.subject.anims.play("faune-run-up", true);
        //     this.subject.setVelocity(0, -speed);
        // } else if (downDown) {
        //     // this.subject.anims.play("faune-run-down", true);
        //     this.subject.setVelocity(0, speed);
        // } else {
        //     // const parts = this.subject.anims.currentAnim.key.split("-");
        //     // parts[1] = "idle";
        //     // this.subject.anims.play(parts.join("-"));
        //     this.subject.setVelocity(0, 0);
        // }

        const leftDown = input.left?.isDown;
        const rightDown = input.right?.isDown;
        const upDown = input.up?.isDown;
        const downDown = input.down?.isDown;
        // Stop any previous movement from the last frame
        this.subject.body.setVelocity(0);

        // Horizontal movement
        if (leftDown) {
            this.subject.body.setVelocityX(-100);
            this.subject.anims.play("anim-mc-walk-left", true);
        } else if (rightDown) {
            this.subject.body.setVelocityX(100);
            this.subject.anims.play("anim-mc-walk-right", true);
        }

        // Vertical movement
        if (upDown) {
            this.subject.body.setVelocityY(-100);
            this.subject.anims.play("anim-mc-walk-up", true);
        } else if (downDown) {
            this.subject.body.setVelocityY(100);
            this.subject.anims.play("anim-mc-walk-down", true);
        }

        if (!leftDown && !rightDown && !upDown && !downDown) {
            this.subject.anims.play("anim-mc-idle-down", true);
        }
        // console.log("SPEED", this.subject);
        this.subject.body.velocity.normalize().scale(this.subject.body.speed);
        // Normalize and scale the velocity so that this.subject can't move faster along a diagonal
    };

    update(player) {
        // this.velocityY = JUMP_VELOCITY;
    }

    // enter(player) {
    //     player.setGraphics(IMAGE_JUMP);
    // }
}
const STATE_LIST = {
    default: DefaultState,
};
export class Player extends Entity {
    constructor(
        scene,
        x,
        y,
        textureName = CST.IMGS.KEYS.PLAYER,
        config = {},
        frame
    ) {
        super(scene, x, y, textureName, config, frame);
        // this.addAction(action_Move);
        // this.state = new DefaultState();
        // this.equipment = new Gun();
        this.setOrigin(0.5, 0.5);

        this.scene = scene;
        this.state = new StateMachine(STATE_LIST.default, STATE_LIST, {
            scene,
            subject: this,
        });
        this.anims.play("anim-mc-walk-down");
    }

    handleInput(input) {
        this.state.handleInput(input);
    }

    update() {
        this.state.update();
    }
    //we would have to call this create() function if we didnt add Player to the Factory
    create() {
        // 3.2 add to scene
        // scene.add.existing(this);
    }
    // spawn(){}
    // despawn(){} //destroy the enemy or deactivate
}
//Normally, in the main scene, you would have to write:
// const player = new Player(this, whateverX, whateverY)
// this.add.existing(player)
//Since we're adding this to the Factory all we have to do is the below:
// const player = this.add.player(whateverX, whateverY);
// Phaser.GameObjects.GameObjectFactory.register(CST.IMGS.KEYS.PLAYER, function (
//     x,
//     y
// ) {
//     const player = new Player(this.scene, x, y);
//     //for some reason this.add.existing doesn't work?
//     // this.add.existing(player);
//     // this.scene.physics.add.existing(player);
//     this.displayList.add(player);
//     this.updateList.add(player);

//     return player;
// });

class PlayerState {
    constructor() {}

    handleInput(player, input) {
        if (input == PRESS_DOWN) {
            return new DuckingState();
        }

        return null;
    }

    update(player) {}
}
////////////////////////////////////////////
// Old Example States
////////////////////////////////////////////
// class OnGroundState extends PlayerState {
//     static handleInput(player, input) {
//         if (input == PRESS_B) {
//             //jump
//         } else if (input == PRESS_DOWN) {
//             // duck
//         }
//     }
// }

// class DuckingState extends OnGroundState {
//     constructor() {
//         this.chargeTime = 0;
//     }

//     handleInput(player, input) {
//         if (input == RELEASE_DOWN) {
//             return new StandingState();
//         } else {
//             OnGroundState.handleInput(player, input);
//         }
//     }

//     update(player) {
//         this.chargeTime += 1;
//         if (this.chargeTime > MAX_CHARGE) {
//             player.superBomb();
//         }
//     }
// }
// class StandingState extends PlayerState {
//     constructor() {}

//     handleInput(player, input) {
//         if (input == PRESS_B) {
//             player.state = PlayerState.jumping;
//         }
//     }

//     update(player) {
//         this.velocityY = JUMP_VELOCITY;
//     }

//     enter(player) {
//         player.setGraphics(IMAGE_JUMP);
//     }
// }
// class JumpingState {
//     constructor(player) {
//         // apply initial up velocity to player
//     }

//     handleInput(player, input) {}

//     update(player) {
//         if (player.isOnGround()) {
//             return new StandingState();
//         } else {
//             player.applyForce(GRAVITY);
//         }
//     }
// }
////////////////////////////////////////////
// Old Example States
////////////////////////////////////////////
