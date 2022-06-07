import { createHash } from 'crypto'

/**
 * 计算 MD5
 */
const calculateMd5 = function(content: Buffer | string):string {
  const hash = createHash('md5');
  return hash.update(content).digest('hex');
};

export {
  calculateMd5
}
