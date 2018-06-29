Page({

  data: {
    username: '',
    mobilePhone: '',
    cityList: '--请选择--',
    province: '',
    city: '',
    county: '',
    address: ''
  },
  //获取姓名
  nameChange: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  //获取联系方式
  phoneChange: function(e) {
    this.setData({
      mobilePhone: e.detail.value
    })
  },
  //获取所在城市
  bindRegionChange: function(e) {
    this.setData({
      cityList: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      county: e.detail.value[2]
    })
  },
  //获取详细地址
  addressChange: function(e) {
    this.setData({
      address: e.detail.value
    })
  },

  //编辑用户信息进来先获取本地缓存存储的用户收货地址信息
  _getEditAddress: function(e) {
    var self = this
    wx.getStorage({
      key: 'editAddress',
      success: function(res) {
        self.setData({
          username: res.data.name,
          mobilePhone: res.data.mobile,
          cityList: res.data.area,
          address: res.data.address,
          pid: res.data.pid
        })
      },
    })
  },

  onLoad: function(options) {
    if (!options.pid == 0) {
      this._getEditAddress()
      wx.removeStorage({
        key: 'editAddress',
        success: function(res) {},
      })
    }
  },

  onShow: function() {

  }

})