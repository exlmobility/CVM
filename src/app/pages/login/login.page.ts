import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/Constants';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string = "Hargopal97420";
  passWord: string = "egregregergerg";
  token: string;
     
  constructor(public apiCtrl: NetworkApiService,public progresBarService: ProgressBarService,private router: Router,private toastCtrl:ToastService) { }

  ngOnInit() {
    console.log("ngOnInit LoginPage");
  }
 
  async onPressLogin(){

    if (!this.apiCtrl.isConnectedToNetwork) {
      this.toastCtrl.showSimpleToast(Constants.MSG_INTERNET_ERROR)

      return;
    }


    if (!this.userName.trim()) {
      this.toastCtrl.showSimpleToast(Constants.MSG_USENAME_EMPTY)
      return
    }

    if (this.userName.trim().length < 8) {
      this.toastCtrl.showSimpleToast(Constants.MSG_INVALID_USERNAME)
      return
    }

    if (!this.passWord.trim()) {
      this.toastCtrl.showSimpleToast(Constants.MSG_PASSWORD_EMPTY)
      return
    }

    if (this.passWord.trim().length < 8) {
      this.toastCtrl.showSimpleToast(Constants.MSG_INVALID_PASSWORD)
      return
    }
    this.progresBarService.show();

    try {
      let resposeData = await this.apiCtrl.authenticateUser(this.userName.toUpperCase().trim(), this.passWord, "password")
      this.progresBarService.hide();
       
    } catch (error) {
      this.progresBarService.hide();
      var responseData: any;
      if (error.response) {
        responseData = error.response.data;
      }
      if (responseData) {
        var data = JSON.parse(JSON.stringify(responseData))
        console.log("Login error HTTP::" + data.error_description);
        this.toastCtrl.showSimpleToast(data.error_description);
      } else {
        this.toastCtrl.showSimpleToast(error);
      }
    }
  }

}
