/// <reference types="../node_modules/phaser/types/phaser.d.ts" />
/**
 * This class groups the necessary methods to manage the properties of a LayerData object.
 */
export declare class Layer {
    data: LayerData;
    /**
     * Creates an instance of Layer
     * @param data LayerData object to be managed
     */
    constructor(data: LayerData);
    /**
     * Sets the opacity.
     * @param alpha Number between 0 (transparent) and 1 (opaque)
     * @returns
     */
    setAlpha(alpha: number): Layer;
    /**
     * Sets the origin of the cross axis (y axis for horizontal layer and x axis for vertical layer).
     * @param origin Number between 0 (left/top) and 1 (right/bottom)
     * @returns Instance of the layer
     */
    setOrigin(origin: number): Layer;
    /**
     *
     * @param position position in pixels the cross axis (y axis for horizontal layer
     * and x axis for vertical layer)
     * @returns Instance of the layer
     */
    setPosition(position: number): Layer;
    /**
     * Sets the overlap. Some times is necessary for avoid spaces between images.(default=1)
     * @param overlap Overlap in pixels between the two images
     * @returns Instance of the layer
     */
    setOverlap(overlap: number): Layer;
    /**
     * Sets the speed.
     * @param speed Speed in pixels/second
     * @returns Instance of the layer
     */
    setSpeed(speed: number): this;
    /**
     * Sets the visibility.
     * @param visible False -> this object is not rendered.
     * @returns Instance of the layer
     */
    setVisible(visible: boolean): Layer;
}
/**
 * This object type groups the Layer data
 */
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
