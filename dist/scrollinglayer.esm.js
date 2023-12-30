if (IS_DEV) {
  new EventSource("/esbuild").addEventListener("change", () => location.reload());
}
class ScrollingLayer {
  /**
   *Creates an instance of ScrollingLayer.
   * @param scene
   * @param position - Position in the cross axis (y axis for horizontal layer
   * and x axis for vertical layer)
   * @param speed - Speed in pixels/second.    
   * @param texture - Key of the texture stored in cache.
   * @param [frame] - Frame of the texture. (Optional)
   */
  constructor(scene, position, speed, texture, frame) {
    this.scene = scene;
    this.position = position;
    this.speed = speed;
    this.texture = texture;
    this.frame = frame;
    this.overlap = 1;
    this._isH = 1;
    this._isV = 0;
    this._axis = "x";
    this.origin = 0;
    this.width = this.scene.textures.getFrame(this.texture, this.frame).width;
    this.height = this.scene.textures.getFrame(this.texture, this.frame).height;
    this.blitter = this.scene.add.blitter(
      this._isV * this.position + 0,
      this._isH * this.position + 0,
      this.texture,
      this.frame
    );
    this._img1 = this.blitter.create(0, 0);
    this._img2 = this.blitter.create(
      (this.width - this.overlap) * this._isH + 0,
      (this.height - this.overlap) * this._isV + 0
    );
  }
  _getDistance(speed, deltaTime) {
    return deltaTime * speed / 1e3;
  }
  _resetPosition() {
    this.blitter.setPosition(
      this._isV * this.position + 0,
      this._isH * this.position + 0
    );
    this._img1.setPosition(0, 0);
    this._img2.setPosition(
      (this.width - this.overlap) * this._isH + 0,
      (this.height - this.overlap) * this._isV + 0
    );
  }
  /**
   * Sets the opacity
   * @param alpha Number between 0 (transparent) and 1 (opaque)
   * @returns ScrollingLayer
   */
  setAlpha(alpha) {
    alpha = Math.max(0, alpha);
    this.blitter.setAlpha(alpha);
    return this;
  }
  /**
   * Sets layer orientation to vertical
   * @returns ScrollingLayer
   */
  setVertical() {
    this._isV = 1;
    this._isH = 0;
    this._axis = "v";
    this._resetPosition();
    return this;
  }
  /**
   * Sets layer orientation to horizontal (default)
   * @returns ScrollingLayer
   */
  setHorizontal() {
    this._isV = 0;
    this._isH = 1;
    this._axis = "x";
    this._resetPosition();
    return this;
  }
  /**
   * Sets the layer origin in the cross axis (x for horizontal and y for vertical layer)
   * @param origin Number between 0 ( left/top ) and 1 ( right/bottom )
   * @returns ScrollingLayer
   */
  setOrigin(origin) {
    this.origin = Phaser.Math.Clamp(origin, 0, 1);
    this.setPosition(this.position);
    return this;
  }
  /**
   * Sets overlap property.
   * @param overlap Overlap in pixels (default 1). Prevents empty spaces between images. 
   * For semitransparent layers is recommended set value to 0.
   * @returns ScrollingLayer
   */
  setOverlap(overlap) {
    this.overlap = Math.max(0, overlap);
    return this;
  }
  /**
   * Sets the position
   * @param position Position in the cross axis (y axis for horizontal layer
   * and x axis for vertical layer)
   * @returns ScrollingLayer
   */
  setPosition(position) {
    this.position = position;
    if (this._isH) {
      this.blitter.y = position - this.origin * this.height;
      return this;
    }
    this.blitter.x = position - this.origin * this.width;
    return this;
  }
  /**
   * Updates the layer position.
   * @param delta - Duration of last game step in miliseconds
   */
  update(delta) {
    const distance = this._getDistance(this.speed, delta);
    if (this._isH) {
      this._img1.x += distance;
      this._img2.x += distance;
      if (this.speed < 0 && this._img1.x < -this.width) {
        this._img1.x = this.width + this._img2.x - this.overlap;
        return;
      }
      if (this.speed < 0 && this._img2.x < -this.width) {
        this._img2.x = this.width + this._img1.x - this.overlap;
        return;
      }
      if (this.speed > 0 && this._img1.x > this.width) {
        this._img1.x = -this.width + this._img2.x + this.overlap;
        return;
      }
      if (this.speed > 0 && this._img2.x > this.width) {
        this._img2.x = -this.width + this._img1.x + this.overlap;
        return;
      }
      return;
    }
    this._img1.y += distance;
    this._img2.y += distance;
    if (this.speed < 0 && this._img1.y < -this.height) {
      this._img1.y = this.height + this._img2.y - this.overlap;
      return;
    }
    if (this.speed < 0 && this._img2.y < -this.height) {
      this._img2.y = this.height + this._img1.y - this.overlap;
      return;
    }
    if (this.speed > 0 && this._img1.y > this.height) {
      this._img1.y = -this.height + this._img2.y + this.overlap;
      return;
    }
    if (this.speed > 0 && this._img2.y > this.height) {
      this._img2.y = -this.height + this._img1.y + this.overlap;
    }
  }
}
if (false) {
  window.ScrollingLayer = ScrollingLayer;
}
export {
  ScrollingLayer as default
};
