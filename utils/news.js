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

function star(param, callback){
  var surl = app.globalData.surl + "/article/collect_add"
  req.do_post(surl, param, callback)
}

function un_star(param, callback){
  var surl = app.globalData.surl + "/article/collect_delete"
  req.do_post(surl, param, callback)
}

function news_like(param, callback){
  var surl = app.globalData.surl + "/article/like_add"
  req.do_post(surl, param, callback)
}

function news_unlike(param, callback){
  var surl = app.globalData.surl + "/article/like_delete"
  req.do_post(surl, param, callback)
}

module.exports = {
  getNewById: getNewById,
  getNews: getNews,
  star:star,
  un_star:un_star,
  news_like:news_like,
  news_unlike:news_unlike
};