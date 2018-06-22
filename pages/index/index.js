const indexData = require('../../utils/mock/index.js')
import {
  skillTime
} from '../../utils/skillTime.js'
import {
  collection,
  windowHeight
} from '../../utils/common.js'

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
    goodsItems: [],
    specialItems: [],
    filterTap: 1,
    mask: false,
    windowHeight: windowHeight(),
    loadingTitle: "加载中...",
    hidden: false,
    backTopValue: false
  },

  imageLoad: function(e) {
    var $width = e.detail.width
    var $height = e.detail.height
    this.setData({
      imgHeight: $height
    })
  },

  // 监听滚动条坐标
  onPageScroll: function(e) {
    //console.log(e)
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
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
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
  clickfilterTap: function(e) {
    var cur = e.currentTarget.dataset
    if (cur.type == 4) {}
    this.setData({
      filterTap: cur.type
    })
  },
  //点击收藏
  clickFavTab: function(e) {
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
  goodsDetails: function(e) {
    wx.navigateTo({
      url: '../goodsdetails/details?goodsid=' + e.currentTarget.dataset.goodsId + '&categoryTitle=阿拉斯加'
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
  // 跳转至收藏夹
  _goCollectGoods: function() {
    wx.navigateTo({
      url: '../collectgoods/collectgoods'
    })
  },
  // search搜索
  searchShop(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  _goList: function(e) {
    wx.navigateTo({
      url: '../goodslist/goods-list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var self = this;
    if (app.globalData.mock) {
      this.setData({
        category: indexData.categoryItems,
        // goodsItems: indexData.goodsItems,
        hotItems: indexData.hotItems,
        bannerItems: indexData.bannerItems,
        specialItems: indexData.specialItems,
        currentCategory: indexData.categoryItems[this.data.currentTab].child
      });
    }
    this.setData({
      // loading: true
    })

    app.request({
      url: config.homeRecommendUrl,
      method: 'get',
      success: function(res) {
        var list = res.data.data.list
        self.setData({
          bannerItems: list,
          loading: false
        })
      },
      fail: function(error) {
        console.log(error)
      }
    })

    var data = {
      page: 1,
      pageSize: 20
    }

    app.request({
      url: config.goodsListUrl,
      data: data,
      method: 'post',
      success: function(res) {
        if (res.data.code == 200) {
          console.log(res.data.list)
          self.setData({
            goodsItems: res.data.list
          })
        } else {
          wx.showToast({
            title: res.msg
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
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
    var that = this
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

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },


  /**
   * 页面上拉触底事件的处理函数 
   */

  onReachBottom: function() {
    this.setData({
      hidden: true
    })
    var _goodsItems = this.data.goodsItems;
    if (_goodsItems.concat(indexData.goodsItems) > _goodsItems) {
      this.setData({
        hidden: false,
        goodsItems: _goodsItems.concat(indexData.goodsItems)
      })
    } else {
      this.setData({
        hidden: false,
        loadingTitle: "没有更多"
      })
    }

  },

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function() {},
  /**
   * 商品列表
   */
  _goGoodsList: function(e) {
    var _item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../goodslist/goods-list?categoryid=' + _item.categoryid + "&categoryTitle=" + _item.Name,
    })
    this.setData({
      mask: false
    })
  },
  /**
   * 
   */
  maskTouchStart: function(e) {
    this.setData({
      mask: false
    })
  },
  /**
   * 显示所有类目
   */
  showAllCategory: function() {
    this.setData({
      mask: true
    })
  },
  hideAllCategory: function() {
    this.setData({
      mask: false
    })
  },
  onShareAppMessage: function() {}

})