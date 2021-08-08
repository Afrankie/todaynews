const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const scrollTo = (toViewid) => {
  toViewid = "#"+toViewid
  var scrollTop;
  const query=wx.createSelectorQuery();  //创建节点查询器
  query.select(toViewid).boundingClientRect()  //选择toViewid获取位置信息
  query.exec(function(res) {
        scrollTop = res[0].bottom
        wx.createSelectorQuery().select('.page').boundingClientRect(function(rect) {
          wx.pageScrollTo({
            scrollTop: scrollTop,
            duration: 0
          })
        }).exec()
  })
}

module.exports = {
  formatTime: formatTime,
  scrollTo:scrollTo
}
