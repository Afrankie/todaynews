// pages/people/people.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var _this = this
    var postuserid = options.postuserid
    var type = options.type
    var url = app.globalData.surl;
    if(type=='0'){
      wx.setNavigationBarTitle({
        title: '关注'
      })
      url+='/user/following/detail?postuserid='+postuserid
    }else{
      wx.setNavigationBarTitle({
        title: '粉丝'
      })
      url += '/user/followers/detail?postuserid='+postuserid
    }
    wx.request({
      url: url,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)

        _this.setData({
          people: res.data.people
        })
      }
    })
  }
})