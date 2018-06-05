const indexData = require('../../utils/mock/index.js')
Page({
  data: {
    checked: false,
    checkedTitle: '已选 （0）'
  },
  onLoad: function (options) {
    this.setData({
      hotItems: indexData.collectItems
    });
  },
  // 选中和不选中
  clickFavTab: function (e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var _items = this.data.hotItems
    _items[index].isFav = !item.isFav
    this.setData({
      hotItems: _items
    })
    let num = 0
    for (var i = 0; i < _items.length; i++) {
      if (!_items[i].isFav) {
        num++
      }
    }
    if (num < _items.length) {
      this.setData({
        checked: false,
        checkedTitle: '已选（' + num + '）'
      })
    } else {
      this.setData({
        checked: true,
        checkedTitle: '全选（' + num + '）'
      })
    }
  },
  
  // 全选全部选
  checkedAll: function (e) {
    var _items = this.data.hotItems
    var check = this.data.checked
    if (!check) {
      for (var i = 0; i < _items.length; i++) {
        if (_items[i].isFav) {
          _items[i].isFav = false
        }
      }
      this.setData({
        hotItems: _items,
        checked: true,
        checkedTitle: '全选（' + _items.length + '）'
      })
    } else {
      for (var i = 0; i < _items.length; i++) {
        if (!_items[i].isFav) {
          _items[i].isFav = true
        }
      }
      this.setData({
        hotItems: _items,
        checked: false,
        checkedTitle: '已选（0）'
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