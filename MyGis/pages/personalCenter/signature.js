// pages/personalCenter/signature.js
const app = getApp();
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
  changeSignature:function(e){
    var signatureWord = e.detail.value.signatureWord;
    
    if(signatureWord!=""){

      wx.request({
        //url: 'http://localhost:8080/wx_MyGis/user?method=setSignature',
        //url: 'https://www.snake8859.top/wx_MyGis/user?method=setSignature',
        //url: 'http://localhost:8080/user/setSignature',
        //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/user/setSignature',
        //url: testHttpURL+'/user/setSignature',
        url: httpURL + '/user/setSignature',
        data: {
          signatureword: signatureWord,
          openid: app.globalData.openid
        },
        success: function (wxResult) {
          var state = wxResult.data.status;
            if(state =="0"){
              app.globalData.signatureWord = signatureWord;
              wx.showToast({
                title: '设置成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.hideLoading()
                wx.switchTab({
                  url: 'personalCenter',
                })
              }, 2000)
            }
            else{
              wx.showModal({
                title: '温馨提示',
                content: '保存失败，请不要使用表情(若不是这个情况,请联系管理员处理(qq:6542855370))',
              })
            }
        }
      })
    }
    else{
      wx.showToast({
        title: '输入内容不能为空',
        icon:'none'
      })
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