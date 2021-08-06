// pages/new-index/new-index.js
var news = require("../../utils/news.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: 0, //默认选中
    tags: [],
    articles: [],
  },


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
      console.log(data)
      that.setData({
        tags:data.tags,
        articles:data.articles,
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
    var tag_id = that.data.tags[tabCur].id
    var top_url_id = that.data.articles[0].url_id
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
    var bottom_url_id = that.data.articles[that.data.articles.length - 1].url_id
    var param = {"tag_id":tag_id, "bottom_url_id":bottom_url_id}
    news.getNews(param, function(data){
      console.log(data)
      that.data.articles.push(...data.articles)
      that.setData({
        tags:data.tags,
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