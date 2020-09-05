// pages/apply/apply_success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //返回首页
  backToIndex:function(e){
      wx.switchTab({
        url: '../index/index',
      })
  }
})