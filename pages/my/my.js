var app = getApp()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '/images/temp/show.jpg',
    actionSheetHidden: true,
    userList: ''
  },
  actionSheetTap: function() {
    this.setData({
      "actionSheetHidden": !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function() {
    this.setData({
      "actionSheetHidden": !this.data.actionSheetHidden
    })
  },

  chooseimage: function() {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        that.setData({
          "tempFilePaths": res.tempFilePaths,
        })
        that.actionSheetbindchange()
        console.log(res.tempFilePaths)
      }
    })
  },
  getUser() {
    let that = this;
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/queryuserbyonline',
      data: {
        username: app.globalData.name
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          "userList": res.data
        })
      }
    })
  },
  logout() {
    wx.request({
      url: 'http://www.tingbao.top:8848/testmyshop/logout',
      data: {
        userid: app.globalData.name
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })

  },
  deleteUser() {
    wx.showModal({
      title: '操作提示',
      content: '确定注销账号?',
      success(res) {
        if (res.cancel) {
          return
        } else {
          wx.request({
            url: 'http://www.tingbao.top:8848/testmyshop/deleteuser',
            data: {
              userid: app.globalData.name
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              wx.showToast({
                title: '注销成功',
                icon: "none",
                duration: 2000
              })
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
          })
        }
      }
    })
  },
  updatepassword() {
    wx.navigateTo({
      url: '/pages/my/updatepassword/updatepassword',
    })
  },
  goMyDetail() {
    wx.navigateTo({
      url: '/pages/my/mydetail/mydetail',
    })
  },
  userSafe() {
    wx.showToast({
      title: '检测中',
      icon: 'loading',
      duration: 2000
    })
    setTimeout(function() {
      wx.showModal({
        title: '温馨提醒',
        content: '当前账户无异常,请放心使用≧◉◡◉≦',
        showCancel: false
      })
    }, 2000)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUser()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})