const goodscircleTitle = [
  {
    title: "爆款必发",
    categoryid: 1,
    selected: true,
  },
  {
    title: "圈粉文案",
    categoryid: 2,
    selected: false,
  },
  {
    title: "吃货必备",
    categoryid: 3,
    selected: false,
  },
  {
    title: "清凉一夏",
    categoryid: 4,
    selected: false,
  },
]

const goodsArticle = [
  {
    "goodsId": "6",//商品id
    "head": "http://jinbao.pinduoduo.com/favicon.ico",//发布者头像
    "name": "好卷推手素材号",//发布者名称
    "content": "文章内容 文章内容 文章内容 呀呀呀呀呀呀呀一一一一一一一一一一",//文章内容
    "type": "0",//类型：0图片1视频
    "pictures": [
      { img: "http://t05img.yangkeduo.com/images/2018-05-04/763d35d3060a752f6b296cf0db710094.jpeg" },
      { img: "http://t05img.yangkeduo.com/images/2018-05-04/763d35d3060a752f6b296cf0db710094.jpeg" },
      { img: "http://t05img.yangkeduo.com/images/2018-05-04/763d35d3060a752f6b296cf0db710094.jpeg" },
      { img: "http://t05img.yangkeduo.com/images/2018-05-04/763d35d3060a752f6b296cf0db710094.jpeg" }
    ],//图片列表
    "smallPictures": ["http://x.com/a.jpg", "http://x.com/b.jpg"],//小图地址
    "videos": ["http://x.com/b.mp4", "http://x.com/b1.mp4"],//视频列表
    "time": "21分钟前",//发布时间
    "turnAmount": "108",//转发次数
    "reward": "2.98",//分享赚可得钻
    "linkUrl": "http://linkurl121212",//转链接地址
  },
  {
    "goodsId": "7",//商品id
    "head": "http://jinbao.pinduoduo.com/favicon.ico",//发布者头像
    "name": "好卷推手素材号",//发布者名称
    "content": "文章内容 文章内容 文章内容 呀呀呀呀呀呀呀一一一一一一一一一一",//文章内容
    "type": "0",//类型：0图片1视频
    "pictures": [
      { img: "http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg" },
      { img: "http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg" },
      { img: "http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg" },
      { img: "http://t00img.yangkeduo.com/t05img/images/2018-05-29/af95c46dc07e8a0a74d2cbf800fbd07d.jpeg" }
    ],//图片列表
    "smallPictures": ["http://x.com/a.jpg", "http://x.com/b.jpg"],//小图地址
    "videos": ["http://x.com/b.mp4", "http://x.com/b1.mp4"],//视频列表
    "time": "21分钟前",//发布时间
    "turnAmount": "108",//转发次数
    "reward": "2.98",//分享赚可得钻
    "linkUrl": "http://linkurl121212",//转链接地址
  }
]

module.exports = {
  goodscircleTitle: goodscircleTitle,
  goodsArticle: goodsArticle
};
