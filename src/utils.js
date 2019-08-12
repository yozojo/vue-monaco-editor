export function debounce(fn, delay) {
  delay = delay || 200;
  let timer;
  return function() {
    let context = this;
    let args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

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