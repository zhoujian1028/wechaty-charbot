// 监听对话
const { orderMessage } = require('../message/order');

module.exports = bot => {
    return async function onMessage(msg) {
        await orderMessage(msg);
    }
}



