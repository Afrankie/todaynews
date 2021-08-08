function initCache(key, size){
  //设置数组
  var value = wx.getStorageSync(key)
  if (value) return
  wx.setStorage({
    key: key,
    data: [],
    fail: function (err) {
      console.log(err)
    },
  })
  //设置数组最大长度
  wx.setStorage({
    key: key+"Size",
    data: size,
    fail: function (err) {
      console.log(err)
    },
  })
}
function getCache(key){
  return wx.getStorageSync(key);
}
function push(key, value){
  var value = wx.getStorageSync(key);
  var max_size = wx.getStorageSync(key+"Size")

  if (value) {
    //检查是否重复
    if (value.indexOf(inputValue) < 0) {
      if (value.length == max_size){
        value.pop()
      }
      value.unshift(inputValue);
    }

    wx.setStorage({
      key: key,
      data: value,
      fail: function (err) {
        console.log(err)
      },
    })
  }
}

module.exports = {
  getCache:getCache,
  push:push,
  initCache:initCache
}