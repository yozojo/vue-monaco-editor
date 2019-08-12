import { registerDocumentFormat } from "./format";
import defineTheme from "./theme";
import registerLanguage from "./language/index.js";

(function register() {
  if (!register.instance) {
    register.instance = new Instance();
  }
  function Instance(params) {
    registerDocumentFormat();
    defineTheme();
    registerLanguage();
  }
})()