// pages/webservice/reverseGeocoder-result/reverseGeocoder-result.js
import {CDN_PATH, WEBSERVICE_APPID} from '../../../config/appConfig';
Page({

	/**
   * 页面的初始数据
   */
	data: {
		
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		const _this = this;
		const data = {
			keyword: options.keyword,
			boundary: options.boundary
		};

		this.setData({
			requestJson: `wx.serviceMarket.invokeService({
      &nbsp;&nbsp;service: "${WEBSERVICE_APPID}",
      &nbsp;&nbsp;api: "poiSearch",
      &nbsp;&nbsp;data: {
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;keyword:${options.keyword},
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;boundary:${options.boundary}
      &nbsp;&nbsp;}
      }).then( res => {
      &nbsp;&nbsp;console.log(res)
      }).catch( err => {
      &nbsp;&nbsp;console.error(err)
      })`

		});
		wx.serviceMarket.invokeService({
			service: WEBSERVICE_APPID,
			api: 'poiSearch',
			data: data
		}).then(res => {
			const result = (typeof res.data) === 'string' ? JSON.parse(res.data) : res.data;
			const markers = []; //设置marker
			const includePoints = []; //设置包含点
			for (let i = 0; i < result.data.length; i++) {
				markers.push({
					id: i,
					latitude: result.data[i].location.lat,
					longitude: result.data[i].location.lng,
					iconPath: `${CDN_PATH}/Marker1_Activated@3x.png`,
					width: 34,
					height: 34
				});
				includePoints.push({
					latitude: result.data[i].location.lat,
					longitude: result.data[i].location.lng,
				});
			}
			this.setData({
				markers: markers,
				includePoints: includePoints,
				pois: result.data
			});
		}).catch(err => {
			console.error(err);
		});
	},

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
		this.mapCtx = wx.createMapContext('map');
	},
  clickitem: function (e) {
    
    let latitude = e.currentTarget.dataset.latitude;
    let longitude = e.currentTarget.dataset.longitude;
    let name = e.currentTarget.dataset.name;
    let address = e.currentTarget.dataset.address;
    this.setData({
      latitude: latitude,
      longitude: longitude,
      name:name,
      address: address,
      scale:20
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  verify(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 3];  
    prevPage.setData({  
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.name,
      address: this.data.address,
      font_color:'#36ab60',
      location_image_url:'/images/location_green.png'
    })
    wx.navigateBack({
      delta: 2
    })
  }
});
