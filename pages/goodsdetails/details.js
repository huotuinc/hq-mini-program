import config from '../../config.js'
import goodsdetails from '../../utils/request/goodsdetails.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    showModalStatus: false,
    categoryTitle: '',
    btnText: '立即购买',
    shopNum: 1,
    backTopValue: false
  },

  imageLoad: function(e) {
    var $width = e.detail.width
    var $height = e.detail.height
    this.setData({
      imgHeight: $height,
      imgWidth: $width
    })
  },

  imagedetails:function(e){
    var width = e.detail.width
    var height = e.detail.height
    this.setData({
      detailsHeight: height,
      detailsWidth: width
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      item: {
        title: "【胡庆余堂】蜂胶胶囊 0.38g/粒*12粒*8盒",
        imgSrc: "http://res.chinaswt.cn/resource/images/photo/8529/20180607/201806071614470.jpg",
        goodsPrice: 198,
        /*商品价格*/
        salesVolume: 1800,
        /*销量价格*/
        couponPrice: 4905,
        /*优惠券价格*/
        finalPrice: 158,
        /*最终价格*/
        isFav: true,
        /*是否收藏*/
        earnMoney: 3.5,
        /*赚取额度*/
        goodsId: '1127878416' /*商品ID*/ ,
        goodsIntro: "华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶"
      },
      categoryTitle: options.categoryTitle || '商品详情'
    })
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
    })

    var self = this
    var data = {
      goodsid: options.goodsid
    }
    goodsdetails.goodsDetails(data, function(code, res) {
      if (code) {
        self.setData({
          item: res.data
        });
      } else {
        self.setData({
          loading: false
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
      btnText: e.currentTarget.dataset.btntext
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
    num += 1
    this.setData({
      shopNum: num
    })
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

  }
})