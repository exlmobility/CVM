import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { Constants } from 'src/app/utils/Constants';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { AppStorageService } from 'src/app/services/app-storage.service';

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
    private appStorage:AppStorageService,
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
    
   if(visitLists.response.isSuccess == 'true' && visitLists.response.data.length > 0){
    this.userDetailService.setClientVisit(visitLists.response.data);
    if(visitLists.response.data.length == 1){
      console.log("continue :- " , JSON.stringify(visitLists));

      this.userDetailService.setVisitSelected(true);
      this.userDetailService.setSelectedVisit(visitLists.response.data[0]);
      this.router.navigate(['/dashboard'], { replaceUrl: true });
      
    }
   }else{
    if(visitLists.response.error != null && visitLists.response.erro.error_code == 401){
      this.appStorage.clearAllItems();
      this.userDetailService.tokenExpired();
    }else{
      this.toastCtrl.showSimpleToast(Constants.NoVisitFound);
    }
   }

  //  {"response":
  //  {"isSuccess":"true",
  //  "data":[{"agenda":[],
  //  "id":6022,
  //  "title":"KT Visit for Utkarsh",
  //  "description":"",
  //  "startDate":"15 Jan 2019",
  //  "lastDate":"28 Jan 2019",
  //  "type":null,"image":null}],
  //  "error":null}}


   

  }
}
