var viewDataResponsity = {
  viewDatas: null,
  listForPrice: [],
  listForIntegral: [],
  goodPrice:0,
  goodUserPrice: 0,
  goodUserIntegral: 0,
  goodCashScore: 0, //可抵用积分    
  goodEnableMinBuy: 0, //启用最低购买  1-->开启  判断是否开启最低起售开关*/
  goodMinBuyCount: 1, //最低购买数量  
  init: function(data) {
    this.viewDatas = data;
    this.goodPrice=data.Base.Price;
    this.listForIntegral = data.UserPrivileges.listForIntegral;
    this.listForPrice = data.UserPrivileges.listForPrice;
    this.goodUserPrice = data.UserPrivileges.goodUserPrice;
    this.goodUserIntegral = data.UserPrivileges.goodUserIntegral;

    /*判断是否开启最低起售开关*/
    this.goodMinBuyCount = this.viewDatas.Base.MinBuyCount;
    this.goodEnableMinBuy = this.viewDatas.Base.EnableMinBuy;
  },
  /**
   * 根据规格，得到选择的货品
   */
  getSelectProduct: function(props, specCount) {
    var Products = this.viewDatas.Base.Products;
    var selectProduct = null;
    for (var i in Products) {
      var count = 0;
      var item = Products[i];
      for (var x in item.Props) {
        var proItem = item.Props[x];
        if (props[proItem.SpecId] != null) {
          if (props[proItem.SpecId].SpecId == proItem.SpecId && props[proItem.SpecId].SpecValueId == proItem.SpecValueId) {
            count++;
          }
        }
      }
      if (count == specCount) {
        selectProduct = item;
      }
    }
    return selectProduct;
  },
  /**
   * 获取货品价格
   */
  getUserPrice: function(productid) {    
    var price = -1;
    if (this.listForPrice.length <= 0)
      price= -1;
    else {      
      for (var k in this.listForPrice) {
        var item = this.listForPrice[k];
        if (productid == item.ProductID) {
          if (item.Value != null)
            price = item.Value;
          break;
        }
      }
    }

    if (price==-1) {
      price = this.goodUserPrice
      if (price < 0)
        price = this.goodPrice;

    }
    return price;
  }
}

module.exports = viewDataResponsity