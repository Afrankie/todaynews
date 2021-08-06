var req = require("./req.js")
var app = getApp();

function getNewById(param,callback){
  var surl = app.globalData.surl + "/news"
  surl = req.gen_url(surl, param)
  req.do_get(surl, callback)
}

function getNews(param, callback){
  var surl = app.globalData.surl + "/news"
  surl = req.gen_url(surl, param)
  req.do_get(surl, callback)
}

module.exports = {
  getNewById: getNewById,
  getNews: getNews
};