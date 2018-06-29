/**
 * 小程序配置文件
 */
var host = "http://yapi.demo.qunar.com/mock/11987/api"

var config = {
  host,
  // 登录地址
  loginUrl: `${host}/user/LoginByAuthCode`,
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
  //个人中心
  userIndex: `${host}/user/Index`,
  //可/待用积分
  getIntegralList: `${host}/user/GetIntegralList`,
  //设置界面
  setting: `${host}/user/setting`,
  //修改用户基本信息
  updateUserBaseInfo: `${host}/user/updateUserBaseInfo`,
  //更改手机号码
  updateMobile: `${host}/user/updateMobile`,
  //是否开启支付保护
  updatePayPasswordStatus: `${host}/user/updatePayPasswordStatus`,
  //修改支付密码
  updatePayPassword: `${host}/user/updatePayPassword`,
  //我的钱包
  myWallet: `${host}/user/MyWallet`,
  //提现界面
  applyIndex: `${host}/user/ApplyIndex`,
  //提现申请
  applySubmit: `${host}/user/SubmitApply`,
  //提现记录
  applyList: `${host}/user/ApplyList`,
  //提现账户列表
  getaccountlist: `${host}/user/GetAccountList`,
  //编辑提现账户
  editAccount: `${host}/user/EditAccount`,
  //设置默认提现账户 
  setDefaultAccount: `${host}/user/SetDefaultAccount`,
  //订单列表
  getOrderList: `${host}/order/getlist`,
  //订单详情
  orderInfo: `${host}/order/orderinfo`,
  //取消订单
  closeOrder: `${host}/order/closeorder`,
  //删除订单
  deletOrder: `${host}/order/deleteorder`,
  //申请售后
  afterSales: `${host}/aftersales/submit`,
  //售后列表
  getSalesList: `${host}/aftersales/getlist`,
  //提交评论
  submitComment: `${host}comment/submit`,
  //买家留言提交
  saleComment: `${host}/aftersales/comment`,
  //物流提交
  savelogic: `${host}/aftersales/savelogic`,
  //发送验证码
  sendCode: `${host}/user/sendCode`,
  //收货地址管理
  addressList: `${host}/user/addressList`,
  //添加/编辑收货地址
  updateAddress: `${host}/user/updateAddress`,
  //删除收货地址
  deleteAddress: `${host}/user/deleteAddress`,
  //设置默认收货地址
  changeAddressDefault: `${host}/user/changeAddressDefault`
}

module.exports = config