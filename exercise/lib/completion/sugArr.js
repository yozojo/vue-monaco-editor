const context = [
  'getUserName',
  'getUserPass',
  'getAuthCode',
  'getSmsCode',
  'getLoginType',
  'getDetailType',
  'getDetailCode',
  'getTaskId',
  'getCookies',
  'setCookies',
  'setCookie',
  'deleteCookie',
  'clearCookies'
];

const cookie = [
  'getKey',
  'setKey',
  'getValue',
  'setValue',
  'getName',
  'getDomain',
  'setDomain',
  'getPath',
  'setPath',
  'getSecure',
  'setSecure',
  'getHttpOnly',
  'setHttpOnly',
  'getVersion',
  'setVersion',
  'getMaxAge',
  'setMaxAge'
];

const createResult = [
  'setCode',
  'setMessage',
  'setTriggerAction',
  'setRequestMessages',
  'getNextRequest'
];

const header = [
  'getLocation',
  'getCookies',
  'getCode',
  'get',
  'getList',
  'toString'
];


const httpGet = [];

const httpPost = ['addPostParam', 'setCreateType', 'setRawData'];

const GroJObject = [
  'put',
  'getBoolean',
  'getBytes',
  'getBooleanValue',
  'getByte',
  'getByteValue',
  'getShort',
  'getShortValue',
  'getInteger',
  'getIntValue',
  'getLong',
  'getLongValue',
  'getFloat',
  'getFloatValue',
  'getDouble',
  'getDoubleValue',
  'getBigDecimal',
  'getBigInteger',
  'getString',
  'getJObject',
  'getIntegerList',
  'getLongList',
  'getDoubleList',
  'getStringList',
  'getJObjectList',
  'parseObject',
  'toString',
  'keySet',
  'getDate'
];

const JsJObject = ['put', 'get', 'parseObject', 'toString', 'keySet'];

const model = [
  'put',
  'add',
  'merge',
  'mergeByKey',
  'mergeByIndex',
  'setDataList',
  'save',
  'toString'
];

const parseResult = [
  'setCode',
  'setMessage',
  'setTriggerAction',
  'setAuthCode',
  'setNextStage',
  'setRetryTimes',
  'setNextRequest',
  'setQrUrl',
  'setQrCode',
  'setProtocol',
  'setTasks'
];

const reason = [];

const requestMessage = [
  'addHeader',
  'setHeader',
  'getCharset',
  'setCharset',
  'getCookie',
  'setCookie',
  'getRequestDelay',
  'setRequestDelay',
  'getRequestTimeout',
  'setRequestTimeout'
];

const task = ['setContext', 'setModel', 'setNextRequest'];

const Status = [
  'CONTINUE',
  'THROW',
  'RETRYTHENCONTINUE',
  'RETRYTHENTHROW',
  'SET_NEXT_REQUEST'
];

export const httpBodyObj = {
  groovy: ['getBody', 'gzip2ByteArray'],
  javascript: ['getBody']
};

export const jObjectObj = {
  groovy: GroJObject,
  javascript: JsJObject
};

export const classArr = [
  'context',
  'cookie',
  'createResult',
  'header',
  'httpBody',
  'httpGet',
  'httpPost',
  'jObject',
  'model',
  'parseResult',
  'reason',
  'requestMessage',
  'task',
  'Status'
];


export default {
  context,
  cookie,
  createResult,
  header,
  httpGet,
  httpPost,
  model,
  parseResult,
  reason,
  requestMessage,
  task,
  Status
}
