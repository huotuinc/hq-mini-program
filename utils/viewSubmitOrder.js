var  viewSubmitOrder= {
  AMOUNTKEY: {
    TotalAmount: 'TotalAmount',
    CashScoreAmount: 'CashScoreAmount',
    PayedAdvance: 'PayedAdvance',
    ShipAmount: 'ShipAmount',
    PmtAmount: 'PmtAmount',
  },
  calSurplusAmount: function(amountObj, exclusiveKey) {
    var amountObjCopy = {};
    for (var p in amountObj) {
      amountObjCopy[p] = amountObj[p];
    }

    if (typeof(exclusiveKey) != 'undefined') { //排除在外
      if (amountObjCopy[exclusiveKey]) {
        amountObjCopy[exclusiveKey] = null;
        delete amountObjCopy[exclusiveKey];
      }
    }

    var resultAmount = amountObjCopy['TotalAmount'];
    var _CashScoreAmount = amountObjCopy['CashScoreAmount'];
    var _PayedAdvance = amountObjCopy['PayedAdvance'];
    var _ShipAmount = amountObjCopy['ShipAmount'];
    var _PmtAmount = amountObjCopy['PmtAmount'];

    if (_CashScoreAmount) {
      resultAmount -= _CashScoreAmount;
    }
    if (_PayedAdvance) {
      resultAmount -= _PayedAdvance;
    }
    if (_ShipAmount) {
      resultAmount += _ShipAmount;
    }
    if (_PmtAmount) {
      resultAmount -= _PmtAmount;
    }
    return resultAmount;
  },

  /**剩余金额等计算 */
  calAmount:function(data){
    var _cashRate = data.cashRate;
    var payedAdvance = data.payedAdvance;//余额支付
    var chargeCasher = data.chargeCasher;//积分支付
    var _totalAmount = data.orderInfo.TotalPrice;
    var _cashScoreAmount = 0, _payedAdvance = 0, _shipAmount=0;
    var _pmtAmount = data.orderInfo.TotalPmtAmount;//总优化金额
    var _promotionpmtamount = data.orderInfo.PromotionPmtAmount;
    //是否使用积分支付
    if (chargeCasher.status) {
      var _cashScore = chargeCasher.scoreUsed;
      _cashScoreAmount = (_cashScore * _cashRate).toFixed(2);
    }
    //是否使用余额支付
    if (payedAdvance.status) {
      _payedAdvance = payedAdvance.amount;
    }
    //是否有运费
    //
    // if (payedAdvance.getshipStatus() != "0") {
    //   _shipAmount = parseFloat(payedAdvance.getshipmoney());
    // }
    // if (_shipAmount == 0) {
    //   _shipAmount = parseFloat(payedAdvance.getshipmoney());
    // }


    //总优化金额
    var _totalpmtAmount = parseFloat(_pmtAmount);

    var resultAmount = {
      PromotionPmtAmount: _promotionpmtamount,
      TotalAmount: _totalAmount,
      CashScoreAmount: _cashScoreAmount,
      PayedAdvance: _payedAdvance,
      SurplusAmount: 0,
      ShipAmount: _shipAmount,
      PmtAmount: _totalpmtAmount.toFixed(2)
    }    
    var _surplusAmount = viewSubmitOrder.calSurplusAmount(resultAmount).toFixed(2);
    resultAmount.SurplusAmount = _surplusAmount;

    return resultAmount;
  }
}


module.exports= viewSubmitOrder;