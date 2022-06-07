// const fs = require('fs');
// const myCreateReadStream = require('./myCreateReadStream.js');

// const readStream = fs.createReadStream('./111.md');
// // const readStream = new myCreateReadStream('./111.md');
// readStream.on('data', data => {
//   console.log(data);
// })
import path from 'path';
import fs from 'fs'

import {MyCreateReadStream} from './fs/createReadStream'

import { myRequire } from './requires/loader'

(function () {
    myRequire(path.resolve('./requires/test.json '))
})();

// (function () {
//     const rs = new MyCreateReadStream(path.resolve(__dirname, '111.md'), {
//         highWaterMark: 3,
//         flags: 'r',
//         autoClose: true,
//         // start: 0,
//         // end: 3,
//         encoding: 'utf8'
//     });
//
//     rs.on('open', () => {
//         console.log('打开文件open');
//     })
//
//     rs.on('error', () => {
//         console.log('error 文件错误');
//     })
//
//     rs.on('data', (chunck) => {
//         console.log('data 文件读取');
//         console.log(chunck)
//     });
//
//     rs.on('end', () => {
//         console.log('end 文件读取结束');
//     });
//     rs.on('close', () => {
//         console.log('close 文件关闭');
//     });
//
// })();


// (function () {
//   const readStream = fs.createReadStream(path.resolve(__dirname,'111.md'),{ encoding: 'utf8'});
// // const readStream = new myCreateReadStream('./111.md');
//   readStream.on('data', data => {
//     console.log(data);
//   })
// })()





