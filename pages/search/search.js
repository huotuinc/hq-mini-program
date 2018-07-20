import home from '../../utils/request/home.js'
const app = getApp()

Page({
  data: {
    hotItems: [],
    historyList: [],
    newSearch: [],
    page: 1,
    pageSize: 20
  },

  cancelSearch: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  clearInput: function(e) {
    this.setData({
      inputSearch: ''
    })
  },
  bindSearchInput: function(e) {
    this.setData({
      inputSearch: e.detail.value
    })
  },

  confirmSearch: function(e) {
    let searchList = []
    var that = this
    searchList.push(this.data.inputSearch)
    //对搜索记录去重并且按搜索先后顺序进行排序
    this.data.historyList = Array.from(new Set(searchList.concat(this.data.historyList)))
    wx.setStorage({
      key: 'historyList',
      data: that.data.historyList
    })
    wx.navigateTo({
      url: '../goodslist/goods-list?search=1&categoryTitle=搜索结果&keyword=' + this.data.inputSearch
    })
  },

  clearHistory: function(e) {
    var that = this
    wx.removeStorage({
      key: 'historyList',
      success: function(res) {
        that.setData({
          showHistory: false,
          historyList: []
        })
        wx.showToast({
          title: '清除成功',
          icon: 'success'
        })
      }
    })
  },

  startSearch: function(e) {
    // console.log(e.target.dataset.con)
    wx.navigateTo({
      url: '../goodslist/goods-list?search=1&categoryTitle=搜索结果&keyword=' + e.target.dataset.con
    })
  },
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    home.hotSearchKeyWorld(function(res) {
      console.log(res.keys)
    })
    var that = this
    wx.getStorage({
      key: 'historyList',
      success: function(res) {
        that.setData({
          historyList: res.data,
          showHistory: true
        })
      }
    })
  },
})