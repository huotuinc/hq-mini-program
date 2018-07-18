import config from '../../config.js'
import user from '../../utils/request/user.js'
const area = require('../../common/city.data-3')
const app = getApp()

Page({
  data: {
    username: '',
    mobilePhone: '',
    province: '',
    codeProvince: '',
    city: '',
    codeCity: '',
    county: '',
    codeCounty: '',
    address: '',
    provinceName: [],
    provinceCode: [],
    provinceSelIndex: '',
    cityName: [],
    cityCode: [],
    citySelIndex: '',
    districtName: [],
    districtCode: [],
    districtSelIndex: ''
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

  //获取所在省
  bindRegionChange: function(e) {
    var provinceName = this.data.provinceName
    var provinceCode = this.data.provinceCode
    this.setData({
      province: provinceName[e.detail.value],
      codeProvince: provinceCode[e.detail.value],
      provinceSelIndex: e.detail.value,
      city: '',
      codeCity: ''
    })
    this.setCityArea(area.area)
  },
  //获取所在市
  bindRegionCity: function(e) {
    var cityName = this.data.cityName
    var cityCode = this.data.cityCode
    this.setData({
      city: cityName[e.detail.value],
      codeCity: cityCode[e.detail.value],
      citySelIndex: e.detail.value,
      county: '',
      codeCounty: ''
    })
    this.setDistrictArea(area.area)
  },
  //获取所在县/区
  bindDistrict: function(e) {
    var districtName = this.data.districtName
    var districtCode = this.data.districtCode
    this.setData({
      county: districtName[e.detail.value],
      codeCounty: districtCode[e.detail.value],
      citySelIndex: e.detail.value
    })
  },

  //获取详细地址
  addressChange: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  /**
   * 省的剥离
   */
  setAreaData: function(area) {
    var provinceName = []
    var provinceCode = []
    for (let idx in area) {
      provinceName.push(area[idx].text)
      provinceCode.push(area[idx].value)
    }
    this.setData({
      provinceName: provinceName,
      provinceCode: provinceCode
    })
  },
  /**
   * 各省中市的剥离
   */
  setCityArea: function(area) {
    var provinceSelIndex = this.data.provinceSelIndex
    var cityName = []
    var cityCode = []
    for (let idx in area[provinceSelIndex].children) {
      cityName.push(area[provinceSelIndex].children[idx].text)
      cityCode.push(area[provinceSelIndex].children[idx].value)
    }
    this.setData({
      cityName: cityName,
      cityCode: cityCode,
      districtSelIndex: ''
    })
  },
  /**
   * 各市中剥离县/区
   */
  setDistrictArea: function(area) {
    var provinceSelIndex = this.data.provinceSelIndex
    var citySelIndex = this.data.citySelIndex
    var districtName = []
    var districtCode = []
    var area = area[provinceSelIndex].children[citySelIndex].children
    for (let idx in area) {
      districtName.push(area[idx].text)
      districtCode.push(area[idx].value)
    }
    this.setData({
      districtName: districtName,
      districtCode: districtCode,
      districtSelIndex: ''
    })
  },

  /**
   * 编辑用户信息进来先获取本地缓存存储的用户收货地址信息
   */
  _getEditAddress: function(e) {
    var self = this
    var provinceName = this.data.provinceName
    // var 
    wx.getStorage({
      key: 'editAddress',
      success: function(res) {
        var provinceSelIndex = provinceName.indexOf(res.data.province)
        self.setData({
          username: res.data.name,
          mobilePhone: res.data.mobile,
          province: res.data.province,
          city: res.data.city,
          county: res.data.county,
          address: res.data.address,
          pid: res.data.pid,
          codeProvince: res.data.provinceCode,
          codeCity: res.data.cityCode,
          codeCounty: res.data.countyCode,
          provinceSelIndex: provinceSelIndex
        })
        self.setCityArea(area.area)
        var cityName = self.data.cityName
        var citySelIndex = cityName.indexOf(res.data.city)
        self.setData({
          citySelIndex: citySelIndex
        })
        self.setDistrictArea(area.area)
      },
    })
  },


  //添加/修改用户收货地址信息
  addAddress: function(e) {
    var self = this
    if (this.isEmpty()) {
      user.updateAddress({
        id: self.data.pid || 0,
        name: self.data.username,
        mobile: self.data.mobilePhone,
        province: self.data.province,
        city: self.data.city,
        county: self.data.county,
        address: self.data.address,
        provinceCode: self.data.codeProvince,
        cityCode: self.data.codeCity,
        countyCode: self.data.codeCounty
      }, function(res) {
        if (res.data.code == 200) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  /**
   * 收货信息的非空检测
   */
  isEmpty: function() {
    if (!this.data.username) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    }
    if (!/^1([34578])\d{9}$/.test(this.data.mobilePhone)) {
      wx.showToast({
        title: '手机号码有误',
        icon: 'none'
      })
      return false
    }
    if (!this.data.province) {
      wx.showToast({
        title: '请选择所在省',
        icon: 'none'
      })
      return false
    }
    if (!this.data.city) {
      wx.showToast({
        title: '请选择所在市',
        icon: 'none'
      })
      return false
    }
    if (!this.data.county) {
      wx.showToast({
        title: '请选择所在县/区',
        icon: 'none'
      })
      return false
    }
    if (!this.data.address) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return false
    }
    return true
  },

  //删除用户收货地址
  _delectAddress: function(e) {
    var self = this
    wx.showModal({
      title: '删除地址',
      content: '是否确定删除改地址？',
      success: function(res) {
        if (res.confirm) {
          user.deleteAddress({
            id: self.data.pid
          }, function(req) {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      }
    })
  },

  onLoad: function(options) {
    this.setAreaData(area.area)

    if (!options.pid == 0) {
      this._getEditAddress()
      wx.removeStorage({
        key: 'editAddress',
        success: function(res) {},
      })
    }
    this.setData({
      editID: Number(options.pid),
    })

  },

  onShow: function() {

  }

})