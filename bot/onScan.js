
const Qrterminal = require("qrcode-terminal")
/**
 * 扫码登录
 * @param qrcode
 * @param status
 */
module.exports = function onScan(qrcode, status) {
    // Qrterminal.generate(qrcode)
    console.log(`Scan QrCode to login: ${status}\n打开http://goqr.me/#t=url 将 ${qrcode} 生成二维码再扫描登陆`);
}
