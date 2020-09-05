//index.js
//获取应用实例
const app = getApp()
//接口地址
const httpURL = app.globalData.httpURL
//测试接口地址
const testHttpURL = app.globalData.testHttpURL
var state="0";
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    signature:'',
    
  },

  //设置个性签名
  setSignature:function(e){
    if (state == "0") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
    else{
      wx.navigateTo({
        url: 'signature',
      })
    }
  },

  //修改报名表
  changeApply:function(e){
    if(state=="0"){
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
    else{
      wx.redirectTo({
        url: '../apply/apply_update',
      })
    }
  },
  //图书管理
  bookManagement:function(e){
    wx.showToast({
      title: '暂未开放',
      icon:'none'
    })
  },
  //会费缴费
  payMoney:function(e){
    wx.showToast({
      title: '暂未开放',
      icon:'none'
    })
  },
  //帮助
  help:function(e){
    wx.showToast({
      title: '暂未开放',
      icon: 'none'
    })
  },
  //建议
  tip:function(e){
    wx.navigateTo({
      url: 'tip',
    })
  },

  onLoad: function (opetion) {
    
   
  },

  onShow:function(e){
    //console.log(app.globalData.signatureWord)
    this.setData({
      signature: app.globalData.signatureWord
    })
  },
  getUserInfo: function (e) {
    var that = this;
    console.log(app.globalData.openid);
    wx.request({ 
      //url:'http://localhost:8080/wx_MyGis/user?method=updateUserInfo',
      //url: 'https://www.snake8859.top/wx_MyGis/user?method=updateUserInfo',
      //url: 'http://localhost:8080/user/login',
      //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/user/login',
      //url: testHttpURL+'/user/login',
      url: httpURL + '/user/login',
      data: {
        openid: app.globalData.openid,
        nickname: e.detail.userInfo.nickName,
        sex: e.detail.userInfo.gender,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (wxResult) {
        //console.log(wxResult.data.status);
        state = wxResult.data.status;
        if (state == "0") {
          wx.showModal({
            title: '温馨提示',
            content: '请先填写报名表!',
          })
        }
        if (state == "1"||state=="2") {
          //console.log(e)
          app.globalData.userInfo = e.detail.userInfo
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })

          wx.request({
            //url: 'http://localhost:8080/wx_MyGis/user?method=getSignature',
            //url:'https://www.snake8859.top/wx_MyGis/user?method=getSignature',
            //url: 'http://localhost:8080/user/getSignature',
            //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/user/getSignature',
            //url: testHttpURL+'/user/getSignature',
            url: httpURL + '/user/getSignature',
            data: {
              openid: app.globalData.openid
            },
            success: function (wxResult) {
              //console.log(wxResult.data);
              var signatureWord = wxResult.data.data;
              if (signatureWord != "0") {
                that.setData({
                  signature: signatureWord
                })
              }
            }
          })

        }
        if (state == "3"||state=="4"){
          wx.showModal({
            title: '温馨提示',
            content: '登录失败，请重新尝试，若还未成功，联系管理员(qq:654285370)',
          })
        }
      }
    }) 


  }
})
