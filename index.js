const postcss = require('postcss');

const httpReg = /http:\//i
const base64Reg = /data:/i
/**
 * 在background(-image)的值中，不允许出现http协议的图片地址
 * 如果必须要使用，可以添加注释 : ignore-protocol 
 * 注释必须添加在本行分号之前，如: background: url(http://www.xxx.com/1.png) /* ignore-protocol * /;
 * 不能写在分号之后，否则会解析不到这行注释。
 */
module.exports = postcss.plugin('postcss-bia', (opts = {}) => {
  const ignoreReg = new RegExp('\/\\*\\s*' + (opts.ignoreFlag || 'ignore-protocol') + '\\s*\\*\/') // 构造匹配注释的正则, 注释规则: /* xxx */

  return (css, _) => {
    css.walkRules((rule) => {
      rule.walkDecls(/^background(-image)?$/, (decl, _) => {
        let rawWithComment = ''
        if (decl.raws.value && decl.raws.value.raw) {
          rawWithComment = decl.raws.value.raw
        }
        const raw = decl.value.trim()
        if (!ignoreReg.test(rawWithComment) && !base64Reg.test(raw) && httpReg.test(raw)) {
          throw decl.error('can NOT use http protocol in css files', {
            plugin: 'postcss-bia'
          })
        }
      })
    })
  }
});
