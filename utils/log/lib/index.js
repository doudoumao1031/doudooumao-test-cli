'use strict';


const log = require('npmlog')

// 定制化 npmlog
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info' // 判断debug模式
log.heading = 'doudoumao' // 改前缀
log.headingStyle = {fg:'red', bg:'black'}
log.addLevel('success', 2000, {fg: 'green', bold: true}) // 添加自定义指令

module.exports = log;
