// pages/mymessage/mymessage.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    tabList: [{
      id: 0,
      show: true,
      name: '评论'
    }, {
      id: 1,
      show: false,
      name: '通知'
    }],
    id:'0'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  clickTab(event) {
    const id = event.detail.current, list = this.data.tabList;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].show = !list[i].show;
      } else {
        list[i].show = false;
      }
    }
    this.setData({
      tabList: list,
      id:id
    });
    if (this.data.id == '0') {
      this.commentmessage()
    } else {
      this.message()
    }
  },
  message(){
    var _this = this
    wx.request({
      url: app.globalData.surl + "/user/message",
      method: "POST",
      data: {
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
        _this.setData({
          messages: res.data.messages
        })
      }
    })
  },
  commentmessage(){
    var _this = this
    wx.request({
      url: app.globalData.surl + "/user/messagescomment",
      method: "POST",
      data: {
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
        _this.setData({
          messagescomment: res.data.messagescomment
        })
      }
    })
  },
  onShow(){
    this.commentmessage()
    // if(this.data.id=='0'){

    // }else{
      
    //   this.message()
    // }
  },
  gopersonal(e){
    console.log('gopersonal')
    wx.navigateTo({
      url: '/pages/personal/personal?uid=' + e.currentTarget.dataset.uid,
    })
  }
})