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
    origin: number;
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
    constructor(scene: Phaser.Scene, speed: number, texture: string, options: Options) {
        this.scene = scene;
        this.speed = speed;
        this.texture = texture;
        this.frame = options.frame;

        this.overlap = options.overlap || 1;

        this.width = this.scene.textures.getFrame(this.texture, this.frame).width;
        this.height = this.scene.textures.getFrame(this.texture, this.frame).height;
        this.origin = 0;
        this.y = options.y || scene.game.config.height as number - this.height;

        this.blitter = this.scene.add.blitter(0, this.y, this.texture, this.frame);
        this.img1 = this.blitter.create(0, 0);
        this.img2 = this.blitter.create(this.width - this.overlap, 0);

    }

    getDistance(speed: number, deltaTime: number): number {
        return (deltaTime * speed) / 1000;
    }

    setOrigin(origin: number){
        this.origin = Phaser.Math.Clamp(origin, 0, 1);
    }

    setY(y: number) {
        this.y = y;
        this.blitter.y = y - this.origin * this.height;
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

type Options = {
    frame?: string,
    y?: number,
    overlap?: number
}

// @ts-ignore
if (IS_BROWSER) {
    // @ts-ignore
    window.ScrollingLayer = ScrollingLayer;
}