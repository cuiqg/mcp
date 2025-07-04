#!/usr/bin/env node

import process from 'node:process'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { registerTools } from './tools/index.js'

const server = new McpServer({
  name: 'cuiqg-mcp',
  version: '1.0.0',
  description: 'Cuiqg\'s MCP Server'
})

registerTools(server)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
