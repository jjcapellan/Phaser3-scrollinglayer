"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/layer.ts
var Layer = class {
  /**
   * Creates an instance of Layer
   * @param data LayerData object to be managed
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Sets the opacity.
   * @param alpha Number between 0 (transparent) and 1 (opaque) 
   * @returns 
   */
  setAlpha(alpha) {
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
  setOrigin(origin) {
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
  setPosition(position) {
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
  setOverlap(overlap) {
    this.data.overlap = Math.max(0, overlap);
    return this;
  }
  /**
   * Sets the speed.
   * @param speed Speed in pixels/second 
   * @returns Instance of the layer
   */
  setSpeed(speed) {
    this.data.speed = speed;
    return this;
  }
  /**
   * Sets the visibility. 
   * @param visible False -> this object is not rendered.
   * @returns Instance of the layer
   */
  setVisible(visible) {
    this.data.img1.setVisible(visible);
    this.data.img2.setVisible(visible);
    return this;
  }
};

// src/factory.ts
var LayerFactory = class extends Phaser.GameObjects.Blitter {
  constructor(scene, texture) {
    super(scene);
    this._hLayers = [];
    this._vLayers = [];
    this._handlers = [];
    this.VERSION = "3.0.0";
    this.setTexture(texture);
    this.x = 0;
    this.y = 0;
  }
  /**
   * Creates a new horizontal layer.
   * @param y     y position in pixels
   * @param speed Velocity in pixels/second for x axis
   * @param frame Frame to be rendered. Frame width must be at least viewport width.
   * @returns     Instance of the new layer
   */
  addHlayer(y, speed, frame) {
    let width = this.scene.textures.getFrame(this.texture.key, frame).width;
    let height = this.scene.textures.getFrame(this.texture.key, frame).height;
    let overlap = 1;
    let x1 = 0;
    let x2 = speed < 0 ? width - overlap : -width + overlap;
    let img1 = this.create(x1, y, frame);
    let img2 = this.create(x2, y, frame);
    let data = {
      isH: true,
      speed,
      position: y,
      img1,
      img2,
      width,
      height,
      overlap,
      origin: 0
    };
    this._hLayers.push(data);
    let layer = new Layer(data);
    this._handlers.push(layer);
    return layer;
  }
  /**
   * 
   * @param x     x position in pixels
   * @param speed Velocity in pixels/second for y axis
   * @param frame Frame to be rendered. Frame height must be at least viewport height.
   * @returns     Instance of the new layer
   */
  addVlayer(x, speed, frame) {
    let width = this.scene.textures.getFrame(this.texture.key, frame).width;
    let height = this.scene.textures.getFrame(this.texture.key, frame).height;
    let overlap = 1;
    let y1 = 0;
    let y2 = speed < 0 ? height - overlap : -height + overlap;
    let img1 = this.create(x, y1, frame);
    let img2 = this.create(x, y2, frame);
    let data = {
      isH: false,
      speed,
      position: x,
      img1,
      img2,
      width,
      height,
      overlap,
      origin: 0
    };
    this._vLayers.push(data);
    let layer = new Layer(data);
    this._handlers.push(layer);
    return layer;
  }
  preUpdate(time, delta) {
    this._hLayers.forEach(
      (data) => {
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
      (data) => {
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
  }
  // End preUpdate()
  /**
   * Removes a layer.
   * @param layer Layer to be removed
   */
  removeLayer(layer) {
    layer.data.img1.destroy();
    layer.data.img2.destroy();
    let dataSrc = layer.data.isH ? this._hLayers : this._vLayers;
    dataSrc.splice(dataSrc.indexOf(layer.data), 1);
    this._handlers.splice(this._handlers.indexOf(layer));
  }
  /**
   * Deletes all references to associated data and calls super.destroy().
   * @param fromScene True if this Game Object is being destroyed by the Scene, false if not.
   */
  destroy(fromScene) {
    this._handlers = null;
    this._hLayers = null;
    this._vLayers = null;
    super.destroy(fromScene);
  }
};
function getDistance(speed, deltaTime) {
  return deltaTime * speed / 1e3;
}

// src/index.ts
if (typeof IS_DEV == "boolean" && IS_DEV) {
  new EventSource("/esbuild").addEventListener("change", () => location.reload());
}
var src_default = LayerFactory;
if (false) {
  window.LayerFactory = LayerFactory;
}
