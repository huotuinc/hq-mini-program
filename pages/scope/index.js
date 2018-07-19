
const app = getApp();

Page({
  onGotUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.navigateBack({
        delta: 1
      })
    }
  }
})