// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:8,
    hasCollect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasCollect: options.hasCollect
    })
    console.log(options.hasCollect)
    var that=this;
    wx.showLoading({ title: '加载中…', duration: 10000 })
    wx.request({
      url: 'https://api.jisuapi.com/recipe/detail?id='+options.id+'&appkey=c2903263844259d5',
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          foodDetail: res.data.result,
        })
        wx.hideLoading();
        console.log(that.data.foodDetail)
      }
    })
  },
  collect: function (e) {
    var that=this;
    var foodid=e.target.dataset.foodid;
    console.log(foodid)
    var value = wx.getStorageSync('foodCollect');
    if (value) {
      if (value.indexOf(foodid) < 0) {
        value.unshift(foodid);
        wx.setStorage({
          key: "foodCollect",
          data: value,
          success: function () {
            that.setData({
              hasCollect: true
            })
            wx.showToast({
              title: '收藏成功!',
            })
            console.log(value)
          }
        })
      }else{
        that.setData({
          hasCollect: false
        })
        wx.showToast({
          title: '您已经收藏过了！',
        })
      }
    } else {
      value = [];
      value.push(foodid);
      wx.setStorage({
        key: "foodCollect",
        data: value,
        success: function () {
          that.setData({
            hasCollect: true
          })
          wx.showToast({
            title: '收藏成功!',
          })
        }
      })
    }
    
   
  },
  noCollect:function(e){
    var that = this;
    var foodid = e.target.dataset.foodid;
    var value = wx.getStorageSync('foodCollect');
    value.splice(value.indexOf(foodid),1);
    console.log(value)
    wx.setStorage({
      key: "foodCollect",
      data: value,
    })
    console.log(foodid)
    this.setData({
      hasCollect:false
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