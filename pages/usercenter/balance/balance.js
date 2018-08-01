import config from '../../../config.js'
import wallet from '../../../utils/request/user.js'
const app = getApp();

Page({

  data: {
    pageSize: 10,
    SearchType: 1,
    pageIndex: 1,
    loading: true
  }, 
  _getIntegralList: function() {
    var self = this
    var data = {
      pageSize: this.data.pageSize,
      SearchType: this.data.SearchType,
      pageIndex: this.data.pageIndex
    }
    wallet.getIntegralList(data, function(res) {
      self.setData({
        itemList: res.data,
        loading: false
      })
    })
  },

  onShow: function() {
    this._getIntegralList()
  },

})