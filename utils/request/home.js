import config from '../../config.js'
const app = getApp()

var homeRecommend = function(callback) {
  //获取首页推荐
  app.request({
    url: config.homeRecommendUrl,
    success: function(res) {
      var list = res.data.list || ''
      var bannerItems = []
      var specialItems = []
      for (let idx in list) {
        if (list[idx].adType == 1) {
          bannerItems.push(list[idx])
        }
        if (list[idx].adType == 2) {
          specialItems.push(list[idx])
        }
      }
      callback({
        bannerItems: bannerItems,
        specialItems: specialItems
      })
    },
    fail: function(error) {
      callback(error)
    }
  })
}

//获取商品列表
var goodsList = function(data, callback) {
  app.request({
    url: config.goodsListUrl,
    data: data,
    success: function(res) {
      callback({
        goodsItems: res.data.data.Rows
      })
    },
    fail: function(error) {
      callback(error)
    }
  })
}

//热门搜索关键字
var hotSearchKeyWorld = function(callback) {
  app.request({
    url: config.hotsearchkeyworld,
    success: function(res) {
      callback({
        data: res.data
      })
    },
    fail: function(error) {
      callback(error)
    }
  })
}

//预览小店
var storeInfo = function(callback){
  app.request({
    url: config.storeInfo,
    success: function (res) {
      callback({
        data: res.data
      })
    },
    fail: function (error) {
      callback(error)
    }
  })
}

module.exports = {
  homeRecommend: homeRecommend,
  goodsList: goodsList,
  hotSearchKeyWorld: hotSearchKeyWorld,
  storeInfo: storeInfo
}