import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RealName: "去完善",
    UserGender: ['男', '女'],
    UserBirthday: '',
    UserCardNo: '',
    UserMobile: '',
    UserWxNo: '',
    UserCityName: "",
    checked: '',
    showModal: false
  },
  _prefect: function(e) {
    wx.navigateTo({
      url: './updateUserInfo/index?type=1&content=' + e.currentTarget.dataset.content,
    })
  },
  _idCard: function(e) {
    wx.navigateTo({
      url: './updateUserInfo/index?type=4&content=' + e.currentTarget.dataset.content,
    })
  },
  _wxNumber: function(e) {
    wx.navigateTo({
      url: './updateUserInfo/index?type=5&content=' + e.currentTarget.dataset.content,
    })
  },
  _mobilePhone: function(e) {
    wx.navigateTo({
      url: '../bindingPhone/index?mobile=' + e.target.dataset.phone + '&phone=' + this.data.phone
    })
  },
  bindDateChange: function(e) {
    this.setData({
      UserBirthday: e.detail.value
    })
    user.updateUserBaseInfo({
      type: 3,
      content: e.detail.value
    }, function(res) {
      if (res.data.code == 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '网络出错了...',
          icon: 'none'
        })
      }
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      UserCityName: e.detail.value
    })
    user.updateUserBaseInfo({
      type: 6,
      content: e.detail.value
    }, function(res) {
      if (res.data.code == 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
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
   * 修改性别
   */
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
    var gender = this.data.UserGender[e.detail.value]
    user.updateUserBaseInfo({
      type: 2,
      content: gender
    }, function(res) {
      if (res.data.code == 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '网络出错了...',
          icon: 'none'
        })
      }
    })
  },
  _goAddress: function(e) {
    wx.navigateTo({
      url: '../shipAddress/index',
    })
  },
  /**
   * 添加/修改密码
   */
  _goPayPassword: function(e) {
    var self = this
    if (this.data.phone) {
      wx.navigateTo({
        url: '../payPassword/index?mobile=' + e.currentTarget.dataset.mobile + '&phone=' + this.data.phone,
      })
    } else {
      wx.showModal({
        content: '请先绑定手机号码',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../bindingPhone/index?phone=' + self.data.phone
            })
          }
        }
      })
    }
  },
  //是否开启支付密码
  passwordStatus: function(e) {
    var self = this
    var status = e.currentTarget.dataset.passwordstatus

    if (status == 1) {
      user.updatePayPasswordStatus({
        status: 0
      }, function(res) {
        if (res.data.code == 200) {
          self.setData({
            PayPasswordStatus: 0
          })
          wx.showToast({
            title: '关闭成功',
            icon: 'success'
          })
        }
      })
    }
    if (status == 0) {
      user.updatePayPasswordStatus({
        status: 1
      }, function(res) {
        if (res.data.code == 200) {
          self.setData({
            PayPasswordStatus: 1
          })
          wx.showToast({
            title: '开启成功',
            icon: 'success'
          })
        }
      })
    }
  },
  //获取用户设置界面信息
  _getSetting: function() {
    var self = this
    user.setting(function(res) {
      var tel = res.settingItem.UserMobile
      var reg = /^(\d{3})\d{4}(\d{4})$/
      tel = tel.replace(reg, "$1****$2")
      var userCard = res.settingItem.UserCardNo
      self.setData({
        RealName: res.settingItem.RealName || '去完善',
        UserSex: res.settingItem.UserSex || '未知',
        UserBirthday: res.settingItem.UserBirthday || '请选择生日',
        UserCardNo: userCard || '请完善身份证信息',
        UserMobile: tel || '未绑定',
        UserWxNo: res.settingItem.UserWxNo || '绑定微信号',
        UserCityName: res.settingItem.UserCityName || '请选择城市',
        PayPassworded: res.settingItem.PayPassworded,
        PayPasswordStatus: res.settingItem.PayPasswordStatus,
        phone: res.settingItem.UserMobile
      })
    })
  },
  //清楚缓存
  clearStorge: function(e) {
    wx.showToast({
      title: '清除成功',
      icon: 'success',
      success: function() {
        wx.clearStorage()
      }
    })
  },
  onLoad: function(options) {},

  onShow: function(e) {
    this._getSetting()
  },
})