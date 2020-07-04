const app=getApp()
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty:'',
    cartList:'',
    payMoney:0,
    selectAllText:"全选",
    chk:0
  },
  getCartList:function(){
    let that=this;
   wx.request({
     url: 'http://www.tingbao.top:8848/testmyshop/querycartbyuserid',
     data: {
       userid:app.globalData.name
     },
     method: 'GET',
     header: { 'content-type': 'application/json' },
     success(res){
       if(res.data!=""){
         that.setData({
           "cartList": res.data,
           "empty": '',
         })
       }else{
         that.setData({
           "empty":"空空如也,去添加喜欢的商品吧~"
         })
       }
       that.chkJudge()
     }
   })
  },
 
  add:function(e){
    var id=e.currentTarget.dataset.text
    let that = this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/updatepaynumbyuserid',
      data: { pid:id,
              userid:app.globalData.name,
              msg:"add"
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          "cartList": res.data,
        })
        that.getTotalPrice()
      }
    })
  },
  
  subtract: function (e) {
    var id = e.currentTarget.dataset.text
    let that = this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/updatepaynumbyuserid',
      data: {
        pid: id,
        userid: app.globalData.name,
        msg: "subtract"
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res){
        that.setData({
          "cartList": res.data,
        })
        that.getTotalPrice()
      }
    })
  },
  getTotalPrice(){
    let that=this;
    var c=this.data.cartList
    var sumPrice=0;
    for(var i=0;i<c.length;i++){
      if (c[i].selectedstatus==1){
        sumPrice+=c[i].paynum*c[i].price
      }
    }
    that.setData({
       "cartList":c,
       "payMoney":sumPrice
    })
  },
  checkboxChange:function(e){
    let that=this;
    var num=e.detail.value;
    var id=e.currentTarget.id;
    var r='';
    if(num!=''){
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/updateselectedstatus',
        data: {
          userid: app.globalData.name,
          pid: id,
          msg: "yes"
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res){
          that.setData({
            "cartList": res.data
          })
          that.getTotalPrice()
          that.chkJudge()
        }
      }) 
    }else{
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/updateselectedstatus',
        data: {
          userid: app.globalData.name,
          pid: id,
          msg: "no"
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          that.setData({
            "cartList": res.data
          })
          that.getTotalPrice()
          that.chkJudge()
        }
      })
    }
    
  },
  
    chkJudge(){
      let that=this;
      var c=this.data.cartList;
      var x=0;
      for(var i=0;i<c.length;i++){
         x+=c[i].selectedstatus
      }if(c.length!=0&&x==c.length){
       that.setData({
         "chk":1,
         "cartList":c,
       })
        that.selectAllTextJudge()
      }else{
        that.setData({
          "chk": 0,
          "cartList": c,
        })
        that.selectAllTextJudge()
      } 
    },
    selectAllTextJudge(){
      let that = this;
      var c=this.data.chk;
      if(c==1){
        that.setData({
          "selectAllText":"全不选"
        })
      }else{
        that.setData({
          "selectAllText": "全选"
        })
      }
    },
    allSelected(){
      let that=this
      var flag
      var chk=this.data.chk
      if(chk==0){flag=true ,chk=1}
      else{flag=false ,chk=0}
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/updateallselectedstatus',
        data: {
          userid: app.globalData.name,
          msg: flag
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res){
          that.setData({
            "cartList":res.data,
            "chk":chk
          })
          that.chkJudge()
          that.selectAllTextJudge()
          that.getTotalPrice()
        }
      })
  },
    deleteProduct(){
      let that=this
      var clist=this.data.cartList
      var p=0
      for(var i=0;i<clist.length;i++){
       p+=clist[i].selectedstatus
      }
      if(p==0){
        wx.showModal({
          title: '操作提示',
          content: '请先选择要删除的商品',
          showCancel:false
        })
        return
      }
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/deletecart',
        data: {
          userid: app.globalData.name
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res){
          that.setData({
            "cartList": res.data
          })
          that.chkJudge()
          that.selectAllTextJudge()
          that.getTotalPrice()
          that.getCartList()
        }
      })
    },
    toPay(){
      let that=this;
      var p=this.data.payMoney;
      if(p!=0){
        wx.navigateTo({
          url: '/pages/my/order/order?id=a',
        })
      }else{
        wx.showModal({
          title: '操作提示',
          content: '请先选择要购买的商品',
          showCancel: false
        })
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
   this.getCartList()
   this.getTotalPrice()
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