// pages/index/index.js
const indexData = require('../../utils/mock/index.js')
// const skillTime = require('../../utils/skillTime.js')
import { formatTime, countDown, clearTimeOut } from '../../utils/skillTime.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerItems: [],
    scrollIntoView: 1,
    scrollLeft: 0,
    category: [],
    remaimTime: '',
    clock: ''
  },
  clickCategory: function(e) {
    var category = e.currentTarget.dataset.category
    var index = e.currentTarget.dataset.index
    this.setData({
      scrollIntoView: category.index,
      scrollLeft: category.index * 100 + 350
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      category: indexData.categoryItems,
      goodsItems: indexData.goodsItems,
      bannerItems: indexData.bannerItems,
      hotItems: indexData.hotItems,
      specialItems: indexData.specialItems
    })
  },

  searchShop(e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let stringTime = '2018-05-30 24:00:00';
    let timestamp = Date.parse(stringTime);
    let newTime = +new Date();
    let remaimTime = timestamp - newTime;
    console.log(newTime + "====" + remaimTime + "======" + timestamp);
    this.setData({
      remaimTime: remaimTime,
      clock: formatTime(remaimTime)
    });
    clearTimeOut();
    if (this.data.remaimTime) {
      countDown(this);
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
