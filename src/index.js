#!/usr/bin/env node

import process from 'node:process'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { ofetch } from 'ofetch'

const API_URL = process.env.SOUP_API_URL || 'https://www.7ed.net/soup/api'

async function fetchSoup() {
  const url = new URL(API_URL)

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

  if (response.code === 1) {
    return response.badsoup
  }
  else {
    return `无法获取数据`
  }
}

async function main() {
  const server = new McpServer({
    name: 'soup',
    version: '0.1.0',
    capabilities: {
      resources: {},
      tools: {}
    }
  })

  server.tool('soup', '获取毒鸡汤', {},
    async () => {
      const soup = await fetchSoup()
      return {
        content: [
          {
            type: 'text',
            text: soup
          }
        ]
      }
    }
  )

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
