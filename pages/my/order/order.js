const app=getApp();

// pages/my/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   uuid:'',
   id:'',
   money:'',
   productList:''
  },
  getProductList: function () {
    let that = this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/querybyproductidtoorder',
      data: { id: this.data.id },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var n=0
        var c=res.data;
        for(var i=0;i<c.length;i++){
          n=n+c[i].price*c[i].paynum
        }
        that.setData({
          "productList": c,
          "money":n
        })
      },
    })
  },
  getProductListFromCart(){
    let that=this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/queryfromcartorder',
      data: {
        userid: app.globalData.name,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res){
        var n = 0
        var c = res.data;
        for (var i = 0; i < c.length; i++) {
          n = n + c[i].price * c[i].paynum
        }
        that.setData({
          "productList": c,
          "money": n
        })
      }
    })
  },
  add: function (e) {
    let that = this;
    var id = e.currentTarget.dataset.text
    if(this.data.id!='a'){

      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/updateordernum',
        data: {
          id: id,
          msg: "add"
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var n = 0
          var c = res.data;
          for (var i = 0; i < c.length; i++) {
            n = n + c[i].price * c[i].paynum
          }
          that.setData({
            "productList": c,
            "money": n
          })
        }
      })
    }else{
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/updateorderpaynum',
        data: {
          pid: id,
          msg: "add",
          userid: app.globalData.name,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var n = 0
          var c = res.data;
          for (var i = 0; i < c.length; i++) {
            n = n + c[i].price * c[i].paynum
          }
          that.setData({
            "productList": c,
            "money": n
          })
        }
      })
    }
    
  },

  subtract: function (e) {
    let that = this;
    var id = e.currentTarget.dataset.text
    if (this.data.id != 'a'){
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/updateordernum',
        data: {
          id: id,
          msg: "subtract"
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var n = 0
          var c = res.data;
          for (var i = 0; i < c.length; i++) {
            n = n + c[i].price * c[i].paynum
          }
          that.setData({
            "productList": c,
            "money": n
          })
        }
      })
    }else{
      wx.request({
        url: 'http://www.tingbao.top:8848/testmyshop/updateorderpaynum',
        data: {
          pid: id,
          msg: "subtract",
          userid: app.globalData.name,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var n = 0
          var c = res.data;
          for (var i = 0; i < c.length; i++) {
            n = n + c[i].price * c[i].paynum
          }
          that.setData({
            "productList": c,
            "money": n
          })
        }
      })
    }
   
  },
  getUUID(){
    var withLine = false; //带不带横线
    var len = 20; //长度
    var radix = 16; //16进制
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (withLine) {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < len; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    } else {
      for (i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
      }
    }
    return uuid.join('');
  },
  show(){
    wx.showModal({
      title: '支付提示',
      content: '仅作演示,未接入支付接口~',
      showCancel:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var u=this.getUUID()
    if (options.id!='a'){
      this.setData({
        "id": options.id,
        "uuid": u
      })
      this.getProductList()
    }else{
      this.getProductListFromCart()
      this.setData({
        "uuid": u,
        "id": options.id,
      })
    }
    
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