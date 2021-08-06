// pages/allreply/allreply.js
var timeutil = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    place: '写评论...',
    focus:false,
    disable: true,
    comments: [],
    referid: -1,
    replyid: -1,
    openid: -1,
    originopenid:-1,
    originreplyid: -1,
    inputValue:null,
    commentsnum:0,
    howmanyreply:0,
    authorreply:0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var root = decodeURIComponent(options.root)
    var index = options.index
    root = JSON.parse(root)
    this.setData({
      originopenid:root['openid'],
      originreplyid:root['cid'],
      replyid: root['cid'],
      openid: root['openid'],
      passisThumbs: root.isThumbs,
      passthumbs: root.thumbs,
      root:root,
      index:index
    })
    this.getComments()
  },
  getComments(){
    var _this = this
    wx.request({
      url: app.globalData.surl + "/comments/sub",
      method: "POST",
      data: {
        openid:app.globalData.openid,
        replyid:_this.data.originreplyid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
        _this.setData({
          comments:res.data.comments
        })
      }
    })
  },
  input(e) {
    var tmp = e.detail.value
    this.setData({
      content: tmp
    })
    if (tmp != null && tmp.trim() != '') {
      this.setData({
        disable: false
      })
    } else {
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
  reply(e) {
    var cid = e.currentTarget.dataset.cid
    var username = e.currentTarget.dataset.username
    var openid = e.currentTarget.dataset.openid
    var refercontent = e.currentTarget.dataset.refercontent
    var referopenid = e.currentTarget.dataset.openid
    this.setData({
      place: '回复' + username + ":",
      focus: true,
      referid: cid,
      openid:openid,
      username: username,
      refercontent: refercontent,
      referopenid: referopenid
    })
  },
  getCid(resolve) {
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
  createComments() {
    var _this = this
    var isauthor = _this.data.root.postuserid == app.globalData.openid
    if (isauthor) {
      isauthor = 1
    } else {
      isauthor = 0
    }
    var tmp = {
      'postid': _this.data.root.postid,
      'postuserid': _this.data.root.postuserid,
      'openid': app.globalData.openid,
      'userimage': app.globalData.userInfo.avatarUrl,
      'username': app.globalData.userInfo.nickName,
      'content': _this.data.content,
      'replyid': _this.data.replyid,
      'referid': _this.data.referid,
      'time': timeutil.formatTime(new Date()),
      'isauthor': isauthor,      
      'cid': _this.data.cidfromserver,
      'howmanyreply': 0,
      'authorreply': 0,
      'referhead':'',
      'refercontent':'',
      'referopenid':''
    }
    console.log(tmp)
    var howmanyreply = _this.data.howmanyreply
    howmanyreply += 1
    var authorreply = _this.data.authorreply
    
    var commentsnum = _this.data.commentsnum
    commentsnum+=1

    if (_this.data.root.postuserid == app.globalData.openid && _this.data.openid != app.globalData.openid){
      authorreply += 1
    }
    if (_this.data.referid.toString()!='-1'){
      tmp['referhead']='@'+_this.data.username+':'
      tmp['refercontent'] = _this.data.refercontent
      tmp['referopenid'] = _this.data.referopenid
    }

    var comments = _this.data.comments
    comments.push(tmp)

    // console.log(_this.data.content)
    _this.setData({
      inputValue: '',
      comments: comments,
      howmanyreply: howmanyreply,
      authorreply: authorreply,
      commentsnum: commentsnum,
      content:''
    })
    // tmp['userimage']=''
    tmp = JSON.stringify(tmp)
    wx.request({
      url: app.globalData.surl + "/comments/create",
      method: "POST",
      data: {
        data: tmp
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
      }
    })
    _this.setData({
      place: '写评论...',
      referid: -1,
      replyid: _this.data.root['cid'],
      openid: _this.data.root['openid']
    })
  },
  onUnload: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    
    prevPage.setData({
      flag: '1',
      commentsnum: this.data.commentsnum,
      howmanyreply: this.data.howmanyreply,
      authorreply: this.data.authorreply,
      resindex: this.data.index,
      passisThumbs: this.data.passisThumbs,
      passthumbs: this.data.passthumbs
    })
  },
  gopersonal(e){
    wx.navigateTo({
      url: '/pages/personal/personal?uid='+e.currentTarget.dataset.uid,
    })
  },
  thumbsUpComment(e) {
    var cid = e.currentTarget.dataset.cid;
    var openid = e.currentTarget.dataset.openid;
    var i = e.currentTarget.dataset.index;
    var state = e.currentTarget.dataset.state;

    var _this = this
    wx.request({
      url: app.globalData.surl + "/comment/vote",
      method: "POST",
      data: {
        cid: cid,
        postuserid: openid,
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data)
        if(state!='root'){
          var comments = _this.data.comments

          if (comments[i].isThumbs == '1') {
            comments[i].thumbs = parseInt(comments[i].thumbs) - 1
            comments[i].isThumbs = '0'
          } else {
            comments[i].thumbs = parseInt(comments[i].thumbs) + 1
            comments[i].isThumbs = '1'
          }
          _this.setData({
            comments: comments
          })
        }else{
          var root = _this.data.root
          if (root.isThumbs == '1') {
            root.thumbs = parseInt(root.thumbs) - 1
            root.isThumbs = '0'
          } else {
            root.thumbs = parseInt(root.thumbs) + 1
            root.isThumbs = '1'
          }
          _this.setData({
            passisThumbs: root.isThumbs,
            passthumbs: root.thumbs,
            root: root
          })
        }
      }
    })
  },
  mockblur() {
    var _this = this
    if (_this.data.content == '') {
      _this.setData({
        place: '写评论...',
        referid: -1,
        replyid: _this.data.root['cid'],
        openid: _this.data.root['openid']
      })
    }
  }
})