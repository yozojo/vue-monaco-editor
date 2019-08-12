import {languages} from 'monaco-editor'

const beautify = require('js-beautify').js

export function setBeauty (value) {
  return beautify(value, {
    indent_size: '4',
    indent_char: ' ',
    max_preserve_newlines: '5',
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '0',
    indent_inner_html: false,
    comma_first: false,
    e4x: false
  })
}

export function registerDocumentFormat (params) {
  const langArr = ['groovy', 'python']

  langArr.forEach(lang => {
    languages.registerDocumentFormattingEditProvider(lang, {
      provideDocumentFormattingEdits: (model, options, token) => {
        const value = model.getValue()
        if (value) {
          model.setValue(setBeauty(value))
        }
      }
    })
  })
}
