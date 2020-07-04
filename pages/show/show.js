// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    productList:[]
  },
  getName(e){
    let that=this;
    that.setData({
      "name":e.detail.value
    })
  },
  getProductList(){
    let that=this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/querybyproductname',
      data: { name: this.data.name,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res){
        if(res.data!=''){
          that.setData({
            "productList": res.data
          })
        }else{
          wx.showModal({
            content: '你查询的商品不存在,看看其他商品吧',
          })
          wx.request({
            url: 'http://www.tingbao.top:8848/testmyshop/queryproduct',
            success(res){
              that.setData({
                "productList": res.data
              })
            }
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
      "name":options.name,
    })
    this.getProductList()
  },
  tiaoZhuan(e) {
    wx.navigateTo({
      url: '/pages/show/show?name=' + e.detail.value,
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