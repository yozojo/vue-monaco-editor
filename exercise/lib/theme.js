import {editor as monacoEditor} from 'monaco-editor';

const themeOpt = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#272822"
  }
};
const themeArr = ['vs-octo-dark', 'vs'];

export default function defineTheme() {
  themeArr.forEach(themeName => {
    monacoEditor.defineTheme(themeName, themeOpt);
  })
}

