import { CST } from "./Constants";
import { Random as RandomJs } from "random-js";
// Should probably create tests. Also, tbh, these could probably be replaced by built in Phaser functionality
// function XYtoRC(x, y) {
//     const row = (CST.TILE_SIZE * (CST.GRID_LENGTH - 1)) / y;
//     const col = (CST.TILE_SIZE * (CST.GRID_WIDTH - 1)) / x;
//     return [row, col];
// }
function XYtoRC(x, y) {
    const row = (CST.TILE_SIZE * (CST.GRID_LENGTH - 1) - y) / CST.TILE_SIZE;
    const col = (CST.TILE_SIZE * (CST.GRID_WIDTH - 1) - x) / CST.TILE_SIZE;
    return [row, col];
}
function YtoRow(y) {
    const row = (CST.TILE_SIZE * (CST.GRID_LENGTH - 1)) / y;
    return row;
}
function XtoCol(x) {
    const col = (CST.TILE_SIZE * (CST.GRID_WIDTH - 1)) / x;
    return col;
}
function RCtoXY(row, col) {
    const x = CST.TILE_SIZE * col;
    const y = CST.TILE_SIZE * row;
    return [x, y];
}

function RowToY(row) {
    const y = row * CST.TILE_SIZE;
    return y;
}
function ColToX(col) {
    const x = col * CST.TILE_SIZE;
    return x;
}

const Random = new RandomJs();

const setLayerDebug = (scene, layer) => {
    const debugGraphics = scene.add.graphics().setAlpha(0.75);
    layer.setCollisionByProperty({ collides: true });
    layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
};

const Utils = Object.freeze({
    XYtoRC,
    YtoRow,
    XtoCol,
    RCtoXY,
    RowToY,
    ColToX,
    Random,
    setLayerDebug,
});

export {
    Utils,
    XYtoRC,
    YtoRow,
    XtoCol,
    RCtoXY,
    RowToY,
    ColToX,
    Random,
    setLayerDebug,
};
