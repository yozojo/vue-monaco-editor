
function cmds(_this) {
  return [
    {
      id: 'file-save',
      label: 'File Save',
      keybindings: ['CtrlCmd+KEY_S'],
      run: () => {
        _this.$emit && _this.$emit('save');
        return null;
      }
    },
    {
      id: 'insert-model',
      label: 'Insert Model',
      keybindings: ['CtrlCmd+Shift+KEY_M'],
      precondition: null,
      contextMenuGroupId: '1_modification',
      contextMenuOrder: 3,
      isCreateCxt: true,
      run: () => {
        _this.$refs &&
        _this.$refs.insert &&
        _this.$refs.insert.setVisible(true);
        return null;
      }
    },
    {
      id: 'insert-template',
      label: 'Insert Template',
      keybindings: ['CtrlCmd+Shift+KEY_G'],
      precondition: null,
      contextMenuGroupId: '1_modification',
      contextMenuOrder: 4,
      isCreateCxt: true,
      run: (ed) => {
        _this.insertTemp(ed);
        return null;
      }
    }
  ]
}

export default cmds;