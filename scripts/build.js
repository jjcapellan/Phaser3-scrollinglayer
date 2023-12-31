import * as esbuild from "esbuild";
import fs from "node:fs";

await esbuild.build({
    entryPoints: [
        { out: "dist/scrollinglayer.min", in: "src/index.ts" }
    ],
    bundle: true,
    platform: "browser",
    format: "iife",
    minify: true,
    sourcemap: false,
    define: {
        "IS_BROWSER": "true",
        "IS_DEV": "false"
    },
    outdir: "."
});

await esbuild.build({
    entryPoints: [
        { out: "dist/scrollinglayer.esm", in: "src/index.ts" }
    ],
    bundle: true,
    platform: "neutral",
    format: "esm",
    define: { "IS_BROWSER": "false" },
    outdir: "."
});

await esbuild.build({
    entryPoints: [
        { out: "dist/scrollinglayer.cjs", in: "src/index.ts" }
    ],
    bundle: true,
    platform: "neutral",
    format: "cjs",
    define: { "IS_BROWSER": "false" },
    outdir: "."
});

fs.renameSync("./dist/index.d.ts", "./dist/scrollinglayer.d.ts");