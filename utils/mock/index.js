/**
 * 首页模拟数据
 */
const hotItems = [
  {
    title: "好牙口 益生菌凝胶糖果（薄荷味无糖型）",
    imgSrc: "http://res.chinaswt.cn//resource/images/photo/8529/20180612/201806121823081.jpg",
    goodsPrice: 27.99,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 4,/*优惠券价格*/
    finalPrice: 23.99,/*最终价格*/
    isFav: false,/*是否收藏*/
    earnMoney: 3.5,/*赚取额度*/
    goodsId: '1127878416' /*商品ID*/
  },
  {
    title: "【胡庆余堂】蜂胶胶囊 0.38g/粒*12粒*8盒",
    imgSrc: "http://res.chinaswt.cn//resource/images/photo/8529/20180607/201806071614470.jpg",
    goodsPrice: 26.9,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 8,/*优惠券价格*/
    finalPrice: 18.9,/*最终价格*/
    isFav: true,/*是否收藏*/
    earnMoney: 5.26,/*赚取额度*/
    goodsId: '1039919965' /*商品ID*/
  }
]

const goodsItems = [
  {
    "Name": "好牙口 益生菌凝胶糖果（薄荷味无糖型）",
    "PicUrl": "http://res.chinaswt.cn//resource/images/photo/8529/20180612/201806121823081.jpg",
    "CatId": "1",
    "Price": "27.99",
    "MktPrice": "49.9",
    "EarnMiBean": "4",
    "finalPrice": "23.99",
    "isFav": "false",
    "EarnIntegral": "3.5",
    "goodsId": "1127878416",
    "Store": "1350",
    "Sales": "13051"
  },
  {
    "Name": "【胡庆余堂】蜂胶胶囊 0.38g/粒*12粒*8盒",
    "PicUrl": "http://res.chinaswt.cn//resource/images/photo/8529/20180607/201806071614470.jpg",
    "CatId": "1",
    "Price": "27.99",
    "MktPrice": "49.9",
    "EarnMiBean": "4",
    "finalPrice": "23.99",
    "isFav": "false",
    "EarnIntegral": "3.5",
    "goodsId": "1127878416",
    "Store": "1350",
    "Sales": "13051"
  },
  {
    "Name": "【胡庆余堂】青春宝冰糖蜂蜜雪梨膏 家庭量贩装 130g*6瓶HQ",
    "PicUrl": "http://res.chinaswt.cn//resource/images/photo/8529/20180607/201806071631360.jpg",
    "CatId": "1",
    "Price": "27.99",
    "MktPrice": "49.9",
    "EarnMiBean": "4",
    "finalPrice": "23.99",
    "isFav": "false",
    "EarnIntegral": "3.5",
    "goodsId": "1127878416",
    "Store": "1350",
    "Sales": "13051"
  },
  {
    "Name": "【胡庆余堂】青春宝冰糖即食燕窝70g*3瓶 礼盒装 30%固形物 可溯源 HQ",
    "PicUrl": "http://res.chinaswt.cn//resource/images/photo/8529/20180607/201806071653150.jpg",
    "CatId": "1",
    "Price": "27.99",
    "MktPrice": "49.9",
    "EarnMiBean": "4",
    "finalPrice": "23.99",
    "isFav": "false",
    "EarnIntegral": "3.5",
    "goodsId": "1127878416",
    "Store": "1350",
    "Sales": "13051"
  },
  {
    "Name": "【胡庆余堂】铁皮枫斗晶 3g/袋*6袋*6盒",
    "PicUrl": "http://res.chinaswt.cn//resource/images/photo/8529/20180607/201806071637590.jpg",
    "CatId": "1",
    "Price": "27.99",
    "MktPrice": "49.9",
    "EarnMiBean": "4",
    "finalPrice": "23.99",
    "isFav": "false",
    "EarnIntegral": "3.5",
    "goodsId": "1127878416",
    "Store": "1350",
    "Sales": "13051"
  },
  {
    "Name": "【胡庆余堂】捷净海参礼盒 26克 12只装 食用方便",
    "PicUrl": "http://res.chinaswt.cn//resource/images/photo/8529/20180607/201806071645480.jpg",
    "CatId": "1",
    "Price": "27.99",
    "MktPrice": "49.9",
    "EarnMiBean": "4",
    "finalPrice": "23.99",
    "isFav": "false",
    "EarnIntegral": "3.5",
    "goodsId": "1127878416",
    "Store": "1350",
    "Sales": "13051"
  }
]

const categoryItems = [
  {
    title: "热门",
    categoryid: 1,
    child: []
  },
  {
    title: "护肤",
    categoryid: 2,
    child: []
  },
  {
    title: "美食",
    categoryid: 3,
    child: [
      {
        title: "休闲食品",
        categoryid: 3,
        imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
      },
      {
        title: "坚果果干",
        categoryid: 3,
        imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
      },
      {
        title: "地方特产",
        categoryid: 3,
        imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
      },
      {
        title: "糕点饼干",
        categoryid: 3,
        imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
      }
    ]
  },
  {
    title: "女装",
    categoryid: 4,
    child: []
  },
  {
    title: "美妆",
    categoryid: 5,
    child: []
  },
  {
    title: "百货",
    categoryid: 6,
    child: []
  },
  {
    title: "母婴",
    categoryid: 7,
    child: []
  },
  {
    title: "水果",
    categoryid: 8,
    child: []
  },
  {
    title: "电器",
    categoryid: 9,
    child: []
  },
  {
    title: "运动",
    categoryid: 10,
    child: []
  },
  {
    title: "手机",
    categoryid: 11,
    child: []
  }

]


const bannerItems = [
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122291528031200.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061917525740197433.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122285219979025.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122285813464489.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122290301580382.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122290910920995.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122291528031200.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  }
]

const specialItems = [
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122300446226128.jpg",
    linkdata: "javascript:void(0)",
    linktype: "0"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122301160858603.jpg",
    linkdata: "javascript:void(0)",
    linktype: "202810284"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  },
  {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122302812271737.jpg",
    linkdata: "javascript:void(0)",
    linktype: "202810284"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  }, {
    pictureUrl: "http://res.chinaswt.cn/resource/images/photo/8529/2018061122303407271926.jpg",
    linkdata: "javascript:void(0)",
    linktype: "202810284"//链接类型：0：商品详情 1：商品列表 2：主题商品列表
  }
]

module.exports = {
  hotItems: hotItems,
  goodsItems: goodsItems,
  categoryItems: categoryItems,
  bannerItems: bannerItems,
  specialItems: specialItems
};