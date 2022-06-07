import fs from 'fs';
import path from 'path';
import vm from 'vm';

enum EEextension {
  js = '.js',
  json = '.json'
}

/**
 * 
 * @param path 参数为模块路径
 */
function Require(modulePath:string) {
  // 获取当前要加载的绝对路径
  const absPathname = path.resolve(__dirname, modulePath);

  // 从缓存中读取，如果存在，直接返回结果
  if (MyModule._cache[absPathname]) {
    return MyModule._cache[absPathname].exports;
  }

  // 尝试加载当前模块
  // tryModuleLoad(module);

  // 创建模块，新建Module实例
  const module = new MyModule(absPathname);

   // 加载当前模块
   tryModuleLoad(module);

    // 返回exports对象
    return module.exports;
}

/**
 * 定义模块, 添加文件id标识和exports属性
 */
class MyModule {
  readonly id: string;
  exports:Object

  constructor(id:string) {
    this.id = id;

    // 读取到的文件内容会放在exports中
    this.exports = {};
  }

  // node模块是运行在一个函数中
  static wrapper = [
    "(function(exports, module, Require, __dirname, __filename) {",
    "})"
  ]

  static _extensions = {
    '.js'(module:string) {
      const content = fs.readFileSync(module.id, 'utf8');
      const fnStr = MyModule.wrapper[0] + content + MyModule.wrapper[1];
      const fn = vm.runInThisContext(fnStr);
      fn.call(module.exports, module.exports, module, Require,__filename,__dirname);
    },
    '.json'(module:string) {
        const json = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(json); // 把文件的结果放在exports属性上
    }
  }
}

/**
 * 定义模块加载方法
 * @param module 模块对象
 */
function tryModuleLoad(module) {
  // 获取扩展名
  const extension = path.extname(module.id) as EEextension;

  // 通过后缀加载当前模块
  MyModule._extensions[extension](module)
}
