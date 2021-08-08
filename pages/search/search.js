const app = getApp()
var news = require("../../utils/news.js")
// var WxSearch = require('../../wxSearchView/wxSearchView.js');
// var food = require("../../utils/food.js");

Page({

  data: {
    show: false,
    num:10,

    //点击搜索时候加载
    articles:[],

    //自定义导航栏相关
    ph:"请输入关键字",
    navBarHeight:"50"
  },

  //搜索
  dosearch(e){
    var that = this
    var keyword = e.detail.keyword
    var param = {'keyword':keyword}
    news.search(param, function(data){
      that.setData({
        articles:data.articles
      })
    })
    // console.log(that.data.articles)
  },

  onLoad: function () {
    // 2 搜索栏初始化
    var that = this;
    // WxSearch.init(
    //   that,  // 本页面一个引用
    //   ['红烧排骨', '可乐鸡翅', "白菜","可乐","西兰花" ], // 热点搜索推荐，[]表示不使用
    //   ['红烧排骨', '可乐鸡翅', "白菜", "可乐", "西兰花"],// 搜索匹配，[]表示不使用
    //   that.mySearchFunction, // 提供一个搜索回调函数
    //   that.myGobackFunction //提供一个返回回调函数
    // );


    that.setData({
      //自定义导航栏相关
      navBarHeight:app.globalData.navBarHeight
    })

  },

  // 3 转发函数，固定部分，直接拷贝即可
  // wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  // wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  // wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  // wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  // wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  // mySearchFunction: function (value) {
  //   var that=this;
  //   this.setData({
  //     num: 10,
  //     value:value
  //   })
  //   // do your job here
  //   console.log(value)
  //   wx.showLoading({ title: '加载中…', duration: 10000 })
  //   food.getFoodByName(value,that.data.num,function(foodList){
  //     that.setData({
  //       foodList:foodList,
  //       show:true
  //     })
  //     wx.hideLoading();
  //   })
  // },

  // 5 返回回调函数
  // myGobackFunction: function () {
  //   // do your job here
  //   console.log('回调函数')
  // },
  /**
 * 页面上拉触底事件的处理函数
 */
  // onReachBottom: function () {
  //   var num=this.data.num+10
  //   this.setData({
  //     num:num
  //   })
  //   var that=this;
  //   console.log(num)
  //   wx.showLoading({ title: '加载中…', duration: 10000 })
  //   food.getFoodByName(that.data.value, that.data.num, function (foodList) {
  //     that.setData({
  //       foodList: foodList,
  //       show: true
  //     })
  //     wx.hideLoading();
  //   })
  // },

})