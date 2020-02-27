import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/Constants';
import { ToastService } from 'src/app/services/toast.service';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string = "Hargopal97420";
  passWord: string = "egregregergerg";
  token: string;
     
  constructor(public apiCtrl: NetworkApiService,
    public progresBarService: ProgressBarService,
    private router: Router,
    private appLauncher: AppLauncher,
    private iab: InAppBrowser,
    private toastCtrl:ToastService, 
    private platform: Platform,
    private userDetailService: UserDetailService) { }

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
      let responseData = await this.apiCtrl.authenticateUser(this.userName.toUpperCase().trim(), this.passWord);

      console.log("responseData:- " , JSON.parse(responseData.data)); 
      let response = JSON.parse(responseData.data);
      this.userDetailService.authToken = response.access_token;
      if(response.access_token){
        let userDetails = await this.apiCtrl.callGetUserData(response.userName.trim());
 
        console.log("userDetails", userDetails.response.isSuccess);


        if(userDetails.response.isSuccess == "true"){
          console.log("### :- " ,userDetails.response.data.userDetail);
          this.userDetailService.userDetailsData = userDetails.response.data.userDetail;
        }
        this.progresBarService.hide();
        this.router.navigate(['/set-mpin'], { replaceUrl: true });
        console.log("UserData :- " , userDetails);
      }


    //  {"error":"invalid_grant","error_description":"You seemed to have entered the wrong username / password."}
     // this.userDetailService.loginResponseData = resposeData;
    //  this.progresBarService.hide();
     // this.router.navigate(['/set-mpin'], { replaceUrl: true });       
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


  onPressForgotPassword() {
    const options: AppLauncherOptions = {
    }
    if (this.platform.is('ios')) {
      options.uri = 'pwdreset://';

      this.appLauncher.canLaunch(options)
        .then((canLaunch: boolean) => {
          this.appLauncher.launch(options);
        }).catch((error: any) => {
          this.iab.create('https://itunes.apple.com/in/app/password-self-service/id1313722688');
        });
    } else {
      options.packageName = 'com.exl.pss';

      this.appLauncher.canLaunch(options)
        .then((canLaunch: boolean) => {
          this.appLauncher.launch(options);
        }).catch((error: any) => {
          this.iab.create('https://play.google.com/store/apps/details?id=com.exl.pss&hl=en');
        });
    }
  }



}
