/// <reference types="../node_modules/phaser/types/phaser.d.ts" />

/**
 * This class groups the necessary methods to manage the properties of a LayerData object.
 */
export class Layer {

    data: LayerData;

    /**
     * Creates an instance of Layer
     * @param data LayerData object to be managed
     */
    constructor(data: LayerData) {
        this.data = data;
    }

    /**
     * Sets the opacity.
     * @param alpha Number between 0 (transparent) and 1 (opaque) 
     * @returns 
     */
    setAlpha(alpha: number): Layer {
        alpha = Math.max(0, alpha);
        this.data.img1.setAlpha(alpha);
        this.data.img2.setAlpha(alpha);
        return this;
    }

    /**
     * Sets the origin of the cross axis (y axis for horizontal layer and x axis for vertical layer).
     * @param origin Number between 0 (left/top) and 1 (right/bottom)
     * @returns Instance of the layer
     */
    setOrigin(origin: number): Layer {
        this.data.origin = Phaser.Math.Clamp(origin, 0, 1);
        this.setPosition(this.data.position);
        return this;
    }

    /**
     * 
     * @param position position in pixels the cross axis (y axis for horizontal layer 
     * and x axis for vertical layer)
     * @returns Instance of the layer
     */
    setPosition(position: number): Layer {
        this.data.position = position;

        if (this.data.isH) {
            let y = position - this.data.origin * this.data.height;
            this.data.img1.y = this.data.img2.y = y;
            return this;
        }

        let x = position - this.data.origin * this.data.width;
        this.data.img1.x = this.data.img2.x = x;
        return this;
    }

    /**
     * Sets the overlap. Some times is necessary for avoid spaces between images.(default=1)
     * @param overlap Overlap in pixels between the two images
     * @returns Instance of the layer
     */
    setOverlap(overlap: number): Layer {
        this.data.overlap = Math.max(0, overlap);
        return this;
    }

    /**
     * Sets the speed.
     * @param speed Speed in pixels/second 
     * @returns Instance of the layer
     */
    setSpeed(speed: number) {
        this.data.speed = speed;
        return this;
    }

    /**
     * Sets the visibility. 
     * @param visible False -> this object is not rendered.
     * @returns Instance of the layer
     */
    setVisible(visible: boolean): Layer {
        this.data.img1.setVisible(visible);
        this.data.img2.setVisible(visible);
        return this;
    }
}

/**
 * This object type groups the Layer data
 */
export type LayerData = {
    // Is horizontal?
    isH: boolean,

    // Speed in pixel/second
    speed: number,

    // Position in pixels the cross axis (y axis for horizontal layer and x axis for vertical layer)
    position: number,

    // Image 1 (Bob object)
    img1: Phaser.GameObjects.Bob,

    // Image 2 (Bob object)
    img2: Phaser.GameObjects.Bob,

    // Layer width in pixels
    width: number,

    // Layer height in pixels
    height: number,

    // Overlap in pixels between the two images
    overlap: number,

    // Origin of the cross axis (y axis for horizontal layer and x axis for vertical layer).
    // Number between 0 and 1.
    origin: number
}