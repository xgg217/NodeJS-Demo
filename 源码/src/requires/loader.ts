import path from 'path';
import fs from 'fs';
import vm from 'vm';

interface IExports {
    [key:string]: any
}

interface IExtensions {
    ['.js']:(arg0: MyModule, arg1:string)=>void
    ['.json']:(arg0: MyModule, arg1:string)=>void
    ['.node']:(arg0: MyModule, arg1:string)=>void
    // [str:string]:()=>void
}

class MyModule {
    readonly id:string; // 就是 require 路径
    readonly path:string; // 获取路径中最后一个部分的上一层目录所在路径 path.dirname('/foo/bar/baz/asdf/quux.js'); // '/foo/bar/baz/asdf'
    exports:IExports = {}; // 导出的东西放到这里
    filename:string|null = null; // 模块对应的文件名
    loaded:boolean = false; // 标识文件是否已经加载
    // _extensions:IExtensions = Object.create(null);

    constructor(id = '') {
        this.id = id;
        this.path = path.dirname(id);
        // this.#_extensions = Object.create(null);

        this.require(id);

        this.init();
    }

    init() {
        MyModule._extensions['.json'] = function (module:MyModule, filename:string) {
            const content = fs.readFileSync(filename, 'utf8');
            try {
                module.exports = JSON.parse(content);
            } catch (e) {
                throw new Error(e)
            }
        }

        MyModule._extensions['.js'] = function (module:MyModule, filename:string) {
            const content = fs.readFileSync(filename, 'utf8');
            module.#_compile(content, filename);
        }

        MyModule._extensions['.node'] = function (module:MyModule, filename:string) {
           //TODO 暂时不实现：因为涉及到 c++ 代码
        }
    }

    /**
     * 创建一个空的缓存对象
     * @private
     */
    private static _cache = Object.create(null);

    /**
     * 创建一个空的扩展点名类型函数对象
     * 作用：
     * @private
     */
    static _extensions:IExtensions = Object.create(null);

    /**
     *
     * @param request 路径
     * @private
     */
    static #_load(request:string) {
        // 2. 路径分析并定位到文件
        const filename = MyModule.#_resolveFilename(request);
        console.log(filename)

        console.log('路径分析并定位到文件')

        // 3. 判断模块是否已经加载过（缓存判断）
        const cachedModule = MyModule._cache[filename];
        if(cachedModule !== undefined) {
            return cachedModule.exports;
        }

        // 4. 去加载 node 原生模块中
        // const mod = loadNativeModule(filename,request);
        // if(mod && mod.canBeRequiredByUsers) {
        //     return mod.exports;
        // }

        // 5. 如果缓存不存在，我们需要自行加载模块。new MyModule 实例
        // 加载完成直接放回 module.exports
        const module = new MyModule(filename);

        // 6. load 加载之前加入缓存，这也是不会造成循环应用的原因，但是循环引用这个缓存里面的 exports 可能还没有或者不完整
        MyModule._cache[filename] = module;

        // 7. module.load 真正的去加载代码
        module.load(filename);

        // 8. 返回模块的 module.exports
        return module.exports;
    }

    /**
     * 获取文件绝对路径（用户传入的require参数来解析到真正的文件地址）
     * node源码位置 /lib/internal/modules/cjs/loader.js#L816
     * 传递过来的值需要一层一层的判断，同时支持多种参数：内置模块，相对路径，绝对路径，文件夹和第三方模块等等。如果是文件夹或者第三方模块还要解析里面的 package.json 和 index.js
     * 注意：本次只实现通过相对路径和绝对路径来查找文件，并支持判断文件js和json后缀名判断
     * require
     * @param request 路径(
     * @private
     */
    static #_resolveFilename(request:string):string {
        const filename = path.resolve(request); // 获取传入参数对应的绝对路径

        const extname = path.extname(request); // 获取文件后缀名
        // 如果没有文件后缀名，则判断是否可以添加 .js 和 .json
        if(!extname) {
            console.log('没有文件后缀名')
            throw new Error('没有文件后缀名')
            // const exts = Object.keys()
        }

        return filename
    }

    /**
     * 直接调用Module._load并return
     */
    private require(request:string) {
        return MyModule.#_load(request);
    }

    /**
     * 获取文件可能路径
     * @private
     */
    #_resolveLookupPaths() {}

    /**
     * 根据文件可能路径定位文件绝对路径，包括后缀补全（.js, .json, .node）等都在此方法中执行
     * 最终返回文件绝对路径
     * @private
     */
    #_findPath() {}

    load(request:string) {
        // 获取文件后缀名
        const exname = path.extname(request);

        // 更加不同的后缀名去进行不同的处理
        // this.#_extensions[exname](this, request);



        // MyModule._extensions[exname](this, request)
        // this.loaded = true;
    }



    // _extensions['js'] = function ()

    // _extensions['.js'] = (module:MyModule, filename:string) {
    //     const content = fs.readdirSync(filename, 'utf8');
    //     module.#_compile(content, filename);
    // }

    private static wrapper = [
        'function (exports,require,module,__filename,__dirname) {',
        '\n}'
    ];

    static wrap = function (script:string) {
        return MyModule.wrapper[0] + script + MyModule.wrapper[1];
    }

    #_compile(content:string, filename:string) {

        const wrapper = MyModule.wrap(content); // 获取包装后的函数体

        // vn 是 node.js 的虚拟机模块， runInThisContext 方法 可以接受一个字符串并将它转化为一个函数
        // 返回值就是转化后的函数，compiledWrapper 是一个函数
        const compiledWrapper = vm.runInThisContext(wrapper, {
            filename,
            lineOffset: 0,
            displayErrors: true
        });

        const dirname = path.dirname(filename);

        // 调用函数
        // js 文件里面的 exports 也是对module.exports 的一个引用
        /**
         * this: compiledWrapper函数是通过 call 调用的，第一个参数就是里面的this，这里我们传入的是 this.exports，也就是 module.exports
         * exports: compiledWrapper 函数正式接收的第一个参数是 exports，我们传的也是 this.exports,所以 js 文件里面的 exports 也是对module.exports 的一个引用。
         * require: 这个方法我们传的是 this.require，其实就是KoalaModule.prototype.require 函数，也就是 KoalaModule._load
         * module: 我们传入的是 this，也就是当前模块的实例
         * __filename：文件所在的绝对路径
         * __dirname: 文件所在文件夹的绝对路径
         */
        compiledWrapper.call(this.exports, this.exports, this.require, this, filename, dirname)
    }
}

function loadNativeModule() {

}




export const myRequire = function (path:string) {
    return new MyModule(path)
}



