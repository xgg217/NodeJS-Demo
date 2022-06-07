import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';
import { resolve, join } from 'path';
import mime from 'mime-types';
import fs from 'fs';

// 用于获取文件路径
const getFileName = async function getFileName(urlPath:string, root:string):Promise<string | null> {
  const filename = join(root, urlPath);
  try {
    // 查看文件信息
    const rf = await fs.promises.stat(filename);
    console.log(filename);
    console.log(rf);
    if(rf.isDirectory()) {
      // 是目录
      console.log('是目录');
      const newUrlPath = join(urlPath, 'index.html');
      return await getFileName(newUrlPath, root);
    } else {
      // 是文件
      console.log('是文件');
      return filename;
    }
  } catch (error) {
    // 如果报错就是文件不存在
    console.error(error);
    console.error('文件不存在');
    return null;
  }
};


export default function(root:string) {
  console.log(root);
  
  return async function(cxt:ParameterizedContext<DefaultState, DefaultContext, any>, next:Next) {
    if(cxt.method !== 'GET') {
      // 请求非静态资源
      await next();
      return;
    }
    try {
      // 得到内容
      const filename = await getFileName(cxt.path, root);
      console.log(filename);
      if(filename === null) {
        // 文件不存在
        await next();
      } else {
        // 得到文件内容
        cxt.body = fs.createReadStream(filename);
        cxt.type = mime.lookup(filename) || '';
      }
    } catch (error) {
      console.error(error);
      
    }
    
  }
};

// 分析
/**
 * 分析
 * 1. 是目录 添加上idnex.html 重新查找
 * 2. 是文件 直接返回文件名
 * 3. 不存在 返回 null
 */