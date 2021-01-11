## 前言
  如今运维人员都在强调自动化，降低运维成本。尽管现在搭建一套运维自动化体系架构并不难，然后有些工作还是必须需要运维手动工作，比如上线动作（上线的过程自动化，但是操作点由谁来操作，比如jenkins上谁去点击构建），或者开发找dba执行sql等日常操作，这些暂时都必须人为手动操作。次数多了，难免会想这些怎么去实现自动化，无需人为干预！针对这些运维痛点，目前已实现qq机器人实现上述自动化操作。其背后的逻辑是，当@机器人后，机器人自动往运维平台接口post数据，在运维平台接口里解析指令并处理相关逻辑，最终返回给用户。
  为了实现在微信上实现同等功能，便开始在github上寻找微信机器人，直到看到WeChaty解决方案，它是适用于微信个人及企业微信的BotSDK，提供微信机器人完美解决方案。

## WeChaty
  [Wechaty](https://wechaty.github.io/) 是适用于微信个人帐户的Bot SDK，可以帮助您创建6行JavaScript的机器人，并具有包括[Linux](https://travis-ci.com/wechaty/w
echaty)，[Windows](https://ci.appveyor.com/project/wechaty/wechaty)，[Darwin（OSX / Mac）](https://travis-ci.com/Wechaty/wechaty)和[Docker](https://app.shipp
able.com/github/Wechaty/wechaty)在内的跨平台支持。

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)


  **全球最短的ChatBot代码：6行JavaScript**

  ```javascript
  const { Wechaty } = require('wechaty')
  Wechaty.instance()
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode
)}`))
  .on('login',            user => console.log(`User ${user} logined`))
  .on('message',       message => console.log(`Message: ${message}`))
  .start()
  ```

## 使用WeChaty实现
  - 接收微信好友及微信群信息，并post给运维接口对指令集做逻辑处理
  - 提供外部访问Wechaty接口，方便外面调用，如外部通过http请求给微信群或个人发信息
    1）发送文本： curl  http://123.59.17.12:5708/send_group_msg?type=text&group_name=test&message=test
    2）发送图片： curl  http://123.59.17.12:5708/send_group_msg?type=media&group_name=test&message=test&url=www.xxx.com/xx.png
  
## 运行起来
1. ### 安装Node.js
   node官网：https://nodejs.org/zh-cn/
   Wechaty 要求Node.js版本10或以上，我使用的版本是nodev12.20.0 npm6.14.8。

2. ### 运行WeChaty
   先来安装一下
   ```
   cd wechaty-charbot
   npm install
   ```
   没有问题就可以运行WeChaty了

   在config/index.js下修改官方提供的token及端口
   执行 node index.js
   当您看到输出 `在WeChaty服务上监听 3000 端口...` 就是成功运行了～
   
## 您需要知道的事情
请勿使用此项目做违反微信团队相关规定或违法事情。尽量使用延时函数，防止被检测出类似机器人行为操作导致被微信团队禁止登录Web版本风险，因此您需要承担使用不当导致
被禁止登录的风险，均与作者无关。

## 最后
此项目开源仅供技术产品交流。对于开发者来说WeChaty是个很棒的产品，感谢WeChaty作者提供该解决方案。   
