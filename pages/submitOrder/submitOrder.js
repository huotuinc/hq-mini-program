// pages/submitOrder/submitOrder.js
import { authorize} from '../../utils/common.js'
import viewSubmitOrder from '../../utils/viewSubmitOrder.js'
import { orderSubmit, orderCheckout } from '../../utils/request/order.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    orderInfo: {},
    resultAmount:{},
    cashRate:0,//兑换比例    
    chargeCasher:{
      status: false,
      scoreUsed: 0
    },
    payedAdvance:{
      status: false,
      amount:0
    },
    pmtCount:0,
    chooseInvoiceData:{
      title: "无",//抬头税号
      taxNumber: "",//抬头名称
      type: "0"//抬头类型（0：单位，1：个人）
    },    
    pmtSelectData:{
      array:['无'],     
      items:[{
        id:0,
        title:'选择/无可用'
      }], 
      index:0,
      currentSelectedText:"选择/无可用"
    },
    addressData:{

    },
    addressStatus:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var traItems = options.traItems
    var p = {
      traItems: traItems,
      couponCode: '',
      areaCode: ''
    }
    
    orderCheckout(p, function (res) {
      var result = res.data;
      if (result.code == 200) {
        console.log(result.data);
        var _pmtCount=0;
        // if (result.data.PromotionAct != null)
        //   _pmtCount = result.data.PromotionAct.length;
        self.setData({
          orderInfo: result.data,
          pmtCount: _pmtCount,
          loading:false
        })
        //计算应付金额
        var _resultAmount= viewSubmitOrder.calAmount(self.data)

        self.setData({
          resultAmount: _resultAmount
        })

      }
    });

    try {
      var value = wx.getStorageSync('currentAddress')
      if (value) {
        self.setData({
          addressData: value,
          addressStatus: true
        })  
      }
    } catch (e) {
      
    }

  },
  //获取收货地址
  chooseAddress:function(e){
    var self = this;
    authorize("scope.address",function(){
      wx.chooseAddress({
        success: function (res) {
          self.setData({
            addressData:res,
            addressStatus:true
          })  
          try {
            wx.setStorageSync('currentAddress', res)
          } catch (e) {
          }     
        }
      })
    });
  },
  //更改优惠券
  bindPickerChange:function(e){   
    var _index = e.detail.value;
    var _pmtSelectData = this.data.pmtSelectData;
    _pmtSelectData.index=_index;
    _pmtSelectData.currentSelectedText = _pmtSelectData.items[_index].title;
    this.setData({
      pmtSelectData: _pmtSelectData
    })
  }
})