import sugArr, {classArr, httpBodyObj, jObjectObj} from './sugArr';

const getClassObj = lang => {
  const httpBody = httpBodyObj[lang];
  const jObject = jObjectObj[lang];
  return {
    httpBody,
    jObject,
    ...sugArr
  };
};

export default class Sug {
  constructor(lang) {
    this.classArr = classArr;
    this.classObj = getClassObj(lang);
    this.statusArr = [];
    this.reg = /[\s|\.]?(\w+)\.$/;
    this.regF = /[\s|\.]?(\w+)$/;
  }

  getKeyState(text) {
    let keyword = '';
    let isFilter = false;
    try {
      keyword = text.match(this.reg)[1];
    } catch (error) {
      const haskey = text.match(this.regF);
      keyword = haskey ? haskey[1] : '';
      isFilter = !!haskey;
    }
    return {
      keyword,
      isFilter
    };
  }

  getSug(model, position) {
    const {lineNumber, column} = position;
    const range = {
      startLineNumber: lineNumber,
      startColumn: 1,
      endLineNumber: lineNumber,
      endColumn: column
    };
    const text = model.getValueInRange(range);

    return this.cmpSug(text);
  }

  cmpSug(text) {
    const {keyword, isFilter} = this.getKeyState(text);

    return isFilter ? this.filterSug(keyword) : this.selecSug(keyword);
  }

  filterSug(keyword) {
    keyword = keyword.toUpperCase();
    const reg = new RegExp('^' + keyword + '|\\w+' + keyword);
    const newClassArr = [];
    this.classArr.forEach((key, idx) => {
      if (!newClassArr[idx]) {
        newClassArr[idx] = {};
      }
      const hasKey = reg.test(key.toUpperCase());
      newClassArr[idx].hasKey = hasKey;
      newClassArr[idx].key = key;
    });
    let filterArr = newClassArr
      .filter(item => item.hasKey)
      .map(item => item.key);

    let mapArr = filterArr
      .filter(key => /^[^A-Z]/.test(key))
      .map(key => key.replace(/^(\w{1})/, $1 => $1.toUpperCase()));

    mapArr = mapArr.concat(filterArr);

    return newClassArr.length ? this.mapSug(mapArr) : [];
  }

  selecSug(keyword) {
    if (this.classArr.includes(keyword)) {
      return this.mapSug(this.classObj[keyword]);
    }
    if (this.classObj.Status.includes(keyword)) {
      return this.mapSug(this.statusArr);
    }
    return [];
  }

  mapSug(arr) {
    return arr.length
      ? arr.map(key => {
          return {
            label: key,
            insertText: key,
            detail: 'custom utils ' + key,
            kind: 1
          };
        })
      : [];
  }

  updateStatus(arr) {
    Array.isArray(arr) && (this.statusArr = arr);
  }
}
