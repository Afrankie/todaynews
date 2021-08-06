function do_get(url, callback){
  wx.request({
    url: url,
    header: {
      'content-type': 'json' // 默认值
    },
    success(res) {
      callback && callback(res.data);
    }
  })
}
//post_data is json format
function do_post(url, post_data, callback){
  wx.request({
    url: url,
    method: "POST",
    data: post_data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      callback && callback(res.data);
    }
  })
}

function gen_url(base_url, param){
  var has_one = false;
  // console.log(param)
  for (var key in param) {
    var value = param[key]
    if (value != "-1" && value != -1 && typeof value != 'undefined') {
      if (!has_one) {
        base_url = base_url + "?" + key + "=" + value
      } else{
        base_url = base_url + "&" + key + "=" + value
      }
      has_one = true
    }
  }
  return base_url
}

module.exports = {
  do_get: do_get,
  do_post: do_post,
  gen_url: gen_url,
}


