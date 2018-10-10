import config from '../../config.js'
import cart from '../../utils/request/goodShop.js'
var app = getApp()

Page({
  data: {
    backTopValue: false,
    items: {},
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
    var _items = this.data.items.Products || ''
    if (editHandle == '编辑') {
      var num = 0
      for (let idx in _items) {
        if (_items[idx].IsChecked) {
          num++
        }
      }
      if (num < _items.length) {
        this.setData({
          edit: true,
          editTitle: '完成',
          closeTitle: '删除',
          shopIsSelect: false,
          isSelect: false
        })
      } else {
        this.setData({
          edit: true,
          editTitle: '完成',
          closeTitle: '删除',
          shopIsSelect: true,
          isSelect: true
        })
      }
    } else {
      this.getGoods()
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
    var self = this
    var index = e.currentTarget.dataset.index
    var _items = this.data.items
    wx.showModal({
      content: '确定要将该商品移出购物车吗？',
      success: function(res) {
        if (res.confirm) {
          self.delCart({
            goodsId: _items.Products[index].GoodsId,
            productId: _items.Products[index].ProductId
          })
        }
      }
    })
  },
  //购物车获取
  getGoods: function(e) {
    var self = this
    cart.getCartGoods(function(res) {
      var num = 0
      var noNum = 0
     
      if (res.data.code == 200) {
        var cartGoods = res.data.data == null ? {} : res.data.data 
        if (!res.data.data) {
          self.setData({
            items: cartGoods
          })
          return
        }else{
          for (let idx in cartGoods.Products) {
            if (cartGoods.Products[idx].IsChecked) {
              num++
            } else {
              noNum++
            }
          }
          console.log(num,noNum)
          if (num < (cartGoods.Products.length - noNum)) {
            self.setData({
              isSelect: false,
              shopIsSelect: false
            })
          } 
          self.setData({
            items: cartGoods,
            edit: false,
            editTitle: '编辑',
            closeTitle: '结算'
          })
        }
      }

    })
  },
  //购物车修改
  updateCart: function(data) {
    var self = this
    var _items = self.data.items.Products
    cart.updateCart(data, function(res) {
      // console.log(res)
      self.getGoods()
    })
  },
  //减少购买数量
  minus: function(e) {
    var index = e.currentTarget.dataset.index
    var _items = this.data.items
    if (_items.Products[index].Nums <= 1) {
      if (_items.Products[index].AvaliableStore > 1) {
        _items.Products[index].Nums = 1
        wx.showToast({
          title: '亲不能再少了',
          icon: 'none'
        })
      } else {
        _items.Products[index].Nums = 1
      }
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
      wx.showToast({
        title: '库存不足',
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
    var closeTitle = this.data.closeTitle
    var index = e.currentTarget.dataset.index
    var _items = this.data.items
    this.shopSelect(index, _items, closeTitle)
  },
  // 购物车删除
  delCart: function(data) {
    var that = this
    cart.removeCart(data, function(res) {
      // console.log(res)
      that.getGoods()
    })
  },
  //某商店商品全选/全不选
  shopIsSelect: function(e) {
    var shopIsSelect = this.data.shopIsSelect
    var _items = this.data.items
    var data = this.removeHandle(shopIsSelect, _items.Products)
    var self = this
    if (shopIsSelect) {
      cart.batchcheck({
        checkStatus: 0
      }, function(res) {
        self.getGoods()
      })
      this.setData({
        items: _items,
        shopIsSelect: false,
        isSelect: false
      })
    } else {
      cart.batchcheck({
        checkStatus: 1
      }, function(res) {
        self.getGoods()
      })
      this.setData({
        items: _items,
        shopIsSelect: true,
        isSelect: true
      })
    }
  },
  //全部商品的全选/全不选
  isSelect: function(e) {
    var isSelect = this.data.isSelect
    var _items = this.data.items
    var self = this
    var data = this.removeHandle(isSelect, _items.Products)
    if (isSelect) {
      cart.batchcheck({
        checkStatus: 0
      }, function(res) {
        self.getGoods()
      })
      this.setData({
        items: _items,
        shopIsSelect: false,
        isSelect: false
      })
    } else {
      cart.batchcheck({
        checkStatus: 1
      }, function(res) {
        self.getGoods()
      })
      this.setData({
        items: _items,
        shopIsSelect: true,
        isSelect: true
      })
    }
  },
  /**
   * 剔除超出库存，未上架，已售完的选中操作
   */
  removeHandle: function(select, _items) {
    var closeTitle = this.data.closeTitle
    var data = []
    if (select) {
      for (let idx in _items) {
        if (_items[idx].IsChecked == 0 && closeTitle == '结算') {
          _items[idx].IsChecked == 0
        } else {
          _items[idx].IsChecked = 0
          var item = {
            goodsId: _items[idx].GoodsId,
            productId: _items[idx].ProductId,
            updateType: 1,
            quantity: _items[idx].Nums,
            isChecked: _items[idx].IsChecked,
            pmtId: _items[idx].SelectedPmtId
          }
          data.push(item)
        }
      }
    } else {
      for (let idx in _items) {
        if ((_items[idx].AvaliableStore == 0 || _items[idx].AvaliableStore < _items[idx].Nums || _items[idx].DownShelfStatus == 2 || _items[idx].DownShelfStatus == 0) && closeTitle == '结算') {
          _items[idx].IsChecked = 0
        } else {
          _items[idx].IsChecked = 1
          var item = {
            goodsId: _items[idx].GoodsId,
            productId: _items[idx].ProductId,
            updateType: 1,
            quantity: _items[idx].Nums,
            isChecked: _items[idx].IsChecked,
            pmtId: _items[idx].SelectedPmtId
          }
          data.push(item)
        }
      }
    }
    return data
  },
  /**
   * 商品选中状态
   */
  shopSelect: function(index, _items, closeTitle) {
    var num = 0 //可勾选商品数量
    var noNum = 0 //不可勾选商品数量
    if (_items.Products[index].IsChecked) {
      _items.Products[index].IsChecked = 0
    } else {
      /**
       * 库存判断如果为0则提示用户商品已售完并阻止勾选
       * 判断商品是否上架
       */
      if (_items.Products[index].AvaliableStore == 0 && _items.Products[index].DownShelfStatus == 1 && closeTitle == '结算') {
        wx.showToast({
          title: '此商品已卖完',
          icon: 'none'
        })
        _items.Products[index].IsChecked = 0
        return
      } else if (_items.Products[index].AvaliableStore < _items.Products[index].Nums && closeTitle == '结算') {
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        })
        _items.Products[index].IsChecked = 0
        return
      } else if (_items.Products[index].DownShelfStatus == 2 && closeTitle == '结算') {
        wx.showToast({
          title: '此商品已下架',
          icon: 'none'
        })
        _items.Products[index].IsChecked = 0
        return
      } else if (_items.Products[index].DownShelfStatus == 0 && closeTitle == '结算') {
        wx.showToast({
          title: '此商品未上架',
          icon: 'none'
        })
        _items.Products[index].IsChecked = 0
        return
      } else {
        _items.Products[index].IsChecked = 1
      }
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
      if (closeTitle == '结算') {
        if (_items.Products[idx].IsChecked) {
          if (!_items.Products[idx].AvaliableStore == 0) {
            num++
          }
        }
        if (_items.Products[idx].AvaliableStore == 0) {
          noNum++
        }
      } else {
        if (_items.Products[idx].IsChecked) {
          num++
        }
      }
    }
    if (num < (_items.Products.length - noNum)) {
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
  //去订单结算页面/批量删除购物车
  _goOrderClose: function(e) {
    var closeTitle = this.data.closeTitle
    var _items = this.data.items.Products
    var self = this
    var traItems = []
    var data = []
    var num = 0
    if (closeTitle == '结算') {
      console.log(1)
      for (let idx in _items) {
        console.log(_items[idx])
        if (_items[idx].IsChecked) {
          console.log(_items[idx].IsChecked)
          if (!_items[idx].AvaliableStore == 0) {
            console.log(_items[idx].AvaliableStore)
            traItems.push(_items[idx].GoodsId+'_'+_items[idx].ProductId+'_'+_items[idx].Nums)
            num++
          }
        }
      }
     
      //判断结算的商品数量是否大于0
      if (num) {
        wx.navigateTo({
          url: '../submitOrder/submitOrder?traItems=' + traItems.join("|") + "&refermid=" + this.data.refermid
        })
      } else {
        wx.showToast({
          title: '您还没选择宝贝哦',
          icon: 'none'
        })
      }
    } else {
      //批量删除
      for (let idx in _items) {
        if (_items[idx].IsChecked) {
          data.push(_items[idx].ProductId)
        }
      }
      //判断删除操作的商品数量是否大于0
      if (data.length) {
        wx.showModal({
          content: '确定要将该商品移出购物车吗？',
          success: function(res) {
            if (res.confirm) {
              cart.batchremove({
                productIds: data.join(",")
              }, function(res) {
                self.getGoods()
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '请选择要删除的商品',
          icon: 'none'
        })
      }
    }

  },
  /**
   * 前往授权页面
   */
  _goLogin: function(e) {
    wx.navigateTo({
      url: '../scope/index',
    })
  },
  onLoad: function(options) {
    var _refermid = wx.getStorageSync('refermid')
    this.setData({
      refermid: _refermid
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var userInfo = app.globalData.userInfo || ''
    this.setData({
      userInfo: userInfo
    })
    if (this.data.userInfo) {
      this.getGoods()
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {}
})