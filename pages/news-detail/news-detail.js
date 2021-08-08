var cm = require("../../utils/comment.js")
var news = require("../../utils/news.js")
var app = getApp();
var user_id = app.globalData.userInfo == undefined ? -1 : app.globalData.userInfo.id
var user_name = app.globalData.userInfo == undefined ? -1 : app.globalData.userInfo.user_name
// 页面跳转携带
var url_id = -1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    //textarea相关
    focus:false,
    ph:"友善是交流的起点",
    show_xpl:true,
    ta_content:"",

    //所在comments数组中的下标
    parent_index:-1,
    
    // 被回复的用户ID
    reply_id:"",
    // 一级评论id
    parent_id:"",

    //页面onload初始化参数
    pics:[],
    relative_time:"",
    content:"",
    author:"",
    title:"",
    comment_count:"",
    like_count:"",
    like:"",
    star:"",
    comments:[]
  },

  // 评论点赞、取消评论点赞
  cm_like(e){
    var that = this
    //所在的一级评论comments中的索引
    var idx = e.currentTarget.dataset.id
    var comments = that.data.comments
    var comment_id = comments[idx].id

    var param = {'user_id':user_id, "comment_id":comment_id}
    cm.cm_like(param, function(data){
      comments[idx].like_count = comments[idx].like_count + 1
      comments[idx].like = 1
      that.setData({
        comments:comments
      })
    })
  },
  cm_un_like(e){
    var that = this
    //所在的一级评论comments中的索引
    var idx = e.currentTarget.dataset.id
    var comments = that.data.comments
    var comment_id = comments[idx].id

    var param = {'user_id':user_id, "comment_id":comment_id}
    cm.cm_like(param, function(data){
      comments[idx].like_count = comments[idx].like_count - 1
      comments[idx].like = 0
      that.setData({
        comments:comments
      })
    })
  },

  // 跳转到评论详情
  redirect(e){
    var that = this
    // 所在一级评论comments中的索引
    var idx = e.currentTarget.dataset.id
    var parent_id = that.data.comments[idx].id
    
    wx.navigateTo({
      url: '/pages/news-comments/news-comments?url_id='+url_id+"&parent_id="+parent_id,
    })
  },

  // 文章点赞、取消文章点赞
  news_like(){
    var that = this
    
    var param = {'user_id':user_id, 'url_id':url_id}
    var like_count = that.data.like_count
    var like = that.data.like
    news.news_like(param, function(data){
      like_count = like_count + 1
      that.setData({
        like:!like,
        like_count:like_count
      })
    })
  },
  news_un_like(){
    var that = this

    var param = {'user_id':user_id, 'url_id':url_id}
    var like_count = that.data.like_count
    var like = that.data.like
    news.news_unlike(param, function(data){
      like_count = like_count - 1
      that.setData({
        like:!like,
        like_count:like_count
      })
    })
  },

  // 收藏、取消收藏
  star(){
    var that = this

    var param = {'user_id':user_id, 'url_id':url_id}
    news.star(param, function(data){})

    var star = that.data.star
    this.setData({
      star:!star
    })
  },
  un_star(){
    var that = this

    var param = {'user_id':user_id, 'url_id':url_id}
    news.un_star(param, function(data){})

    var star = that.data.star
    this.setData({
      star:!star
    })
  },

  //textarea相关
  getTAValue(e){
    this.setData({
      ta_content:e.detail.value
    })
  },
  blur(e){
    var that = this
    that.setData({
      ta_content:e.detail.value,
      show_xpl:true,
    })
  },

  // 操作栏相关
  // 点击写评论、发布评论
  clickComment(){
    var that = this
    that.setData({
      show_xpl:false,
      focus:true
    })
  },
  addComment(){
    var that = this
    // 请求参数
    var ta_content = that.data.ta_content

    // 需动态更新
    
    var comment_count = that.data.comment_count
    var comments = that.data.comments
    var param = {
      "user_id":user_id,
      "url_id":url_id,
      "content":ta_content
    }
    cm.addComments(param, function(data){      
      comments.push(data)
      that.setData({
        comment_count:comment_count + 1,
        comments:comments,
        ta_content:"",
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      url_id = options.url_id
      
      var param = {"url_id":url_id, "user_id":that.data.user_id}
      news.getNewById(param, function(data){
        that.setData({
          pics:data.pics,
          relative_time:data.relative_time,
          url_id:data.url_id,
          content:data.content,
          author:data.author,
          title:data.title,
          comment_count:data.comment_count,
          like:data.like,
          like_count:data.like_count,
          star:data.star
        })
      })
      var cm_param = {'url_id':url_id, 'user_id':user_id}
      cm.getComments(cm_param, function(data){
        that.setData({
          comments:data.comments
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