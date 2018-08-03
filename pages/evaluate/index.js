 import order from '../../utils/request/order.js'
 const app = getApp();
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     count: 1,
     starData: {
       starSelect: 0,
       star: 5
     },
     imgs: [],
     imageList: []
   },
   //输入评论
   _getInputMessage: function(e) {
     this.setData({
       content: e.detail.value
     })
   },

   //星星等级
   starComment: function(e) {
     var imgItem = e.currentTarget.dataset.imgitem;
     var starId = e.currentTarget.dataset.id;
     var starData = this.data.starData;
     if (imgItem == "starActive") {
       starData.starSelect = Number(starId);
       starData.star = 5 - starData.starSelect;
       this.setData({
         starData: starData
       })
     } else {
       starData.starSelect = Number(starId) + starData.starSelect;
       starData.star = 5 - starData.starSelect;
       this.setData({
         starData: starData
       })
     }
   },
   //上传图片
   chooseImage: function() {
     var that = this
     var imgList = []
     var img = []
     wx.chooseImage({
       count: this.data.count,
       success: function(res) {
         var tempFilePaths = res.tempFilePaths
         if (tempFilePaths.length == 1) {
           app.uploadFile(tempFilePaths[0], function(req) {
             var data = JSON.parse(req.data)
             that.setData({
               fullUrl: data.data.fullUrl,
               tempFilePaths: tempFilePaths[0]
             })
             imgList.push(tempFilePaths[0].toString())
             img.push(data.data.fullUrl)
             that.data.imageList = imgList.concat(that.data.imageList)
             that.data.imgs = img.concat(that.data.imgs)
             that.setData({
               imgLists: that.data.imageList
             })
           })
         } else {
           wx.showToast({
             title: '单次只能上传一张图片',
             icon: 'none'
           })
         }
       }
     })
   },

   //提交评论
   _submitEvaluate: function(e) {
     var productId = this.data.goodsOrder.productId
     var orderId = this.data.goodsOrder.orderId
     var goodsId = this.data.goodsOrder.goodsId
     var score = this.data.starData.starSelect
     var content = this.data.content
     var imgs = this.data.imgs
     if (!content) {
       wx.showToast({
         title: '请输入您的评价',
         icon: 'none'
       })
       return
     }
     if (score == 0) {
       wx.showToast({
         title: '请给该商品打分',
         icon: 'none'
       })
       return
     }
     order.submitEvaluate({
       productId: productId,
       orderId: orderId,
       goodsId: goodsId,
       content: content,
       imgs: imgs.join(",") || '',
       score: score
     }, function(res) {
       wx.showToast({
         title: '提交成功',
       })
       wx.navigateBack({
         delta: 1
       })
     })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     var self = this
     wx.getStorage({
       key: 'goodsOrder',
       success: function(res) {
         self.setData({
           goodsOrder: res.data
         })
       },
     })
   },
 })