import {languages} from 'monaco-editor'
import {language, conf} from './groovy'

const lang = {
  id: 'groovy',
  extensions: ['.groovy'],
  aliases: ['groovy'],
  mimetypes: ['text/x-groovy-source', 'text/x-groovy']
}

export default function registerLanguage () {
  languages.register(lang)
  languages.setMonarchTokensProvider(lang.id, language)
  languages.setLanguageConfiguration(lang.id, conf)
}
