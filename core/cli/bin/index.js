#! /usr/bin/env node

// const utils = require('@doudoumao-test-cli/utils')
// utils()
// console.log('hello doudoumao-test-cli!!!')

const importLocal = require('import-local')

// if (importLocal(import.meta.url)) {
// __filename /Users/liang/文件/CodeSpace/jiagoushi2022-src/doudoumao-test-cli/doudoumao-test-cli/core/cli/bin/index.js
if(importLocal(__filename)){
    console.log('Using local version of this package');
    require('npmlog').info('cli', '正在使用 doudoumao-test-cli 本地版本')
}else{
    // Code for both global and local version here…
    require('../lib')(process.argv.slice(2))
    // require('npmlog').info('cli', __filename)
}