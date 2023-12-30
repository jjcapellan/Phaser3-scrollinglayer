import * as esbuild from 'esbuild';

let ctx = await esbuild.context({
    entryPoints: [
        { out: 'dist/scrollinglayer.min', in: 'src/index.ts' }
    ],
    bundle: true,
    platform: "browser",
    format: "iife",
    minify: false,
    sourcemap: false,
    define: {
        "IS_BROWSER": "true",
        "IS_DEV": "true"
    },
    outdir: "."
});

await ctx.watch();

let { host, port } = await ctx.serve({
    servedir: "./",
});
console.log(`Starting local server at port ${port}`);