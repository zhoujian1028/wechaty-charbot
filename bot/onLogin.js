const express = require('express');
const { FileBox } = require('file-box');
const config = require('../config')

//监听3000端口
const app = express();
const port = config.PORT;

/**
 * 扫码登录
 * @param qrcode
 * @param status
 */
module.exports = bot => {
    return async function onLogin(user) {
    	console.log(`Wechaty ${user} 登录了`);
        // 登陆后动作，这里可以写你要实现的登陆后东西
        // 用于解析 application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true })); 

        /**
         * 封装Wechaty方法，方便外面调用，如外部通过http请求给微信或个人发信息
         */
        app.get('/send_group_msg', async function(req, res) {
            var group_name = req.query.group_name;
            var message  = req.query.message;
            var type = req.query.type;
            const room = await bot.Room.find({topic: group_name});
            var date = new Date();
            if (type == 'text'){
                await room.say(message);
            }else if(type == 'media'){
                const fileBox = FileBox.fromUrl(req.query.url);
                await room.say(fileBox)
            }
            res.send("{\"status\":\"ok\",\"retcode\":0,\"message\":\"接收成功\"}");
        });

        app.get('/send_private_msg', async function(req, res) {
            var user_name = req.query.user_name;
            var message  = req.query.message;
            var type = req.query.type;
            const contact  = await bot.Contact.find({name: user_name});
            if (type == 'text'){
                await contact.say(message);
            }else if(type == 'media'){
                const fileBox = FileBox.fromUrl(req.query.url);
                await contact.say(fileBox)
            }
            res.send("{\"status\":\"ok\",\"retcode\":0,\"message\":\"接收成功\"}");
        });        

        //监听3000端口
        const server = app.listen(port, () => console.log(`在WeChaty服务上监听 ${port} 端口...`));
        global.express_server = server;
    }
}
