import { ofetch } from 'ofetch'

/**
 * 毒鸡汤
 */
export async function dujitang() {
  const url = new URL(`https://v2.xxapi.cn/api/dujitang`)

  const response = await ofetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }).catch((error) => {
    console.error('Error fetching soup:', error)
    throw new Error('Failed to fetch soup data')
  })

  // 处理API响应结果
  if (response.code === 1) {
    return {
      content: [{
        type: 'text',
        text: response.badsoup
      }]
    }
  }
  else {
    return {
      content: [{
        type: 'text',
        text: `无法获取数据`
      }]
    }
  }
}
