const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {

  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.userInfo = e.detail.userInfo;
      this.userLogin()
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  userLogin: function () {
    var that = this;
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        // console.log(code);
        var appId = 'wx871e33b932a5b26c';
        var secret = 'ebe79c14fe9f0a00ba4913e7fd1b69b4';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (myres) {
            var openid = myres.data.openid //返回openid
            app.globalData.openid = myres.data.openid
            console.log('openid为' + openid);
            that.userRegister()
          }
        })
      }
    })
  },
  userRegister: function () {
    var that = this;
    // console.log(this.globalData.userInfo)
    console.log("userReigister")
    var gender = app.globalData.userInfo.gender == "1" ? "男" : "女"
    var userdata = {
      'city': app.globalData.userInfo.city,
      'image': app.globalData.userInfo.avatarUrl,
      'username': app.globalData.userInfo.nickName,
      'gender': gender,
      'intro': '',
      'province': app.globalData.userInfo.province,
      'bgimage': ''
    }
    userdata = JSON.stringify(userdata)
    var openid = app.globalData.openid
    wx.request({
      url: app.globalData.surl + "/user/create",
      method: "POST",
      data: {
        'openid': openid,
        'userdata': userdata
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        app.globalData.userInfo.nickname = res.data.userInfo.username
        app.globalData.userInfo.avatarUrl = res.data.userInfo.image
        app.globalData.userInfo.city = res.data.userInfo.city
        app.globalData.userInfo.province = res.data.userInfo.province
        // console.log(res.data)
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })
  }

})
