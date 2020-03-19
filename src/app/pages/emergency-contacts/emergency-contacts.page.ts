import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.page.html',
  styleUrls: ['./emergency-contacts.page.scss'],
})
export class EmergencyContactsPage implements OnInit {

  contactsData: any[];
  clientVisitData: any;
  visit_id : "";
  constructor(private userCtrl: UserDetailService,
    public progresBarService: ProgressBarService,
    public apiCtrl: NetworkApiService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
    private router: Router) {

  // this.getDataFromServer();
  }

 async ngOnInit() {
  this.clientVisitData = this.userCtrl.getSelectedVisit();
  this.visit_id = this.clientVisitData.id;
  try {
    this.progresBarService.show();
    let response = await this.apiCtrl.getEmergencyContacts(this.visit_id);
    this.progresBarService.hide();
  
    if (response.response.isSuccess == 'true' && response.response.data.length > 0) {

         this.contactsData = response.response.data;
         
    } else {

      if (response.response.error != null && response.response.error.error_code == 401) {

        this.appStorage.clearAllItems();
        this.userCtrl.tokenExpired();

      } else {
        this.toastCtrl.showSimpleToast(Constants.UnconditionError);
      }

    }
  } catch (error) {
    this.progresBarService.hide();
    if (error.response.error != null && error.response.error.error_code == 401) {

      this.appStorage.clearAllItems();
      this.userCtrl.tokenExpired();

    } else {
      this.toastCtrl.showSimpleToast(Constants.UnconditionError);
    }
  }

  }

  dialNumber(contactNumber: string) {
    window.open('tel:' + contactNumber, '_system');
  }
 
}
