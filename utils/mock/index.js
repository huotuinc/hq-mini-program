/**
 * 首页模拟数据
 */


const goodsItems = [
  {
      title:"[减肥茶月瘦5-30斤]华佗拾遗瘦肚子瘦身产品瘦腿神器正品清脂流茶",
      imgSrc:"http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg",
      goodsPrice: 27.99,/*商品价格*/
      salesVolume: 1800,/*销量价格*/
      couponPrice: 4,/*优惠券价格*/
      finalPrice:23.99,/*最终价格*/
      isFav: false,/*是否收藏*/
      earnMoney: 3.5,/*赚取额度*/
      goodsId: '1' /*商品ID*/
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
  }
]

const categoryItems=[
  {
    title:"热门",
    index:1,
    selected:true,
    child:[]
  },
  {
    title: "护肤",
    index: 2,
    selected: false,
    child: []
  },
  {
    title: "美食",
    index: 3,
    selected: false,
    child: []
  },
  {
    title: "女装",
    index: 4,
    selected: false,
    child: []
  },
  {
    title: "美妆",
    index: 5,
    selected: false,
    child: []
  },
  {
    title: "百货",
    index: 6,
    selected: false,
    child: []
  },
  {
    title: "母婴",
    index: 7,
    selected: false,
    child: []
  },
  {
    title: "水果",
    index: 8,
    selected: false,
    child: []
  },
  {
    title: "电器",
    index: 9,
    selected: false,
    child: []
  },
  {
    title: "运动",
    index: 10,
    selected: false,
    child: []
  },
  {
    title: "手机",
    index: 11,
    selected: false,
    child: []
  }
  
]

module.exports={
  goodsItems: goodsItems,
  categoryItems: categoryItems
};