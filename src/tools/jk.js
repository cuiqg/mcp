import { request, imageToBase64 } from '../utils.js'

/**
 * @name jkCb
 * @ses {@link https://xxapi.cn/doc/jk|小小API}
 *
 */
export async function jkCb() {
  const url = `https://v2.xxapi.cn/api/jk`
  let data
  const res = await request(url)

  if (res.error) {
    data = {
      content: [{
        type: 'text',
        text: res.error
      }]
    }
  }
  else {
    if (res.results.code === 200) {
      const img = await imageToBase64(res.results.data)
      data = {
        content: [{
          type: 'image',
          data: img.base64,
          mimeType: img.contentType
        }]
      }
    }
    else {
      data = {
        content: [{
          type: 'text',
          text: res.results.msg
        }]
      }
    }
  }

  return data
}

/**
 * 配置
 * @type {object}
 */
export const jkConfig = {
  title: '随机JK图片',
  description: '随机返回高质量jk图片'
}

/**
 * 名称
 * @type {string}
 */
export const jkName = 'get_jk'
