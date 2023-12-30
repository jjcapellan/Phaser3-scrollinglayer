/// <reference types="../node_modules/phaser/types/phaser.d.ts" />

export class Layer {

    data: LayerData;

    constructor(data: LayerData) {
        this.data = data;
    }

    setAlpha(alpha: number): Layer {
        alpha = Math.max(0, alpha);
        this.data.img1.setAlpha(alpha);
        this.data.img2.setAlpha(alpha);
        return this;
    }

    setOrigin(origin: number): Layer {
        this.data.origin = Phaser.Math.Clamp(origin, 0, 1);
        this.setPosition(this.data.position);
        return this;
    }

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

    setOverlap(overlap: number): Layer {
        this.data.overlap = Math.max(0, overlap);
        return this;
    }

    setVisible(visible: boolean): Layer {
        this.data.img1.setVisible(visible);
        this.data.img2.setVisible(visible);
        return this;
    }
}

export type LayerData = {
    isH: boolean,
    speed: number,
    position: number,
    img1: Phaser.GameObjects.Bob,
    img2: Phaser.GameObjects.Bob,
    width: number,
    height: number,
    overlap: number,
    origin: number
}