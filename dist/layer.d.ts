/// <reference types="../node_modules/phaser/types/phaser.d.ts" />
export declare class Layer {
    data: LayerData;
    constructor(data: LayerData);
    setAlpha(alpha: number): Layer;
    setOrigin(origin: number): Layer;
    setPosition(position: number): Layer;
    setOverlap(overlap: number): Layer;
    setSpeed(speed: number): this;
    setVisible(visible: boolean): Layer;
}
export type LayerData = {
    isH: boolean;
    speed: number;
    position: number;
    img1: Phaser.GameObjects.Bob;
    img2: Phaser.GameObjects.Bob;
    width: number;
    height: number;
    overlap: number;
    origin: number;
};
