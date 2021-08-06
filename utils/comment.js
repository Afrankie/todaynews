var req = require("./req.js")
var app = getApp();

function getComments(param, callback){
  var surl = app.globalData.surl + "/article/comments"
  surl = req.gen_url(surl, param)
  req.do_get(surl, callback)
}

function getSubComments(param, callback){
  var surl = app.globalData.surl + "/article/sub_comments"
  surl = req.gen_url(surl, param)
  req.do_get(surl, callback)
}

function getAllComments(param, callback){
  var surl = app.globalData.surl + "/article/comments/all"
  surl = req.gen_url(surl, param)
  req.do_get(surl, callback)
}

function addComments(param, callback){
  var surl = app.globalData.surl + "/article/comment_add"
  req.do_post(surl, param, callback)
}


module.exports = {
  getComments: getComments,
  getSubComments:getSubComments,
  getAllComments:getAllComments,
  addComments:addComments
};