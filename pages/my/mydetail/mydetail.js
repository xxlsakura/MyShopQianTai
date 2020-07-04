var app=getApp()

// pages/my/mydetail/mydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:'',
    username:'',
    age:'',
    gender:'',
    address:'',
    phone:'',
    email:'',
    checkman:false,
    checkwoman:false,

    flag2:false,
    flag3:false
  },
    getUserList(){
     let that=this;
     wx.request({
       data:{
        username:app.globalData.name
       },
       method: 'GET',
       header: {
         'content-type': 'application/json'
       },
       url: 'http://www.tingbao.top:8848/testmyshop/queryuserbyonline',
       success(res){
         var u=res.data
         that.setData({
           "username":u[0].username,
           "phone":u[0].phone
         })
         for(var i=0;i<u.length;i++){
           if(u[i].gender=='男'){
             that.setData({
               "checkman":true
             })
           } else if (u[i].gender == '女'){
             that.setData({
               "checkwoman": true
             })
           }
         }
         that.setData({
           "userList":u
         })
       }
     })
    },
  radiochange(e){
    let that=this;
    that.setData({
      "gender":e.detail.value
    })
  },
  getUsername(e){
    let that=this;
    if (e.detail.value!=''){
      that.setData({
        "username": e.detail.value
      })
    }else{
      wx.showToast({
        title: '用户名不能为空!',
        icon:"none"
      })
    }
   
  },
  getAge(e){
    let that = this;
    var reg = /^[0-9]*$/;
    if (reg.test(e.detail.value)) {
      that.setData({
        "age": e.detail.value,
       
      })
    } else if (e.detail.value == '') {
    } else {
      wx.showToast({
        title: '请输入正确的年龄!',
        icon: 'none'
      })
    }
  },
  getAddress(e) {
    let that = this;
    that.setData({
      "address": e.detail.value
    })
  },
  getPhone(e) {
    let that = this;
    if (!(/^1[3456789]\d{9}$/.test(e.detail.value))) {
      wx.showToast({
        title: '请输入正确的手机号!',
        icon: 'none'
      })
    } else {
      that.setData({
        "phone": e.detail.value,
        "flag2":true
      })
    }
  },
  getEmail(e) {
    let that = this;
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(reg.test(e.detail.value)){
      that.setData({
        "email":e.detail.value,
        "flag3":true
      })
    } else if (e.detail.value==''){
    }else{
      wx.showToast({
        title: '请输入正确的邮箱!',
        icon: 'none'
      })
    }
    
  },
  submit(){
    let that=this;
    if(this.data.username!=''&&this.data.phone!=''){
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/perfectuser',
        data: {
          userid:app.globalData.name,
          username: this.data.username,
          age: this.data.age,
          gender: this.data.gender,
          address: this.data.address,
          phone: this.data.phone,
          email: this.data.email,
        },
        method:"GET",
        header: { 'content-type': 'application/json' },
        success(res){
          that.setData({
            "userList":res.data
          })
          wx.showToast({
            title: '更新信息',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.showModal({
              title: '操作提示',
              content: '个人信息修改成功',
              showCancel: false
            })
          },1500)
        }
      })
    }else{
      wx.showToast({
        title: '用户名和手机号不能为空!',
        icon:"none"
      })
      return
    }
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList()
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