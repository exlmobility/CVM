import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { Constants } from 'src/app/utils/Constants';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserDetailService } from 'src/app/services/user-detail.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {


  imageURL: string;
  data: any;
  constructor(public api: NetworkApiService,
    public progresBarService: ProgressBarService,
    private toastCtrl:ToastService, 
    private userDetailService: UserDetailService,
    public router: Router) {

    this.getAboutUsContent();
  }

  ngOnInit() {

  }

  async getAboutUsContent() {

    if (!this.api.isConnectedToNetwork) {
      this.toastCtrl.showSimpleToast(Constants.MSG_INTERNET_ERROR)

      return;
    }

    this.progresBarService.show();
    let data = await this.api.aboutUs();
    this.progresBarService.hide();
    if (data.response.isSuccess) {
      this.data = data.response.data;
      this.imageURL = Constants.BASE_IMAGE_URL + this.data.url;
      console.log("RESPONSE Success", this.imageURL);
    } else {
      console.log("RESPONSE failed");
    }
  }

 async onContinue() {
    if (!this.api.isConnectedToNetwork) {
      this.toastCtrl.showSimpleToast(Constants.MSG_INTERNET_ERROR)
      return;
    }
   this.progresBarService.show();
   let visitLists = await this.api.continueFromAboutUS(this.userDetailService.userDetail.Employee_Id);
   this.progresBarService.hide();

   console.log("continue :- " , JSON.stringify(visitLists));
   this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
}
