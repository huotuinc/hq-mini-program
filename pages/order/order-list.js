import {
  windowHeight,
  wxpay
} from '../../utils/common.js'
import orderList from '../../utils/request/order.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: windowHeight(),
    orderStatus: ["全部", "待付款", "待发货", "待收货", "已收货"],
    pageIndex: 1,
    pageSize: 20,
    loading: true
  },
  //类目切换
  swichNav: function(e) {
    var cur = e.target.dataset.current
    if (this.data.currentTab == cur) {
      return false
    }
    this._getOrderList(cur)
    this.setData({
      currentTab: cur,
      loading: true,
      itemList: ''
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
      url: '../orderdetails/index?orderId=' + e.currentTarget.dataset.orderid
    })
  },
  //支付订单
  _payOrder: function(e) {
    var self = this
    var orderId = e.currentTarget.dataset.order
    orderList.payOrder({
      unionOrderId: orderId,
      payType: 301
    }, function(res) {
      if (res.data.code == 200) {
        var data = res.data.data
        wxpay(data, function(req) {
          // console.log(req);
          if (req.errMsg.indexOf("requestPayment:ok") >= 0) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              success: function() {
                self._getOrderList()
              }
            })
          } else if (req.errMsg.indexOf("requestPayment:fail") >= 0 || req.errMsg.indexOf("requestPayment:cancel") >= 0) {
            //requestPayment:fail:该订单已过期，请重新下单
            var msgs = req.errMsg.split(":");
            wx.showToast({
              title: msgs.length == 3 ? msgs[2] : '支付失败',
              icon: "none"
            })
          }
        })
      }
    })
  },
  //取消订单
  _cancelOrder: function(e) {
    var self = this
    var orderStatus = this.data.currentTab
    var orderId = e.currentTarget.dataset.order
    wx.showModal({
      content: '您确认要取消当前订单吗？',
      success: function(res) {
        if (res.confirm) {
          orderList.closeOrder({
            orderId: orderId
          }, function(req) {
            wx.showLoading({
              title: '取消中...',
              icon: 'loading',
              success: function() {
                if (req.data.code == 200) {
                  wx.showLoading({
                    title: '取消成功',
                    icon: 'success'
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
    var orderId = e.currentTarget.dataset.order
    wx.showModal({
      content: '您确认要删除当前订单吗？',
      success: function(res) {
        if (res.confirm) {
          orderList.deleteOrder({
            orderId: orderId
          }, function(req) {
            wx.showToast({
              title: '删除中...',
              icon: 'loading',
              success: function() {
                if (req.data.code == 200) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    success: function() {
                      self._getOrderList(orderStatus)
                    }
                  })
                }
              }
            })
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
    var goodsOrder = e.currentTarget.dataset.order[0]
    var order = {
      orderId: goodsOrder.orderId,
      productId: goodsOrder.orderItemList[0].productid,
      proPic: goodsOrder.orderItemList[0].proPic,
      name: goodsOrder.orderItemList[0].name,
    }
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
        itemList: res.data.data,
        loading: false
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
    this._getOrderList(options.currenttab)
  },
  onShow: function() {},
  
  onPullDownRefresh: function() {
    self.setData({
      loading: true
    })
    wx.stopPullDownRefresh()
    var orderStatus = this.data.currentTab
    this._getOrderList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      loading: true
    })
    var self = this
    var page = this.data.pageIndex + 1
    var itemList = this.data.itemList
    var orderStatus = this.data.currentTab
    var data = {
      pageSize: this.data.pageSize,
      pageIndex: page,
      orderStatus: orderStatus,
    }
    orderList.getOrderList(data, function(res) {
      if (res.data.data.length > 0) {
        self.setData({
          itemList: itemList.concat(res.data.data),
          loading: false,
          pageIndex: page
        })
      }
    })
  }

})