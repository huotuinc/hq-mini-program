/**
 * 小程序配置文件
 */
var host = "https://localhost/api"

var config={
  host,

  // 登录地址
  loginUrl: `${host}/login`,
  // 首页推荐
  homeRecommendUrl: `${host}/goods/recommend`,
  // 商品列表
  goodsListUrl: `${host}/goods/list`,
  // 商品类目
  categoryUrl: `${host}/goods/category`,
  // 商品连接
  goodsDetailsUrl: `${host}/goods/category`,
  //添加收藏
  favoriteUrl: `${host}/user/favorite`,
  //删除收藏
  favoriteDeleteUrl: `${host}/user/favoriteDelete`,
  //我的收藏
  favoriteListUrl: `${host}/user/favoriteList`,
  //搜索商品
  searchGoods: `${host}/goods/search`,
  //热门搜索关键字
  hotsearchkeyworld: `${host}/goods/hotsearchkeyworld`,
  //商品详情
  goodsDetails: `${host}/goods/details`,
  //我的团队
  myTeams:`${host}/user/myTeams`,
  //我的收益
  myProfit: `${host}/user/myProfit`,
  //意见反馈
  saveFeedBack: `${host }/user/saveFeedBack`
}

module.exports = config