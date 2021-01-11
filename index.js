const {Wechaty} = require('wechaty')
const config = require('./config')
const onScan = require('./bot/onScan')
const onLogin = require('./bot/onLogin')
const onMessage = require('./bot/onMessage')
const onLogout = require('./bot/onLogout')

const puppet = 'wechaty-puppet-hostie'
const puppetOptions = {
  token: config.TOKEN,
}

const bot = new Wechaty({
    name: "wechaty-robot",
    puppet,
    puppetOptions,      
});

global.this_bot = bot;

bot
    .on('scan', onScan)
    .on('login', onLogin(bot))
    .on('logout', onLogout)
    .on('message', onMessage(bot))
    .start()
    .then(() => console.log('开始登陆微信'))
    .catch(e => console.error(e))



