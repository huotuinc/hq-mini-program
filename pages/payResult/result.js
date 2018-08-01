// pages/payResult/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid:"",
    resultType: "success",//success  ,clear
    resultMsg:"支付成功"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderid: options.orderid,
      resultType: options.success == "true" ? "success" :"clear",
      resultMsg: options.success == "true"  ? "订单支付成功" : "订单支付失败"
    })
    wx.setNavigationBarTitle({
      title: options.success == "true" ? "订单支付成功" : "订单支付失败"
    })
  },
  _goOrderList:function(){
    wx.redirectTo({
      url: '../order/order-list',
    })
  },
  _goUserCenter:function(){
    wx.switchTab({
      url: '../usercenter/index',
    })
  }
})