 <template>
  <div class="monaco"
    :style="style">
  </div>
</template>

<script>

import { editor as monacoEditor } from "monaco-editor";

import { setBeauty, debounce } from "./utils";

export default {
  name: "monacoEditor",

  props: {
    width: { type: [String, Number], default: "100%" },
    height: { type: [String, Number], default: "100%" },
    value: { type: String, default: "" }, // right
    original: { type: String, default: "" }, // left
    language: { type: String, default: "javascript" },
    theme: { type: String, default: "vs-dark" }, // vs-dark, vs, hc-black
    options: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      defaults: Object.freeze({
        contextmenu: false,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: true
        },
        wordWrap: "on",
        quickSuggestions: false,
        occurrencesHighlight: false,
        readOnly: false,
        renderLineHighlight: "all",
        originalEditable: false // 原型是否可编辑
      }),

      inputDeb: debounce(value => this.$emit("input", value)),
      resizeDeb: debounce(this.resize, 100)
    };
  },

  created() {},

  computed: {
    style() {
      const { width, height } = this;
      const fixedWidth =
        width.toString().indexOf("%") !== -1 ? width : `${width}px`;
      const fixedHeight =
        height.toString().indexOf("%") !== -1 ? height : `${height}px`;
      return {
        width: fixedWidth,
        height: fixedHeight
      };
    }
  },

  watch: {
    options: {
      deep: true,
      handler(opt) {
        this.setOptions(opt);
      }
    },
    language(language) {
      this.setLanguage(language);
    },
    theme(theme) {
      this.setTheme(theme);
    },
    width(newValue, oldValue) {
      this.isEditor() && this.editor.layout();
    },
    height(newValue, oldValue) {
      this.isEditor() && this.editor.layout();
    },
    value(newValue) {
      if (this.isEditor()) {
        const modified = this.editor.getModel().modified.getValue();
        const original = this.editor.getModel().original.getValue();
        if (newValue !== modified) {
          this.updateModel(newValue, original);
          this.editor.layout();
        }
      }
    },
    original(newValue) {
      if (this.isEditor()) {
        const modified = this.editor.getModel().modified.getValue();
        const original = this.editor.getModel().original.getValue();
        if (newValue !== original) {
          this.updateModel(modified, newValue);
          this.editor.layout();
        }
      }
    }
  },

  methods: {
    updateModel(value, original) {
      const { language } = this;
      value = setBeauty(value);
      original = setBeauty(original);
      const originalModel = monacoEditor.createModel(original, language);
      const modifiedModel = monacoEditor.createModel(value, language);
      this.editor.setModel({
        original: originalModel,
        modified: modifiedModel
      });
    },
    initMonaco() {
      if (!this.editor) {
        const { value, original } = this;
        this.editor = monacoEditor.createDiffEditor(
          this.$el,
          this.editorOptions()
        );
        this.updateModel(value, original);
        this.editorDidMount(this.editor);
        this.editor.layout();
      }
    },
    editorOptions() {
      let { theme, options } = this;
      if (theme) monacoEditor.setTheme(theme);

      return Object.assign({}, this.defaults, this.options, {
        ...options
      });
    },
    editorDidMount(editor) {
      editor.onDidUpdateDiff(event => {
        const value = editor.getModel().modified.getValue();
        this.inputDeb(value);
        this.editor.layout();
      });
    },
    setOptions(opt) {
      if (this.isEditor() && typeof opt === "object") {
        opt = Object.assign(this.defaults, opt);
        this.editor.updateOptions(opt);
      }
    },
    setLanguage(language) {
      if (this.isEditor() && language) {
        const { original, modified } = this.editor.getModel();
        monacoEditor.setModelLanguage(original, language);
        monacoEditor.setModelLanguage(modified, language);
      }
    },
    setTheme(theme) {
      if (this.isEditor() && theme) {
        monacoEditor.setTheme(theme);
      }
    },
    isEditor() {
      return typeof this.editor !== "undefined";
    },
    destroyMonaco() {
      this.isEditor() && this.editor.dispose();
    },
    resize() {
      this.isEditor() && this.editor.layout();
    }
  },

  mounted() {
    this.initMonaco();
    window.addEventListener("resize", this.resizeDeb);
  },

  beforeDestroy() {
    this.destroyMonaco();
    this.editor = null;
    window.removeEventListener("resize", this.resizeDeb);
  },

  destroyed() {}
};
</script>

