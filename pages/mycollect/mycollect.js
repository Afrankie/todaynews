// pages/mycollect/mycollect.js
var food = require("../../utils/food.js");
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    colletcFood: [],
    loading: true,
    tabList: [{
      id: 0,
      show: true,
      name: '菜谱'
    }, {
      id: 1,
      show: false,
      name: '文章'
    }],
    id:'0'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.foodcollect()
  },
  collected(){
    var _this = this
    wx.request({
      url: app.globalData.surl + "/user/collected",
      method: "POST",
      data: {
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          articles: res.data.articles
        })
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
    if(id=='0'){

    }else{
      this.collected()
    }
    this.setData({
      tabList: list,
      id:id
    });
  },
  onShow(){
    if(this.data.id=='0'){
      this.foodcollectsec()
    }else{
      this.collected()
    }
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
  foodcollect(){
    var that = this;
    var value = wx.getStorageSync("foodCollect");
    console.log(value.length)
    var collectFood = [];
    if (value) {
      wx.showLoading({ title: '加载中…', duration: 10000 })
      for (var i = 0; i < value.length; i++) {
        food.getFoodById(value[i], function (food) {
          // console.log(food)
          collectFood.push(food)
          wx.hideLoading()
          that.setData({
            collectFood: collectFood
          })
        })
      }
    }
  },
  foodcollectsec(){
    var that = this;
    var value = wx.getStorageSync("foodCollect");
    console.log(value.length)
    var collectFood = [];
    if (value) {
      wx.showLoading({ title: '加载中…', duration: 10000 })
      if (value.length == 0) {
        wx.hideLoading()
        that.setData({
          collectFood: null
        })
      }
      for (var i = 0; i < value.length; i++) {
        food.getFoodById(value[i], function (food) {
          console.log(food)
          collectFood.push(food)
          wx.hideLoading()
          that.setData({
            collectFood: collectFood
          })
        })
      }
    }
  },
  noCollect: function (e) {
    var index = e.target.dataset.index;
    console.log(index)
  }
  
})