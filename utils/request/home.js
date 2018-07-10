import config from '../../config.js'
const app = getApp()

var homeRecommend = function(callback) {
  if (typeof callback != 'function') {
    return
  }
  //获取首页推荐
  app.request({
    url: config.homeRecommendUrl,
    method: 'get',
    success: function(res) {
      var list = res.data.list
      var bannerItems = (specialItems = [])
      for (let item in list) {
        if (item.adType == 1) {
          bannerItems.push(item)
        }
        if (item.adType == 2) {
          specialItems.push(item)
        }
      }
      callback({
        bannerItems: bannerItems,
        specialItems: specialItems
      })
    },
    fail: function(error) {
      callback( error)
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
        goodsItems: res.data.list
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
        keys: res.data.keys
      })
    },
    fail: function(error) {
      callback( error)
    }
  })
}

module.exports = {
  homeRecommend: homeRecommend,
  goodsList: goodsList,
  hotSearchKeyWorld: hotSearchKeyWorld
}
