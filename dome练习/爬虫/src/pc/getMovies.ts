import axios from 'axios';
import { bealURL } from './url'
import * as cheerio from 'cheerio';
import { writeFile } from 'fs/promises'
import { resolve, extname } from 'path'
import { createWriteStream } from 'fs';

enum pad {
  typesURL = '/vod/list/n_1/o3u1p1.html?fr=vodhome_js_lx' // 获取分类类型
}

interface ISearchStr {
  [str:string]: {
    name: string
  }
};
interface IEle {
  url: string;
  text: string;
  imgSrc: string; // 图片地址
  type?: string; // 简介
  fs?: string; // 分数
}

// 过滤出来
const glcl = function(arr:IEle[], url:string) {
  const newArr = arr.filter(item => {
    if(item.imgSrc === url) {
      return true;
    }
    return false;
  });

  const obj = newArr[0];
  if(newArr.length !== 1) { return '' }

  console.log(obj);
  
  // 不存在图片地址
  if(!obj.imgSrc) {
    return '';
  }

  const name = extname(obj.imgSrc);
  return obj.text + name;
  
}

const setTypeData = function setTypeData(str:string) {
  const $ = cheerio.load(str);
  const searchStr = $('#page .container #content .search-list div a');


  const arr:IEle[] = searchStr.get().map(item => {
    const ele = $(item);
    // const urlDom = ele.find('a');
    const nameDom = ele.find('h3');
    const imgDom = ele.find('img');
    const typeDom = ele.find('p');
    const fsDom = ele.find('i');
    
    return {
      url: ele.attr('href') || '',
      text: nameDom.text() || '',
      imgSrc: imgDom.attr('src') || '',
      type: typeDom.text() || '',
      fs: fsDom.text() || '0',
    }
  });
  // {
  //   // 将图片下载到本地
  //   const newArr = arr.map(item => {
  //     return axios.get(item.imgSrc, {
  //       responseType:'stream'
  //     });
  //   });
  //   Promise.all(newArr).then(res => {
  //     res.forEach(item => {
  //       const imgStr = glcl(arr, item.data.responseUrl);
  //       const fl = resolve(__dirname, './imgs');
        
  //       if(imgStr.length) {
  //         const ws = createWriteStream(`${fl}/${imgStr}`);
  //         item.data.pipe(ws);
  //       }
  //     })
  //   });
  // }


  // 将数据存入本地
  const fileUrl = resolve(__dirname, './movies.json');
  writeFile(fileUrl, Buffer.from(JSON.stringify(arr), 'utf-8')).then(res => {
    console.log(res);
    console.log('写入成功');
  }).catch(err => {
    console.error(err)
  });

};

// 获取起始页的所有分类地址
const getMovies = function() {
  return axios.get(bealURL.url1 + pad.typesURL).then(res => {
    // console.log(res);
    if(res.status !== 200) {
      return '错误'
    }
    console.log(111);
    
    setTypeData(res.data);
    // return res.data;
  })
};

export {
  getMovies
}


