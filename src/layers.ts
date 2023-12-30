/// <reference types="../node_modules/phaser/types/phaser.d.ts" />
import { Layer, LayerData } from "./layer";

export default class Layers extends Phaser.GameObjects.Blitter {

    _hLayers: LayerData[] = [];
    _vLayers: LayerData[] = [];
    _handlers: Layer[] = [];

    constructor(scene: Phaser.Scene, texture: string) {
        super(scene);
        this.setTexture(texture);
        this.x = 0;
        this.y = 0;

    }

    addHlayer(y: number, speed: number, frame: string) {
        let width = this.scene.textures.getFrame(this.texture.key, frame).width;
        let height = this.scene.textures.getFrame(this.texture.key, frame).height;
        let overlap = 1;
        let x1 = 0;
        let x2 = speed < 0 ? (width - overlap) : (-width + overlap);
        let img1 = this.create(x1, y, frame);
        let img2 = this.create(x2, y, frame);
        let data: LayerData = {
            isH: true,
            speed: speed,
            position: y,
            img1: img1,
            img2: img2,
            width: width,
            height: height,
            overlap: overlap,
            origin: 0
        }
        this._hLayers.push(data);
        let layer = new Layer(data);
        this._handlers.push(layer);
        return layer;
    }

    addVlayer(x: number, speed: number, frame: string) {
        let width = this.scene.textures.getFrame(this.texture.key, frame).width;
        let height = this.scene.textures.getFrame(this.texture.key, frame).height;
        let overlap = 1;
        let y1 = 0;
        let y2 = speed < 0 ? (height - overlap) : (-height + overlap);
        let img1 = this.create(x, y1, frame);
        let img2 = this.create(x, y2, frame);
        let data: LayerData = {
            isH: false,
            speed: speed,
            position: x,
            img1: img1,
            img2: img2,
            width: width,
            height: height,
            overlap: overlap,
            origin: 0
        }
        this._vLayers.push(data);
        let layer = new Layer(data);
        this._handlers.push(layer);
        return layer;
    }

    preUpdate(time: number, delta: number) {
        this._hLayers.forEach(
            data => {
                const distance = getDistance(data.speed, delta);

                data.img1.x += distance;
                data.img2.x += distance;

                if (data.speed < 0 && data.img1.x < -data.width) {
                    data.img1.x = data.width + data.img2.x - data.overlap;
                    return;
                }
                if (data.speed < 0 && data.img2.x < -data.width) {
                    data.img2.x = data.width + data.img1.x - data.overlap;
                    return;
                }
                if (data.speed > 0 && data.img1.x > data.width) {
                    data.img1.x = -data.width + data.img2.x + data.overlap;
                    return;
                }
                if (data.speed > 0 && data.img2.x > data.width) {
                    data.img2.x = -data.width + data.img1.x + data.overlap;
                    return;
                }
            }
        );

        this._vLayers.forEach(
            data => {
                const distance = getDistance(data.speed, delta);

                data.img1.y += distance;
                data.img2.y += distance;

                if (data.speed < 0 && data.img1.y < -data.height) {
                    data.img1.y = data.height + data.img2.y - data.overlap;
                    return;
                }
                if (data.speed < 0 && data.img2.y < -data.height) {
                    data.img2.y = data.height + data.img1.y - data.overlap;
                    return;
                }
                if (data.speed > 0 && data.img1.y > data.height) {
                    data.img1.y = -data.height + data.img2.y + data.overlap;
                    return;
                }
                if (data.speed > 0 && data.img2.y > data.height) {
                    data.img2.y = -data.height + data.img1.y + data.overlap;
                    return;
                }
            }
        );
    } // End preUpdate()

    destroy(fromScene?: boolean | undefined): void {
        this._handlers = null!;
        this._hLayers = null!;
        this._vLayers = null!;
        super.destroy(fromScene);
    }
}

function getDistance(speed: number, deltaTime: number): number {
    return (deltaTime * speed) / 1000;
}