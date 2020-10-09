const { promisify } = require('util')
/**
 * 
 * @param {*} repo 克隆源地址
 * @param {*} desc 克隆目的地址
 */
module.exports.clone = async function(repo, desc) {
    //从git上下载内容
    const download = promisify(require('download-git-repo'))
    const ora = require('ora') //进度条
    const process = ora(`下载...${repo}`)
    process.start()
    await download(repo, desc)
    process.succeed() // 完成后会打√
}