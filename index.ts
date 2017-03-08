import {DomSanitizer} from '@angular/platform-browser'
import { Camera } from 'ionic-native';
import { Component } from '@angular/core';

declare var wx;
@Component({
  providers: [Camera]
})
export class IndexPage {
  serverId:any;
  profilePicture:any='assets/images/default.png';

  constructor(
    private domSanitizer:DomSanitizer
  ) {}
  
  takePhotoForWeChat(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localid = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        that.profilePicture = that.domSanitizer.bypassSecurityTrustUrl(localid);
        wx.uploadImage({
          localId: localid, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: upd_res=> {
            that.getWeChatImg(upd_res.serverId);// 返回图片的服务器端ID
          },fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      },fail: function (res) {
        alert(JSON.stringify(res));
      }
    })
  }
  choosePhotoForWeChat(){
    var localid = "";
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 'original', 'compressed'
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: res=> {
        localid = res.localIds[0];// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        this.profilePicture = this.domSanitizer.bypassSecurityTrustUrl(localid);
        wx.uploadImage({
          localId: localid, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: upd_res=> {
            var serverid = upd_res.serverId;// 返回图片的服务器端ID
            //通过serverid下载图片到本地
          },fail: function (upd_err) {
            alert(JSON.stringify(upd_err));
          }
        });
      },fail: function (err) {
        alert(JSON.stringify(err));
      }
    });
  }
  }
