 <template>
  <div class="monaco"
    :style="style"
    ref="monaco">
  </div>
</template>

<script>

import {
  editor as monacoEditor,
  KeyCode,
  KeyMod,
  Range
} from "monaco-editor";
import "./lib/index.js";
import RegisterCompletion from "./lib/completion";

import { debounce } from "./utils";

export default {
  name: "monacoEditor",

  components: {},

  props: {
    isLayout: { type: Boolean, default: false },
    width: { type: [String, Number], default: "100%" },
    height: { type: [String, Number], default: "100%" },
    value: { type: String, default: "" },
    language: { type: String, default: "javascript" },
    theme: { type: String, default: "vs-dark" },// vs-dark, vs, hc-black
    cmds: { type: Function, default: () => {} },
    options: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      defaults: Object.freeze({
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false,
        glyphMargin: false,
        wordWrap: "on",
        contextmenu: true,
        scrollBeyondLastLine: false,
        autoIndent:true,
        scrollbar: {
          horizontalHasArrows: false,
          horizontal: "hidden",
          verticalHasArrows: false,
          vertical: "hidden",
          handleMouseWheel: false
        },
        lineNumbersMinChars: 0,
        minimap: {
          enabled: false
        }
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
    width() {
      this.isEditor() && this.editor.layout();
    },
    height() {
      this.isEditor() && this.editor.layout();
    },
    value(newValue) {
      if (newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue);
        this.layout();
      }
    }
  },

  methods: {
    initMonaco() {
      if (!this.editor) {
        new RegisterCompletion([]);
        this.editor = monacoEditor.create(this.$el, this.editorOptions());
        this.editorDidMount(this.editor);
        this.addCommand();
        this.layout();
      }
    },
    editorOptions() {
      let { value, language, theme, options } = this;
      language = language ? language : "javascript";
      if (theme) monacoEditor.setTheme(theme);

      return Object.assign({}, this.defaults, this.options, {
        value,
        language,
        ...options
      });
    },
    editorDidMount(editor) {
      editor.onContextMenu(() => this.layout);
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        this.layout();
        this.inputDeb(value);
      });
    },
    insertText(text, ed) {
      const pos = ed.getPosition();
      const range = Range.fromPositions(pos);
      this.editor.executeEdits("", [
        {
          range,
          text
        }
      ]);
    },
    addCommand() {
      const getKeyCode = key => {
        return /KEY_/.test(key) ? KeyCode[key] : KeyMod[key];
      };
      const getKey = keybindings => {
        return keybindings.map(keys => {
          keys = keys.split("+").map(key => getKeyCode(key));
          return keys.reduce((pre, cur) => pre + cur, 0);
        })
      };
      const cmdsArr = this.cmds(this) ? this.cmds(this) : [];

      cmdsArr.length && cmdsArr.forEach(cmd => {
        const { id, isCreateCxt } = cmd;
        cmd.keybindings = getKey(cmd.keybindings);

        if (isCreateCxt) {
          const prec = this.editor.createContextKey(id, false);
          cmd.precondition = prec.set(true);
        }
        this.editor.addAction(cmd);
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
        monacoEditor.setModelLanguage(this.editor.getModel(), language);
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
    layout() {
      if (this.isEditor()) {
        try {
          if (this.isLayout) {
            const lineCount = this.editor.getModel().getLineCount();
            let width = this.editor.getLayoutInfo().width;
            let height = lineCount * 18 + 100;
            const editor = this.$refs.monaco;
            if (height !== editor.clientHeight) {
              height = height > 300 ? height : 300;
              this.editor.layout({ height, width });
            } else {
              this.editor.layout();
            }
          } else {
            this.editor.layout();
          }
        } catch (error) {
          this.editor.layout();
        }
      }
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