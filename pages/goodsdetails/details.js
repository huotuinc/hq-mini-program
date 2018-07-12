import config from '../../config.js'
import {
  isInArray
} from '../../utils/common.js'
import goodsdetails from '../../utils/request/goodsdetails.js'
const app = getApp();

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
    shopNum: 1,
    backTopValue: false,
    swiperDetail: false,
    starData: {
      starSelect: 4,
      star: 1
    },
    specData:{
      specStatus: {},
      props: {},
      step: 0,
      specCount: 0,
      selectProduct: null,
      productid: 0,
      descName: ''
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
  _goCommentList:function(e){
    wx.navigateTo({
      url: '../evaluate/conmmentList/index?goodsid=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({     
      categoryTitle: options.categoryTitle || '商品详情'
    })
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
    })

    var self = this
    var data = {
      goodsid: options.goodsid
    }
    goodsdetails.goodsDetails(data, function(data) {      
      if (data!=null){
        var _specCount=0;
        //用于判断每组规格的选中状态
        var _specStatus={}
        for (var s in data.Spec){                    
          _specCount++          
          _specStatus[s] = _specStatus[s]||{}
          for (var x in data.SpecDesc){
            var item = data.SpecDesc[x];
            if (item.SpecId==s){
              _specStatus[s][item.SpecValueId]=false
            }
          }
        }

        var _specData = self.data.specData;
        _specData.specCount = _specCount;
        _specData.specStatus=_specStatus;
        console.log(_specStatus)
        self.setData({
          goodsItem:data,
          loading: false,
          specData: _specData
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
      //btnText: e.currentTarget.dataset.btntext,
      swiperDetail: false
    })
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
    if (num < this.data.goodsItem.Store){
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

  },
  /**
   * 选择规格
   */
  spec_selected:function(e){
    var item = e.currentTarget.dataset.item;
    var _item= this.data.goodsItem;
    var _specData = this.data.specData
    _item.PicUrl=item.GoodsImageIds[0]

    var spec = {
      SpecId: item.SpecId,
      SpecValueId: item.SpecValueId
    }

    _specData.props[item.SpecId] = spec;
    _specData.descName= item.SpecValue


    if (_specData.step < _specData.specCount) {
      _specData.step++
    }   
   
    //当选择了最后一个规格时，得到选择的货品
    if (_specData.step == _specData.specCount) {
      var pros = this.getSelectProduct(_specData.props, _specData.specCount)   
      _specData.selectProduct=pros
      _specData.productid = pros.ProductId
    }

    for (var key in _specData.specStatus)
    {
      var item = _specData.specStatus[key];
      if (key == spec.SpecId){
        for (var k in item){
          item[k]=false;
        }
        _specData.specStatus[key][spec.SpecValueId]=true
        break;
      }
    }
    this.setData({
      goodsItem: _item,      
      specData: _specData
    }) 
  },
  /**
   * 根据规格，得到选择的货品
   */
  getSelectProduct: function (props, specCount) {
    var Products = this.data.goodsItem.Products;
    var selectProduct = null;
    for (var i in Products){
      var count = 0;
      var item = Products[i];
      for (var x in item.Props){
        var proItem = item.Props[x];
        if (props[proItem.SpecId] != null) {
          if (props[proItem.SpecId].SpecId == proItem.SpecId && props[proItem.SpecId].SpecValueId == proItem.SpecValueId) {
            count++;
          }
        }
      }
      if (count == specCount) {
        selectProduct = item;
      }
    }
    return selectProduct;
  }
})