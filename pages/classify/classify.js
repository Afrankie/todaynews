// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNav: 0,
    navLeftItems: [],
    title: '家常菜谱',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({ title: '加载中…', duration: 10000 })
    wx.request({
      url: 'https://api.jisuapi.com/recipe/class?appkey=e8f06309e64a4b72',
        header: {
          'content-type': 'json' // 默认值
        },
        success(res) {
          console.log(res.data)
          that.setData({
            navLeftItems: res.data.result,
            list: res.data.result[that.data.curNav].list
          })
          console.log(that.data.navLeftItems)
          console.log(that.data.list)
          wx.hideLoading();
        }
      })
    
  },
  /* 把点击到的某一项 设为当前curNav   */
  switchRightTab: function (e) {
    var that=this;
    let id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      curNav: id,
      list:that.data.navLeftItems[id].list
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})