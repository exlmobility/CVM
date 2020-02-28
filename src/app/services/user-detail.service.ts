import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { User } from './types/User';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  authToken: string = "";
  fcmToken: string = "";
  userDetail: User;
  
  metaData: any;
 
  clientVisit = [];

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

  async setClientVisit(visits:any){
    this.clientVisit = visits;
  }
  async getClientVisit(){
    return this.clientVisit;
  }

}
 