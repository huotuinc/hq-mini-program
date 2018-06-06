const indexData = require('../../utils/mock/index.js')
import { skillTime } from '../../utils/skillTime.js'
import { collection, windowHeight } from '../../utils/common.js'

import config from '../../config.js'
import home from '../../utils/request/home.js'
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    bannerItems: [],
    scrollIntoView: 1,
    category: [],
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    category: [],
    currentCategory: [],
    hotItems: [],
    goodsItems: [],
    specialItems: [],
    filterTap: 1,
    search: false,
    mask: false,
    windowHeight: windowHeight(),
    historyList: []
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    var cur = e.currentTarget.dataset.current
    if (this.data.currentTab == cur) {
      return false
    }
    this.checkCor(cur)
    this.setData({
      currentCategory: e.currentTarget.dataset.item.child,
      goodsItems: this.data.goodsItems,
      filterTap: 1
    })
  },
  //点击商品筛选事件
  clickfilterTap: function (e) {
    var cur = e.currentTarget.dataset
    if (cur.type == 4) {
    }
    this.setData({
      filterTap: cur.type
    })
  },
  //点击收藏
  clickFavTab: function (e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var _type = e.currentTarget.dataset.type
    var _items = []
    if (_type == 'goodsItems') {
      _items = this.data.goodsItems
      _items[index].isFav = !item.isFav
      this.setData({
        goodsItems: _items
      })
    }
    if (_type == 'hotItems') {
      _items = this.data.hotItems
      _items[index].isFav = !item.isFav
      this.setData({
        hotItems: _items
      })
    }
    //设置收藏
    collection(item.goodsId, !item.isFav)
    wx.showToast({
      title: !item.isFav ? '收藏成功' : '取消收藏'
    })
  },
  //商品详情页面
  goodsDetails: function (e) {
    wx.navigateTo({
      url: '../goodsdetails/details?goodsid=' + e.currentTarget.dataset.goodsId
    })
  },
  //设置tab标题滚动
  checkCor: function (cur) {
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
  // 跳转至收藏夹
  _goCollectGoods: function () {
    wx.navigateTo({
      url: '../collectgoods/collectgoods'
    })
  },
  // search搜索
  searchShop(e) {
    this.setData({
      search: true
    })
  },
  cancelSearch: function (e) {
    this.setData({
      search: false
    })
  },
  clearInput: function (e) {
    this.setData({
      inputSearch: ''
    })
  },
  bindSearchInput: function (e) {
    this.setData({
      inputSearch: e.detail.value
    })
  },

  confirmSearch: function (e) {
    let searchList = []
    var that = this
    searchList.push(this.data.inputSearch)
    //对搜索记录得去重并且按搜索先后顺序进行排序
    this.data.historyList = Array.from(new Set(searchList.concat(this.data.historyList)))
    wx.setStorage({
      key: 'historyList',
      data: that.data.historyList
    })
    wx.navigateTo({
      url: '../goodslist/goods-list?categoryTitle=搜索结果&keyworld=' + this.data.inputSearch
    })
  },

  clearHistory: function (e) {
    var that = this
    wx.removeStorage({
      key: 'historyList',
      success: function (res) {
        that.setData({
          showHistory: false,
          historyList: []
        })
        wx.showToast({
          title: '清除成功',
          icon: 'success'
        })
      }
    })
  },

  startSearch: function (e) {
    // console.log(e.target.dataset.con)
    wx.navigateTo({
      url: '../goodslist/goods-list?categoryTitle=搜索结果&keyworld=' + e.target.dataset.con
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var self = this;
    if (app.globalData.mock) {
      this.setData({
        category: indexData.categoryItems,
        goodsItems: indexData.goodsItems,
        bannerItems: indexData.bannerItems,
        hotItems: indexData.hotItems,
        specialItems: indexData.specialItems,
        currentCategory: indexData.categoryItems[this.data.currentTab].child
      });
    }
    this.setData({
      loading: true
    })
    home.homeRecommend(function (code, res) {
      if (code) {
        self.setData({
          bannerItems: res.bannerItems,
          specialItems: res.specialItems
        });
      }
      else {
        self.setData({
          loading: false
        })
      }
    })

    //热搜关键字
    home.hotSearchKeyWorld(function (code, res) {
      if (code) {
        self.setData({
          hotsearchkeyworld: res.keys
        })
      }
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
    var date = new Date();
    date.setHours(24)
    date.setMinutes(0)
    date.setSeconds(0)
    skillTime(date.toString(), this)
    var that = this
    wx.getStorage({
      key: 'historyList',
      success: function (res) {
        that.setData({
          historyList: res.data,
          showHistory: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
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

  onShareAppMessage: function () { },
  /**
   * 商品列表
   */
  _goGoodsList: function (e) {
    var _item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../goodslist/goods-list?categoryid=' + _item.categoryid + "&categoryTitle=" + _item.title,
    })
    this.setData({
      mask: false
    })
  },
  /**
   * 
   */
  maskTouchStart: function (e) {
    this.setData({
      mask: false
    })
  },
  /**
   * 显示所有类目
   */
  showAllCategory: function () {
    this.setData({
      mask: true
    })
  },
  onShareAppMessage: function () { }

})
