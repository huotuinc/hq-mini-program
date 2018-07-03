Page({
  data: {
    winHeight: 0,
    currentTab: 0, //预设当前项的
    scrollLeft: 0, //tab标题的滚动条位置
    category: [{
        title: "全部",
        categoryid: 1,
        selected: true,
      },
      {
        title: "系统消息",
        categoryid: 2,
        selected: false,
      },
      {
        title: "注册通知",
        categoryid: 3,
        selected: false,
      },
      {
        title: "支付通知",
        categoryid: 4,
        selected: false,
      }
    ]
  },
  swichNav: function(e) {
    var cur = e.target.dataset.current
    // console.log( e.target.dataset.item.categoryid - 1);
    if (this.data.currentTab == cur) {
      return false
    }
    this.setData({
      currentTab: cur
    })
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    // this.checkCor();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        let h = res.windowHeight;
        that.setData({
          winHeight: h - 50
        })
      },
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})