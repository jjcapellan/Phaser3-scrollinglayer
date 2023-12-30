import Layers from "./layers";
if (IS_DEV) {
  new EventSource("/esbuild").addEventListener("change", () => location.reload());
}
var src_default = Layers;
if (false) {
  window.Layers = Layers;
}
export {
  src_default as default
};
