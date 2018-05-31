/**
 * 公共js
 */

/**
 * 设置收藏
 * @param goodsId 商品ID
 * @param remove 取消收藏，不传则添加
 */
export function collection(goodsId, remove) {
  if (typeof remove == undefined || remove == null) {
    remove = false;
  }
}

export function windowHeight() {
  var windowHeight = 0;
  wx.getSystemInfo({
    success: function (res) {
      console.log(res.windowHeight);
      windowHeight = res.windowHeight;
    }
  })
  return windowHeight;
}
