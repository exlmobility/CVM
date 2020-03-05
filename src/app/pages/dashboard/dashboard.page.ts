import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  title: string = "";
  visit: any;
  formatedDate = "";
  agendaList: any;
  months: any;

  constructor(private userCtrl: UserDetailService,
    public progresBarService: ProgressBarService,
    public apiCtrl: NetworkApiService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
    private router: Router) { }

  async ngOnInit() {

    this.visit = this.userCtrl.getSelectedVisit();
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.formatedDate = await this.userCtrl.getVisitDate(this.visit.startDate, this.visit.lastDate);
    let visitLists = await this.userCtrl.getClientVisit();

    try {
      this.progresBarService.show();
      let response = await this.apiCtrl.getAgendaLists(this.visit.id);
      this.progresBarService.hide();
      if (response.response.isSuccess == 'true' && response.response.data.length > 0) {

        this.agendaList = response.response.data;

      } else {
        if (response.response.error != null && response.response.error.error_code == 401) {

          this.appStorage.clearAllItems();
          this.userCtrl.tokenExpired();

        } else {
          this.toastCtrl.showSimpleToast(Constants.NoAgendaAvailable);
        }

      }

    } catch (error) {
      this.progresBarService.hide();
      console.log("error", JSON.stringify(error));
      this.toastCtrl.showSimpleToast(error);
    }

  }

  getDay(agendaDate: any) {
    let date = new Date(agendaDate);
    return date.getDate();
  }

  getMonth(agendaDate: any) {
    let date = new Date(agendaDate);
    return this.months[date.getMonth()];
  }

  getYear(agendaDate: any) {
    let date = new Date(agendaDate);
    return date.getFullYear();
  }

  GoToDashboardView(agenda: any) {
    if (agenda.TotalEvents > 0) {
      this.userCtrl.setSelectedAgenda(agenda);
      this.router.navigate(['/agenda-details'], { replaceUrl: true });
    } else {
      this.toastCtrl.showSimpleToast(Constants.EventNotAvailable);
    }
  }

  sliderOptionsClick(id) {

    switch (id) {
      case 0: {
        //statements; 
        break;
      }
      case 1: {
        //statements; 
        this.router.navigate(['/visitor-profile'], { replaceUrl: true });
        break;
      }
      case 2: {
        //statements; 
        break;
      }
      case 3: {
        //statements; 
        this.router.navigate(['/make-request'], { replaceUrl: true });
        break;
      }
      case 4: {
        //statements; 
        this.router.navigate(['/feedback'], { replaceUrl: true });
        break;
      }
      case 5: {
        //statements; 
        this.router.navigate(['/emergency-contacts'], { replaceUrl: true });
        break;
      }
      case 6: {
        //statements; 
        break;
      }
      case 7: {
        //statements; 
        break;
      }
      case 8: {
        //statements; 
        break;
      }
      case 9: {
        //statements; 
        break;
      }
      default: {
        //statements; 
        break;
      }
    }


  }


}



