/**
 * 首页模拟数据
 */
const hotItems = [
  {
    title: "[减肥茶月瘦5-30斤]华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶",
    imgSrc: "http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg",
    goodsPrice: 27.99,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 4,/*优惠券价格*/
    finalPrice: 23.99,/*最终价格*/
    isFav: false,/*是否收藏*/
    earnMoney: 3.5,/*赚取额度*/
    goodsId: '1127878416' /*商品ID*/
  },
  {
    title: "【24包超值装 】沐曦原生木浆抽取式孕婴面巾纸300张/包",
    imgSrc: "http://t05img.yangkeduo.com/images/2018-05-04/763d35d3060a752f6b296cf0db710094.jpeg",
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
    title: "[减肥茶月瘦5-30斤]华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶",
    imgSrc: "http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg",
    goodsPrice: 27.99,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 4,/*优惠券价格*/
    finalPrice: 23.99,/*最终价格*/
    isFav: true,/*是否收藏*/
    earnMoney: 3.5,/*赚取额度*/
    goodsId: '1127878416' /*商品ID*/
  },
  {
    title: "【24包超值装 】沐曦原生木浆抽取式孕婴面巾纸300张/包",
    imgSrc: "http://t05img.yangkeduo.com/images/2018-05-04/763d35d3060a752f6b296cf0db710094.jpeg",
    goodsPrice: 26.9,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 8,/*优惠券价格*/
    finalPrice: 18.9,/*最终价格*/
    isFav: false,/*是否收藏*/
    earnMoney: 5.26,/*赚取额度*/
    goodsId: '1039919965' /*商品ID*/
  },
  {
    title: "【最伽人正品,93%涤纶】泳衣女连体韩版学生性感显瘦保守游泳衣",
    imgSrc: "http://t00img.yangkeduo.com/t07img/images/2018-05-28/3da2b417d2860b1fd22472ebf4781576.jpeg",
    goodsPrice: 25.9,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 2,/*优惠券价格*/
    finalPrice: 23.9,/*最终价格*/
    isFav: false,/*是否收藏*/
    earnMoney: 4.25,/*赚取额度*/
    goodsId: '452068537' /*商品ID*/
  },
  {
    title: "【俞兆林】100%纯棉档内裤女无痕内裤棉质女士抗菌内裤5/7条装",
    imgSrc: "http://t10img.yangkeduo.com/images/2018-04-10/6d82ed69d83ef31aa75add650ab1e27e.jpeg",
    goodsPrice: 19.9,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 3,/*优惠券价格*/
    finalPrice: 16.9,/*最终价格*/
    isFav: true,/*是否收藏*/
    earnMoney: 6.76,/*赚取额度*/
    goodsId: '685092301' /*商品ID*/
  },
  {
    title: "芭黎公鸡男外套韩版潮男士夹克修身情侣薄夏季防晒衣100%聚酯纤维",
    imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
    goodsPrice: 18.9,/*商品价格*/
    salesVolume: 1800,/*销量价格*/
    couponPrice: 5,/*优惠券价格*/
    finalPrice: 13.9,/*最终价格*/
    isFav: false,/*是否收藏*/
    earnMoney: 4.17,/*赚取额度*/
    goodsId: '202810284' /*商品ID*/
  }
]

const categoryItems = [
  {
    title: "热门",
    categoryid: 1,
    selected: true,
    child: []
  },
  {
    title: "护肤",
    categoryid: 2,
    selected: false,
    child: []
  },
  {
    title: "美食",
    categoryid: 3,
    selected: false,
    child: [
      {
        title: "休闲食品",
        categoryid: 3,
        selected: false,
        imgSrc:"http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",        
      },
      {
        title: "坚果果干",
        categoryid: 3,
        selected: false,
        imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
      },
      {
        title: "地方特产",
        categoryid: 3,
        selected: false,
        imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
      },
      {
        title: "糕点饼干",
        categoryid: 3,
        selected: false,
        imgSrc: "http://t09img.yangkeduo.com/images/2018-04-09/6556e60f300886c378c421e87c14308b.jpeg",
      }
    ]
  },
  {
    title: "女装",
    categoryid: 4,
    selected: false,
    child: []
  },
  {
    title: "美妆",
    categoryid: 5,
    selected: false,
    child: []
  },
  {
    title: "百货",
    categoryid: 6,
    selected: false,
    child: []
  },
  {
    title: "母婴",
    categoryid: 7,
    selected: false,
    child: []
  },
  {
    title: "水果",
    categoryid: 8,
    selected: false,
    child: []
  },
  {
    title: "电器",
    categoryid: 9,
    selected: false,
    child: []
  },
  {
    title: "运动",
    categoryid: 10,
    selected: false,
    child: []
  },
  {
    title: "手机",
    categoryid: 11,
    selected: false,
    child: []
  }

]


const bannerItems = [
  {
    imgSrc: "http://t00img.yangkeduo.com/t08img/images/2018-05-30/b05e45e46e357b6021cfaeae9780d44f.jpeg",
    link: "javascript:void(0)",
    type: "goods-list",/**goods-details,goods-list,h5 */
    goodsId: '202810284'
  },
  {
    imgSrc: "http://t00img.yangkeduo.com/t11img/images/2018-05-29/ce9c66dcbb5e1cf1f906a81db4379519.jpeg",
    link: "javascript:void(0)",
    type: "goods-list",/**goods-details,goods-list,h5 */
    goodsId: '202810284'
  },
  {
    imgSrc: "http://t00img.yangkeduo.com/t08img/images/2018-05-29/349088138d0a2d79f5977e34166d8ed9.jpeg",
    link: "javascript:void(0)",
    type: "goods-list",/**goods-details,goods-list,h5 */
    goodsId: '202810284'
  }
]

const specialItems=[
  {
    imgSrc: "https://cdn.pinduoduo.com/assets/img/pdd_global_haitao_v1.jpg",
    link: "javascript:void(0)",
    type: "goods-list",/**goods-details,goods-list,h5 */
    goodsId: '202810284'
  },
  {
    imgSrc: "https://cdn.pinduoduo.com/assets/img/pdd_brand_sale_v1.jpg",
    link: "javascript:void(0)",
    type: "goods-list",/**goods-details,goods-list,h5 */
    goodsId: '202810284'
  },
  {
    imgSrc: "https://cdn.pinduoduo.com/assets/img/pdd_super_spike_v1.jpg",
    link: "javascript:void(0)",
    type: "goods-list",/**goods-details,goods-list,h5 */
    goodsId: '202810284'
  }, {
    imgSrc: "https://cdn.pinduoduo.com/assets/img/pdd_fresh_fruit_v1.jpg",
    link: "javascript:void(0)",
    type: "goods-list",/**goods-details,goods-list,h5 */
    goodsId: '202810284'
  }
]

module.exports = {
  hotItems: hotItems,
  goodsItems: goodsItems,
  categoryItems: categoryItems,
  bannerItems: bannerItems,
  specialItems: specialItems
};