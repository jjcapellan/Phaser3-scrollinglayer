/// <reference types="../node_modules/phaser/types/phaser.d.ts" />
import LayerFactory from "./factory";

// Hot reloading esbuild
// @ts-ignore
if (typeof IS_DEV == "boolean" && IS_DEV) {
    new EventSource("/esbuild").addEventListener("change", () => location.reload());
}

export default LayerFactory;

// @ts-ignore
if (IS_BROWSER) {
    // @ts-ignore
    window.LayerFactory = LayerFactory;
}