
Page({

  data: {
    btnMessage:'点击查看协商记录',
    watch:0
  },
  _goFeedback:function(e){
    wx.navigateTo({
      url: '../message/index',
    })
  },
  _watchRecharge:function(e){
    if(this.data.watch == 0){
        this.setData({
          btnMessage: '点击收起协商记录',
          watch: 1
        })
    }else{
      this.setData({
        btnMessage: '点击查看协商记录',
        watch: 0
      })
    }
  },
  _goSubmitReturnProduct:function(e){
    wx.navigateTo({
      url: '../SubmitReturnProduct/index',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})