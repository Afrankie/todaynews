var user = require("../../utils/user.js")
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面onload时自己赋值，用于判断是否是自己的展示页
    "my_user_id":-1,
    //页面跳转时携带
    "user_id":"",

  },

  // 编辑个人信息
  edit_info(){
    wx.navigateTo({
      url: '/pages/changeinfo/changeinfo',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = app.globalData.userInfo
    var my_user_id =  userInfo.id
    that.setData({
      my_user_id:my_user_id  
    })

    var user_id = options.user_id
    var param = {'user_id':user_id}
    user.getUserInfo(app, param, function(data){
      // TODO 待添加背景页面
      that.setData({
        user_image:data.user_image,
        id:data.id,
        user_name:data.user_name,
        intro:data.intro,
        all_like_count:0,
        guanzhu_count:0,
        fans_count:0,
        gender:data.gender,
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