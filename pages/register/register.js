// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   username:'',
   password:'',
   phone:''
  },
  getUsername(e){
    let that=this;
    if(e.detail.value!=''){
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/queryuserbyname',
        data: { username: e.detail.value},
        method:"GET",
        header: { 'content-type': 'application/json'},
        success(res){
          if(res.data==''){
            that.setData({
              "username": e.detail.value
            })
          }else{
            wx.showToast({
              title: '用户名重复!',
              icon: 'none'
            })
            return
          }
        }
      })
      
    }else{
      wx.showToast({
        title: '用户名不能为空!',
        icon:'none'
      })
    }
  },
  getPassword(e){
    let that = this;
    if (e.detail.value==''){
      wx.showToast({
        title: '密码不能为空!',
        icon: 'none'
      })
    }else if(e.detail.value.length < 6) {
      wx.showToast({
        title: '密码不能少于6位!',
        icon: 'none'
      })
    }else{
      that.setData({
        "password": e.detail.value
      })
    }
  },
  againPassword(e){
    let that = this;
     if(this.data.password != '' && this.data.password!=e.detail.value){
      wx.showToast({
        title: '两次输入密码不一样!',
        icon: 'none'
      })
    }
  },
  getPhone(e){
    let that = this;
    if (!(/^1[3456789]\d{9}$/.test(e.detail.value))){
      wx.showToast({
        title: '请输入正确的手机号!',
        icon: 'none'
      })
    }else{
      that.setData({
        "phone": e.detail.value
      })
    }
  },
  submit(){
    let that=this;
    if (this.data.username != '' && this.data.password != '' && this.data.phone != ''){
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/adduser',
        data:{
          username: this.data.username,
          password: this.data.password,
          phone: this.data.phone
        },
        method:'GET',
        header: { 'content-type': 'application/json'},
        success(res){
          if(res.data=='success'){
            wx.showToast({
              title: '注册成功',
            })
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }else{
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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