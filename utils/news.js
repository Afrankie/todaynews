const cache = require("./cache.js")
const { gen_url } = require("./req.js");
var req = require("./req.js")
const app = getApp();

//浏览记录的缓存
const cache_key = "view"
const cache_size = 100


function getNewById(param,callback){
  var surl = app.globalData.surl + "/news/details"
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

function getStarNews(param, callback){
  var surl = app.globalData.surl + "/article/favorite"
  var surl = gen_url(surl, param)
  req.do_get(surl, callback)
}

function getLikeNews(param, callback){
  var surl = app.globalData.surl + "/article/like"
  var surl = gen_url(surl, param)
  req.do_get(surl, callback)
}

function getCommentNews(param, callback){
  var surl = app.globalData.surl + "/article/comment_by_me"
  var surl = gen_url(surl, param)
  req.do_get(surl, callback)
}

function search(param, callback){
  var surl = app.globalData.surl + "/search"
  var surl = gen_url(surl, param)
  req.do_get(surl, callback)
}

function getHistoryNews(param, callback){
  var user_id = app.globalData.userInfo.id
  var surl = app.globalData.surl + "/news/list"
  var url_ids = cache.getCache(cache_key)
  var param = {'user_id':user_id, 'url_ids':url_ids}
  req.do_post(surl, param, callback)
}

module.exports = {
  getNewById: getNewById,
  getNews: getNews,
  star:star,
  un_star:un_star,
  news_like:news_like,
  news_unlike:news_unlike,
  getStarNews:getStarNews,
  getLikeNews:getLikeNews,
  getCommentNews:getCommentNews,
  search:search,
  getHistoryNews:getHistoryNews,
  cache_key:cache_key,
  cache_size:cache_size
};