const indexData = require('../../utils/mock/index.js')
Page({
  data: {
    
  },
  onLoad: function (options) {
    this.setData({
      hotItems: indexData.collectItems
    });
  },

  isChecked:function(e){
    // console.log(e)
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})