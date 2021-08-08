//app.js
var user = require("./utils/user")


App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId

              //作为login2请求参数
              var globalData = this.globalData
              globalData.userInfo = res.userInfo
              
              user.login1(this, function(data){
                globalData.userInfo = data
                globalData.isLogin = true
                console.log(globalData.userInfo)
                // wx.reLaunch({
                //   url: '/pages/new-index/new-index',
                // })
              })
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log("未授权")
          wx.reLaunch({
            url: '/pages/authorize/authorize',
          })
        }
      },
      fail:res=>{
        console.log(res)
      }
    })    

    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    that.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    that.globalData.menuHeight = menuButtonInfo.height;
  },
  globalData: {
    isLogin: false,
    userInfo: null,
    // 同时修改util下的user.js的url
    // surl:"http://127.0.0.1:8888",
    surl:"http://127.0.0.1:8080",


    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）

  }
})