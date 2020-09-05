// pages/apply/apply_update.js
//获取应用实例
const app = getApp();
//接口地址
const httpURL = app.globalData.httpURL
//测试接口地址
const testHttpURL = app.globalData.testHttpURL

/*var collegeItems = ["林学院", "生命科学与技术学院", "材料科学与工程学院", "机电工程学院", "物流与交通学院", "风景园林学院", "家具与艺术设计学院", "计算机与信息工程学院", "土木工程学院", "食品科学与工程学院", "环境科学与工程学院", "理学院", "商学院", "经济学院", "外国语学院", "旅游学院", "政法学院", "马克思主义学院", "音乐学院", "体育学院", "国际学院", "班戈学院", "继续教育学院", "涉外学院", "北京教学点"];*/

var collegeItems = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    college: "请选择你的学院",
    error: "提示错误",
    collegeItem: [],
    
    //o即代表旧信息
    oname: '',
    ostudentId: '',
    omajor: '',
    oqq: '',
    oemail: '',
    otelePhone: '',
    oselfIntroduce: '',
    ojoinPurpose: '',
    ocollegeCodeIndex: 0
  },

  //表单提交
  submitForm: function (e) {

    //u代表更新的信息
    var that = this;
    var uusername = e.detail.value.username;
    var ucollege = collegeItems[e.detail.value.college];
    var umajor = e.detail.value.major;
    var uqq = e.detail.value.qq;
    var uemail = e.detail.value.email;
    var utelePhone = e.detail.value.telePhone;
    var ustudentId = e.detail.value.studentId;
    var uselfIntroduce = e.detail.value.selfIntroduce;
    var ujoinPurpose = e.detail.value.joinPurpose;
    var isSelfIntroduce = true;
    var isJoinPurpose = true;
    //检验所有字段非空
    if (uusername == "" || ucollege == "" || umajor == "" || uqq == "" || uemail == "" || utelePhone == "" || uselfIntroduce == "" || ujoinPurpose == "") {
      wx.showModal({
        title: '温馨提示',
        content: '同学，你有未填写项哦!',
      })
    } else {

      //检验用户名结果
      var isUsername = that.checkUsername(uusername);
      var isMajor = that.checkMajor(umajor);
      var isQQ = that.checkQQ(uqq);
      var isEmail = that.checkEmail(uemail);
      var isTelPhone = that.checkTel(utelePhone);
      if (uselfIntroduce == "") isSelfIntroduce = false;
      if (ujoinPurpose == "") isJoinPurpose = false;

      if (isUsername && isMajor && isQQ && isEmail && isTelPhone && isSelfIntroduce && isJoinPurpose) {

          //更新报名表信息
          wx.request({
            //url:'http://localhost:8080/wx_MyGis/user?method=updateApplyInfo',
            //url: 'https://www.snake8859.top/wx_MyGis/user?method=updateApplyInfo',
            //url: 'http://localhost:8080/apply/updateApplyInfo',
            //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/apply/updateApplyInfo',
            //url: testHttpURL+'/apply/updateApplyInfo',
            url: httpURL + '/apply/updateApplyInfo',
            data:{
              openid: app.globalData.openid,
              name: uusername,
              college: ucollege,
              major: umajor,
              qq: uqq,
              email: uemail,
              telephone: utelePhone,
              selfintroduce: uselfIntroduce,
              joinpurpose: ujoinPurpose,
              studentid: ustudentId
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(wxResult){
              var state = wxResult.data.status;
               if(state == "0"){
                 wx.showToast({
                   title: '修改成功',
                   icon:'success',
                   duration :2000,
                 })
                 setTimeout(function () {
                   wx.hideToast()
                   wx.switchTab({
                     url: '../personalCenter/personalCenter',
                   })
                 }, 2000)
               }
               else{
                 wx.showModal({
                   title: '温馨提示',
                   content: '修改失败，请联系管理员进行处理(qq:654285370)',
                 })
               }
            }
          })

       
      }
    }
  },

  //离焦获得自我介绍内容
  /*getWord1:function(e){
    //console.log(e);
    selfIntroduce = e.detail.value;
  },
  //离焦获得加入GIS协会目的内容
  getWord2:function(e){
    //console.log(e);
    joinPurpose = e.detail.value;
  },*/

  //检验用户名
  checkUsername: function (username) {
    let cusername = username;
    let str = /^[\u4E00-\u9FA5]{2,}$/;
    if (str.test(cusername)) {
      return true;
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '姓名不能带有数字,英文,至少为2个字以上',
      })
      return false;
    }
  },
  //检验专业
  checkMajor: function (major) {
    let cmajor = major;
    let str = /^[\u4E00-\u9FA50-9A-Za-z]+$/;
    if (str.test(major)) {
      return true;
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '专业不能特殊符号',
      })
      return false;
    }
  },
  //检验qq号
  checkQQ: function (qq) {
    let cqq = qq
    let str = /^[1-9][0-9]{4,11}$/;
    if (str.test(qq)) {
      return true;
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请填写正确的QQ号码格式',
      })
      return false;
    }
  },
  //校验邮箱
  checkEmail: function (email) {
    let cemail = email;
    let str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (str.test(email)) {
      return true;
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请填写正确的邮箱格式',
      })
      return false;
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
  //检查文本域字数
  checkWord: function (e) {
    if (e.currentTarget.id == "textarea1") {
      this.setData({
        words1: e.detail.cursor
      })
    }
    if (e.currentTarget.id == "textarea2") {
      this.setData({
        words2: e.detail.cursor
      })
    }
  },


  //选学院
  bindCollegeChange: function (e) {
    //console.log(e);
    this.setData({
      ocollegeCodeIndex: e.detail.value,
    })
  },

  //提示错误
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;//把this对象复制到临时变量that,否则访问不到原先的this对象中data，因为this会随着程序的执行过程中的上下文改变
    wx.request({
      //url: 'http://localhost:8080/common/getCollege',
      //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/common/getCollege',
      //url: testHttpURL+'/common/getCollege',
      url: httpURL + '/common/getCollege',
      success(wxResult) {
        //console.log(wxResult.data.data);
        var temp = wxResult.data.data;
        //json数据转为数组
        for (var i in temp) {
          collegeItems.push(temp[i].collegename);
        }
        //console.log(collegeItems);
        that.setData({
          collegeItem: collegeItems
        })
      }
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
    var that = this;
    wx.request({
      //url:'http://localhost:8080/wx_MyGis/user?method=getApplyInfo',
      //url: 'https://www.snake8859.top/wx_MyGis/user?method=getApplyInfo',
      //url: 'http://localhost:8080/apply/initApplyInfo',
      //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/apply/initApplyInfo',
      //url: testHttpURL+'/apply/initApplyInfo',
      url: httpURL + '/apply/initApplyInfo',
      data:{
        openid: app.globalData.openid
      },
      success:function(e){
        //console.log(e.data);
        
          //console.log(e.data);
          if(e.data!="0"){
            //o代表旧的信息
            var oname = e.data.data["0"].name;
            var ocollege = e.data.data["0"].college;
            var ocollegeIndex =0;
            //搜索学院号
            for (var i = 0; i < collegeItems.length;i++){
              if(collegeItems[i]==ocollege){
                ocollegeIndex = i;
              }
            }
            var omajor = e.data.data["0"].major;
            var oqq = e.data.data["0"].qq;
            var oemail = e.data.data["0"].email;
            var otelePhone = e.data.data["0"].telephone;
            var ostudentId = e.data.data["0"].studentid;
            var oselfIntroduce = e.data.data["0"].selfintroduce;
            var ojoinPurpose = e.data.data["0"].joinpurpose;
            that.setData({
              oname: oname,
              ostudentId: ostudentId,
              omajor: omajor,
              oqq: oqq,
              oemail: oemail,
              otelePhone: otelePhone,
              oselfIntroduce: oselfIntroduce,
              ojoinPurpose: ojoinPurpose,
              ocollegeCodeIndex:ocollegeIndex
            })
          }
          else{
            wx.showModal({
              title: '温馨提示',
              content: '请先填写报名表',
              success:function(e){
                //转到报名表页面
                wx.switchTab({
                  url: 'apply',
                })
              }
            })
          }
      }
    })




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