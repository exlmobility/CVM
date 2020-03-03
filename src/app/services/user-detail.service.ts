import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { User } from './types/User';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constants } from '../utils/Constants';
import { AppStorageService } from './app-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  authToken: string = "";
  fcmToken: string = "";
  userDetail: User;

  metaData: any;

  clientVisit = [];

  selectedVisit = {};

  selectedAgenda = {};

  visitSelected = false;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private device: Device,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router) {
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

  async setClientVisit(visits: any) {
    this.clientVisit = visits;
  }
  async getClientVisit() {
    return this.clientVisit;
  }

  async tokenExpired() {
    const alert = await this.alertController.create({
      header: 'Authentication Expired',
      message: Constants.LoginAgain,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();

  }

  getSelectedVisit() {
    return this.selectedVisit;
  }
  setSelectedVisit(visits:any) {
    this.selectedVisit = visits;
  }
  setVisitSelected(visit:any) {
    this.visitSelected = visit;
  }
  isVisitSelected() {
    return this.visitSelected;
  }

  getVisitDate(startDate:any, endDate:any) {
    let firstDate = new Date(startDate);
    let lastDate = new Date(endDate);
    let result: string = "";
    if (firstDate.getFullYear() == lastDate.getFullYear()) {
      if (firstDate.getMonth() == lastDate.getMonth()) {
        if (firstDate.getDate() == lastDate.getDate()) {
          result = this.months[firstDate.getMonth()] + ' ' + firstDate.getDate() + ', ' + firstDate.getFullYear();
        } else {
          result = this.months[firstDate.getMonth()] + ' ' + firstDate.getDate() + '-' + lastDate.getDate() + ', ' + firstDate.getFullYear();
        }
      } else {
        result = this.months[firstDate.getMonth()] + ' ' + firstDate.getDate() + '-' + this.months[lastDate.getMonth()] + ' ' + lastDate.getDate() + ', ' + firstDate.getFullYear();
      }
    } else {
      result = this.months[firstDate.getMonth()] + ' ' + firstDate.getDate() + ',' + firstDate.getFullYear() + '-' + this.months[lastDate.getMonth()] + ' ' + lastDate.getDate() + ', ' + lastDate.getFullYear();
    }
    return result;
  }


getSelectedAgenda(){
    return this.selectedAgenda;
}
setSelectedAgenda(agenda:any) {
    this.selectedAgenda = agenda;
}

}
