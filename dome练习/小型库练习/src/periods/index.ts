
interface IPeriods {
  second:(n?:number) => number;
  minute:(n?:number) => number;
  hour:(n?:number) => number;
  day:(n?:number) => number;
  week:(n?:number) => number;
  monthRough:(n?:number) => number;
  yearRough:(n?:number) => number;
}

const periods:IPeriods = {
  second(n = 1) {
    // 毫秒
    return 1000 * n;
  },
  minute(n = 1) {
    // 分钟
    return periods.second() * 60 * n;
  },
  hour(n = 1) {
    // 小时
    return periods.minute() * 60 * n;
  },
  day(n = 1) {
    // 天
    return periods.hour() * 24 * n;
  },
  week(n = 1) {
    // 周
    return periods.day() * 7 * n;
  },
  monthRough(n = 1) {
    // 月
    return periods.week() * 4.3 * n;
  },
  yearRough(n = 1) {
    // 年
    return periods.day() * 365.25 * n;
  },
};

export default periods;

