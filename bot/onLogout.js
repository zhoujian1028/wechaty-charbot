//登出
module.exports = function onLogout(user) {
    console.log(`Wechaty ${user} 已经登出`);
    express_server.close(() => {
        console.log('express server 已经退出');
    })
}
