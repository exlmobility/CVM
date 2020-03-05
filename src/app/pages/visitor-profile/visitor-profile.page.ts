import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.page.html',
  styleUrls: ['./visitor-profile.page.scss'],
})
export class VisitorProfilePage implements OnInit {

  clientVisitData:any;
  visitorsData: any[];
  description = "";
  visitId = "";
  constructor(private userCtrl: UserDetailService,
    public progresBarService: ProgressBarService,
    public apiCtrl : NetworkApiService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
    private router: Router) { }

  async ngOnInit() {

    this.clientVisitData = await this.userCtrl.getSelectedVisit();
    this.visitId = this.clientVisitData.id;

    try {
      this.progresBarService.show();
      let response = await this.apiCtrl.getVisitorProfile(this.visitId);
      this.progresBarService.hide();

      if(response.response.isSuccess == 'true' && response.response.data.length > 0){
        this.visitorsData = response.response.data;
      }else{

        if(response.response.error != null && response.response.error.error_code == 401){

          this.appStorage.clearAllItems();
          this.userCtrl.tokenExpired();

        }else{
          this.toastCtrl.showSimpleToast(Constants.VisitorNotFound);
        }

      }

    } catch (error) {
      this.progresBarService.hide();
      if (error.response.error != null && error.response.error.error_code == 401) {

        this.appStorage.clearAllItems();
        this.userCtrl.tokenExpired();

      }else{
        this.toastCtrl.showSimpleToast(Constants.UnconditionError);
      } 
    }


  }
 
}
