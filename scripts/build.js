import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: [
        { out: 'dist/scrollinglayer.min', in: 'src/index.ts' }
    ],
    bundle: true,
    platform: "browser",
    format: "iife",
    minify: true,
    sourcemap: false,
    define: {"IS_BROWSER": "true"},
    outdir: ".",
});

await esbuild.build({
    entryPoints: [
        { out: 'dist/scrollinglayer.esm', in: 'src/index.ts' }
    ],
    bundle: false,
    platform: "neutral",
    format: "esm",
    define: {"IS_BROWSER": "false"},
    outdir: ".",
});

await esbuild.build({
    entryPoints: [
        { out: 'dist/scrollinglayer.cjs', in: 'src/index.ts' }
    ],
    bundle: false,
    platform: "neutral",
    format: "cjs",
    define: {"IS_BROWSER": "false"},
    outdir: ".",
});