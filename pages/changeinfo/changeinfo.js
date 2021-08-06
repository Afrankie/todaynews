// pages/changeinfo/changeinfo.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    modalhide:true,
    username:'',
    state:{},
    gender: ['男', '女'],
    index:0,
    objectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }
    ],
    region: ['', '', ''],
    customItem: '全部',
    genderinfo:'',
    inputValue:null,
    content:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var state = decodeURIComponent(options.state)
    state = JSON.parse(state)
    this.setData({
      state: state,
      index: state.gender=='男'?'0':'1',
      region: [state.province,state.city,''],
      inputValue:state.intro,
      username: state.username,
      faceimage:state.image,
      bgimage: state.bgimage == '' ? '/images/bg.jpg' : state.bgimage,
      content:state.intro
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  input(e) {
    var tmp = e.detail.value
    this.setData({        
      content: tmp
    })
    // console.log(this.data.content)
  },
  onUnload(){
    // 重新设置全局变量 userinfo
    var state = this.data.state
    var userinfo = {};
    userinfo['username'] = state['username'] = this.data.username
    userinfo['image'] = state['image'] = this.data.faceimage
    userinfo['bgimage'] = state['bgimage'] = this.data.bgimage
    userinfo['gender'] = state['gender'] = this.data.gender[this.data.index]
    userinfo['province'] = state['province'] = this.data.region[0]
    userinfo['city'] = state['city'] = this.data.region[1]
    userinfo['intro'] = state['intro'] = this.data.content

    app.globalData.userInfo.nickname = state['username']
    app.globalData.userInfo.avatarUrl = state['image']
    app.globalData.userInfo.city = state['city']
    app.globalData.userInfo.province = state['province']

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];

    prevPage.setData({
      flag: '2',
      state:state
    })

    wx.request({
      url: app.globalData.surl + "/user/changeinfo",
      method: "POST",
      data: {
        openid: app.globalData.openid,
        userinfo: JSON.stringify(userinfo)
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  addFaceImage() {
    var _this = this;
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        _this.setData({
          img_l: res.tempFilePaths
        }),
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              _this.setData({
                faceimage: 'data:image/png;base64,' + res.data
              })
            }
          })
      }
    })
  },
  addbgimage() {
    var _this = this;
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        _this.setData({
          img_l: res.tempFilePaths
        }),
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              _this.setData({
                bgimage: 'data:image/png;base64,' + res.data
              })
            }
          })
      }
    })
  },
  modalConfirm: function () {
    //弹出框确认操作
    this.setData({
      modalhide: true,
      username: this.data.tmpusername
    })
    // console.log(this.data.username)
  },
  modalCancel: function() {
    //弹出框取消操作
    this.setData({
      modalhide: true,
    })
  },
  inputname(){
    this.setData({
      modalhide: false,
    })
  },
  saveUserName(e){
    // console.log(e.detail.value)
    this.setData({
      tmpusername: e.detail.value
    })
  }
})