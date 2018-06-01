import { windowHeight } from '../../utils/common.js'
const order = require('../../utils/mock/order.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    winHeight: windowHeight(),
    orderStatus:["全部","预估","收货","失效","到账"],
    orders:{
      0: [],
      1: order.list,
      2: order.list,
      3: order.list,
      4: order.list,
    }
  },
  swichNav: function (e) {
    var cur = e.target.dataset.current
    console.log(e);
    if (this.data.currentTab == cur) {
      return false
    }
    this.setData({
      currentTab: cur
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})