import config from '../../config.js'
import cart from '../../utils/request/goodShop.js'
var app = getApp()

Page({
  data: {
    backTopValue: false,
    items: [],
    startX: 0,
    startY: 0,
    edit: false,
    editTitle: '编辑',
    closeTitle: '结算',
    isSelect: false, //商品是否全选
    shopIsSelect: false //某供应商的商品是否全选
  },

  //编辑操作
  _editHandle: function(e) {
    var editHandle = e.target.dataset.edittile
    if (editHandle == '编辑') {
      this.setData({
        edit: true,
        editTitle: '完成',
        closeTitle: '删除'
      })
    } else {
      this.setData({
        edit: false,
        editTitle: '编辑',
        closeTitle: '结算'
      })
    }
  },
  //返回顶部
  onPageScroll: function(e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 500 ? true : false
    that.setData({
      backTopValue: backTopValue
    })
  },
  backTop: function() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  //左划删除
  touchstart: function(e) {
    this.data.items.Products.forEach(function(v, i) {
      if (v.isTouchMove)
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      startX = that.data.startX,
      startY = that.data.startY,
      touchMoveX = e.changedTouches[0].clientX,
      touchMoveY = e.changedTouches[0].clientY,
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.Products.forEach(function(v, i) {
      v.isTouchMove = false
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX)
          v.isTouchMove = false
        else
          v.isTouchMove = true
      }
    })
    that.setData({
      items: that.data.items
    })
  },
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  del: function(e) {
    // this.data.items.Products.splice(e.currentTarget.dataset.index, 1)
    // this.setData({
    //   items: this.data.items
    // })
    var index = e.currentTarget.dataset.index
    var _items = this.data.items
    this.delCart({
      goodsId: _items.Products[index].GoodsId,
      productId: _items.Products[index].ProductId
    })
  },

  //购物车获取
  getGoods: function(e) {
    var self = this
    cart.getCartGoods(function(res) {
      var num = 0
      for (let idx in res.cartGoods.Products) {
        if (res.cartGoods.Products[idx].IsChecked) {
          num++
        }
      }
      if (num < res.cartGoods.Products.length) {
        self.setData({
          isSelect: false,
          shopIsSelect: false
        })
      } else {
        self.setData({
          isSelect: true,
          shopIsSelect: true
        })
      }
      self.setData({
        items: res.cartGoods
      })
    })
  },

  //购物车修改
  updateCart: function(data) {
    var self = this
    cart.updateCart(data, function(res) {
      console.log(res)
      self.getGoods()
    })
  },

  //减少购买数量
  minus: function(e) {
    var index = e.currentTarget.dataset.index
    var _items = this.data.items
    if (_items.Products[index].Nums <= 1) {
      _items.Products[index].Nums = 1
      wx.showToast({
        title: '亲不能再少了',
        icon: 'none'
      })
      return
    } else {
      _items.Products[index].Nums--
    }
    this.setData({
      items: _items
    })

    this.updateCart({
      goodsId: _items.Products[index].GoodsId,
      productId: _items.Products[index].ProductId,
      updateType: 0,
      quantity: _items.Products[index].Nums
    })
  },
  //增加购买数量
  addnus: function(e) {
    var index = e.currentTarget.dataset.index
    var _items = this.data.items
    if (_items.Products[index].Nums >= _items.Products[index].AvaliableStore) {
      _items.Products[index].Nums = _items.Products[index].AvaliableStore
      wx.showToast({
        title: '已超出购买数量',
        icon: 'none'
      })
      return
    } else {
      _items.Products[index].Nums++
    }
    this.setData({
      items: _items
    })

    this.updateCart({
      goodsId: _items.Products[index].GoodsId,
      productId: _items.Products[index].ProductId,
      updateType: 0,
      quantity: _items.Products[index].Nums
    })
  },

  //是否购买/选中
  isChecked: function(e) {
    var index = e.currentTarget.dataset.index
    var _items = this.data.items
    var num = 0
    if (_items.Products[index].IsChecked) {
      _items.Products[index].IsChecked = 0
    } else {
      _items.Products[index].IsChecked = 1
    }

    //购物车是否选中修改
    this.updateCart({
      goodsId: _items.Products[index].GoodsId,
      productId: _items.Products[index].ProductId,
      updateType: 1,
      isChecked: _items.Products[index].IsChecked
    })

    this.setData({
      items: _items
    })

    for (let idx in _items.Products) {
      if (_items.Products[idx].IsChecked) {
        num++
      }
    }

    if (num < _items.Products.length) {
      this.setData({
        isSelect: false,
        shopIsSelect: false
      })
    } else {
      this.setData({
        isSelect: true,
        shopIsSelect: true
      })
    }
  },

  // 购物车删除
  delCart: function(data) {
    cart.removeCart(data, function(res) {
      console.log(res)
    })
  },

  //某商店商品全选/全不选
  shopIsSelect: function(e) {
    var shopIsSelect = this.data.shopIsSelect
    var _items = this.data.items
    if (shopIsSelect) {
      for (let idx in _items.Products) {
        _items.Products[idx].IsChecked = 0
      }
      this.setData({
        items: _items,
        shopIsSelect: false,
        isSelect: false
      })
    } else {
      for (let idx in _items.Products) {
        _items.Products[idx].IsChecked = 1
      }
      this.setData({
        items: _items,
        shopIsSelect: true
      })
    }
  },

  //全部商品的全选/全不选
  isSelect: function(e) {
    var isSelect = this.data.isSelect
    var _items = this.data.items
    var data = []
    if (isSelect) {
      for (let idx in _items.Products) {
        _items.Products[idx].IsChecked = 0
        var item = {
          goodsId: _items.Products[idx].GoodsId,
          productId: _items.Products[idx].ProductId,
          updateType: 1,
          quantity: _items.Products[idx].Nums,
          isChecked: _items.Products[idx].IsChecked,
          pmtId: _items.Products[idx].SelectedPmtId
        }
        data.push(item)
      }
      this.updateCart(data)
      this.setData({
        items: _items,
        shopIsSelect: false,
        isSelect: false
      })
    } else {
      for (let idx in _items.Products) {
        _items.Products[idx].IsChecked = 1
        var item = {
          goodsId: _items.Products[idx].GoodsId,
          productId: _items.Products[idx].ProductId,
          updateType: 1,
          quantity: _items.Products[idx].Nums,
          isChecked: _items.Products[idx].IsChecked,
          pmtId: _items.Products[idx].SelectedPmtId
        }
        data.push(item)
      }
      this.updateCart(data)
      this.setData({
        items: _items,
        shopIsSelect: true,
        isSelect: true
      })
    }
  },

  //去订单结算页面/批量删除购物车
  _goOrderClose: function(e) {
    var closeTitle = this.data.closeTitle
    if (closeTitle == '结算') {
      wx.navigateTo({
        url: '../orderdetails/index?detail=1',
      })
    }
  },

  onLoad: function(options) {
    this.getGoods()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})