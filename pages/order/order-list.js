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
      0: order.list,
      1: order.list,
      2: order.list,
      3: order.list,
      4: order.list,
    },
    date:"不限"
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
  //value 改变时触发 change 事件，event.detail = {value: value}
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 取消选择时触发
   */
  bindDateCancel:function(){
    this.setData({
      date: '不限'
    })
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
    console.log('circle 下一页');
    var _orders= this.data.orders;
    _orders[this.data.currentTab]= _orders[this.data.currentTab].concat(order.list)    
    this.setData({
      orders: _orders
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})