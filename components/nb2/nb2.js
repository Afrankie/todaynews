const app = getApp()
Component({
    properties: {
        //placeholder
        ph:{
          type:String,
          value:"hello world",
        },
        //输入框内容
        input_value:{
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
      //返回上一个页面
      goback(){
        wx.navigateBack({
          delta: 1,
        })
      },
      //将输入框的内容传递给父组件
      dosearch(){
        var that = this
        var input_value = that.data.input_value
        that.triggerEvent('dosearch', {
          keyword: input_value
        })
        that.setData({
          'input_value':''
        })
      },
      //实时更新输入框的内容
      getInput(e){
        this.setData({
          'input_value':e.detail.value
        })
      }
    }
})
