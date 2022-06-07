# require

## 模块分类

+ 原生(核心)模块：Node 提供的模块我们都称之为原生模块

  + 内建模块:Node.js 原生提供的模块中，由纯 C/C++ 编写的称为内建模块
  + 全局模块：Node.js在启动时，会生成一个全局量 process
  + 除了上面两种可以直接 require 的所有原生模块

+ 文件模块：用户编写的模块

  + 普通文件模块：node_modules 下面的模块，或者我们自己开发时候写的每个文件内容。
  + C++ 扩展模块：用户自己编写的 C++ 扩展模块或者第三方 C++ 扩展模块

## 源码位置

+ `/lib/internal/modules/cjs/loader.js` Module 类

## 加载顺序 require(X)

1. 基础准备阶段
2. 路径分析并定位到文件
3. 判断模块是否加载过(缓存判断)
4. 去加载 node 原生模块
5. 创建一个 Module 实例
6. 添加缓存
7. module.load 真正的去加载代码
8. 返回模块的 module.exports
