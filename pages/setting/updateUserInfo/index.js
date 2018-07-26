import user from '../../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  updateUserInfo: function() {
    var dType = this.data.type
    var content = this.data.content
    var placeholder = this.data.placeholder
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (dType == 4) {
      if (!reg.test(content)) {
        wx.showToast({
          title: '身份证输入有误',
          icon: 'none'
        })
        return
      }
    }
    if (!content) {
      wx.showToast({
        title: placeholder,
        icon: 'none'
      })
      return
    }
    user.updateUserBaseInfo({
      type: dType,
      content: content
    }, function(res) {
      if (res.data.code == 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          success: function() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else {
        wx.showToast({
          title: '网络出错了...',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.content == '去完善') {
      this.setData({
        type: options.type,
        content: '',
        placeholder: '请输入姓名'
      })
    } else if (options.content == '请完善身份证信息') {
      this.setData({
        type: options.type,
        content: '',
        placeholder: '请完善身份证信息'
      })
    } else if (options.content == '绑定微信号') {
      this.setData({
        type: options.type,
        content: '',
        placeholder: '绑定微信号'
      })
    } else {
      this.setData({
        type: options.type,
        content: options.content
      })
    }
  },
})