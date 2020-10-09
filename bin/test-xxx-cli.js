#!/usr/bin/env node
const program = require('commander')
program.version(require('../package.json').version)

/**命令行定制 */
program
    .command('init <name>') //定义命令
    .description('init project') //描述
    .action(require('../lib/init'))

program.parse(process.argv) //解析主进程的参数