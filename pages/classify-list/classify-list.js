// pages/classify-list/classify-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var classid=options.classid;
    var that=this;
    this.setData({
      classid:classid,
      name:options.name,
      start:0,
      num:10
    })
    console.log(classid)
    wx.showLoading({ title: '加载中…', duration: 10000 })
    wx.request({
      url: 'https://api.jisuapi.com/recipe/byclass?classid=' + classid + '&start=' + that.data.start + '&num=' + that.data.num+'&appkey=c2903263844259d5',
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          classifyItems: res.data.result.list,
        })
        wx.hideLoading();
        console.log(that.data.classifyItems)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var num = this.data.num + 10
    var start=this.data.num+1
    if(num>20){
      this.setData({
        start:start,
        num: 10
      })
    }else{
      this.setData({
        num: num
      })
    }
  
    var that = this;
    wx.showLoading({ title: '加载中…', duration: 10000 })
    wx.request({
      url: 'https://api.jisuapi.com/recipe/byclass?classid=' + that.data.classid + '&start=' + that.data.start + '&num=' + that.data.num + '&appkey=8164da8023e961c3',
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if(that.data.start>0){
          that.setData({
            classifyItems: that.data.classifyItems.concat(res.data.result.list),
          })
        }else{
          that.setData({
            classifyItems: res.data.result.list,
          })
        }
      
        wx.hideLoading();
        console.log(that.data.classifyItems)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})