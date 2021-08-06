//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?uid='+app.globalData.openid,
    })
  },
  onLoad: function () {
    
  },
  aboutuserinfo(resolve){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo
      }
      
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (resolve != null) {
      resolve('ok')
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserState(){
    var _this = this
    wx.request({
      url: app.globalData.surl + '/user/info?openid=' + app.globalData.openid,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)

        _this.setData({
          state: res.data.state
        })
      }
    })
  },
  onShow(){
    var that = this
    new Promise(function (resolve, reject) {
      that.aboutuserinfo(resolve);
    }).then(function () {
      if(app.globalData.openid!=undefined){
        that.getUserState();
      }else{
        console.log('open id undefined')
      }
      
    })
  },
  gofollowing(){
    wx.navigateTo({
      url: '/pages/people/people?postuserid='+app.globalData.openid+'&type=0'
    })
  },
  gofollowers(){
    wx.navigateTo({
      url: '/pages/people/people?postuserid=' + app.globalData.openid + '&type=1'
    })
  }
})
