
import { createReadStream, createWriteStream, readdir, stat, appendFile, WriteStream, writeFile } from 'fs';
import { promisify } from 'util';
import { resolve, join } from 'path';
import { Readable } from 'stream';

const readdirPromisify = promisify(readdir);
const statPromisify = promisify(stat);
const appendFilePromisify = promisify(appendFile);
const writeFilePromisify = promisify(writeFile);

// 获取文件路径信息
/**
 * 
 * @param str 目录(绝对路径)
 * @param extname 文件后缀名
 * @returns 
 */
const asyncGetPath = async (str:string, extname:string ) => {
  let arr:string[] = []; // 所有文件的绝对路径
  try {
    const readdirArr = await readdirPromisify(str);
    if(readdirArr.length === 0) {
      return [];
    }
    for (const key of readdirArr) {
      const urlStr = join(str, key);
      const rf = await statPromisify(urlStr);
      if(rf.isDirectory()) {
        // 是目录
        // console.log('是目录');
        const childArr = await asyncGetPath(urlStr, extname);
        arr = [...arr, ...childArr];
      } else {
        arr.push(urlStr);
      }
    }
    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const pathStr = resolve(__dirname, './testText');


// 合并文件
const asyncHbwj = async function asyncHbwj() {
  try {
    // 获取所有文件绝对路径
    const pathArr = await asyncGetPath(pathStr, 'txt');
    console.log(pathArr);

    // 追加内容
    const fileName = join(__dirname, '小刚刚.txt')

    const ws = createWriteStream(fileName);
    for(const key of pathArr) {
      const rs = createReadStream(key);
      // rs.pipe(ws);
      rs.on('data', chunk => {
        ws.write('\n' + chunk);
      })
    }

  } catch (error) {
    console.log('错误1');
    
    console.log(error);
  }
};

// 写一个通用的读取函数，返回promise对象
function getFile(filename:string) {
  return new Promise<string>((res, rej) => {
    // 创建读取函数
    let readerStream = createReadStream(filename);
    const chunks:Buffer[] = [];
    let size = 0;

    readerStream.on('data', function (chunk) {
      if(chunk instanceof Buffer) {
        chunks.push(chunk);
        size += chunk.length;
      }
    });

    readerStream.on('end', () => {
      // console.log(filename);
      console.log("读取结束");
      res(chunks.toString());
    });
    readerStream.on('error', () => {
      console.log("错误");
      rej();
    });
  })
}

asyncHbwj();

class RandomNumberStream extends Readable {
  strBuf:Buffer;
  strSize:number;
  zSize:number;

  constructor(str:Buffer, strSize:number) {
    super();
    this.strBuf = str;
    this.strSize = strSize * 1024;
    this.zSize = 0; // 当前添加的长度
  }

  // 异步
  _read(size:number) {
    console.log(size);
    console.log(this.zSize);
    console.log(this.strSize);
    
    // 内容过于小了
    if(size >= this.strSize) {
      console.log('1');
      
      this.push(this.strBuf);
      this.zSize = this.strSize;
      this.push(null);
      return;
    }
    const newBuf = this.strBuf.slice(this.zSize, size);
    if((this.zSize + size) <= this.strSize) {
      this.push(newBuf)
      console.log('2');
      this.zSize = this.zSize + size;
    } else {
      console.log('3');
      this.push(null)
    }
    console.log('4');
    
    
    

    // const ctx = this;
    // const buf = Buffer.from(this.strVal, 'utf8');
    // const isBool = this.push(buf);
    // if(!isBool) {
    //   ctx.push(null);
    // }
    
    // setTimeout(() => {
    //   ctx.push(null);
    // }, 100)
  }
}





