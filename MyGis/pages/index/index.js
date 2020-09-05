//index.js
//获取应用实例
const app = getApp()
//接口地址
const httpURL = app.globalData.httpURL
//测试接口地址
const testHttpURL = app.globalData.testHttpURL

wx.login({
  success: res => {
    if (res.code) {
      //发起网络请求 
      wx.request({
        //url:'http://localhost:8080/wx_MyGis/user?method=getOpenId',
        //url: 'https://www.snake8859.top/wx_MyGis/user?method=getOpenId',
        //url: 'http://localhost:8080/common/getOpenId',
        //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/common/getOpenId',
        //url: testHttpURL+'/common/getOpenId',
        url: httpURL + '/common/getOpenId',
        data: {
          code: res.code,
        },
        success: res => {
          console.log(res.data.openid);
          app.globalData.openid = res.data.openid;
        }
      })
    } else {
      console.log('登录失败！' + res.errMsg)
    }
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
  }
})

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [
      {
        id: 'konwUs',
        name: '了解我们',
        open: false,
        number:0
      },
      {
        id: 'activity',
        name: '协会活动',
        open: false,
        number :1
      },
      {
        id: 'daily',
        name: '协会日常',
        open: false,
        number: 2
      },
      {
        id: 'more',
        name: '更多的我们',
        open: false,
        number: 3
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  kindToggle: function (e) {
    //console.log(e);
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
