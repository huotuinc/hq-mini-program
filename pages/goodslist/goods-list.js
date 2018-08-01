import {
  windowHeight
} from '../../utils/common.js'
import config from '../../config.js'
import goodsList from '../../utils/request/home.js'
import goodsdetails from '../../utils/request/goodsdetails.js'
import collectgoods from '../../utils/request/collectgoods.js'
const app = getApp()

Page({
  data: {
    loading: true,
    filterTap: 1,
    order: 2,
    salesOrder: 1,
    orderType: 1, //排序方式
    page: 1, //页码
    loadPage: 2, //加载页码
    pageSize: 20, //每页数
    goodsItems: [], //商品列表
    categoryTitle: '', //页面头名称
    currentTab: 0, //筛选分类默认
    showModalStatus: false, //遮罩
    statu: "open", //遮罩开关
    backTopValue: false, //返回顶部
    brandIds: [], //商品品牌搜索ID
    tags: [], //商品分类搜索ID
    catIds: [] //商品标签搜索ID
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

  //切换商品排序
  clickfilterTap: function(e) {
    var cur = e.currentTarget.dataset.type;
    var orderId = e.currentTarget.dataset.order
    this.setData({
      filterTap: cur
    })
    //改变排序方式
    if (cur == 1) {
      if (orderId == 1) {
        this.setData({
          order: 2,
          orderType: 1
        })
        this.getGoodsList()
      } else {
        this.setData({
          order: 1,
          orderType: 2
        })
        this.getGoodsList()
      }
    } else if (cur == 2) {
      if (this.data.salesOrder == 1) {
        this.setData({
          orderType: 3,
          salesOrder: 2
        })
        this.getGoodsList()
      } else {
        this.setData({
          orderType: 4,
          salesOrder: 1
        })
        this.getGoodsList()
      }

    } else if (cur == 3) {
      if (orderId == 1) {
        this.setData({
          order: 2,
          orderType: 5
        })
        this.getGoodsList()
      } else {
        this.setData({
          order: 1,
          orderType: 6
        })
        this.getGoodsList()
      }
    } else if (cur == 4) {
      this.setData({
        orderType: 0
      })
      this.getGoodsList()
    }
  },

  //点击收藏/取消收藏
  clickFavTab: function(e) {
    var self = this
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var isFav = e.target.dataset.isfav
    var _items = []
    if (!isFav) {
      collectgoods.addCollection({
          goodsId: e.target.dataset.goodsid
        },
        function(res) {
          wx.showToast({
            title: '收藏成功',
            success: function() {
              _items = self.data.goodsItems
              _items[index].IsFav = !isFav
              self.setData({
                goodsItems: _items
              })
            }
          })
        }
      )
    } else {
      collectgoods.addCollection({
          goodsId: e.target.dataset.goodsid
        },
        function(res) {
          wx.showToast({
            title: '取消成功',
            success: function() {
              _items = self.data.goodsItems
              _items[index].IsFav = !isFav
              self.setData({
                goodsItems: _items
              })
            }
          })
        }
      )
    }
  },
  //商品详情页面
  goodsDetails: function(e) {
    console.log(e.currentTarget.dataset.goodsid)
    wx.navigateTo({
      url: '../goodsdetails/details?goodsid=' + e.currentTarget.dataset.goodsid
    })
  },

  //获取商品列表
  getGoodsList: function(e, data) {
    this.setData({
      loading: true
    })
    var self = this
    goodsList.goodsList({
      page: this.data.page,
      pageSize: this.data.pageSize,
      orderType: this.data.orderType,
      keyword: this.data.keyword,
      brandIds: this.data.brandIds.join(",") || '',
      catIds: this.data.catIds.join(",") || '',
      tags: this.data.tags.join(",") || ''
    }, function(res) {
      self.setData({
        goodsItems: res.goodsItems,
        loading: false,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var keyword = options.keyword
    this.setData({
      keyword: options.keyword
    })
    this.getGoodsList({})
    this.setData({
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
  //筛选
  powerDrawer: function(e) {
    this.setData({
      brandIds: [], //商品品牌搜索ID
      tags: [], //商品分类搜索ID
      catIds: [], //商品标签搜索ID
      keyword: ''
    })
    var self = this
    var currentStatu = e.currentTarget.dataset.statu;
    if (currentStatu == "open") {
      goodsdetails.goodsBrands(function(res) {
        var data = res.data.data
        for (let item in data) {
          data[item].isSelect = false
        }
        self.setData({
          goodsBrands: data
        })
      })
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

  //切换筛选条件
  swichNav: function(e) {
    var self = this
    var cur = e.target.dataset.index
    if (cur == 0) {
      goodsdetails.goodsBrands(function(res) {
        var data = res.data.data
        for (let item in data) {
          data[item].isSelect = false
        }
        console.log(data)
        self.setData({
          goodsBrands: data
        })
      })
    } else if (cur == 1) {
      goodsdetails.goodsCats(function(res) {
        var data = res.data.data
        for (let item in data) {
          data[item].isSelect = false
        }
        self.setData({
          goodsCats: data
        })
      })
    } else {
      goodsdetails.goodsTags(function(res) {
        var data = res.data.data
        for (let item in data) {
          data[item].isSelect = false
        }
        self.setData({
          goodsTags: data
        })
      })
    }

    if (this.data.currentTab == cur) {
      return false
    }
    this.setData({
      currentTab: cur
    })
  },

  //具体筛选条件
  _selectBrands: function(e) {
    var brandIds = this.data.brandIds
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var _items = this.data.goodsBrands
    _items[index].isSelect = !item.isSelect
    this.setData({
      goodsBrands: _items
    })
    if (_items[index].isSelect) {
      brandIds.push(_items[index].BrandId)
    } else {
      var idx = brandIds.indexOf(_items[index].BrandId)
      brandIds.splice(idx, 1)
    }
    this.setData({
      brandIds: brandIds
    })
  },

  _selectCats: function(e) {
    var catIds = this.data.catIds
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var _items = this.data.goodsCats
    _items[index].isSelect = !item.isSelect
    this.setData({
      goodsCats: _items
    })
    if (_items[index].isSelect) {
      catIds.push(_items[index].CatId)
    } else {
      var idx = catIds.indexOf(_items[index].CatId)
      catIds.splice(idx, 1)
    }
    this.setData({
      catIds: catIds
    })
  },

  _selectTags: function(e) {
    var tags = this.data.tags
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var _items = this.data.goodsTags
    _items[index].isSelect = !item.isSelect
    this.setData({
      goodsTags: _items
    })
    if (_items[index].isSelect) {
      tags.push(_items[index].TagId)
    } else {
      var idx = tags.indexOf(_items[index].TagId)
      tags.splice(idx, 1)
    }
    this.setData({
      tags: tags
    })
  },

  //获取筛选商品列表
  _getFiltrateList: function() {
    var brandIds = this.data.brandIds.join(',')
    var catIds = this.data.catIds.join(',')
    var tags = this.data.tags.join(',')
    if (brandIds || catIds || tags) {
      this.getGoodsList()
    } else {
      wx.showToast({
        title: '请选择筛选条件',
        icon: 'none'
      })
      return
    }
    this.setData({
      showModalStatus: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getGoodsList({})
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var self = this
    var page = this.data.loadPage
    var _goodsItems = this.data.goodsItems
    goodsList.goodsList({
        page: page,
        pageSize: this.data.pageSize,
        orderType: this.data.orderType,
        keyword: this.data.keyword,
        brandIds: this.data.brandIds.join(",") || '',
        catIds: this.data.catIds.join(",") || '',
        tags: this.data.tags.join(",") || ''
      },
      function(res) {
        if (res.goodsItems.length > 0) {
          self.setData({
            loading: false,
            goodsItems: _goodsItems.concat(res.goodsItems),
            loadPage: page++
          })
        } else {
          wx.showToast({
            title: '没有更多商品',
            icon: 'none'
          })
        }
      }
    )
  },
  binderrorimg: function(e) {
    var idx = e.target.dataset.errorimg //获取循环的下标
    var goodList = this.data.goodsItems
    goodList[idx].PicUrl = '../../images/avator.png'
    this.setData({
      goodList: goodList
    })
  },
})