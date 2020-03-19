import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.page.html',
  styleUrls: ['./make-request.page.scss'],
})
export class MakeRequestPage implements OnInit {

  selectedCategory: any
  feedbackCategories: any[0]
  comment: string = ""
  clientVisitData: any;
  selected_cat_id: number = 0;

  constructor(private userCtrl: UserDetailService,
    public progresBarService: ProgressBarService,
    public apiCtrl: NetworkApiService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
    private router: Router) {
 
  }
  async ngOnInit() {

    this.clientVisitData =  this.userCtrl.getSelectedVisit();
    try {
      this.progresBarService.show();
      let response = await this.apiCtrl.getFeedbackCategories();
      this.progresBarService.hide();

      if (response.response.isSuccess == 'true' && response.response.data.length > 0) {
        this.feedbackCategories = response.response.data;
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

  onCategorySelect(data:any) {
    // console.log("Change:: " + data);
    this.selected_cat_id = data;
  }


  async submitRequest() {

    if (this.selectedCategory == undefined && this.comment == undefined || this.comment == null || this.comment == "") {
      this.toastCtrl.showSimpleToast(Constants.ValidationFeedbackAll);
      return;
    }

    if (this.selectedCategory == undefined) {
      this.toastCtrl.showSimpleToast(Constants.ValidationFeedbackOption);
      return;
    }

    if (this.comment == undefined || this.comment == null || this.comment == "") {
      this.toastCtrl.showSimpleToast(Constants.ValidationFeedbackComment);
      return;
    }

    try {
      this.progresBarService.show();

      let cat_id = this.selected_cat_id;
      let employee_Id = await this.appStorage.getUsername();
      let visit_id = this.clientVisitData.id;
      let comment = this.comment;
      let emp_Name = await this.appStorage.geFullName();

      let response = await this.apiCtrl.submitFeedbackReport(cat_id, employee_Id, visit_id, comment, emp_Name);

      this.progresBarService.hide();

      if (response.response.isSuccess == 'true') {

        this.comment = "";
        this.selectedCategory = this.selectedCategory[0];
        this.toastCtrl.showSimpleToast(response.response.data.message);

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
      if (error.data.response.error != null && error.data.response.error.error_code == 401) {
        this.appStorage.clearAllItems();
        this.userCtrl.tokenExpired();
      } else {
        this.toastCtrl.showSimpleToast(Constants.UnconditionError);
      }
    }

  }

  // async getRequestCategories() {
  //   this.progressBarService.show();
  //   let data = await this.networkApiService.getFeedbackCategories();
  //   this.progressBarService.hide();
  //   console.log(data);
  //   if (data.response) {
  //     this.feedbackCategories = data.response.data;
  //   }
  //   console.log(this.feedbackCategories.length);
  // }

  // onCategorySelect(data) {
  //   console.log("Change:: " + data)
  // }

}
