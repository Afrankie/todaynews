var user = require("../../utils/user.js")
var app = getApp();
var user_id = app.globalData.userInfo == undefined ? -1 : app.globalData.userInfo.id

// pages/news-personal/news-personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    guanggao_pics:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = app.globalData.userInfo
    that.setData({
      user_name:userInfo.user_name,
      user_image:userInfo.user_image,
      isLogin:app.globalData.isLogin,
      guanggao_pics:[
        {'url':'/images/guanggao.png'},
        {'url':'/images/guanggao.png'},
      ]
    })
  },

  // 获取收藏文章
  getStar(){
    wx.navigateTo({
      url: '/pages/news-star/news-star?tag_name=收藏',
    })
  },

  // 获取浏览历史
  getHistory(){
    wx.navigateTo({
      url: '/pages/news-star/news-star?tag_name=历史',
    })
  },

  // 登录
  login(){
    wx.reLaunch({
      url: '/pages/authorize/authorize',
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