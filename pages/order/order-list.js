import {
  windowHeight
} from '../../utils/common.js'
// const order = require('../../utils/mock/order.js')

import orderList from '../../utils/request/order.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: windowHeight(),
    orderStatus: ["全部", "待付款", "代发货", "待收货", "已收货"],
    // orders: {
    //   0: order.list,
    //   1: order.list,
    //   2: order.list,
    //   3: order.list,
    //   4: order.list,
    // },
    pageIndex: 1,
    pageSize: 20
  },
  swichNav: function(e) {
    var cur = e.target.dataset.current
    if (this.data.currentTab == cur) {
      return false
    }
    this._getOrderList(cur, 0)
    this.setData({
      currentTab: cur
    })
  },

  //value 改变时触发 change 事件，event.detail = {value: value}
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  _goGoodsDetails: function(e) {
    wx.navigateTo({
      url: '../orderdetails/index',
    })
  },

  _getOrderList: function(customerId, orderStatus) {
    var self = this
    var data = {
      pageSize: this.data.pageSize,
      pageIndex: this.data.pageIndex,
      orderStatus: orderStatus,
      customerId: customerId
    }
    orderList.getOrderList(data, function(res) {
      self.setData({
        itemList: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      currentTab: options.currenttab
    })

    this._getOrderList(options.currenttab, 0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('circle 下一页');
    // var _orders = this.data.orders;
    // _orders[this.data.currentTab] = _orders[this.data.currentTab].concat(order.list)
    // this.setData({
    //   orders: _orders
    // })
  }

})