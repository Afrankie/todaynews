
var food = require('../../utils/food.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        id: 16988,
        name:"可乐鸡翅",
        img: '/images/kele.jpg'
      },
      {
        id: 969,
        name: "麻婆豆腐",
        img: '/images/doufu.jpg'
      },
      {
        id: 15238,
        name: "红烧排骨",
        img: '/images/paigu.jpg'
       
      }
    ],
    tuijianFood:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var food = [];
    //随机获取四道菜
    for(var i=0;i<4;i++){
      var id = Math.ceil(Math.random() * 1000);//菜类别ID
      console.log(id)
      food.push("123")
      wx.request({
        url: 'https://api.jisuapi.com/recipe/detail?id=' + id + '&appkey=c2903263844259d5',
        header: {
          'content-type': 'json' // 默认值
        },
        success(res) {
          console.log(res.data)
          var food=that.data.tuijianFood
          food.push(res.data.result)
          that.setData({
              tuijianFood:food
          })
          console.log(that.data.tuijianFood)
        }
      })
    }
   
   
    
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