import {languages, Range} from 'monaco-editor';
import SugClass from './sugClass';

function RegisterCompletion(arr){
  if( RegisterCompletion.instance !== undefined){
      return RegisterCompletion.instance;
  }

  const langArr = ['groovy', 'javascript'];

    langArr.forEach(lang => {
      const sugClass = new SugClass(lang);
      sugClass.updateStatus(arr);

      languages.registerCompletionItemProvider(lang, {
        provideCompletionItems(model, position) {

          return {
            suggestions: sugClass.getSug(model, position)
          };
        },
        triggerCharacters: ['.']
      });
    });

    RegisterCompletion.instance = this;
}

export default RegisterCompletion;

