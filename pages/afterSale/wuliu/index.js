const wuliu = require('../../../utils/wuliu.js')
import afterSale from '../../../utils/request/afterSale.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countIndex: 4,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  /**
   * 选择物流公司
   * 获取物流公司 以及 物流公司编码
   */
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      logicompany: this.data.wuliu[e.detail.value],
      loginame: this.data.logisticCompanyId[e.detail.value]
    })
  },
  /**
   * 获取物流单号
   */
  _getWuliu: function(e) {
    this.setData({
      logino: e.detail.value
    })
  },

  /**
   * 获取联系人手机号码
   */
  _getMobile: function(e) {
    this.setData({
      shipmobile: e.detail.value
    })
  },

  /**
   * 获取用户备注信息
   */
  _getInputMessage: function(e) {
    this.setData({
      txtmemo: e.detail.value
    })
  },

  /**
   * 上传图片
   */
  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: this.data.count[this.data.countIndex],
      success: function(res) {
        that.setData({
          imgs: res.tempFilePaths
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      afterSaleId: options.afterSaleId,
      wuliu: wuliu.purpose,
      logisticCompanyId: wuliu.logisticCompanyId
    })
  },

  /**
   * 物流提交
   */
  _submitLogistics: function(e) {
    if (this.isEmpty()) {
      var data = {}
      data.afterSaleId = this.data.afterSaleId //售后单号
      data.logicompany = this.data.logicompany //物流公司
      data.logino = this.data.logino //物流单号
      data.shipmobile = this.data.shipmobile //联系人手机号码
      data.txtmemo = this.data.txtmemo //备注留言
      data.imgs = this.data.imgs.join(",") //图片举证
      afterSale.submitLogistics(data, function(res) {
        console.log(res)
      })
    }
  },

  /**
   * 提交信息非空检验
   */
  isEmpty: function() {
    var logicompany = this.data.logicompany //物流公司
    var logino = this.data.logino //物流单号
    var shipmobile = this.data.shipmobile //联系人手机号码
    var txtmemo = this.data.txtmemo //备注留言
    var imgs = this.data.imgs //图片举证
    if (!logicompany) {
      wx.showToast({
        title: '请选择物流公司',
        icon: 'none'
      })
      return false
    }
    if (!logino) {
      wx.showToast({
        title: '请输入物流单号',
        icon: 'none'
      })
      return false
    }
    if (!/^1([34578])\d{9}$/.test(shipmobile)) {
      wx.showToast({
        title: '手机号码有误',
        icon: 'none'
      })
      return false
    }
    if (!txtmemo) {
      wx.showToast({
        title: '请填写备注信息',
        icon: 'none'
      })
      return false
    }
    if (!imgs) {
      wx.showToast({
        title: '请上传图片举证',
        icon: 'none'
      })
      return false
    }
    return true
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

  }
})