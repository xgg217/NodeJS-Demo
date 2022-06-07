
interface ICfg {
  data
  args:IArguments
}

// 判断当前是否来自 Dayjs
const isDayjs = (d:any) => {
  return d instanceof Dayjs;
};



// 
const parseLocale = function parseLocale(cfg) {

}

class Dayjs {
  constructor(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg);
  }

  parse(cfg) {

  }

  init() {

  }
};

const dayjs = function(data:any, c) {
  if(isDayjs(data)) {
    debugger;
    return;
  }
  const cfg = (typeof(c) === 'object') c : {};
  cfg.data = data;
  cfg.args = arguments;
  return
};

export default dayjs;
