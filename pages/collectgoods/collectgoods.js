const indexData = require('../../utils/mock/index.js')
Page({
  data: {
    checked: false
  },
  onLoad: function (options) {
    this.setData({
      hotItems: indexData.collectItems
    });
  },

  clickFavTab: function (e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var _type = e.currentTarget.dataset.type
    var _items = []
    if (_type == 'goodsItems') {
      _items = this.data.goodsItems
      _items[index].isFav = !item.isFav
      this.setData({
        goodsItems: _items,
      })
    }
    if (_type == 'hotItems') {
      _items = this.data.hotItems
      _items[index].isFav = !item.isFav
      this.setData({
        hotItems: _items
      })
    }
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})