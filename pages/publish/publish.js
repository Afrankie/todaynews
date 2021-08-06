// pages/publish/publish.js
var app = getApp()
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '请输入文章内容...',
    editorHeight: 1000,
    keyboardHeight: 0,
    isIOS: false,
    name:'店家地址',
    location_image_url:'/images/location.png',
    font_color:'grey'
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  },
  addFaceImage(){
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
  sendImage(){
    var _this = this;
    wx.uploadFile({
      url: app.globalData.surl+'/xiaoyuan/goods/upload.php', //接口
      filePath: _this.data.img_l[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  btn2(resolve){
    var _this = this
    this.editorCtx.getContents(
      {
      success: (res) => {
        var str = res.html;
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = str.match(imgReg);
        if(arr!=null){
          for (var i = 0; i < arr.length; i++) {
            var src = arr[i].match(srcReg);
            str = str.replace(src[1], "data:image/png;base64," + wx.getFileSystemManager().readFileSync(src[1], "base64"))

            // console.log('图片地址' + (i + 1) + '：' + src[1]);
          }
        }
        _this.setData({
          content:str
        })
        if (resolve != null) {
          resolve('ok')
        }
        // console.log("method btn2");
      },

      fail: (res) => {
        console.log("fail：" + res);
      }
    })
  },
  btn1(){
    // console.log(this.data.faceimage)
    
    // console.log(wx.getFileSystemManager().readFileSync(this.data.img_l, "base64"))
  },
  btn3(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 18,
      name: this.data.name,
      address: this.data.address
    })
  },
  publish(){
    var that = this
    new Promise(function (resolve, reject) {
      that.btn2(resolve);
    }).then(function () {
      var location = {
        'latitude': that.data.latitude,
        'longitude': that.data.longitude,
        'name': that.data.name,
        'address': that.data.address
      }
      location = JSON.stringify(location)
      wx.request({
        url: app.globalData.surl + "/article/post",
        method: "POST",
        data: {
          title: that.data.title,
          content: that.data.content,
          faceimage: that.data.faceimage,
          location: location,
          openid: app.globalData.openid
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          wx.navigateBack({
            delta: 1
          })
        }
      })
      // console.log(that.data.content)
    })
    
    
  },
  bindTitleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
})
