const TILE_SIZE = 16;
const GRID_WIDTH = 13;
const GRID_LENGTH = GRID_WIDTH * 2;

const CST = Object.freeze({
    TILE_SIZE,
    GRID_WIDTH,
    GRID_LENGTH,
    WINDOW_WIDTH: (GRID_WIDTH + 0) * TILE_SIZE * 2,
    WINDOW_HEIGHT: (GRID_LENGTH + 0) * TILE_SIZE,
    IMGS: {
        KEYS: {
            PLAYER: "player",
            ENEMY_BASIC: "enemy_basic",
        },
        GAME_OBJECTS: {
            ENEMY: "enemy",
        },
    },
});

export { CST };
