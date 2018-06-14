import config from '../../config.js'
import goodsdetails from '../../utils/request/goodsdetails.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    showModalStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item: {
        title: "[减肥茶月瘦5-30斤]华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶",
        imgSrc: "http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg",
        goodsPrice: 27.99,/*商品价格*/
        salesVolume: 1800,/*销量价格*/
        couponPrice: 4,/*优惠券价格*/
        finalPrice: 23.99,/*最终价格*/
        isFav: true,/*是否收藏*/
        earnMoney: 3.5,/*赚取额度*/
        goodsId: '1127878416' /*商品ID*/,
        goodsIntro: "华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶"
      }
    })

    var self = this
    var data = {
      goodsid: options.goodsid
    }
    goodsdetails.goodsDetails(data, function (code, res) {
      if (code) {
        self.setData({
          item: res.data
        });
      }
      else {
        self.setData({
          loading: false
        })
      }
    })
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    console.log(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})