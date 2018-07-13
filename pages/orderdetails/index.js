import orderList from '../../utils/request/order.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  detail: 1,
    backTopValue: false
  },

  actionSheetTap: function() {
    wx.showActionSheet({
      itemList: ['item1', 'item2', 'item3', 'item4'],
      success: function(e) {
        console.log(e.tapIndex)
      }
    })
  },

  //查看订单状态
  watchStatus: function(e) {
    this.setData({
      watchStatus: 1
    })
  },

  //获取订单详情
  _getOrderDetail: function(orderId) {
    var self = this
    orderList.orderDetail({
      orderId: orderId
    }, function(res) {
      self.setData({
        orderDetail: res.data.data
      })
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

  //发票抬头
  _invoiceTitle: function(e) {
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.invoiceTitle']) {
          wx.authorize({
            scope: 'scope.invoiceTitle',
            success: function(res) {
              wx.chooseInvoiceTitle({
                success: function(res) {
                  console.log(res)
                }
              })
            },
            fail: function(err) {
              console.log(err)
            }
          })
        } else {
          wx.chooseInvoiceTitle({
            success: function(res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  //添加收货地址
  _goaddAddress: function(e) {
    wx.navigateTo({
      url: '../addAddress/index?pid=0',
    })
  },
  //选择收货地址
  _chooseAddress: function(e) {
    wx.navigateTo({
      url: '../shipAddress/index',
    })
  },

  //获取默认收货地址
  getAddress: function(e) {
    var self = this
    wx.getStorage({
      key: 'address',
      success: function(res) {
        self.setData({
          address: res.data
        })
      },
    })
  },

  //获取收货地址
  getAddressList: function(e) {
    var self = this
    user.addressList(function(res) {
      self.setData({
        address: res.data.data[0]
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      detail: options.detail
    })
    this.getAddressList()
    this._getOrderDetail(options.orderId)
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
    this.getAddress()
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
  onShareAppMessage: function() {}

})