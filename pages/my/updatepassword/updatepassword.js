var app=getApp()

// pages/my/updatepassword/updatepassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   password:''
  },
  checkPassword(e){
    let that=this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/queryuserbypassword',
      data: {
        userid: app.globalData.name,
        password: e.detail.value
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success(res){
        if(res.data!=''){
        }else{
          wx.showModal({
            title: '',
            content: '原密码错误!',
            showCancel:false
          })
  
        }
      }
    })

  },
  changePassword(){
   let that=this;
   wx.request({
     url: 'http://www.tingbao.top:8848/testmyshop/updatepassword',
     data: {
       userid:app.globalData.name,
       password: this.data.password
     },
     method: 'GET',
     header: { 'content-type': 'application/json' },
     success(res){
       wx.showModal({
         title: '温馨提示',
         content: '密码已修改,请重新登录',
         showCancel:false,
         success(res){
           wx.navigateTo({
             url: '/pages/login/login',
           })
         }
       })
       
     }
   })
  },

  getPassword(e) {
    let that = this;
    if (e.detail.value == '') {
      wx.showToast({
        title: '密码不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.length < 6) {
      wx.showToast({
        title: '密码不能少于6位!',
        icon: 'none'
      })
    } else {
      that.setData({
        "password": e.detail.value
      })
    }
  },
  againPassword(e) {
    let that = this;
    if (this.data.password != '' && this.data.password != e.detail.value) {
      wx.showToast({
        title: '两次输入密码不一样!',
        icon: 'none'
      })
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