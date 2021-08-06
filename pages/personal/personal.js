// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    tabList: [{
      id: 0,
      show: true,
      name: '动态'
    }, {
      id: 1,
      show: false,
      name: '关于'
    }],
    about:'',
    editshow:false,
    flag: '0'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
    var uid = options.uid
    this.setData({
      uid:uid
    })
    
    

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
      tabList: list
    });
  },
  thumbsUp(e) {
    var postid = e.currentTarget.dataset.postid;
    var postuserid = e.currentTarget.dataset.postuserid;
    var index = e.currentTarget.dataset.index;
    var _this = this
    wx.request({
      url: app.globalData.surl + "/article/vote",
      method: "POST",
      data: {
        postid: postid,
        postuserid:postuserid,
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
        var state = _this.data.state
        var articles = state.articles
        if (articles[index].isThumbs) {
          articles[index].thumbs = parseInt(articles[index].thumbs) - 1
          state.thumbs = parseInt(state.thumbs)-1
          articles[index].isThumbs = false
        } else {
          articles[index].thumbs = parseInt(articles[index].thumbs) + 1
          articles[index].isThumbs = true
          state.thumbs = parseInt(state.thumbs) +1
        }
        _this.setData({
          state: state
        })
      }
    })
  },
  onShow(options) {
    var _this = this
    if (_this.data.flag == '1') {
      var articles = _this.data.state.articles
      articles[_this.data.index].isThumbs = _this.data.isThumbs
      articles[_this.data.index].thumbs = _this.data.thumbs
      _this.setData({
        articles: articles,
        flag: '0'
      })

    }
    if (_this.data.flag == '2') {
      _this.setData({
        flag: '0'
      })
    }else{
      var uid = _this.data.uid
      var tabList = _this.data.tabList
      if (uid == app.globalData.openid) {
        tabList[1].name = "关于我"
      } else {
        tabList[1].name = "关于TA"
      }
      wx.request({
        url: app.globalData.surl + '/user/personal?openid=' + uid + '&selfopenid=' + app.globalData.openid,
        header: {
          'content-type': 'json' // 默认值
        },
        success(res) {

          console.log(res.data)

          _this.setData({
            editshow: uid == app.globalData.openid,
            tabList: tabList,
            state: res.data.state
          })
        }
      })      
    }

    
  },
  follow(){
    wx.request({
      url: app.globalData.surl + '/user/follow/'+ this.data.uid + '?openid=' + app.globalData.openid,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        
      }
    })
    var state = this.data.state
    var followstate = state.followstate
    if (followstate=='3'){
      followstate='1'
    }else if(followstate=='0'){
      followstate = '2'
    }
    state.followers_num = parseInt(state.followers_num)+1
    state.followstate = followstate
    this.setData({
      state:state
    })
  },
  unfollow(){
    wx.request({
      url: app.globalData.surl + '/user/unfollow/' + this.data.uid + '?openid=' + app.globalData.openid,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        
      }
    })
    var state = this.data.state
    var followstate = state.followstate
    
    if (followstate == '1') { //相互关注
      followstate = '3' //TA关注你
    } else if (followstate == '2') { //你关注他
      followstate = '0' 
    }
    state.followers_num = parseInt(state.followers_num) - 1
    state.followstate = followstate
    this.setData({
      state: state
    })
  },
  gofollowing(e) {
    var postuserid = e.currentTarget.dataset.postuserid;
    wx.navigateTo({
      url: '/pages/people/people?postuserid=' + postuserid + '&type=0'
    })
  },
  gofollowers(e) {
    var postuserid = e.currentTarget.dataset.postuserid;
    wx.navigateTo({
      url: '/pages/people/people?postuserid=' + postuserid + '&type=1'
    })
  },
  changeinfo(){
    wx.navigateTo({
      url: '/pages/changeinfo/changeinfo?state=' + encodeURIComponent(JSON.stringify(this.data.state)),
    })
  }
})