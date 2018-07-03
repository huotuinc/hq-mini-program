const indexData = require('../../utils/mock/index.js')
import {
  windowHeight
} from '../../utils/common.js'

import config from '../../config.js'
import collectgoods from '../../utils/request/collectgoods.js'
const app = getApp()
Page({
  data: {
    filterTap: 1,
    order: 2,
    goodsItems: [],
    categoryTitle: '',
    currentTab: 0,
    showModalStatus: false,
    categoryid: 0,
    statu: "open",
    backTopValue: false
  },

  _goCollectGoods: function() {
    wx.navigateTo({
      url: '../collectgoods/collectgoods'
    })
  },
  searchShop(e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 监听滚动条坐标
  onPageScroll: function(e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 500 ? true : false
    that.setData({
      backTopValue: backTopValue
    })
  },

  // 滚动到顶部
  backTop: function() {
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  clickfilterTap: function(e) {
    var cur = e.currentTarget.dataset.type;
    var orderId = e.currentTarget.dataset.order
    if (orderId == 2 && cur == this.data.filterTap) {
      this.setData({
        order: 1,
        filterTap: cur
      })
    } else {
      this.setData({
        order: 2,
        filterTap: cur
      })
    }
  },
  //点击收藏
  clickFavTab: function(e) {
    var self = this
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var isFav = e.target.dataset.isfav
    var _items = []
    if (isFav) {
      collectgoods.addCollection({
        goodsId: e.target.dataset.goodsid
      }, function(res) {
        wx.showToast({
          title: '收藏成功',
          success: function() {
            _items = self.data.goodsItems
            _items[index].isFav = !isFav
            self.setData({
              goodsItems: _items
            })
          }
        })
      })
    } else {
      collectgoods.addCollection({
        goodsId: e.target.dataset.goodsid
      }, function(res) {
        wx.showToast({
          title: '取消成功',
          success: function() {
            _items = self.data.goodsItems
            _items[index].isFav = !isFav
            self.setData({
              goodsItems: _items
            })
          }
        })
      })
    }
  },
  //商品详情页面
  goodsDetails: function(e) {
    wx.navigateTo({
      url: '../goodsdetails/details?goods_id=' + e.currentTarget.dataset.goodsId + '&categoryTitle=埃阿斯嘉'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      goodsItems: indexData.goodsItems,
      categoryid: options.categoryid || 0,
      categoryTitle: options.categoryTitle || '商品列表',
    })
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
    })

    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight
        var clientWidth = res.windowWidth
        that.setData({
          clientHeight: clientHeight - 30,
          winH: clientHeight
        })
      }
    })
  },
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    if (currentStatu == "open") {
      this.setData({
        statu: "close",
        showModalStatus: true
      })
    } else {
      this.setData({
        statu: "open",
        showModalStatus: false
      })
    }

    if (currentStatu == "close") {
      this.setData({
        showModalStatus: false
      });
    }
  },

  swichNav: function(e) {
    var cur = e.target.dataset.index
    if (this.data.currentTab == cur) {
      return false
    }
    this.setData({
      currentTab: cur
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      goodsItems: indexData.goodsItems
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var _goodsItems = this.data.goodsItems;
    this.setData({
      goodsItems: _goodsItems.concat(indexData.goodsItems)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})