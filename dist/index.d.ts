import Phaser from "phaser";
export default class ScrollingLayer {
    scene: Phaser.Scene;
    speed: number;
    texture: string;
    frame: string | undefined;
    y: number;
    overlap: number;
    width: number;
    height: number;
    blitter: Phaser.GameObjects.Blitter;
    img1: Phaser.GameObjects.Bob;
    img2: Phaser.GameObjects.Bob;
    /**
     *Creates an instance of ScrollingLayer.
     * @param scene
     * @param speed - Horizontal speed in pixels/second.
     * @param texture - Key of the texture stored in cache.
     * @param [options]
     * @param [options.frame] - Optional frame of the texture.
     * @param [options.y = 0] - vertical position in pixels. By default the texture is positioned at bottom.
     * @param [options.overlap = 0] - Horizontal overlap in pixels (default 1). Prevents empty spaces between images.
     * @memberof ScrollingLayer
     */
    constructor(scene: Phaser.Scene, speed: number, texture: string, options: Options);
    getDistance(speed: number, deltaTime: number): number;
    setYbottom(): number;
    /**
     * Updates the x position.
     * @param delta - Duration of last game step in miliseconds
     * @memberof ScrollingLayer
     */
    update(delta: number): void;
}
type Options = {
    frame?: string;
    y?: number;
    overlap?: number;
};
export {};
