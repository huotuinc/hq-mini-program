Page({
  data: {},
  onLoad: function(options) {
    var scene = decodeURIComponent(options.scene)
    var goods = scene.split("_")
    console.log(options)
    wx.navigateTo({
      url: '../goodsdetails/details?goodsid=' +
        goods[0] +
        '&refermid=' + goods[1]
    })
  },

  onShow: function() {}
})