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
