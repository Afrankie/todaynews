// const app = getApp()
var req = require("./req.js")

function getUserInfo(app, param, callback){
  var surl = app.globalData.surl + "/user/info"
  var surl = req.gen_url(surl, param)
  req.do_get(surl, callback)
}

function getOpenId(app, param, callback){
  var surl = app.globalData.surl + "/user/openid"
  var surl = req.gen_url(surl, param)
  req.do_get(surl, callback)
}

// 获取openid，然后调用userRegister
function login1(app, callBack) {
  console.log("login1")
  wx.login({
    //获取code
    success: function (res) {
      var code = res.code; //返回code
      console.log('code为:'+code)
      var param = {'code':code}
      
      getOpenId(app, param, function(data){
        var openid = data.openid
        app.globalData.openid = data.openid
        console.log('openid为' + openid);
        login2(app, callBack)
      })
    },
    fail:function(err){
      console.log(err)
    }
  })
}

// 添加用户信息和获取用户信息
function login2 (app, callBack) {
  console.log("login2")
  var gender = app.globalData.userInfo.gender == "1" ? "男" : "女"
  var userdata = {
    'open_id':app.globalData.openid,
    'city': app.globalData.userInfo.city,
    'user_image': app.globalData.userInfo.avatarUrl,
    'user_name': app.globalData.userInfo.nickName,
    'gender': gender,
    'intro': '',
    'province': app.globalData.userInfo.province,
    'bgimage': ''
  }
  // userdata = JSON.stringify(userdata)
  var surl = app.globalData.surl + "/user/login"
  req.do_post(surl, userdata, callBack)
}

module.exports = {
  login1:login1,
  getOpenId:getOpenId,
  getUserInfo:getUserInfo
}