//app.js
App({
  userLogin:function () {
    var that = this;
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        // console.log(code);
        var appId = 'wx21724c030fa219e2';
        var secret = 'ebe79c14fe9f0a00ba4913e7fd1b69b4';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            that.globalData.openid = openid
            console.log('openid为' + openid);
            that.userRegister()
          }
        })
      }
    })
  },
  userRegister:function () {
    var that = this;
    // console.log(this.globalData.userInfo)
    console.log("userReigister")
    var gender = this.globalData.userInfo.gender=="1"?"男":"女"
    var userdata = {
      'city': this.globalData.userInfo.city,
      'image': this.globalData.userInfo.avatarUrl,
      'username': this.globalData.userInfo.nickName,
      'gender': gender,
      'intro':'',
      'province': this.globalData.userInfo.province,
      'bgimage':''
    }
    userdata = JSON.stringify(userdata)
    var openid = this.globalData.openid
    // wx.request({
    //   url: this.globalData.surl + "/user/create",
    //   method: "POST",
    //   data: {
    //     'openid':openid,
    //     'userdata': userdata
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     that.globalData.userInfo.user_name = res.data.userInfo.username
    //     that.globalData.userInfo.user_image = res.data.userInfo.image
    //     that.globalData.userInfo.city = res.data.userInfo.city
    //     that.globalData.userInfo.province = res.data.userInfo.province
    //     that.globalData.userInfo.id = res.data.userInfo.id
    //     // console.log(res.data)
    //   }
    // })
  },
  onLaunch: function () {
    var _this = this
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              this.userLogin()
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          // console.log('123123123213')
          wx.reLaunch({
            url: '/pages/authorize/authorize',
          })
        }
      },
      fail:res=>{
        console.log(res)
        
      }
    })    
  },
  globalData: {
    userInfo: null,
    surl:"http://127.0.0.1:8888"
  }
})