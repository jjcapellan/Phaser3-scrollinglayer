/// <reference types="../node_modules/phaser/types/phaser.d.ts" />
export default class ScrollingLayer {
    scene: Phaser.Scene;
    speed: number;
    texture: string;
    frame: string | undefined;
    position: number;
    overlap: number;
    width: number;
    height: number;
    origin: number;
    blitter: Phaser.GameObjects.Blitter;
    _isH: number;
    _isV: number;
    _axis: string;
    _img1: Phaser.GameObjects.Bob;
    _img2: Phaser.GameObjects.Bob;
    /**
     *Creates an instance of ScrollingLayer.
     * @param scene
     * @param position - Position in the cross axis (y axis for horizontal layer
     * and x axis for vertical layer)
     * @param speed - Speed in pixels/second.
     * @param texture - Key of the texture stored in cache.
     * @param [frame] - Frame of the texture. (Optional)
     */
    constructor(scene: Phaser.Scene, position: number, speed: number, texture: string, frame?: string);
    _getDistance(speed: number, deltaTime: number): number;
    _resetPosition(): void;
    /**
     * Sets the opacity
     * @param alpha Number between 0 (transparent) and 1 (opaque)
     * @returns ScrollingLayer
     */
    setAlpha(alpha: number): ScrollingLayer;
    /**
     * Sets layer orientation to vertical
     * @returns ScrollingLayer
     */
    setVertical(): ScrollingLayer;
    /**
     * Sets layer orientation to horizontal (default)
     * @returns ScrollingLayer
     */
    setHorizontal(): ScrollingLayer;
    /**
     * Sets the layer origin in the cross axis (x for horizontal and y for vertical layer)
     * @param origin Number between 0 ( left/top ) and 1 ( right/bottom )
     * @returns ScrollingLayer
     */
    setOrigin(origin: number): ScrollingLayer;
    /**
     * Sets overlap property.
     * @param overlap Overlap in pixels (default 1). Prevents empty spaces between images.
     * For semitransparent layers is recommended set value to 0.
     * @returns ScrollingLayer
     */
    setOverlap(overlap: number): ScrollingLayer;
    /**
     * Sets the position
     * @param position Position in the cross axis (y axis for horizontal layer
     * and x axis for vertical layer)
     * @returns ScrollingLayer
     */
    setPosition(position: number): ScrollingLayer;
    /**
     * Updates the layer position.
     * @param delta - Duration of last game step in miliseconds
     */
    update(delta: number): void;
}
