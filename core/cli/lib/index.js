'use strict';

module.exports = core;

const path = require('path')
const semver = require('semver')
const colors = require('colors/safe')
// const userDir = require('userdir')
// const homeOrTemp = require('home-or-tmp')
const userhome = require('userhome')
const pathExists = require('path-exists')
// const readme = require('../README.md') // require 不支持加载
// checkInputArgs()
const log = require('@doudoumao-test-cli/log')
const constant = require('./const')
const pkg = require('../package.json')
let args

async function core() {
  try {
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs() // --debug降级
    checkEnv()
    await checkGlobalUpdate()
    // log.verbose('debug', 'test debug log') // 更低的输出level --debug模式下启用
  } catch (error) {
    log.error(error.message)
  }
} 
// core()

async function checkGlobalUpdate() {
  // 1.获取当前版本号和模块名
  const currentVersion = pkg.version
  const npmName = pkg.name
  // 2.调用npm API 获取所有版本号
  const {getNpmSemverVersion} = require('@doudoumao-test-cli/get-npm-info')
  const newVersion = await getNpmSemverVersion(currentVersion, npmName)
  console.log(newVersion);
  // 3.比对版本号
  // 4.提示用户
}

function checkEnv() {
  const dotenv = require('dotenv')
  const dotenvPath = path.resolve(userhome(), '.env')
  if(pathExists(dotenvPath)){
    // config = dotenv.config({
    dotenv.config({
      path: dotenvPath
    })
  }
  // config = createDefaultConfig()
  createDefaultConfig()
  // log.verbose('环境变量', config, process.env.CLI_HOME_PATH)
}

function createDefaultConfig(params) {
  const cliConfig = {
    home: userhome()
  }
  if(process.env.CLI_HOME){
    cliConfig['cliHome'] = path.join(userhome(), process.env.CLI_HOME)
  }else{
    cliConfig['cliHome'] = path.join(userhome(), constant.DEFAULT_CLI_HOME)
  }
  process.env.CLI_HOME_PATH = cliConfig.cliHome
  // return cliConfig
}

function checkInputArgs() {
  const minimist = require('minimist')
  args = minimist(process.argv.slice(2))
  // console.log(args)
  checkArgs()
}

function checkArgs() {
  if(args.debug){
    process.env.LOG_LEVEL = 'verbose'
  }else{
    process.env.LOG_LEVEL = 'info'
  }
  log.level = process.env.LOG_LEVEL
}

function checkUserHome() {
  // console.log(userhome());
  const userHome = userhome()
  if(!userHome || !pathExists.sync(userHome)){
    throw new Error(colors.red('当前用户主目录不存在！'))
  }
}

function checkRoot(){
  // console.log(process.geteuid());
  const rootCheck = require('root-check')
  rootCheck()
  // console.log(process.geteuid());
}

function checkPkgVersion() {
  // console.log(pkg.version)
  log.notice('cli', pkg.version)
  // log.success('test', 'success..')
  // log.verbose('debug', 'debug..') // 低于默认level info 就不发送
}

function checkNodeVersion() {
  // console.log(process.version)
  const currentVersion = process.version
  const lowestVersion = constant.LOWEST_NODE_VERSION
  if(!semver.gte(currentVersion,lowestVersion)){
    throw new Error(colors.red(`doudoumao-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`))
  }
}