const indexData = require('../../utils/mock/index.js')
import { collection, windowHeight } from '../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterTap: 1,
    goodsItems: [],
    categoryTitle: '',
    categoryid: 0
  },
  clickfilterTap: function (e) {
    var cur = e.currentTarget.dataset;
    if (cur.type == 4) {
    }
    this.setData({
      filterTap: cur.type
    })
  },
  //点击收藏
  clickFavTab: function (e) {
    var item = e.currentTarget.dataset.item;
    var index = e.currentTarget.dataset.index;    
    var _items = this.data.goodsItems;
    _items[index].isFav = !item.isFav;
    this.setData({
      goodsItems: _items
    })
    //设置收藏
    collection(item.goodsId, !item.isFav);
    wx.showToast({
      title: !item.isFav ? "收藏成功" : "取消收藏",
    })
  },
  //商品详情页面
  goodsDetails: function (e) {
    wx.navigateTo({
      url: '../goodsdetails/details?goods_id=' + e.currentTarget.dataset.goodsId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      goodsItems: indexData.goodsItems,
      categoryid: options.categoryid || 0,
      categoryTitle: options.categoryTitle || '商品列表'
    })
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
    })
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
    this.setData({
      goodsItems: indexData.goodsItems
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _goodsItems = this.data.goodsItems;
    this.setData({
      goodsItems: _goodsItems.concat(indexData.goodsItems)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})