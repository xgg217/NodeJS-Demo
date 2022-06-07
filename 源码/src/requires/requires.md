# 实现require模块加载器

## 用到的函数

+ path模块

  + basename: 基础路径, 有文件路径就不是基础路径

  + extname: 获取扩展名

  + dirname: 父级路径

  + join: 拼接路径

  + resolve: 当前文件夹的绝对路径，注意使用的时候不要在结尾添加/

  + __dirname: 当前文件所在文件夹的路径

  + __filename: 当前文件的绝对路径


  ```js
  const path = require('path', 's');
  console.log(path.basename('1.js'));
  console.log(path.extname('2.txt'));
  console.log(path.dirname('2.txt'));
  console.log(path.join('a/b/c', 'd/e/f')); // a/b/c/d/e/
  console.log(path.resolve('2.txt'));
  ```

+ fs模块

  + readFile和readFileSync，分别是异步读取文件和同步读取文件

    ```js
    const fs = require('fs');
    const buffer = fs.readFileSync('./name.txt', 'utf8'); // 如果不传入编码，出来的是二进制
    console.log(buffer);
    ```


  + fs.access: 判断是否存在。node10提供的，exists方法已经被废弃, 原因是不符合node规范，所以我们采用access来判断文件是否存在

    ```js
    try {
      fs.accessSync('./name.txt');
    } catch(e) {
        // 文件不存在
    }
    ```

+ vm:将一个字符串转换成js代码来运行


