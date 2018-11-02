/**
 * 小程序配置文件
 */
// var host = 'http://yapi.demo.qunar.com/mock/11987/api'
//var host = "https://mfapi.mifang8.com"
var host ="https://mfapi.haoqu.com.cn"

var config = {
  host,
  // 登录地址
  loginUrl: `${host}/user/loginByAuthCode`,
  //修改用户信息
  updateUserInfo: `${host}/user/updateUserInfo`,
  //判断Token是否过期
  appInit: `${host}/user/appInit`,
  // 首页推荐
  homeRecommendUrl: `${host}/other/recommend`,
  // 商品列表
  goodsListUrl: `${host}/goods/list`,
  // 商品类目
  categoryUrl: `${host}/goods/category`,
  // 商品连接
  goodsDetailsUrl: `${host}/goods/detail`,
  //商品品牌
  goodsBrands: `${host}/goods/brands`,
  //商品标签
  goodsTags: `${host}/goods/tags`,
  //商品分类
  goodsCats: `${host}/goods/cats`,
  //添加/删除收藏
  addCollection: `${host}/user/addCollection`,
  //我的收藏
  myCollection: `${host}/user/myCollection`,

  //热门搜索关键字
  hotsearchkeyworld: `${host}/goods/GetHotKeyWord`,
  //商品详情
  goodsDetails: `${host}/goods/detail`,
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
  //验证码检测
  checkCode: `${host}/user/checkCode`,
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
  //删除提现账号
  delAccount: `${host}/user/DelAccount`,
  //订单列表
  getOrderList: `${host}/user/orderList`,
  //订单详情
  orderDetail: `${host}/user/orderDetail`,
  //取消订单
  closeOrder: `${host}/user/closeOrder`,
  //删除订单
  deletOrder: `${host}/user/deleteOrder`,
  //确认收货
  confirmOrder: `${host}/user/confirmOrder`,
  //订单确认
  checkoutOrder: `${host}/order/checkout`,
  //申请售后
  afterSales: `${host}/user/applyAfterSale`,
  //获取申请售后
  getApplyAfterSale: `${host}/user/getApplyAfterSale`,
  //售后列表
  getSalesList: `${host}/user/afterSaleList`,
  //售后详情
  afterSaleDetail: `${host}/user/afterSaleDetail`,
  //取消售后
  cancelAfterSale: `${host}/user/cancelAfterSale`,
  //提交物流信息
  submitLogistics: `${host}/user/submitLogistics`,
  //提交评论
  submitComment: `${host}/user/comment`,
  //评论列表
  commentList: `${host}/user/commentList`,
  //评论点赞
  commentLike: `${host}/user/commentLike`,
  //买家留言提交
  saleComment: `${host}/user/leaveMessage`,
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
  changeAddressDefault: `${host}/user/changeAddressDefault`,

  //购物车
  //获取购物车
  getCart: `${host}/cart/get`,
  //购物车添加
  addCart: `${host}/cart/add`,
  //购物车修改
  updateCart: `${host}/cart/update`,
  //购物车删除
  removeCart: `${host}/cart/remove`,
  //购物车批量删除
  batchremove: `${host}/cart/batchremove`,
  //购物车批量选中
  batchcheck: `${host}/cart/batchcheck`,
  //支付订单
  payOrder: `${host}/Order/AgainPayOrder`,
  //订单确认
  checkout: `${host}/order/checkout`,
  //订单提交
  submit: `${host}/order/submit`,
  //用户钱包账户
  walletaccount: `${host}/user/walletaccount`,
  //获取可用优惠券
  enabledCoupons: `${host}/user/GetEnabledCoupons`,
  //获取觅豆
  getMiBeanList: `${host}/user/GetMiBeanList`,
  //支付密码判断
  judgePayWord: `${host}/user/JudgePayWord`,
  //预览小店
  storeInfo: `${host}/store/info`,
  //图片上传
  uploadPicture: `${host}/other/uploadPicture`
}

module.exports = config