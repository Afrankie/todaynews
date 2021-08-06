function getFoodById(id,callback){
  wx.request({
    url: 'https://api.jisuapi.com/recipe/detail?id='+id+'&appkey=c2903263844259d5',
    header: {
      'content-type': 'json' // 默认值
    },
    success(res) {
      callback && callback(res.data.result);
    }
  })
}
function getFoodByName(name,num,callback) {
  wx.request({
    url: 'https://api.jisuapi.com/recipe/search?keyword='+name+'&num='+num+'&appkey=c2903263844259d5',
    header: {
      'content-type': 'json' // 默认值
    },
    success(res) {
      callback && callback(res.data.result.list);
    }
  })
}
module.exports = {
  getFoodById: getFoodById,
  getFoodByName: getFoodByName
};