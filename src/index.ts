/// <reference types="../node_modules/phaser/types/phaser.d.ts" />
import Layers from "./layers";

// Hot reloading esbuild
// @ts-ignore
if (IS_DEV) {
    new EventSource("/esbuild").addEventListener("change", () => location.reload());
}

export default Layers;

// @ts-ignore
if (IS_BROWSER) {
    // @ts-ignore
    window.Layers = Layers;
}