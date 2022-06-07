

interface IType {
  'ddd MMM DD YYYY HH:mm:ss':string;
  "M/D/YY":string;
  "MMM D, YYYY":string;
  "MMMM D, YYYY":string;
  "dddd, MMMM D, YYYY":string;
  "YYYY-MM-DD":string;
  "YYYY-MM-DDTHH:mm:ssZ":string;
  "HH:mm":string;
  "HH:mm:ss":string;
  "HH:mm:ss.SSS":string;
}
/**
 * 设置日期格式
 * @param date 日期对象
 * @param type 日期格式
 * @returns 
 */
function format(date:Date, type:keyof IType = 'ddd MMM DD YYYY HH:mm:ss'):string {

  return ''
}

format(new Date(2001, 2, 5, 6, 7, 2, 5))
