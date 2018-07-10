import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RealName: "去完善",
    UserGender: ['未知', '男', '女'],
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
      url: '../bindingPhone/index?phone=' + e.target.dataset.phone
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
  _goPayPassword: function(e) {
    wx.navigateTo({
      url: '../payPassword/index?mobile=' + e.currentTarget.dataset.mobile,
    })
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
      self.setData({
        RealName: res.settingItem.RealName || '去完善',
        UserSex: res.settingItem.UserSex || '未知',
        UserBirthday: res.settingItem.UserBirthday || '',
        UserCardNo: res.settingItem.UserCardNo || '',
        UserMobile: res.settingItem.UserMobile || '未绑定',
        UserWxNo: res.settingItem.UserWxNo || '',
        UserCityName: res.settingItem.UserCityName || '',
        PayPassworded: res.settingItem.PayPassworded,
        PayPasswordStatus: res.settingItem.PayPasswordStatus
      })
    })
  },
  onLoad: function(options) {},

  onShow: function(e) {
    this._getSetting()
    this.onConfirm(e)
  },
})