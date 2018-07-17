import afterSale from '../../../utils/request/afterSale.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    proposal: ['我要退款', '我要退货并退款'], //申请售后的方式
    pursueReason: ['跟卖家协商,双方同意', '买错,不想要了', '商品质量有问题', '没有收到货', '其他原因'], //售后原因
    imageList: [], //图片举证
    countIndex: 4,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  //获取售后方式的索引
  bindProposalChange: function(e) {
    this.setData({
      proposalIndex: e.detail.value
    })
  },
  //获取售后原因的索引
  bindPursueReason: function(e) {
    this.setData({
      idx: e.detail.value
    })
  },
  //获取可退金额
  getTotalMoney: function(e) {
    this.setData({
      totalMoney: e.detail.value
    })
  },
  //获取详细原因
  getContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //选择图片举证
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

  //获取要售后的商品
  getOrderSale: function() {
    var orderSale = wx.getStorageSync('orderDetail')
    console.log(orderSale)
    this.setData({
      orderDetail: orderSale
    })
  },

  //提交申请
  submitSale: function() {
    var orderDetail = this.data.orderDetail
    var data = {
      orderid: orderDetail.orderid, //订单号
      products: orderDetail.products, //货品名称 
      returnNum: orderDetail.returnNum, //货品数量
      pics: orderDetail.pics, // 货品图片
      bns: orderDetail.bns, //货号
      content: this.data.content, //售后详细原因
      imgs: this.data.imageList.join(","), //图片举证
      mobile: orderDetail.mobile, //联系人手机
      price: this.data.totalMoney || orderDetail.price, //退款金额
      goodsid: orderDetail.goodsid, //商品Id
      selectway: this.data.proposalIndex, //售后方式
      selectreason: this.data.idx, //售后原因
      afterid: this.data.afterId || '', //售后id
      supplierid: orderDetail.supplierid, //供应商id
      unionorderid: orderDetail.unionorderid, //联合单号
      itemid: 0, //订单itemId(供应商使用)
      productid: orderDetail.productid //货品id
    }
    if (this.isEmpty()) {
      afterSale.applyAfterSale(data, function(res) {
        console.log(res)
      })
    }
  },

  /**
   * 验证申请方式和申请原因 以及详细原因 是否选择或者填写
   */
  isEmpty: function() {
    var selectway = this.data.proposalIndex
    var selectreason = this.data.idx
    // var totalMoney = this.data.totalMoney
    if (!(selectway == 0 || selectway == 1)) {
      wx.showToast({
        title: '请选择申请方式',
        icon: 'none'
      })
      return false
    }
    if (!(selectreason == 0 || selectreason == 1 || selectreason == 2 || selectreason == 3 || selectreason == 4)) {
      wx.showToast({
        title: '请选择申请原因',
        icon: 'none'
      })
      return false
    }
    if (!this.data.content) {
      wx.showToast({
        title: '请输入详细原因',
        icon: 'none'
      })
      return false
    }
    // if ((selectway == 0 && totalMoney == '')) {
    //   wx.showToast({
    //     title: '请输入金额',
    //     icon: 'none'
    //   })
    //   return false
    // }
    return true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderSale()
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