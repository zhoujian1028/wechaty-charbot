const config = require('../config');
const { Message, UrlLink } = require('wechaty');
const axios = require('axios');
const headers = {
    headers: {
        'Content-Type': 'application/json'
    }
}
/**
 * 获取指令 处理指令 返回结果
 */
async function orderMessage(msg) {
    const contact = msg.talker(); // 发消息人
    const content = msg.text().trim(); // 消息内容
    const room = msg.room(); // 是否是群消息
    let is_check = false;
    let order = '';

    //如果是文本消息
    if(msg.type() == Message.Type.Text){        
        if (room) {
            // 群消息
            const topic = await room.topic();
            // 收到消息并@了自己
            if (await msg.mentionSelf()) {
                //获取消息内容 , 拿到整个消息文本 , 去掉@+名字 , 注意名字跟消息之间有空格
                let sendText = content.replace('@小玛哥', '').trim();            	
                console.log(`群名: ${topic} 发消息人: ${contact.name()} 消息内容: ${content}`);
                var queryData = {
                    "message_type": 'weixin_room',
                    "content": content,
                    "uid": topic,
                    "user_id": contact.name()
                };
                // 请求后端接口 负责处理指令逻辑
                axios.post('http://192.168.1.10/weixin/receive_message/', queryData, headers)
                    .then(function(response) {
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            }
        } else {
            if (contact.type() == 1){
                // 好友消息
                console.log(`发消息人: ${contact.name()} 消息内容: ${content}`);
                var queryData = {
                    "message_type": 'weixin_friend',
                    "content": content,
                    "uid": contact.name(),
                    "user_id": contact.name()                    
                };
                // 请求后端接口 负责处理指令逻辑
                axios.post('http://192.168.1.10/weixin/receive_message/', queryData, headers)
                    .then(function(response) {
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });                
            }
        }
    }
}

module.exports = {
    orderMessage
}
