var app=getApp()

// pages/detail/detail.js
Page({
         
         
  /**
   * 页面的初始数据
   */
  data: {
   id:'',
   detailList:''
  },
  getDetail:function(){
    let that=this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/querybyid',
      data:{id:this.data.id},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res){
       that.setData({
         "detailList":res.data
       })
      },
    })
  },
  addCart:function(){
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/addtocart',
      data: { 
        userid:app.globalData.name,
        pid: this.data.id 
      },
      method:'GET',
      header: { 'content-type': 'application/json'},
      success(res){
        if((res.data)=="success"){
         wx.showToast({
           title: '添加成功',
           duration:1000
         })
        }
      }
    })
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
     "id":options.id,
    });
    this.getDetail();
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