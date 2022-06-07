import fs from 'fs';
import {IOptions} from './interfaces'
import {EventEmitter} from 'events';
import {Buffer} from "buffer";
import {type} from "os";

class MyCreateReadStream extends EventEmitter {
    readonly path: string
    readonly options: Partial<IOptions> = {};
    flags: IOptions['flags'];
    encoding: IOptions['encoding'];
    fd: IOptions['fd'];
    mode: IOptions['mode'];
    start: IOptions['start']; // 读取的开始位置
    end: IOptions['end']; // 读取的结束位置
    autoClose: IOptions['autoClose']; // 流出错或结束时是否自动销毁流
    highWaterMark: IOptions['highWaterMark'];
    pos = 0 // 从文件的哪个位置开始读，start是开始位置，pos是当前位置，初始化等于开始位置
    // bytesRead:number; // 已读的字节数
    closed = false; // 流是否已经关闭
    flowing: boolean | null = null; // 非流动模式
    buffer: Buffer


    constructor(path: string, options: Partial<IOptions> = {}) {
        super();

        this.path = path;

        this.flags = options.flags || 'r'; // 默认读取
        this.encoding = options.encoding || null; // 默认null
        this.fd = options.fd || null; // 取拿一个文件，默认null，createReadStream自己处理得到
        this.mode = options.mode || 0o666; // 默认值可读可写不可操作
        this.autoClose = options.autoClose || true; // 默认 ture，读取完毕后关闭文件
        this.start = options.start || 0; // 开始读取的位置
        this.end = options.end || Infinity; // 默认 Infinity无限读取
        this.highWaterMark = options.highWaterMark || 64 * 1024 // 默认64kb 也就是1024字节 * 64

        this.buffer = Buffer.alloc(this.highWaterMark) // 声明一个 buffer 表示出来的数据

        // 打开文件
        this.open();

        // 查看是否监听了 data 事件，如果监听了就要变成流动模式
        this.on('newListener', (eventName, callback) => {
            if (eventName === 'data') {
                // 用户监听了 data 事件
                this.flowing = true;
                this.read();
            }

        })
    }

    /**
     * 打开文件
     *   1. 如果发生错误，关闭文件，同时发射 "error"事件
     *   2. 如果没有错误，保存fd,然后发射 "open"事件
     */
    open() {
        console.log('打开文件')
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                // 需要自动关闭再去销毁fd
                if (this.autoClose) {
                    this.destrop(); // 关闭文件
                }
                // 打开发生错误，发布error事件
                this.emit('error', err);
                return
            }
            console.log(fd)

            this.fd = fd; // 保存文件描述符

            this.emit('open', this.fd); // 触发文件 open 方法
        })
    }

    /**
     * 关闭文件
     *   1. 文件未打开，也要关闭文件，且触发 close 事件
     *   2. 如果文件打开过，那就关闭文件且触发 close 事件
     */
    destrop() {
        console.log('关闭文件')
        // 文件未打开，也要关闭文件，且触发 close 事件
        if (typeof (this.fd) !== 'number') {
            this.emit('close')
            return;
        }

        // 如果文件打开过，那就关闭文件且触发 close 事件
        fs.close(this.fd, err => {
            if (err) {
                this.emit('error')
                return
            }
            this.emit('close')
            this.fd = null;
        })
    }

    /**
     * 读文件
     *   1. 确保真的拿到fd(文件描述符，默认3，number类型)
     *   2. 确保拿到fd后，对fs.read中 howMuchToRead 有一个绕的算法
     *   3. 异步递归去读文件，读完为止。
     *
     */
    read() {
        // 文件没有打开
        if (typeof (this.fd) !== 'number') {
            console.log('文件没有打开')
            this.once('open', () => {
                this.read()
            })
            return;
        }

        // 读取文件
        let howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;

        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, byteRead) => {
            if (err) {
                if (this.autoClose) {
                    this.destrop();
                }
                this.emit('error', err)
                return
            }
            this.pos += byteRead; // byteRead 真实读到的个数
            let b: string | Buffer = this.buffer.slice(0, byteRead);

            b = this.encoding ? b.toString(this.encoding) : b; // 设置
            this.emit('data', b); // 将读到的 buffer 发射出去

            if ((byteRead === this.highWaterMark) && this.flowing) {
                this.read();
                return;
            }
            if (byteRead < this.highWaterMark) {
                this.emit('end'); // 读取完毕
                this.destrop(); // 销毁完毕
            }
        })
    }

}

export {
    MyCreateReadStream
}





