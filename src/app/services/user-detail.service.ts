import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  authToken: string = "";
  fcmToken: string = "";
  Employee_Id: string ="";
  Emp_Name :string ="";
  USER_NAME :string="";
  EMAIL_ID :string ="";
  GRADE :string="";
  JOB :string ="";
  LOCATION :string = "";
  COUNTRY:string ="";
  USER_TYPE :string ="";
 
  loginResponseData: any;

  userDetailsData:any;
  
  metaData: any;


  constructor(private device: Device, private platform: Platform) {
    var appVersion = "0.0.0";
    var ipAddress = "";
    this.metaData = {
      deviceType: this.device.platform,
      appVer: appVersion,
      deviceId: this.device.uuid,
      networkType: "",
      ipAddress: ipAddress
    };

  }
  async getMetaData() {
    return this.metaData;
  }
}
 