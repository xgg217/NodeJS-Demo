import { IOptions, ISource } from './interfaces'

/**
 * 参数合并
 * @param options 
 * @param defaultOptions 
 */
function getOptions(options:IOptions, defaultOptions = {}) {
  if((options === null) || (options === undefined)) {
    return defaultOptions
  }

  // 参数不正确
  if(typeof(options) !== 'object') {
    throw new Error('options 参数应该为对象格式')
  }

  if(options.encoding !== 'buffer') {
    console.log('待定');
  }

  // if(options.s)
  return options;
}

/**
 * 复制对象，浅拷贝
 * @param source 
 * @returns 
 */
function copyObject(source:ISource) {
  // const obj:ISource = {};
  // for(const [key, val] of Object.entries(obj)) {
  //   obj[key] = val;
  // }
  // return obj;
  return { ...source }
}


export {
  getOptions,
  copyObject
}
