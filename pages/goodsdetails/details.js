import viewDataResponsity from '../../utils/viewDataResponsity.js'
import {
  isInArray,
  setRefermid,
  getRefermid
} from '../../utils/common.js'
import goodsdetails from '../../utils/request/goodsdetails.js'
import {
  addCartGoods
} from '../../utils/request/goodShop.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    goodsItem: {},
    showModalStatus: false,
    categoryTitle: '',
    btnText: '立即购买',
    btnBuy: true,
    /**按钮是否是购买状态 */
    shopNum: 1,
    backTopValue: false,
    swiperDetail: false,
    refermid: 0, //分享引导购买的人id
    starData: {
      starSelect: 4,
      star: 1
    },
    specData: {
      specStatus: {},
      props: {},
      step: 0,
      specCount: 0,
      selectProduct: null,
      productid: 0,
      descName: '',
      price: 0,
      store: 0,
      SaleTag: '',
      isUserPrice: true,
      LimitBuyNum: 0
    },
    commentData: {
      num: 0,
      praise: 100
    }
  },

  watchBigImage: function(e) {
    this.setData({
      swiperDetail: true
    })
  },

  imageLoad: function(e) {
    var $width = e.detail.width
    var $height = e.detail.height
    this.setData({
      imgHeight: $height,
      imagewidth: $width
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

  //去评论列表页面
  _goCommentList: function(e) {
    wx.navigateTo({
      url: '../evaluate/conmmentList/index?goodsid=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _refermid = getRefermid()
    this.setData({
      refermid: _refermid == 0 ? (options.refermid || 0) : _refermid
    })
    setRefermid(this.data.refermid);
    var self = this
    var data = {
      goodsid: options.goodsid
    }
    goodsdetails.goodsDetails(data, function(data) {
      if (data != null) {
        wx.setNavigationBarTitle({
          title: data.Base.Name,
        })
        data.Base.SubTitle = data.Base.SubTitle || ''

        viewDataResponsity.init(data);
        var _specCount = 0;
        //用于判断每组规格的选中状态
        var _specStatus = {}
        for (var s in data.Base.Spec) {
          _specCount++
          _specStatus[s] = _specStatus[s] || {}
          for (var x in data.Base.SpecDesc) {
            var item = data.Base.SpecDesc[x];
            if (item.SpecId == s) {
              _specStatus[s][item.SpecValueId] = ''
            }
          }
        }

        var _specData = self.data.specData
        _specData.specCount = _specCount
        _specData.specStatus = _specStatus
        _specData.store = data.Base.Store
        //判断是否限购
        _specData.LimitBuyNum = data.Base.LimitBuyNum
        if (data.Base.LimitBuyNum == 0)
          _specData.LimitBuyNum = data.Base.Store
        //获取用户价格
        _specData.price = viewDataResponsity.getUserPrice(0)
        //如果用户价格和商品价格一致的话,则隐藏销售价格
        if (_specData.price == viewDataResponsity.goodPrice)
          _specData.isUserPrice = false;
        var tags = data.SaleTag || ''
        _specData.SaleTag = tags.split(',')

        //好评度
        if (data.Base.CommentModel != null) {
          var _commentData = self.data.commentData;
          _commentData.num = data.Base.CommentModel.CommentNum
          _commentData.praise = ((data.Base.CommentModel.CommentScore * 100)).toFixed(1)
        }

        self.setData({
          goodsItem: data,
          loading: false,
          specData: _specData,
          commentData: _commentData
        })
      }
    })
  },

  _goService: function(e) {
    wx.switchTab({
      url: '../service/index',
    })
  },
  _goIndex: function(e) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  _goShop: function(e) {
    wx.switchTab({
      url: '../shop/index',
    })
  },
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    this.setData({
      btnText: e.currentTarget.dataset.btntext,
      btnBuy: e.currentTarget.dataset.btnbuy,
      swiperDetail: false
    })
  },
  powerUserDrawer: function(e) {
    var userInfo = app.globalData.userInfo || ''
    if (userInfo) {
      var currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu)
      this.setData({
        btnText: e.currentTarget.dataset.btntext,
        btnBuy: e.currentTarget.dataset.btnbuy,
        swiperDetail: false
      })
    } else {
      app.globalData.userInfo = e.detail.userInfo
    }

  },
  showLoading: function() {
    this.setData({
      loading: true
    })
  },
  hideLoading: function() {
    this.setData({
      loading: false
    })
  },
  /**
   * 立即购买
   */
  buyNow: function(e) {
    var self = this
    var userInfo = app.globalData.userInfo || ''
    if (this.data.specData.productid == 0) {
      wx.showToast({
        title: "请选择规格",
        icon: "none"
      })
    } else {
      if (userInfo) {
        if (this.data.btnBuy == 'true') {
          var traItems = this.data.goodsItem.Base.GoodsId + "_" + this.data.specData.productid + "_" + this.data.shopNum
          //跳转订单确认页      
          wx.navigateTo({
            url: '../submitOrder/submitOrder?traItems=' + traItems + "&refermid=" + this.data.refermid
          })
          return
        } else {
          //加入购物车
          var p = {
            goodsId: this.data.goodsItem.Base.GoodsId,
            productId: this.data.specData.productid,
            quantity: this.data.shopNum
          }
          self.showLoading()
          addCartGoods(p, function() {
            //添加成功
            wx.showToast({
              title: "加入购物车成功",
              icon: "none",
              success: function(res) {
                self.setData({
                  showModalStatus: false
                })
                self.hideLoading()
              }
            })
          });
        }
      } else {
        app.globalData.userInfo = e.detail.userInfo
      }
    }
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(500).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function() {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  numMinus: function(e) {
    var num = this.data.shopNum
    if (num > 1) {
      num -= 1
      this.setData({
        shopNum: num
      })
    }
  },

  numAdd: function(e) {
    var num = this.data.shopNum
    if (num < this.data.specData.store && num < this.data.specData.LimitBuyNum) {
      num += 1
      this.setData({
        shopNum: num
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    this.numMinus(e)
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
    var shareData = {
      title: this.data.categoryTitle,
      desc: '',
      path: '/pages/goodsdetails/details?refermid=' + app.globalData.userId
    }
    return shareData;
  },
  /**
   * 选择规格
   */
  spec_selected: function(e) {
    var item = e.currentTarget.dataset.item;
    var _item = this.data.goodsItem;
    var _specData = this.data.specData
    var spec = {
      SpecId: item.SpecId,
      SpecValueId: item.SpecValueId
    }
    //如果当前选中的规格无库存,则直接跳过
    if (_specData.specStatus[item.SpecId][spec.SpecValueId] == 'no_select')
      return
    _specData.props[item.SpecId] = spec;
    if (!_specData.descName)
      _specData.descName = item.SpecValue

    _item.Base.PicUrl = item.GoodsImageIds[0]

    if (_specData.step < _specData.specCount) {
      _specData.step++
    }

    //当选择了最后一个规格时，得到选择的货品
    if (_specData.step == _specData.specCount) {
      var pros = viewDataResponsity.getSelectProduct(_specData.props, _specData.specCount)
      _specData.selectProduct = pros
      _specData.productid = pros.ProductId
      _specData.store = pros.Store
      _specData.descName = pros.Pdt_Desc
      if (_specData.LimitBuyNum == 0 || _specData.LimitBuyNum > _specData.store || _specData.LimitBuyNum == _item.Base.Store)
        _specData.LimitBuyNum = pros.Store

      //判断当前选择的库存是否超出限制
      if (this.data.shopNum > _specData.LimitBuyNum) {
        this.setData({
          shopNum: _specData.LimitBuyNum
        })
      }

      _specData.price = viewDataResponsity.getUserPrice(pros.ProductId)

      //如果用户价格和商品价格一致的话,则隐藏销售价格
      if (_specData.price == viewDataResponsity.goodPrice)
        _specData.isUserPrice = false
      else
        _specData.isUserPrice = true

    }
    //设置规格的选中状态
    for (var key in _specData.specStatus) {
      var item = _specData.specStatus[key];
      if (key == spec.SpecId) {
        for (var k in item) {
          item[k] = '';
        }
        _specData.specStatus[key][spec.SpecValueId] = 'active'
        break;
      }
    }

    this.setData({
      goodsItem: _item,
      specData: _specData
    })
  }
})