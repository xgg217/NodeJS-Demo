# fs.createReadStream

## 解释

+ `fs.createReadStream` 创建可读流：流是将数据分割段，一段一段的读取，可以控制速率,效率很高,不会占用太大的内存

## 用法

+ node中读是将内容读取到内存中，而内存就是Buffer对象
+ 流都是基于原生的fs操作文件的方法来实现的，通过fs创建流。所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
+ open -打开文件
+ data -当有数据可读时触发。
+ error -在读收和写入过程中发生错误时触发。
+ close -关闭文件
+ end - 没有更多的数据可读时触发

## 用法

+ 创建：默认创建一个流 是非流动模式，默认不会读取数据

  ```js
  const fs = require('fs')
  const rs = fs.createReadStream('./1.txt', {
    highWaterMark:3, //文件一次读多少字节,默认 64*1024
    flages: 'r', // 默认 ‘r’
    autoClose: true, // 默认读取完毕后自动关闭
    start: 0, // 读取开始位置
    end: 3, // 闭合区间 包含 start也包含end
    encodeing: 'urf8' // 默认 null
  })
  ```

+ 监听 open 事件

  ```js
  rs.on('open', () => {
    console.log('文件打开')
  })
  ```

+ 监听 data 事件

  + 可读流这种模式它默认情况下是非流动模式(暂停模式)，它什么也不做，就在这等着
  + 监听了data事件的话，就可以将非流动模式转换为流动模式
  + 流动模式会疯狂的触发data事件，直到读取完毕

  ```js
  // 疯狂触发 data 事件 直到读取完毕
  rs.on('data', data => {
    console.log(data) // 共读取4个字节，但
  })
  ```

+ 监听 err/end/close 事件

  ```js
  rs.on('err', () => {
    console.log('发生错误')
  })
  
  rs.on('end', () => {
    console.log('读取完毕')
  })
  
  rs.on('close', () => {
    console.log('文件关闭触发')
  })
  ```

## 静态方法

+ rs.pause() 暂停读取,会暂停data事件的触发，将流动模式转变非流动模式
+ rs.resume()恢复data事件,继续读取，变为流动模式
