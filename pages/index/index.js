import {
  collection,
  windowHeight
} from '../../utils/common.js'

import config from '../../config.js'
import home from '../../utils/request/home.js'
import collectgoods from '../../utils/request/collectgoods.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
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
    loadingTitle: '加载中...',
    hidden: false,
    backTopValue: false,
    page: 1,
    pageSize: 20
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
      url: '../goodsdetails/details?goodsid=' +
        e.currentTarget.dataset.goodsid +
        '&categoryTitle=' +
        e.currentTarget.dataset.title
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
      url: '../search/search'
    })
  },
  _goList: function(e) {
    wx.navigateTo({
      url: '../goodslist/goods-list'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    app.request({
      url: config.homeRecommendUrl,
      method: 'get',
      success: function(res) {
        var list = res.data.data.list
        var bannerItems = []
        var specialItems = []
        for (let idx in list) {
          if (list[idx].adType == 1) {
            bannerItems.push(list[idx])
          }
          if (list[idx].adType == 2) {
            specialItems.push(list[idx])
          }
        }
        self.setData({
          bannerItems: bannerItems,
          specialItems: specialItems,
          loading: false
        })
      },
      fail: function(error) {
        console.log(error)
      }
    })

    app.request({
      url: config.goodsListUrl,
      data: {
        page: self.data.page,
        pageSize: self.data.pageSize
      },
      method: 'post',
      success: function(res) {
        self.setData({
          goodsItems: res.data.list
        })
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
  onShow: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function() {
    var self = this
    this.setData({
      hidden: true
    })
    var page = this.data.page
    var _goodsItems = this.data.goodsItems
    home.goodsList({
        page: page++,
        pageSize: self.data.pageSize
      },
      function(res) {
        if (res.goodsItems.length > 0) {
          self.setData({
            hidden: false,
            goodsItems: _goodsItems.concat(res.goodsItems),
            page: page++
          })
        }
      }
    )
  },

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function() {},
  /**
   * 商品列表
   */

  _goGoodsList: function(e) {
    // var _item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../goodslist/goods-list'
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