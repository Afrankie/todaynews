const app = getApp()
Component({
    properties: {
        ph:{
          type:String,
          value:"hello world",
        },
        to_url:{
          type:String,
          value:""
        }
    },
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight + 25,
        menuBotton: app.globalData.menuBotton,
        menuHeight: app.globalData.menuHeight,
    },
    attached: function() {},
    methods: {
      goto: function(){
        wx.navigateTo({
          url: this.data.to_url,
        })
      },
    }
})
