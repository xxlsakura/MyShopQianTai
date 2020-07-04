// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    productList:[],
    name:''
  },
  getNavList:function(){
    let that=this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/querymenu',
      success(res){
        that.setData({
          "navList": res.data
        })
      }
    })
  },
  getProductList:function(){
    let that=this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/queryproduct',
      success(res){
        that.setData({
          "productList":res.data
        })
      }
    })
  },
  getName(e){
    let that=this;
      that.setData({
        "name": e.detail.value
      })
  },
  tiaoZhuan(e){
    wx.navigateTo({
      url: '/pages/show/show?name='+e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList();
    this.getProductList();
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