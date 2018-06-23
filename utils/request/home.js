import config from '../../config.js'
const app = getApp();



var homeRecommend = function (callback) {
  if (typeof callback != 'function') {
    return;
  }
  //获取首页推荐
  app.request({
    url: config.homeRecommendUrl,
    method:'get',
    success: function (res) {
      if (res.data.code == 200) {
        var list = res.data.list
        var bannerItems = specialItems = [];
        for (let item in list) {
          if (item.adType == 1) {
            bannerItems.push(item);
          }
          if (item.adType == 2) {
            specialItems.push(item)
          }
        }
        callback(true, {
          bannerItems: bannerItems,
          specialItems: specialItems,
        })
      }
      else {
        wx.showToast({
          title: res.msg
        })
      }
    },
    fail: function (error) {
      callback(false, error)
    }
  })
}
//获取商品列表
var goodsList = function (data, callback) {
  app.request({
    url: config.goodsListUrl,
    data: data,
    success: function (res) {
      if (res.data.code == 200) {
        callback(true, {
          goodsItems: res.data.list
        })
      }
    },
    fail: function (error) {
      callback(false, error)
    }
  })
}

//热门搜索关键字
var hotSearchKeyWorld = function (callback) {
  app.request({
    url: config.hotsearchkeyworld,
    success: function (res) {
      callback(true, {
        keys: res.data.keys
      })
    },
    fail: function (error) {
      callback(false, error)
    }
  })
}



module.exports = {
  homeRecommend: homeRecommend,
  goodsList: goodsList,
  hotSearchKeyWorld: hotSearchKeyWorld
};