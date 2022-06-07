const crypto = require('crypto');

/**
 * 生成随机字符串
 * @returns string
 */
const getRandomStr = function() {
  return Math.random().toString(36).slice(-8);
};

// 使用对称加密算法 aes 128位
// 128位密钥
const secret = Buffer.from('jme3l97ckwkef5gg');

// 准备一个iv，随机向量

/**
 * 加密字符串
 * @param { string } str
 */
const encrypt = function(str) {
  
};

/**
 * 解密
 * @param {*} str 
 */
const decrypt = function(str) {

};

// module.exports = function name(params) {
const aa = function name(params) {
  const iv = Buffer.from(getRandomStr() + getRandomStr());
  return {
    // 加密
    encrypt(str) {
      const cry = crypto.createCipheriv('aes-128-gcm', secret, iv)
      let result = cry.update(str, 'utf-8', 'utf-8');
      result += cry.final('utf-8');
      console.log(result);
    },
    decrypt
  }
  
}
const aobj1 = aa();
console.log(aobj1.encrypt('123'));

console.log(aa());