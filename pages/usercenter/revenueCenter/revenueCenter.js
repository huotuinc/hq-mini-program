var wxCharts = require('../../../utils/wxcharts-min.js');
var app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myprice: {
      "count": 1236,//总累计收益
      "today": 6,//今日预估
      "yesterday": 2,//昨日预估
      "week": 25,//本周预估
      "lastWeek": 56,//上周预估
      "month": 211,//本月预估
      "lastMonth": 688,//上月预估
      "trends": [//走势
        {
          "date": "05/26",//日期
          "value": "1.25",//当日预估钻
        },
        {
          "date": "05/27",//日期
          "value": "1.25",//当日预估钻
        },
        {
          "date": "05/28",//日期
          "value": "1.25",//当日预估钻
        },
        {
          "date": "05/29",//日期
          "value": "1.25",//当日预估钻
        },
        {
          "date": "05/30",//日期
          "value": "1.25",//当日预估钻
        },
        {
          "date": "05/31",//日期
          "value": "1.25",//当日预估钻
        },
        {
          "date": "06/01",//日期
          "value": "1.25",//当日预估钻
        }
      ]
    }
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  createSimulationData: function () {
    var categories = [];
    var data = [];
    var day = this.data.myprice.trends
    for (var i = 0; i < day.length; i++) {
      categories.push(day[i].date);
    }
    return {
      categories: categories,
      data: data
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowWidth = 300;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      series: [{
        name: '本周期',
        data: [1, 0, 0, 2, 2, 2, 0],
        format: function (val, name) {
          return val.toFixed(2);
        }
      }, {
        name: '上周期',
        data: [2, 0, 0, 3, 0, 2, 0],
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})