/**
 * 公共js
 */
import config from '../config.js'
const app = getApp();
/**
 * 设置收藏
 * @param goodsId 商品ID
 * @param remove 取消收藏，不传则添加
 */
export function collection(goodsId, remove) {
  if (typeof remove == undefined || remove == null) {
    remove = false;
  }
  if (remove) {
    app.request({
      url: config.favoriteUrl,
      data: {
        goodsid: goodsId
      },
      success: function (res) {
      }
    })
  }
  else {
    app.request({
      url: config.favoriteUrl,
      data: {
        ids: goodsId.toString()
      },
      success: function (res) {

      }
    })
  }
}

export function windowHeight() {
  var windowHeight = 0;
  wx.getSystemInfo({
    success: function (res) {
      var clientHeight = res.windowHeight,
        clientWidth = res.windowWidth,
        rpxR = 750 / clientWidth;
      windowHeight = clientHeight * rpxR;
    }
  })
  return windowHeight;
}
