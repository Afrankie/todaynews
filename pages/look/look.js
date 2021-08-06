// pages/look/look.js
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    tabList: [{
      id: 0,
      show: true,
      name: '朋友'
    }, {
      id: 1,
      show: false,
      name: '热点'
    }],
    flag:'0',
    currentid:'0',
    addbtnshow:true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // this.timelinedata()
  },
  timelinedata(){
    var _this = this
    wx.request({
      url: app.globalData.surl + '/article/timelineshow?openid=' + app.globalData.openid,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        _this.setData({
          articles: res.data.articles
        })
        _this.getScrollHeight('box1')
      }
    })
  },
  hotdata() {
    var _this = this
    wx.request({
      url: app.globalData.surl + '/article/hotshow?openid=' + app.globalData.openid,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)

        _this.setData({
          articles: res.data.articles
        })
        _this.getScrollHeight('box2')
      }
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
    if(id==0){
      this.timelinedata()
    }else{
      this.hotdata()
    }
    this.setData({
      tabList: list,
      currentid: id
    });
  },
  thumbsUp(e){
    var postid = e.currentTarget.dataset.postid;
    var postuserid = e.currentTarget.dataset.postuserid;
    var index = e.currentTarget.dataset.index;
    var _this = this
    wx.request({
      url: app.globalData.surl + "/article/vote",
      method: "POST",
      data: {
        postid: postid,
        postuserid: postuserid,
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
        var articles = _this.data.articles
        if (articles[index].isThumbs) {
          articles[index].thumbs = parseInt(articles[index].thumbs) - 1
          articles[index].isThumbs = false
        } else {
          articles[index].thumbs = parseInt(articles[index].thumbs) + 1
          articles[index].isThumbs = true
        }
        _this.setData({
          articles: articles
        })
      }
    })
  },
  onShow(){
    var _this = this
    if (_this.data.flag=='1'){
      var articles = _this.data.articles
      articles[_this.data.index].isThumbs = _this.data.isThumbs
      articles[_this.data.index].thumbs = _this.data.thumbs
      _this.setData({
        articles: articles,
        flag:'0'
      })
    }
    if(_this.data.currentid=='0'){
      _this.timelinedata()
    }else{
      _this.hotdata()
    }
  },
  gotopersonal(e){
    var postuserid = e.currentTarget.dataset.postuserid;
    wx.navigateTo({
      url: '/pages/personal/personal?uid=' + postuserid
    })
  },
  getScrollHeight: function (id) {    
    wx.createSelectorQuery().select('#'+id).boundingClientRect((rect) => {
      this.setData({
        scrollHeight: rect.height
      })
      // console.log(this.data.scrollHeight)
    }).exec()
  },
  onPageScroll: function (e) {

    if (e.scrollTop <= 0) {
      // 滚动到最顶部
      e.scrollTop = 0;
    } else if (e.scrollTop > this.data.scrollHeight) {
      // 滚动到最底部
      e.scrollTop = this.data.scrollHeight;
    }
    if (e.scrollTop > this.data.scrollTop || e.scrollTop >= this.data.scrollHeight)     {
      //向下滚动 
      // console.log('向下 ', this.data.scrollHeight)
      this.setData({
        addbtnshow: false
      })
    } else {
      //向上滚动 
      // console.log('向上滚动 ', this.data.scrollHeight)
      this.setData({
        addbtnshow: true
      })
    }
    //给scrollTop重新赋值 
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  publisharticle(){
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  nav(){
    console.log('nav')
  }
})