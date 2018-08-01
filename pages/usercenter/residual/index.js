import config from '../../../config.js'
import wallet from '../../../utils/request/user.js'
const app = getApp();

Page({
  data: {
    pageSize: 10,
    SearchType: 0,
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
      var data = res.data
      for (let idx in data.Items) {
        data.Items[idx].ChangeIntegral = (data.Items[idx].ChangeIntegral) / 100
      }
      data.SumExportIntegral = (data.SumExportIntegral) / 100
      data.SumImportIntegral = (data.SumImportIntegral) / 100
      self.setData({
        itemList: data,
        loading: false
      })
    })
  },
  onShow: function() {
    this._getIntegralList()
  }
})