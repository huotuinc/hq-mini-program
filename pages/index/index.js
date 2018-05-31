// pages/index/index.js
const indexData = require('../../utils/mock/index.js')

import { skillTime } from '../../utils/skillTime.js'
import { collection } from '../../utils/common.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerItems: [],
    scrollIntoView: 1,
    category: [],
    // remaimTime: '',
    // clock: '',
    currentTab:0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    category: [],
    currentCategory:[],
    filterTap: 1
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.currentTarget.dataset.current
    if (this.data.currentTab == cur) {
      return false
    }
    this.checkCor(cur)
    this.setData({
      currentCategory: e.currentTarget.dataset.item.child,      
      goodsItems: this.data.goodsItems,
      filterTap:1
    })
  },
  //点击商品筛选事件
  clickfilterTap:function(e){
    var cur= e.currentTarget.dataset;
    if(cur.type==4){
    }    
    this.setData({
      filterTap: cur.type
    })    
  },
  //点击收藏
  clickFavTab:function(e){
    var item = e.currentTarget.dataset.item;    
    var index = e.currentTarget.dataset.index;    
    var _type = e.currentTarget.dataset.type;  
    var _items=[]
    if(_type=="goodsItems"){
      _items = this.data.goodsItems;
      _items[index].isFav = !item.isFav;            
      this.setData({      
        goodsItems: _items
      })   
    }
    if (_type == "hotItems") {
      _items = this.data.hotItems;
      _items[index].isFav = !item.isFav;
      this.setData({
        hotItems: _items
      })
    }
    //设置收藏
    collection(item.goodsId, !item.isFav);
    wx.showToast({
      title: !item.isFav?"收藏成功":"取消收藏",
    })
  },
  //商品详情页面
  goodsDetails:function(e){
    wx.navigateTo({
      url: '../goodsdetails/details?goods_id=' +e.currentTarget.dataset.goodsId
    })
  },
  //设置tab标题滚动
  checkCor: function(cur) {
    if ((this.data.currentTab > 3 || cur > 3) && this.data.currentTab < cur) {
      this.setData({
        scrollLeft: cur * 50
      })
    } else if (this.data.currentTab > cur && cur > 3) {
      this.setData({
        scrollLeft: this.data.scrollLeft - (this.data.scrollLeft - cur * 50)
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }

    this.setData({
      currentTab: cur
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
      specialItems: indexData.specialItems,
      currentCategory: indexData.categoryItems[this.data.currentTab].child
    });
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
    var date = new Date();    
    date.setHours(24)
    date.setMinutes(0)
    date.setSeconds(0)    
    skillTime(date.toString(), this)
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
