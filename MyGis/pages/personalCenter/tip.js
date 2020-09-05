// pages/personalCenter/tip.js
const app =getApp();
//接口地址
const httpURL = app.globalData.httpURL
//测试接口地址
const testHttpURL = app.globalData.testHttpURL
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    screenHeight: 0
  },
  submitTip:function(e){
    var that = this;
    console.log(e);
    var tipWords = e.detail.value.tipWord;
    var telePhone = e.detail.value.telePhone;
    var isTelePhone = true;
    var isTipWords = true;
    if(tipWords==""){
      isTipWords =false;
      wx.showModal({
        title: '温馨提示',
        content: '输入内容不能为空',
      })
    }
    if(telePhone!=""){
      isTelePhone = that.checkTel(telePhone);
      if(isTelePhone==false){
        wx.showModal({
          title: '温馨提示',
          content: '请输入正确的电话号码格式',
        })
      }
    }
    else{
      isTelePhone =true;
    }
    if (isTipWords&&isTelePhone){
       wx.request({
         //url:'http://localhost:8080/wx_MyGis/user?method=setTip',
         //url: 'https://www.snake8859.top/wx_MyGis/user?method=setTip',
         //url: 'http://localhost:8080/user/setTip',
         //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/user/setTip',
         //url: testHttpURL+'/user/setTip',
         url: httpURL + '/user/setTip',
         data:{
          openid: app.globalData.openid,
          tipwords:tipWords,
          telephone:telePhone
         },
         success(wxResult){
           //console.log(wxResult.data.status);
           var state = wxResult.data.status;
           if(state == "0"){
             //保存成功  -- 0
             wx.showToast({
               title: '保存成功',
               icon:'successs',
               duration:2000
             })         
             setTimeout(function () {
               wx.switchTab({
                 url: 'personalCenter'
               })
             }, 2000) //延迟时间
           }
           else{
             wx.showModal({
               title: '温馨提示',
               content: '保存失败，请联系管理员处理(qq:654285370)',
             })
           }
         }
       })
    }
    
    
  },
  //校验手机号码
  checkTel: function (telPhone) {
    let cTelPhone = telPhone;
    let str = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    if (str.test(cTelPhone)) {
      return true;
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请填写正确的手机号格式',
      })
      return false;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: app.globalData.windowHeight,
      screenHeight: app.globalData.screenHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})