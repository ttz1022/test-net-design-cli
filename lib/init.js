const { promisify } = require('util')
const figlet = promisify(require('figlet')) //文字字体

const clear = require('clear') //等同于清屏

const chalk = require('chalk') // 改变屏幕文字颜色
const log = content => console.log(chalk.green(content));
const { clone } = require('./download');

const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout) //正常流
        proc.stderr.pipe(process.stderr) //异常流
        proc.on('close', () => {
            resolve();
        })
    })
}

//init就是建立一个新的项目，也就是从github拉取一个新项目下来
//项目模板之类的
module.exports = async name => {
    //打印欢迎界面
    clear()
    const data = await figlet('KKB Welcome')
    log(data)
    // clone
    log(`创建项目: ${name}`)
    await clone('github:su37josephxia/vue-sample', name)

    //自动安装拉取项目的依赖
    const ora = require('ora') //进度条
    const progress = ora(`安装项目${name}依赖`)
    progress.start()
    const npm = process.platform === 'win32' ? 'npm.cmd': 'npm'
    await spawn(npm, ['install'], { cwd: `./${name}` })
    progress.succeed()
    log(`
安装完成
To get Start:
====================
    cd ${name}
    npm run server
===================
    `)
}
