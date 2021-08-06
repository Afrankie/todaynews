// pages/articledetail/articledetail.js
var timeutil = require('../../utils/util.js');
var app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    article:{},
    barshow:true,
    inputshow:false,
    cancelshow:false,
    submitshow:false,
    focus:false,
    // testdata:[],
    place:'写评论...',
    inputValue: null,
    disable: true,
    comments: [],
    referid:-1,
    replyid:-1,
    openid:-1,
    originreplyid:-1,
    cidfromserver:'',
    active:true,
    flag:'0',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    
    // console.log('coming coming coming')
    // console.log(options.postid)
    var _this = this
    // var testdata = []
    // for(var i=0;i<50;i++){
    //   testdata.push('1')
    // }
    // this.setData({
    //   testdata: testdata
    // })
    wx.request({
      url: app.globalData.surl + "/article/detail/" + options.postid + "?openid=" + app.globalData.openid + "&postuserid=" + options.postuserid,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          article: res.data.article,
          index: options.index,
          postid: options.postid,
          postuserid: options.postuserid
        })
      }
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html: that.data.article.content,
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }).exec()
    
    
  },
  thumbsUp(e) {
    var postid = e.currentTarget.dataset.postid;
    var postuserid = e.currentTarget.dataset.postuserid;

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
        var article = _this.data.article
        if (article.isThumbs) {
          article.thumbs = parseInt(article.thumbs) - 1
          article.isThumbs = false
        } else {
          article.thumbs = parseInt(article.thumbs) + 1
          article.isThumbs = true
        }
        _this.setData({
          article: article
        })
      }
    })

  },
  openlocation(){
    wx.openLocation({
      latitude: parseInt(this.data.article.location.latitude),
      longitude: parseInt(this.data.article.location.longitude),
      scale: 18,
      name: this.data.article.location.name,
      address: this.data.article.location.address
    })
  },
  onUnload: function (){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      flag:'1',
      isThumbs: this.data.article.isThumbs,
      thumbs: this.data.article.thumbs,
      index:this.data.index
    })
  },
  collectpost(){
    var _this = this
    wx.request({
      url: app.globalData.surl + "/user/collect/"+_this.data.postid,
      method: "POST",
      data: {
        openid: app.globalData.openid,
        postuserid:_this.data.postuserid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var article = _this.data.article
        if (article.isCollect) {
          article.collect_num = parseInt(article.collect_num) - 1
          article.isCollect = false
        } else {
          article.collect_num = parseInt(article.collect_num) + 1
          article.isCollect = true
        }
        _this.setData({
          article: article
        })
      }
    })
  },
  comment(){
    this.setData({
      barshow:false,
      inputshow:true,
      focus:true,
      submitshow:true
    })
  },
  cancel(){
    this.setData({
      barshow: true,
      inputshow: false,
      submitshow: false,
      cancelshow: false
    })
  },
  input(e){
    var tmp = e.detail.value
    this.setData({
      content: tmp
    })
    if (tmp != null && tmp.trim() != ''){
      this.setData({
        disable:false
      })
    }else{
      this.setData({
        disable: true
      })
    }
  },
  bindFormSubmit: function (e) {
    var that = this
    new Promise(function (resolve, reject) {
      that.getCid(resolve);
    }).then(function () {
      that.createComments();
    })
  },
  focusagain(){
    this.setData({
      submitshow: true,
      cancelshow: false
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  reply(e){
    
    var cid = e.currentTarget.dataset.cid
    var replyid = e.currentTarget.dataset.replyid
    var referid = this.data.referid
    var username = e.currentTarget.dataset.username
    var cindex = e.currentTarget.dataset.index
    var openid = e.currentTarget.dataset.openid
    if(replyid=='-1'){
      replyid=cid 
    }else{
      referid=cid
    }
    this.setData({ 
      active:true,
      place:'回复'+username+":",
      barshow: false,
      inputshow: true,
      focus: true,
      submitshow: true,
      cancelshow:false,
      cindex:cindex,
      replyid: replyid,
      referid, referid,
      cindex: cindex,
      openid:openid
    })
  },
  getCid(resolve){
    var _this = this
    wx.request({
      url: app.globalData.surl + "/comments/cid",
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)
        _this.setData({ 
          cidfromserver: res.data.cid
        })
        if (resolve != null) {
          resolve('ok')
        }
      }
    })
  },
  createComments(){
    var _this = this

    var isauthor = _this.data.postuserid == app.globalData.openid
    if (isauthor) {
      isauthor=1
    }else{
      isauthor = 0
    }
    var tmp = {
      'postid': _this.data.postid,
      'postuserid': _this.data.postuserid,
      'openid': app.globalData.openid,
      'userimage': app.globalData.userInfo.avatarUrl,
      'username': app.globalData.userInfo.nickName,
      'content': _this.data.content,
      'replyid': _this.data.replyid,
      'referid': _this.data.referid,
      'time': timeutil.formatTime(new Date()),
      'isauthor': isauthor,
      'howmanyreply': 0,
      'authorreply': 0,
      'cid': _this.data.cidfromserver,
      'thumbs':0,
      'isThumbs':'0'
    }
    console.log(tmp)
    var article = _this.data.article
    
    if (_this.data.replyid!=-1){
      var i = _this.data.cindex
      article.comments[i].howmanyreply = parseInt(article.comments[i].howmanyreply) + 1
      article.commentsnum = parseInt(article.commentsnum)+1
      if (_this.data.postuserid == app.globalData.openid && _this.data.openid != app.globalData.openid){
        article.comments[i].authorreply = parseInt(article.comments[i].authorreply) + 1
      }
    }else{
      var comments = article.comments
      comments.unshift(tmp)
      article.comments = comments
      article.commentsnum = parseInt(article.commentsnum) + 1
    }
    // print(_this.data.cindex)
    // print(article.comments[3])
    // print(replyid)
    _this.setData({
      inputValue: '',
      article: article
    })
    // tmp['userimage']=''
    tmp = JSON.stringify(tmp)
    wx.request({
      url: app.globalData.surl + "/comments/create",
      method: "POST",
      data: {
        data:tmp
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
      }
    }) 
    _this.setData({
      barshow: false,
      inputshow: true,
      submitshow: false,
      cancelshow: true,
      place: '写评论...',
      replyid: -1,
      referid: -1,
      openid: -1
    })
  },
  allreply(e){
    var index = e.currentTarget.dataset.index
    var comment = this.data.article.comments[index]
    wx.navigateTo({
      url: '/pages/allreply/allreply?root=' + encodeURIComponent(JSON.stringify(comment)) +'&index='+index
    })
  },
  onShow(){
    if(this.data.flag=='1'){
      var article = this.data.article
      var i = this.data.resindex
      article.comments[i].isThumbs = this.data.passisThumbs
      article.comments[i].thumbs = this.data.passthumbs
      article.comments[i].howmanyreply = parseInt(article.comments[i].howmanyreply)+this.data.howmanyreply
      article.comments[i].authorreply = parseInt(article.comments[i].authorreply) +this.data.authorreply
      article.commentsnum = parseInt(article.commentsnum)+ this.data.commentsnum
      this.setData({
        article:article,
        flag:'0'
      })
    }
  },
  gopersonal(e){
    wx.navigateTo({
      url: '/pages/personal/personal?uid='+e.currentTarget.dataset.uid,
    })
  },
  thumbsUpComment(e){
    var cid = e.currentTarget.dataset.cid;
    var openid = e.currentTarget.dataset.openid;
    var i = e.currentTarget.dataset.index;

    var _this = this
    wx.request({
      url: app.globalData.surl + "/comment/vote",
      method: "POST",
      data: {
        cid:cid,
        postuserid: openid,
        openid:app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
        var article = _this.data.article
        if (article.comments[i].isThumbs=='1') {
          article.comments[i].thumbs = parseInt(article.comments[i].thumbs) - 1
          article.comments[i].isThumbs = '0'
        } else {
          article.comments[i].thumbs = parseInt(article.comments[i].thumbs) + 1
          article.comments[i].isThumbs = '1'
        }
        _this.setData({
          article: article
        })
      }
    })
  },
  mockblur(){
    // console.log("mockblur")
    var _this = this
    // console.log(_this.data.content)
    if(this.data.content==''){
      _this.setData({
        barshow: false,
        inputshow: true,
        submitshow: false,
        cancelshow: true,
        place: '写评论...',
        replyid: -1,
        referid: -1,
        openid: -1        
      }) 
    }else{
      _this.setData({
        barshow: false,
        inputshow: true,
        submitshow: false,
        cancelshow: true,
      }) 
    }
  }
})