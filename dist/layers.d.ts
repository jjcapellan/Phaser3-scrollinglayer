/// <reference types="../node_modules/phaser/types/phaser.d.ts" />
import { Layer, LayerData } from "./layer";
export default class Layers extends Phaser.GameObjects.Blitter {
    _hLayers: LayerData[];
    _vLayers: LayerData[];
    _handlers: Layer[];
    constructor(scene: Phaser.Scene, texture: string);
    /**
     * Creates a new horizontal layer.
     * @param y     y position in pixels
     * @param speed Velocity in pixels/second for x axis
     * @param frame Frame to be rendered
     * @returns     Instance of the new layer
     */
    addHlayer(y: number, speed: number, frame: string): Layer;
    /**
     *
     * @param x     x position in pixels
     * @param speed Velocity in pixels/second for y axis
     * @param frame Frame to be rendered
     * @returns     Instance of the new layer
     */
    addVlayer(x: number, speed: number, frame: string): Layer;
    preUpdate(time: number, delta: number): void;
    /**
     * Removes a layer.
     * @param layer Layer to be removed
     */
    removeLayer(layer: Layer): void;
    /**
     * Deletes all references to associated data and calls super.destroy().
     * @param fromScene True if this Game Object is being destroyed by the Scene, false if not.
     */
    destroy(fromScene?: boolean | undefined): void;
}
