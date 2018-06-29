import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  data: {
    startX: 0, //开始坐标
    startY: 0
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    this.data.addressList.forEach(function(v, i) {
      if (v.isTouchMove)
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      addressList: this.data.addressList
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      startX = that.data.startX,
      startY = that.data.startY,
      touchMoveX = e.changedTouches[0].clientX,
      touchMoveY = e.changedTouches[0].clientY,
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.addressList.forEach(function(v, i) {
      v.isTouchMove = false
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX)
          v.isTouchMove = false
        else
          v.isTouchMove = true
      }
    })
    that.setData({
      addressList: that.data.addressList
    })
  },
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  del: function(e) {
    var self = this
    var id = e.currentTarget.dataset.pid
    user.deleteAddress({
      id: id
    }, function(res) {
      self._getAddressList()
    })
  },

  //添加收货地址
  _goAddAddress: function(e) {
    wx.navigateTo({
      url: '../addAddress/index?pid=0',
    })
  },
  //获取收货地址管理列表
  _getAddressList: function() {
    var self = this
    user.addressList(function(res) {
      self.setData({
        addressList: res.data.data
      })
    })
  },
  //设置默认收货地址
  _setDefaultAddress: function(e) {
    var id = e.currentTarget.dataset.pid
    user.changeAddressDefault({
      id: id
    }, function(res) {
      wx.navigateBack({
        delta: 1
      })
    })
  },
  //编辑收货地址
  _editAddress: function(e) {
    var id = e.currentTarget.dataset.pid
    var index = e.currentTarget.dataset.index
    var editAddress = this.data.addressList
    // console.log(editAddress[index])
    wx.setStorage({
      key: 'editAddress',
      data: editAddress[index],
      success: function() {
        wx.navigateTo({
          url: '../addAddress/index?pid=' + id,
        })
      }
    })
  },
  onLoad: function(options) {

  },


  onShow: function() {
    this._getAddressList()
  }
})