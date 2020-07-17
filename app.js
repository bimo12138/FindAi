//app.js
App({
  login: function() {
    wx.login({
      timeout: 1500,
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.base_url + 'login/',
          data: {
              "code": res.code
          },
          success: res => {
              this.globalData.openid = res.data.openid;
          }
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  onLaunch: function () {
    // 登录
    this.login();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
            wx.getUserInfo({
              complete: (res) => {console.log(res)},
            })
        }
      } 
    })
  },
  globalData: {
    userInfo: null,
    openid: "",
    base_url: "https://www.bimo12138.com.cn/apis/"
  }
})