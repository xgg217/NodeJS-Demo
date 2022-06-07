import { FileHandle } from "fs/promises"

export interface IOptions {
  flags:string
  encoding:BufferEncoding|null
  // fd:FileHandle|null
  fd:number|null
  mode:number
  autoClose:boolean
  emitClose:boolean
  start:number
  end :number
  highWaterMark:number
  fs:null
}

export interface ISource {
  [key: string]: any
}

export interface Ibytes {
  bytesRead: number;
  buffer: Buffer;
}


