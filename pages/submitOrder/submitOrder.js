import {
  authorize,
  wxpay
} from '../../utils/common.js'
import viewSubmitOrder from '../../utils/viewSubmitOrder.js'
import {
  orderSubmit,
  orderCheckout
} from '../../utils/request/order.js'
import {
  walletaccount,
  enabledCoupons
} from '../../utils/request/user.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    traItems: "", //购买商品信息，格式如：123054_670422_1，多组用竖线分隔开。说明：goodsId_productId_nums
    refermid: 0, //分享引导购买的人id
    memo: "",
    orderInfo: {},
    resultAmount: {},
    cashRate: 100, //兑换比例    
    chargeCasher: {
      status: false,
      amount: 0
    },
    payedAdvance: {
      status: false,
      amount: 0
    },
    chooseInvoiceData: {
      title: "无", //抬头税号
      taxNumber: "", //抬头名称
      type: "0" //抬头类型（0：单位，1：个人）
    },
    pmtCount: 0,
    pmtSelectData: {
      array: ['无'],
      items: [{
        CouponCode: '',
        CouponName: '选择/无可用'
      }],
      index: 0,
      currentSelectedText: "选择/无可用"
    },
    addressData: {},
    addressStatus: false,
    walletData: {}, //钱包数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    var traItems = options.traItems
    self.setData({
      traItems: traItems,
      refermid: options.refermid||0
    })
    //获取用户钱包
    walletaccount(null, function(ret) {
        self.setData({
          walletData: ret.data
        })
    })

  },
  /**获取订单确认数据 */
  checkout: function(p, callback) {
    var self = this;
    orderCheckout(p, function(res) {
      var result = res.data;
      if (result.code == 200) {
        self.setData({
          orderInfo: result.data,
          loading: false
        })
        //计算应付金额
        var _resultAmount = viewSubmitOrder.calAmount(self.data)
        self.setData({
          resultAmount: _resultAmount
        })
        if (typeof callback == 'function')
          callback(result.data.TotalPrice);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var self = this;
    try {
      var value = wx.getStorageSync('address')
      if (value) {
        self.setData({
          addressData: value,
          addressStatus: true
        })
      }
    } catch (e) {}

    self.loadData();
  },
  loadData: function() {
    var self = this;
    var addressData = self.data.addressData;
    var areaCode = "";
    if (addressData != null && addressData.provinceCode && addressData.cityCode && addressData.countyCode) {
      areaCode = addressData.provinceCode + '/' + addressData.cityCode + '/' + addressData.countyCode;
    }
    var pmtSelectData = self.data.pmtSelectData;
    var p = {
      traItems: self.data.traItems,
      couponCode: pmtSelectData.items[pmtSelectData.index].CouponCode,
      areaCode: areaCode
    }
    self.checkout(p, function(totalPrice) {
      if (self.data.pmtCount <= 0) {
        //获取可用优惠券
        enabledCoupons({
          totalPrice: totalPrice
        }, function(ret) {
          if (ret.data.code == 200) {
            var _pmtCount = ret.data.data.length;
            var _pmtSelectData = self.data.pmtSelectData;
            for (var k in ret.data.data) {
              _pmtSelectData.array.push(ret.data.data[k].CouponName);
              _pmtSelectData.items.push(ret.data.data[k]);
            }
            self.setData({
              pmtSelectData: _pmtSelectData,
              pmtCount: _pmtCount
            })
          }
        });
      }

      //重新计算觅豆支付
      var _payedAdvance = self.data.payedAdvance;
      if (_payedAdvance.status) {
        _payedAdvance.status = !_payedAdvance.status;
        _payedAdvance.amount = 0;
        self.setData({
          payedAdvance: _payedAdvance
        })
        self._clickMiBean();
      }

      //重新计算积分支付
      var _chargeCasher = self.data.chargeCasher;
      if (_chargeCasher.status) {
        _chargeCasher.status = !_chargeCasher.status;
        _chargeCasher.amount = 0;
        self.setData({
          chargeCasher: _chargeCasher
        })
        self._clikcScore();
      }

    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  //获取收货地址
  chooseAddress: function(e) {
    if (this.data.loading) return;
    var self = this;

    wx.navigateTo({
      url: '../shipAddress/index',
    })
  },
  //更改优惠券
  bindPickerChange: function(e) {
    if (this.data.loading)return;
    var self = this;
    var _index = e.detail.value;
    var _pmtSelectData = self.data.pmtSelectData;
    _pmtSelectData.index = _index;
    _pmtSelectData.currentSelectedText = _pmtSelectData.items[_index].CouponName;
    self.setData({
      pmtSelectData: _pmtSelectData
    })

    self.loadData();
  },
  /**觅豆支付 */
  _clickMiBean: function() {
    if (this.data.loading) return;
    var self = this;
    var _amount = self.data.walletData.UsefulMiBean;
    if (!_amount || _amount <= 0) return;
    var payedAdvance = self.data.payedAdvance; //觅豆支付
    //如果已经开启积分支付，则关闭
    if (payedAdvance.status) {
      payedAdvance.status = !payedAdvance.status
      payedAdvance.amount = 0;
      self.setData({
        payedAdvance: payedAdvance
      })
      //计算应付金额
      var _resultAmount = viewSubmitOrder.calAmount(self.data)
      self.setData({
        resultAmount: _resultAmount
      })
    } else {
      payedAdvance.status = !payedAdvance.status
      //如果没有开启觅豆支付，则获取应付金额
      var _resultAmount = viewSubmitOrder.calAmount(self.data)
      //获取用户可使用的觅豆
      var _amount = self.data.walletData.UsefulMiBean;
      if (_amount && _amount>0){
        if (_resultAmount.SurplusAmount >= _amount/100) {
          payedAdvance.amount = _amount;
        } else {
          payedAdvance.amount = _resultAmount.SurplusAmount*100;
        }
      }
      payedAdvance.amount = parseFloat(payedAdvance.amount).toFixed(0);
      _resultAmount.SurplusAmount = _resultAmount.SurplusAmount - payedAdvance.amount/100;
      self.setData({
        payedAdvance: payedAdvance,
        resultAmount: _resultAmount
      })
    }
  },
  /**积分支付 */
  _clikcScore: function() {
    if (this.data.loading) return;
    var self = this;

    var _amount = self.data.walletData.UsefulIntegralAmount;
    //获取最高可抵用的积分
    var _TotalCashScoreEnabled = self.orderInfo.TotalCashScoreEnabled/100;
    if (!_amount || _amount<=0)return;
    if (_TotalCashScoreEnabled <= 0) return;
    if (_amount > _TotalCashScoreEnabled){
      _amount = _TotalCashScoreEnabled;
    }

    var chargeCasher = self.data.chargeCasher; //积分支付    
    //如果已经开启积分支付，则关闭
    if (chargeCasher.status) {
      chargeCasher.amount = 0;
      chargeCasher.status = !chargeCasher.status
      self.setData({
        chargeCasher: chargeCasher
      })
      //计算应付金额
      var _resultAmount = viewSubmitOrder.calAmount(self.data)
      self.setData({
        resultAmount: _resultAmount
      })
    } else {
      //如果没有开启积分支付，则获取应付金额
      var _resultAmount = viewSubmitOrder.calAmount(self.data)
      //获取用户可使用的积分等值金额     
      if (_amount && _amount>0){
        if (_resultAmount.SurplusAmount >= _amount) {
          chargeCasher.amount = _amount;
        } else {
          chargeCasher.amount = _resultAmount.SurplusAmount;
        }
      }
      chargeCasher.status = !chargeCasher.status
      _resultAmount.SurplusAmount = _resultAmount.SurplusAmount - chargeCasher.amount;
      self.setData({
        chargeCasher: chargeCasher,
        resultAmount: _resultAmount
      })
    }
  },
  /**
   * 提交订单
   */
  submitOrder: function(e) {
    if (this.data.loading) return;
    var self = this;
    var addressData = self.data.addressData;
    var pmtSelectData = self.data.pmtSelectData;
    var chargeCasher = self.data.chargeCasher; //积分支付 
    var payedAdvance = self.data.payedAdvance; //觅豆支付
    if (!addressData || !addressData.mobile) {
      wx.showToast({
        title: '请选择收货地址',
        icon: "none"
      })
      return;
    }
    var cashScore = 0;
    if (chargeCasher.status) {
      cashScore = (parseFloat(chargeCasher.amount) * self.data.cashRate).toFixed(0);
    }
    var miBean = 0;
    if (payedAdvance.status) {
      miBean = parseInt(payedAdvance.amount);
    }

    var p = {
      shipName: addressData.name,
      shipMobile: addressData.mobile,
      shipAddress: addressData.address,
      shipArea: addressData.province + '/' + addressData.city + '/' + addressData.county,
      shipAreaCode: addressData.provinceCode + '/' + addressData.cityCode + '/' + addressData.countyCode,
      paymentType: 301,
      cashScore: cashScore,
      miBean: miBean,
      couponCode: pmtSelectData.items[pmtSelectData.index].CouponCode,
      memo: self.data.memo,
      refermid: self.data.refermid,
      items: self.data.traItems
    }
    orderSubmit(p, function(ret) {
      var result = ret.data;
      if (result.code == 200) {
        var orderid = result.data.UnionOrderId;
        //剩余需要付的金额，当等于0时，表示已经完全抵用
        var _surplusMoney = result.data.SurplusAmount;
        
        if (_surplusMoney > 0) {
          var _p = {
            timeStamp: result.data.timeStamp,
            nonceStr: result.data.nonceStr,
            package: result.data.package,
            paySign: result.data.paySign
          }
          //发起支付      
          wxpay(_p, function(res) {
            console.log(res);
            if (res.errMsg.indexOf("requestPayment:ok") >= 0) {
              self._goPayResult(orderid, true);
            } else if (res.errMsg.indexOf("requestPayment:fail") >= 0 || res.errMsg.indexOf("requestPayment:cancel") >= 0) {
              //requestPayment:fail:该订单已过期，请重新下单
              var msgs = res.errMsg.split(":");
              wx.showToast({
                title: msgs.length == 3 ? msgs[2] : '支付失败',
                icon: "none"
              })

              self._goPayResult(orderid,false)
            }
          })
        }
        else{
          self._goPayResult(orderid,true)
        }
      }
      else{
        wx.showToast({
          title:'支付失败',
          icon: "none"
        })
      }
    });
  },
  _goPayResult: function (orderid, success){    
    wx.redirectTo({
      url: '../payResult/result?orderid=' + orderid + "&success=" + success,
    })
  }
})