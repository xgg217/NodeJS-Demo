interface IOpt {
  secondsDecimalDigits?: number; // 秒小数点后显示的数字数
  millisecondsDecimalDigits?: number; // 毫秒小数点后显示的数字数
  keepDecimalsOnWholeSeconds?: boolean; // 将毫秒保持在整秒
  compact?: boolean; // 只显示第一个单位
  unitCount?: number; // 要显示的单位数
  verbose?: boolean; // 使用全长单元 5h 1m 45s   5 hours 1 minute 45 seconds
  separateMilliseconds?: boolean; // 分别显示毫秒
  colonNotation?: boolean; // 5h 1m 45s 5:01:4 51s0:01
  formatSubMilliseconds?: boolean; // 显示微秒和纳秒
}

interface ITime {
  num: number; // 时间
  company:string; // 单位
}

enum ETime {
  year = '年',
  days = '天',
  hours = '小时',
  minutes = '分',
  seconds = '秒',
  milliseconds = '毫秒',
  microseconds = '微秒',
  nanoseconds = '纳秒'
}

const lenMap = new Map([
  [31536000000, {
    num: 31536000000, // 1000 * 60 * 60 * 24 * 365 年
    company: ETime.year
  }],
  [86400000, {
    num: 86400000, // 1000 * 60 * 60 * 24天
    company: ETime.days
  }],
  [
    3600000, {
      num: 3600000, // 1000 * 60 * 60 小时
      company: ETime.hours
    }
  ],
  [
    60000, {
      num: 60000, // 1000 * 60 分钟
      company: ETime.minutes
    }
  ],
  [
    1000, {
      num: 1000, // 秒
      company: ETime.seconds
    }
  ]
]);


export default function init(num:number, opt: IOpt = {} ) {
  const options:IOpt = {
    compact: false,
    formatSubMilliseconds: false,
    separateMilliseconds: false,
    verbose: false,
    secondsDecimalDigits: 0,
    millisecondsDecimalDigits : 0,
    ...opt
  };

  // 连接
  if(options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }

  if(options.compact) {
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }

  const timeArr:ITime[] = [];

  let n = 0;
  for(const [ind, obj] of lenMap) {
    if(ind <= num) {
      const s = Math.trunc((num - n) / obj.num);
      n = n + s * obj.num;
      const data:ITime = {
        num: s,
        company:obj.company
      }
      timeArr.push(data);
    }
  }

  // 只显示最大的单位
  if(options.compact) {
    const data = timeArr[0];
    return `${data.num}${data.company}`
  }

  // 显示完整单位对中文来说没有意义
  if(options.verbose) {
    // 2m 43.7s
    // 2 minutes 43.7 seconds
  }

  // 设置连接方式
  if(options.colonNotation) {
    return timeArr.map(item => {
      return item.num;
    }).join(':');
  }

  return timeArr.map(item => {
    return item.num + item.company;
  }).join(' ');



}
