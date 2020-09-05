// pages/apply/apply.js
/*var collegeItems = ["林学院", "生命科学与技术学院", "材料科学与工程学院", "机电工程学院", "物流与交通学院", "风景园林学院", "家具与艺术设计学院", "计算机与信息工程学院", "土木工程学院", "食品科学与工程学院", "环境科学与工程学院", "理学院", "商学院", "经济学院", "外国语学院", "旅游学院", "政法学院", "马克思主义学院", "音乐学院", "体育学院", "国际学院", "班戈学院", "继续教育学院", "涉外学院", "北京教学点"]*/


//获取应用实例
const app = getApp();
//接口地址
const httpURL = app.globalData.httpURL
//测试接口地址
const testHttpURL = app.globalData.testHttpURL

var collegeItems = [];
var selfIntroduce="";
var joinPurpose="";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    college: "请选择你的学院",
    error:"提示错误",
    collegeItem: [],
    collegeCodeIndex:0,
    flag:true,
    words1:0,
    words2:0,
    //c即代表用于清空
    cname:'',
    cstudentId:'',
    cmajor:'',
    cqq:'',
    cemail:'',
    ctelePhone:'',
    cseftIntrduce:'',
    cjoinPurpose:''
  },


  
  /**
   * 自定义函数
   */
  //表单提交
  submitForm:function(e){

    var that = this;
    var username = e.detail.value.username;
    var college = collegeItems[e.detail.value.college];
    var major = e.detail.value.major;
    var qq = e.detail.value.qq;
    var email = e.detail.value.email;
    var telePhone = e.detail.value.telePhone;
    var studentId = e.detail.value.studentId;
    //var selfIntroduce = e.detail.value.selfIntroduce;
    //var joinPurpose = e.detail.value.joinPurpose;
    var isSelfIntroduce = true;
    var isJoinPurpose =true;
    //检验所有字段非空
    if(username==""||college==""||major==""||qq==""||email==""||telePhone==""||selfIntroduce==""||joinPurpose==""){
      wx.showModal({
        title: '温馨提示',
        content: '同学，你有未填写项哦!',
      })
    }else{

    //检验用户名结果
    var isUsername = that.checkUsername(username);
    var isMajor = that.checkMajor(major);
    var isQQ = that.checkQQ(qq);
    var isEmail = that.checkEmail(email);
    var isTelPhone =that.checkTel(telePhone);
    if(selfIntroduce=="") isSelfIntroduce =false;
    if(joinPurpose=="") isJoinPurpose = false;
    
    if(isUsername&&isMajor&&isQQ&&isEmail&&isTelPhone&&isSelfIntroduce&&isJoinPurpose){
      
 
        //表单信息提交 
        wx.request({
          //url:'http://localhost:8080/wx_MyGis/user?method=setApplyInfo',
          //url: 'https://www.snake8859.top/wx_MyGis/user?method=setApplyInfo',
          //url:'http://localhost:8080/apply/getApplyInfo',
          //url: 'https://www.snake8859.top/wx-mygis-0.0.1-SNAPSHOT/apply/getApplyInfo',
          //url: testHttpURL+'/apply/getApplyInfo',
          url: httpURL + '/apply/getApplyInfo',
          data: {
            openid: app.globalData.openid,
            name: username,
            college: college,
            major: major,
            qq: qq,
            email: email,
            telephone: telePhone,
            selfintroduce: selfIntroduce,
            joinpurpose: joinPurpose,
            studentid : studentId
          },
          method:'POST',
          header: { 
            'content-type': 'application/x-www-form-urlencoded'
            },
          success: res => {
            
            //console.log(res);
            /*
              * 用户已存在(已填写报名表) -- 0
              * 保存成功     -- 1
              * 保存失败     -- 2
              * 其他情况     -- 3
            */
            //console.log(res.data);
            var state = res.data.status;
            if(state=="0"){
              wx.showModal({
                title: '温馨提示',
                content: '你已填写报名表\r\n(每个微信账号能填写一份)',
              })
            }
            if(state=="1"){
             wx.redirectTo({
               url: 'apply_success',
             })
            }
            if(state=="2"||state=="3"){
              wx.showModal({
                title: '温馨提示',
                content: '保存失败,请联系管理员(qq:654285370)或者建议里反馈(自我介绍和目的请不要用emjio表情)',
              })
            }
          }

        })    
    }
    }
  },

  //离焦获得自我介绍内容
  getWord1:function(e){
    //console.log(e);
    selfIntroduce = e.detail.value;
  },
  //离焦获得加入GIS协会目的内容
  getWord2:function(e){
    //console.log(e);
    joinPurpose = e.detail.value;
  },

  //检验用户名
   checkUsername:function(username){
    let cusername = username;
    let str = /^[\u4E00-\u9FA5]{2,}$/;
    if(str.test(cusername)){
      return true;
    }else{
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
  checkQQ:function(qq){
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
  checkTel:function(telPhone){
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
  checkWord:function(e){
    if (e.currentTarget.id=="textarea1"){
    this.setData({
      words1 : e.detail.cursor
    })
    }
    if (e.currentTarget.id == "textarea2"){
      this.setData({
        words2: e.detail.cursor
      })
    }
  },
 
  
  //选学院
  bindCollegeChange:function(e){
    //console.log(e);
    this.setData({
      collegeCodeIndex: e.detail.value,
      flag:false
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