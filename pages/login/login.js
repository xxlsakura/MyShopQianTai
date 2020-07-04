var app=getApp()
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
  },
    getUsername(e){
      let that=this;
      that.setData({
        "username":e.detail.value
      })
    },
    getPassword(e){
      let that = this;
      that.setData({
        "password": e.detail.value
      })
    },
    login(){
      let that=this;
      app.globalData.name = this.data.username
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/queryuser',
        data:{
          username:this.data.username,
          password: this.data.password
        },
        method:'GET',
        header: { 'content-type': 'application/json'},
        success(res){
           if(res.data!=''){
             
             console.log(app.globalData.name)
             wx.switchTab({
               url: '/pages/index/index',
             })
           }else{
             wx.showToast({
               title: '用户名或密码错误!',
               icon:'none'
             })
             return
           }
        }
      })
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
    wx.hideHomeButton({
      success:function(){
        console.log('success')
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
