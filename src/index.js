#!/usr/bin/env node

import process from 'node:process'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  dujitangName,
  dujitangConfig,
  dujitangCb,
  heisiCb,
  heisiConfig,
  heisiName,
  jkCb,
  jkConfig,
  jkName
} from './tools/index.js'

async function main() {
  const server = new McpServer({
    name: 'cuiqg-mcp',
    version: '1.0.0',
    description: 'Tsuiqg\'s MCP Server'
  })

  server.registerTool(
    dujitangName,
    dujitangConfig,
    async () => {
      return await dujitangCb()
    }
  )

  server.registerTool(
    heisiName,
    heisiConfig,
    async () => {
      return await heisiCb()
    }
  )

  server.registerTool(
    jkName,
    jkConfig,
    async () => {
      return await jkCb()
    }
  )

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
