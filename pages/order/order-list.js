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
    pageIndex: 1,
    pageSize: 20
  },
  //类目切换
  swichNav: function(e) {
    var cur = e.target.dataset.current
    if (this.data.currentTab == cur) {
      return false
    }
    this._getOrderList(cur)
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
      url: '../orderdetails/index?orderId='+e.currentTarget.dataset.orderid
    })
  },
  //取消订单
  _cancelOrder: function(e) {
    var self = this
    var orderStatus = this.data.currentTab
    var orderId = e.currentTarget.dataset.order[0].orderId
    wx.showModal({
      content: '您确认要取消当前订单吗？',
      success: function(res) {
        if (res.confirm) {
          orderList.closeOrder({
            orderId: orderId
          }, function(req) {
            console.log(req)
            wx.showLoading({
              title: '取消中...',
              icon: 'loading',
              success: function() {
                if (req) {
                  wx.showLoading({
                    title: '取消成功',
                  })
                  self._getOrderList(orderStatus)
                  wx.hideLoading()
                }
              }
            })
          })
        }
      }
    })
  },

  //删除订单
  _deleteOrder: function(e) {
    var self = this
    var orderStatus = this.data.currentTab
    var orderId = e.currentTarget.dataset.order[0].orderId
    wx.showModal({
      content: '您确认要删除当前订单吗？',
      success: function(res) {
        if (res.confirm) {
          orderList.deleteOrder({
            orderId: orderId
          }, function(req) {
            self._getOrderList(orderStatus)
          })
        }
      }
    })
  },

  //确认收货
  _confirmOrder: function(e) {
    var self = this
    var orderStatus = this.data.currentTab
    var orderId = e.currentTarget.dataset.order[0].orderId
    orderList.confirmOrder({
      orderId: orderId
    }, function(res) {
      wx.hideLoading({
        title: '正在加载...',
        success: function() {
          self._getOrderList()
          wx.hideLoading(orderStatus)
        }
      })
    })
  },

  //评价
  _evaluateOrder: function(e) {
    var order = e.currentTarget.dataset.order[0]
    wx.setStorage({
      key: 'goodsOrder',
      data: order,
    })
    wx.navigateTo({
      url: '../evaluate/index',
    })
  },
  //获取订单列表
  _getOrderList: function(customerId) {
    var self = this
    var data = {
      pageSize: this.data.pageSize,
      pageIndex: this.data.pageIndex,
      orderStatus: customerId,
    }
    orderList.getOrderList(data, function(res) {
      self.setData({
        itemList: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    this.setData({
      currentTab: options.currenttab
    })

    wx.showLoading({
      title: '正在加载...',
      success: function() {
        self._getOrderList(options.currenttab)
        wx.hideLoading()
      }
    })
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