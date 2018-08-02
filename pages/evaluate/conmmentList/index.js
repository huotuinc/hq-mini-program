import order from '../../../utils/request/order.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 20,

  },

  //获取评论列表
  _getCommentList: function(e) {
    var self = this
    order.commentList({
      pageIndex: self.data.pageIndex,
      pageSize: self.data.pageIndex,
      goodsId: self.data.goodsId
    }, function(res) {
      self.setData({
        commentList: res.data.data
      })
    })
  },
  //点赞
  _commentLike: function(e) {
    var self = this
    order.commentLike({
      commentId: e.target.dataset.commentid
    }, function(res) {
      console.log(res.data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goodsId: options.goodsid
    })
  },
  onShow: function() {
    this._getCommentList()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})