import order from '../../../utils/request/order.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 20,
    loading: true
  },

  //获取评论列表
  _getCommentList: function(e) {
    var self = this
    order.commentList({
      pageIndex: self.data.pageIndex,
      pageSize: self.data.pageIndex,
      goodsId: self.data.goodsId
    }, function(res) {
      if (res.data.code == 200) {
        var commentList = res.data.data
        for (let idx in commentList) {
          commentList[idx].commentImages = commentList[idx].commentImages.split(",")
        }
        self.setData({
          commentList: commentList,
          loading: false
        })
      }
    })
  },
  //点赞
  _commentLike: function(e) {
    var self = this
    order.commentLike({
      commentId: e.target.dataset.commentid
    }, function(res) {
      if (res.data.code == 200) {
        self._getCommentList()
      } else {
        wx.showToast({
          title: '您已经赞过了...',
          icon: 'none'
        })
      }
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
    var self = this
    var page = this.data.pageIndex + 1
    var _commentList = this.data.commentList
    order.commentList({
      pageIndex: page,
      pageSize: self.data.pageIndex,
      goodsId: self.data.goodsId
    }, function(res) {
      if (res.data.code == 200) {
        var commentList = res.data.data
        if (commentList.length > 0) {
          for (let idx in commentList) {
            commentList[idx].commentImages = commentList[idx].commentImages.split(",")
          }
          self.setData({
            pageIndex: page,
            commentList: _commentList.concat(commentList),
            loading: false
          })
        }
      }
    })
  }
})