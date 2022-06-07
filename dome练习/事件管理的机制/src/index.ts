// import c, {a, add} from './a'

// console.log(a);

// const d = add(1,2);
// console.log(d);


// console.log(c('xgg'));

import { EventEmitter } from 'events';

// 创建一个事件处理对象
// 可以注册事件，可以触发事件
const ee = new EventEmitter();
const a1 = () => {
  console.log('adc 事件触发了1');
};

// 注册方式1
ee.on('adc', a1);
ee.on('adc', a1);

ee.on('adc', a1);

const a2 = (...res:number[]) => {
  console.log('avb 事件触发了1' + res.join('---'));
};

// 注册方式2--注册多个事件，会依次触发
ee.addListener('avb', a2);
// ee.addListener('avb', a2);
// ee.addListener('avb', a2);

// 触发事件
// ee.emit('adc');
// ee.off('adc',a1);
// ee.off('adc',a1);
// ee.off('adc',a1);
// ee.emit('adc');

ee.emit('avb', 123,456);
ee.removeAllListeners('avb');
// ee.removeListener('avb',a2)
ee.emit('avb');
console.log(1111);

// 移除事件





