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
    this.setData({
      showModal: true,
      placeholder: "请输入姓名"
    })
  },
  _idCard: function(e) {
    this.setData({
      showModal: true,
      placeholder: "请输入身份证"
    })
  },
  _wxNumber: function(e) {
    this.setData({
      showModal: true,
      placeholder: "请输入微信号"
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
      console.log(res.code)
    })
  },
  bindRegionChange: function(e) {
    console.log(e)
    this.setData({
      UserCityName: e.detail.value
    })
    user.updateUserBaseInfo({
      type: 6,
      content: e.detail.value
    }, function(res) {
      console.log(res.code)
    })
  },
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  CancelGender: function(e) {
    this.setData({
      showGender: false
    })
  },
  onCancel: function() {
    this.hideModal();
  },
  inputChange: function(e) {
    var newName = e.detail.value
    this.setData({
      excessive: newName
    })
  },

  //修改用户基本信息
  onConfirm: function() {
    var excessive = this.data.excessive
    var placeholder = this.data.placeholder
    if (placeholder === '请输入姓名') {
      this.setData({
        RealName: excessive
      })
      user.updateUserBaseInfo({
        type: 1,
        content: excessive
      }, function(res) {
        console.log(res.code)
      })
    } else if (placeholder === '请输入身份证') {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(excessive)) {
        wx.showToast({
          title: '身份证输入有误',
          icon: 'none'
        })
        return
      }
      this.setData({
        UserCardNo: excessive
      })
      user.updateUserBaseInfo({
        type: 4,
        content: excessive
      }, function(res) {
        console.log(res.code)
      })
    } else if (placeholder === '请输入微信号') {
      this.setData({
        UserWxNo: excessive
      })
      user.updateUserBaseInfo({
        type: 5,
        content: excessive
      }, function(res) {
        console.log(res.code)
      })
    }
    this.hideModal();
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
      console.log(res.code)
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
        status: status
      }, function(res) {
        if (res.data == 200) {
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
        status: status
      }, function(res) {
        if (res.data == 200) {
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
      userCard = userCard.substr(0, 6) + "********" + userCard.substr(-4)
      self.setData({
        RealName: res.settingItem.RealName || '去完善',
        UserSex: res.settingItem.UserSex || '未知',
        UserBirthday: res.settingItem.UserBirthday || '',
        UserCardNo: userCard || '',
        UserMobile: tel || '未绑定',
        UserWxNo: res.settingItem.UserWxNo || '',
        UserCityName: res.settingItem.UserCityName || '',
        PayPassworded: res.settingItem.PayPassworded,
        PayPasswordStatus: res.settingItem.PayPasswordStatus,
        phone: res.settingItem.UserMobile
      })
    })
  },
  onLoad: function(options) {},

  onShow: function(e) {
    this._getSetting()
    this.onConfirm(e)
  },
})