import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/Constants';


@Component({
  selector: 'app-agenda-details',
  templateUrl: './agenda-details.page.html',
  styleUrls: ['./agenda-details.page.scss'],
})
export class AgendaDetailsPage implements OnInit {
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  selectedAgenda:any;
  eventList:any;

  constructor(private userCtrl: UserDetailService,
    public progresBarService: ProgressBarService,
    public apiCtrl : NetworkApiService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
    private router: Router) { }

 async ngOnInit() {

  this.selectedAgenda =  this.userCtrl.getSelectedAgenda();

  console.log("agendas:- " , this.selectedAgenda);

  try {
    this.progresBarService.show();
    let response = await this.apiCtrl.getEventLists(this.selectedAgenda.Agenda_id);
    this.progresBarService.hide();

    if(response.response.isSuccess == 'true' && response.response.data.length > 0){

      this.eventList = response.response.data;

    }else{

      if(response.response.error != null && response.response.error.error_code == 401){

        this.appStorage.clearAllItems();
        this.userCtrl.tokenExpired();

      }else{
        this.toastCtrl.showSimpleToast(Constants.EventNotAvailable);
      }

    }

    console.log("Events:-" , JSON.stringify(response));

  } catch (error) {

    this.toastCtrl.showSimpleToast(error);
    
  }

    
  }

  getDay(agendaDate:any){
    let date = new Date(agendaDate);
    return date.getDate();
  }

  getMonth(agendaDate:any){
   let date = new Date(agendaDate);
   return this.months[date.getMonth()];
  }

  goToEventTitle(selectedEvent){
    this.userCtrl.setSelectedEvent(selectedEvent);
    this.router.navigateByUrl('/event-details',{replaceUrl:true});
  }
}

