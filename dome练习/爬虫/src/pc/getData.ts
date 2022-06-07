import axios from 'axios';
import { bealURL } from './url'
import * as cheerio from 'cheerio';
import { Readable, Writable } from 'stream'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'

enum pad {
  typesURL = '/vod/list/n_1/o3u1p1.html?fr=vodhome_js_lx' // 获取分类类型
}

// 获取起始页的所有分类地址
const getIndexType = function() {
  return axios.get(bealURL.url1 + pad.typesURL).then(res => {
    // console.log(res);
    if(res.status !== 200) {
      return '错误'
    }
    console.log(111);
    
    setTypeData(res.data);
    return res.data;
  })
};

interface ISearchStr {
  [str:string]: {
    name: string
  }
};
interface IEle {
  url: string;
  text: string;
}

// 数据处理
const setTypeData = function setTypeData(str:string) {
  const $ = cheerio.load(str);
  const searchStr = $('#page .container #content .search-index-R a');
  // console.log(searchStr);
  // console.log(typeof searchStr);

  const arr:IEle[] = [];
  searchStr.get().map(item => {
    const ele = $(item);
    const obj = {
      url: ele.attr('onclick') || '',
      text: ele.text() || ''
    }
    arr.push(obj);
  });

  const newArr = arr.filter(item => {
    if(item.url.length) {
      return true
    }
    return false;
  }).map(item => {
    const newUrl = item.url.split(';return false;')[0];
    return {
      url: newUrl,
      text: item.text
    }
  });
  // console.log(newArr);

  const fileUrl = resolve(__dirname, './text.json');

  // const ws = createWriteStream(fileUrl);
  // const kxs = kx();
  // xrsj(newArr).pipe(kxs)

  writeFile(fileUrl, Buffer.from(JSON.stringify(newArr), 'utf-8')).then(res => {
    console.log(res);
    console.log('写入成功');
    
  }).catch(err => {
    console.error(err)
  });
}



// 自定义可读流
const xrsj = function xrsj(arr:IEle[]) {
  class MyReadable extends Readable {
    constructor() {
      super({ objectMode: true });
    }
    _read() {
      this.push(arr);
      this.push(null);
    }
  }

  return new MyReadable();
}

// 可写
const kx = function kx() {
  class MyWritable  extends Writable  {
    constructor() {
      super({ objectMode: true });
    }
    _write(chunk: any) {
      // this.push(arr);
      // this.push(null);
      console.log(1);
      
      console.log(chunk);
    }
  }
  return new MyWritable();
}


export {
  getIndexType
}
