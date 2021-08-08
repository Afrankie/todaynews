// pages/new-index/new-index.js
var news = require("../../utils/news.js")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滑动栏相关
    navBarHeight:"50",
    tabCur: 0, //默认选中
    tags: [],

    // 页面onload时初始化
    articles: [],

    //自定义导航栏
    ph:"请输入关键字",
    to_url:"/pages/search/search"
  },

  //顶部滑动栏
  tabSelect(e) {
    var that = this
    var tabCur = e.currentTarget.dataset.id

    that.setData({
      tabCur: tabCur,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })
    
    this.newsRefresh(tabCur)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var param = {}
    news.getNews(param, function(data){
      var articles = data.articles
      
      that.setData({
        tags:data.tags,
        articles:articles,
        
        //自定义导航栏相关
        navBarHeight:app.globalData.navBarHeight
      })
    })
    
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

  newsRefresh: function(tabCur) {
    var that = this;
    var tags = that.data.tags 
    var tag = tags[tabCur]
    var articles = that.data.articles
    
    var tag_id = tag.id
    var top_url_id = -1
    if (articles.length > 0) top_url_id = articles[0].url_id
    var param = {"tag_id":tag_id, "top_url_id":top_url_id}
    news.getNews(param, function(data){
      if (data.articles == {} || typeof data.articles === undefined) {
        wx.showToast({
          icon: 'none',
          title: '新闻已经是最新的~',
        })
      } else {
        that.setData({
          // tags:data.tags,
          articles:data.articles,
        })
      }
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    this.newsRefresh(that.data.tabCur)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var tag_id = that.data.tags[that.data.tabCur].id
    var articles = that.data.articles
    var bottom_url_id = -1
    if (articles.length > 0) bottom_url_id = articles[articles.length - 1].url_id
    var param = {"tag_id":tag_id, "bottom_url_id":bottom_url_id}
    news.getNews(param, function(data){
      console.log(data)
      that.data.articles.push(...data.articles)
      that.setData({
        // tags:data.tags,
        articles:that.data.articles,
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})