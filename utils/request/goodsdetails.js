import config from '../../config.js'
const app = getApp();

//商品品牌
var goodsBrands = function(callback) {
  app.request({
    url: config.goodsBrands,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//商品分类
var goodsCats = function(callback) {
  app.request({
    url: config.goodsCats,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//商品标签
var goodsTags = function(callback) {
  app.request({
    url: config.goodsTags,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//获取商品详情
var goodsDetails = function(data, callback) {
  app.request({
    url: config.goodsDetails,
    data: data,
    method: "get",
    success: function(res) {      
      var result = res.data;
      if (result.code == 200) {
        var data=result.data
        callback(resolveToDetails(data))
      }
    },
    fail: function(error) {
      callback(error)
    }
  })
}
/**
 * 解析商品详情数据
 */
function resolveToDetails(data){  
  var tags = data.SaleTag || ''
  var item = {
    title: data.Base.Name,
    imgSrc: data.Base.ItemImages,
    BrandName: data.Base.BrandName,
    SubTitle: data.Base.SubTitle || '',
    goodUserPrice: data.UserPrivileges.goodUserPrice,
    goodsPrice: data.Base.Price,
    goodsId: data.Base.GoodsId,
    PicUrl: data.Base.PicUrl,
    DescImgList: data.Base.DescImgList,
    salesVolume: data.Base.SalesCount,
    BN: data.Base.BN,
    SaleTag: tags.split(','),
    Store: data.Base.Store,
    Spec: data.Base.Spec,
    SpecDesc: data.Base.SpecDesc,
    PmtItems: data.Name,
    Products: data.Base.Products
  }

  return item;
}

module.exports = {
  goodsBrands: goodsBrands,
  goodsCats: goodsCats,
  goodsTags: goodsTags,
  goodsDetails: goodsDetails
};