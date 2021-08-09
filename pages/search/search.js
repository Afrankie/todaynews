const app = getApp()
var news = require("../../utils/news.js")
var cache = require("../../utils/cache.js")
// var WxSearch = require('../../wxSearchView/wxSearchView.js');
// var food = require("../../utils/food.js");

Page({

  data: {
    show: false,
    num:10,
    
    //点击搜索按钮时候加载
    articles:[],

    //自定义导航栏相关
    ph:"请输入关键字",
    navBarHeight:"50",

    //搜索记录本地缓存相关
    cache_keywords:[],
    cache_key:'search',
    cache_size:10,
    zhanwei_count:0,
    history_show:true,
  },

  _dosearch(keyword){
    var that = this
    var param = {'keyword':keyword}
    news.search(param, function(data){
      that.setData({
        articles:data.articles,
        history_show:false
      })
    })
  },

  //搜索
  dosearch(e){
    var that = this
    var keyword = e.detail.keyword
    that._dosearch(keyword)

    var cache_key = that.data.cache_key
    cache.push(cache_key, keyword)
  },

  

  historySearch(e){
    var that = this
    var keyword = e.currentTarget.dataset.text
    that._dosearch(keyword)
  },

  onLoad: function () {
    var that = this;
    // 获取搜索缓存
    var cache_key = that.data.cache_key
    var cache_size = that.data.cache_size
    var cache_keywords = cache.getCache(cache_key)

    //当历史记录条数为奇数时，填充空白view，让页面布局稳定
    var zhanwei_count = 0
    if (cache_keywords.length % 2 != 0){
      zhanwei_count = 1
    }
    cache.initCache(cache_key, cache_size)

    that.setData({
      //自定义导航栏相关
      navBarHeight:app.globalData.navBarHeight,
      cache_keywords:cache_keywords,
      zhanwei_count:zhanwei_count
    })

  },


})