// pages/news-star/news-star.js
var news = require("../../utils/news.js")
const app = getApp()
var user_id = -1
var user_name = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name:"",
    user_image:"",

    // 滑动栏相关
    tabCur: 0, //默认选中
    tags: [
      {"id":1,"tag":"收藏"},
      {"id":2,"tag":"评论"},
      {"id":3,"tag":"点赞"},
      {"id":4,"tag":"历史"},
    ],

    // onload时加载
    articles:[]
  },

  //顶部滑动栏
  tabSelect(e) {
    var that = this
    var tabCur = e.currentTarget.dataset.id

    that.setData({
      tabCur: tabCur,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })
    
    this.refresh(tabCur)
  },

  refresh(tabCur){
    var that = this
    var tags = that.data.tags
    
    var param = {'user_id':user_id}
    var func = function(data){
      that.setData({
        articles:data.articles
      })
    }
    
    if (tags[tabCur].tag == '点赞'){
      news.getLikeNews(param, func)
    } else if (tags[tabCur].tag == '收藏'){
      news.getStarNews(param, func)
    } else if (tags[tabCur].tag == '评论'){
      news.getCommentNews(param, func)
    } else if (tags[tabCur].tag == '历史'){
      news.getHistoryNews(param, func)
    }
  },


  // 文章点赞、取消文章点赞
  news_like(e){
    var that = this
    
    // 所在文章article中的索引
    var idx = e.currentTarget.dataset.id
    var articles = that.data.articles
    var url_id = articles[idx].url_id
    var param = {'user_id':user_id, 'url_id':url_id}
    var like_count = articles[idx].like_count
    var like = articles[idx].like
    news.news_like(param, function(data){
      articles[idx].like_count = like_count + 1
      articles[idx].like = !like
      that.setData({
        articles:articles
      })
    })
  },
  news_un_like(e){
    var that = this

     // 所在文章article中的索引
     var idx = e.currentTarget.dataset.id
     var articles = that.data.articles
     var url_id = articles[idx].url_id
     var param = {'user_id':user_id, 'url_id':url_id}
     var like_count = articles[idx].like_count
     var like = articles[idx].like
     news.news_like(param, function(data){
       articles[idx].like_count = like_count - 1
       articles[idx].like = !like
       that.setData({
         articles:articles
       })
     })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = app.globalData.userInfo
    user_id = userInfo.id
    user_name = userInfo.user_name
    var tags = that.data.tags
    
    var tag_name = options.tag_name
    for(var i = 0; i < tags.length; i ++){
      if(tags[i].tag==tag_name){
        that.setData({tabCur:i})
        break
      }
    } 
    
    var user_name = app.globalData.userInfo.user_name
    var user_image = app.globalData.userInfo.user_image
    that.setData({
      user_name:user_name,
      user_image:user_image
    })
    var tabCur = that.data.tabCur
    that.refresh(tabCur)
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