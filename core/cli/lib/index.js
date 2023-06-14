'use strict';

module.exports = core;

const semver = require('semver')
const colors = require('colors/safe')
// const readme = require('../README.md') // require 不支持加载
const log = require('@doudoumao-test-cli/log')
const constant = require('./const')
const pkg = require('../package.json')

function core() {
  checkPkgVersion()
  checkNodeVersion()
  checkRoot()
}
core()

function checkRoot(){
  console.log(process.geteuid());
  const rootCheck = require('root-check')
  rootCheck()
  console.log(process.geteuid());
}

function checkPkgVersion() {
  // console.log(pkg.version)
  log.notice('cli', pkg.version)
  // log.success('test', 'success..')
  // log.verbose('debug', 'debug..') // 低于默认level info 就不发送
}

function checkNodeVersion() {
  console.log(process.version)
  const currentVersion = process.version
  const lowestVersion = constant.LOWEST_NODE_VERSION
  if(!semver.gte(currentVersion,lowestVersion)){
    throw new Error(colors.red(`doudoumao-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`))
  }
}