var cm = require("../../utils/comment.js")
var news = require("../../utils/news.js")
var app = getApp();

// pages/news-detail/news-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //全局参数
    user_id: app.globalData.userinfo == undefined ? -1 : app.globalData.userinfo.id,
    user_name: app.globalData.userinfo == undefined ? -1 : app.globalData.userinfo.user_name,

    // 跳转参数
    url_id:"",

    // 其他参数
    focus:false,
    ph:"友善是交流的起点",
    show_xpl:true,
    parent_index:-1,

    // 添加评论参数
    // textarea内容
    ta_content:"",
    // 被回复的用户ID
    reply_id:"",
    // 一级评论id
    parent_id:"",

    //页面初始化参数
    pics:[],
    relative_time:"",
    content:"",
    author:"",
    title:"",
    comment_count:"",
    like:"",
    star:"",
    comments:""
  },

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
    var user_id = that.data.user_id
    var url_id = that.data.url_id
    var ta_content = that.data.ta_content
    // var reply_id = that.data.reply_id
    // var parent_id = that.data.parent_id

    // 需动态更新
    var comment_count = that.data.comment_count

    var param = {
      "user_id":user_id,
      "url_id":url_id,
      "content":ta_content
    }
    
    cm.addComments(param, function(data){
      that.data.comments.push(data)
      that.setData({
        comment_count:comment_count + 1,
        comments:comments
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      // var urlid = e.currentTarget.dataset.urlid
      // var urlid = options.urlid
      var urlid = 1
      var param = {"url_id":urlid, "user_id":that.data.user_id}
      news.getNewById(param, function(data){
        console.log(data)
        that.setData({
          pics:data.pics,
          relative_time:data.relative_time,
          url_id:data.url_id,
          content:data.content,
          author:data.author,
          title:data.title,
          comment_count:data.comment_count,
          like:data.like
        })
      })
      var cm_param = {'url_id':urlid}
      cm.getComments(cm_param, function(data){
        console.log(data)
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