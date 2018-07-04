import order from '../../utils/request/order.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countIndex: 7,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    starData: {
      starSelect: 0,
      star: 5
    }
  },
  //输入评论
  _getInputMessage: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  //星星等级
  starComment: function(e) {
    var imgItem = e.currentTarget.dataset.imgitem;
    var starId = e.currentTarget.dataset.id;
    var starData = this.data.starData;
    if (imgItem == "starActive") {
      starData.starSelect = Number(starId);
      starData.star = 5 - starData.starSelect;
      this.setData({
        starData: starData
      })
    } else {
      starData.starSelect = Number(starId) + starData.starSelect;
      starData.star = 5 - starData.starSelect;
      this.setData({
        starData: starData
      })
    }
  },
  //上传图片
  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: this.data.count[this.data.countIndex],
      success: function(res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  //提交评论
  _submitEvaluate: function(e) {
    var productId = this.data.goodsOrder.orderItemList[0].productid
    var orderId = this.data.goodsOrder.orderId
    // var goodsId = this.data
    var score = this.data.starData.starSelect
    var content = this.data.content
    var imgs = this.data.imageList
    if (!content) {
      wx.showToast({
        title: '请输入您的评价',
        icon: 'none'
      })
      return
    }
    if (score == 0) {
      wx.showToast({
        title: '请给该商品打分',
        icon: 'none'
      })
      return
    }
    order.submitEvaluate({
      productId: productId,
      orderId: orderId,
      content: content,
      imgs: imgs,
      score: score
    }, function(res) {
      wx.showToast({
        title: '提交成功',
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    wx.getStorage({
      key: 'goodsOrder',
      success: function(res) {
        self.setData({
          goodsOrder: res.data
        })
      },
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