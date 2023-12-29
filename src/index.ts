import Phaser from "phaser";

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
    img1: Phaser.GameObjects.Bob;
    img2: Phaser.GameObjects.Bob;

    /**
     *Creates an instance of ScrollingLayer.
     * @param scene     
     * @param speed - Horizontal speed in pixels/second.    
     * @param texture - Key of the texture stored in cache.
     * @param [frame] - Optional frame of the texture.
     * @memberof ScrollingLayer
     */
    constructor(scene: Phaser.Scene, position: number, speed: number, texture: string, frame?: string) {
        this.scene = scene;
        this.speed = speed;
        this.texture = texture;
        this.frame = frame;

        this.overlap = 1;

        this.width = this.scene.textures.getFrame(this.texture, this.frame).width;
        this.height = this.scene.textures.getFrame(this.texture, this.frame).height;
        this.origin = 0;
        this.position = position;

        this.blitter = this.scene.add.blitter(0, this.position, this.texture, this.frame);
        this.img1 = this.blitter.create(0, 0);
        this.img2 = this.blitter.create(this.width - this.overlap, 0);

    }

    getDistance(speed: number, deltaTime: number): number {
        return (deltaTime * speed) / 1000;
    }

    setOrigin(origin: number): ScrollingLayer {
        this.origin = Phaser.Math.Clamp(origin, 0, 1);
        this.setPosition(this.position);
        return this;
    }

    setOverlap(overlap: number): ScrollingLayer {
        this.overlap = Math.max(0, overlap);
        return this;
    }

    setPosition(position: number): ScrollingLayer {
        this.position = position;
        this.blitter.y = position - this.origin * this.height;
        return this;
    }

    /**
     * Updates the x position.
     * @param delta - Duration of last game step in miliseconds
     * @memberof ScrollingLayer
     */
    update(delta: number) {
        this.img1.x += this.getDistance(this.speed, delta);
        this.img2.x += this.getDistance(this.speed, delta);
        if (this.speed < 0 && this.img1.x < -this.width) {
            this.img1.x = this.width + this.img2.x - this.overlap;
        }
        if (this.speed < 0 && this.img2.x < -this.width) {
            this.img2.x = this.width + this.img1.x - this.overlap;
        }
        if (this.speed > 0 && this.img1.x > this.width) {
            this.img1.x = -this.width + this.img2.x + this.overlap;
        }
        if (this.speed > 0 && this.img2.x > this.width) {
            this.img2.x = -this.width + this.img1.x + this.overlap;
        }
    }

}

// @ts-ignore
if (IS_BROWSER) {
    // @ts-ignore
    window.ScrollingLayer = ScrollingLayer;
}