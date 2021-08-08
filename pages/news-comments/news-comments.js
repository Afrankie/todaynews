// pages/news-comments/news-comments.js
var cm = require("../../utils/comment.js")
var news = require("../../utils/news.js");
const req = require("../../utils/req.js");
const app = getApp();
var user_id = -1
// 页面跳转携带
var url_id = -1
var parent_id = -1

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

    //评论添加参数
    reply_id:'',//被回复的用户ID

    sub_comments:[],
    // 父级评论
    fc:{}
  },

  //点击二级评论
  refer(e){
    var that = this
    //所在的二级评论sub_comments中的索引
    var idx = e.currentTarget.dataset.id
    var reply_id = that.data.sub_comments[idx].id
    var reply_user_name = that.data.sub_comments[idx].user_name
    that.setData({
      // 非通用
      reply_id:reply_id,

      // 通用
      show_xpl:false,
      focus:true,
      ph:"回复"+reply_user_name
    })
  },

  // 一级评论点赞、取消评论点赞
  cm_like(e){
    var that = this
    var fc = that.data.fc
    var comment_id = fc.id

    var param = {'user_id':user_id, "comment_id":comment_id}
    cm.cm_like(param, function(data){
      fc.like_count = fc.like_count + 1
      fc.like = 1
      that.setData({
        fc:fc
      })
    })
  },
  cm_un_like(e){
    var that = this
    var fc = that.data.fc
    var comment_id = fc.id

    var param = {'user_id':user_id, "comment_id":comment_id}
    cm.cm_like(param, function(data){
      fc.like_count = fc.like_count - 1
      fc.like = 0
      that.setData({
        fc:fc
      })
    })
  },

  // 二级评论点赞、取消评论点赞
  scm_like(e){
    var that = this
    //所在的二级评论sub_comments中的索引
    var idx = e.currentTarget.dataset.id
    var sub_comments = that.data.sub_comments
    var comment_id = sub_comments[idx].id

    var param = {'user_id':user_id, "comment_id":comment_id}
    cm.cm_like(param, function(data){
      sub_comments[idx].like_count = sub_comments[idx].like_count + 1
      sub_comments[idx].like = 1
      that.setData({
        sub_comments:sub_comments
      })
    })
  },
  scm_un_like(e){
    var that = this
    //所在的二级评论sub_comments中的索引
    var idx = e.currentTarget.dataset.id
    var sub_comments = that.data.sub_comments
    var comment_id = sub_comments[idx].id

    var param = {'user_id':user_id, "comment_id":comment_id}
    cm.cm_un_like(param, function(data){
      sub_comments[idx].like_count = sub_comments[idx].like_count - 1
      sub_comments[idx].like = 0
      that.setData({
        sub_comments:sub_comments
      })
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
      //通用
      show_xpl:true,
      ta_content:e.detail.value,
      ph:"友善是交流的起点",
      
      //非通用
      reply_id:'',
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
  addSubComments(){
    var that = this
    // 请求参数
    var ta_content = that.data.ta_content
    var reply_id = that.data.reply_id
    var sub_comments = that.data.sub_comments
    var fc = that.data.fc

    // 需动态更新
    var comment_count = that.data.fc.comment_count
    var param = {
      "user_id":user_id,
      "url_id":url_id,
      "content":ta_content,
      "reply_id":reply_id,
      "parent_id":parent_id
    }
    cm.addSubComments(param, function(data){
      sub_comments.push(data)
      fc.comment_count = comment_count+1
      that.setData({
        fc:fc,
        sub_comments:sub_comments,
        ta_content:"",
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

    url_id = parseInt(options.url_id)
    parent_id = parseInt(options.parent_id)
    

    var param = {'url_id':url_id, 'parent_id':parent_id, 'user_id':user_id}
    
    cm.getSubComments(param, function(data){

      that.setData({
        parent_id:data.father_comment.id,
        fc:data.father_comment,
        sub_comments:data.sub_comments
      })

      // 注意 全局变量单独更新
      parent_id=data.father_comment.id
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