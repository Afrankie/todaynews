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


function addComments(param, callback){
  var surl = app.globalData.surl + "/article/comment_add"
  req.do_post(surl, param, callback)
}

function addSubComments(param, callback){
  var surl = app.globalData.surl + "/article/subcomment_add"
  req.do_post(surl, param, callback)
}

function cm_like(param, callback){
  var surl = app.globalData.surl + "/article/comment_like_add"
  req.do_post(surl, param, callback)
}

function cm_un_like(param, callback){
  var surl = app.globalData.surl + "/article/comment_like_delete"
  req.do_post(surl, param, callback)
}



module.exports = {
  getComments: getComments,
  getSubComments:getSubComments,
  addComments:addComments,
  addSubComments:addSubComments,
  cm_like:cm_like,
  cm_un_like:cm_un_like
};