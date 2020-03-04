import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  eventDetails:any;
  startDate: any;
  colors=["#BDBDBD","#A4A4A4"];
  colorToShow = [];

  constructor(private userCtrl: UserDetailService,
    public progresBarService: ProgressBarService,
    public apiCtrl : NetworkApiService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
    private router: Router) { }

  async ngOnInit() {

  //   this.eventDetails = this.userCtrl.getSelectedEvent();
  //   this.startDate = new Date(this.eventDetails.EventDate);
    
  //   for (var i = 0; i < this.eventDetails.Participants.length; i++) {

  //     if (i % 2 == 0) {
  //         this.colorToShow.push(this.colors[1]);
  //     } else {
  //        this.colorToShow.push(this.colors[0]);
  //     }
  // }

  }

  getColorCode(){
    let i = Math.floor(Math.random() * 4);
    let color = this.colors[i];
    return color;
  }

}





// {
//   "response":{
//      "isSuccess":"true",
//      "data":[
//         {
//            "EventId":7009,
//            "EventTitle":"Dinne With Utkarash",
//            "EventDate":"16 Jan 2019",
//            "StartTime":"18:00",
//            "EndTime":"22:00",
//            "EventDesc":"This is Dinne for the Day",
//            "type":"Dinner",
//            "location":null,
//            "description":null,
//            "image":null,
//            "geoCoordinate":null,
//            "Participants":[
//               {
//                  "ParticipantId":6027,
//                  "Employee_id":"97420",
//                  "fullName":"Hargopal Singh",
//                  "description":"",
//                  "designation":"Senior Manager",
//                  "LOB":"Global Technology",
//                  "profilePicUrl":""
//               }
//            ],
//            "Visitors":[
//               {
//                  "VisitId":0,
//                  "Employee_id":"6066",
//                  "fullName":"Utkarsh Joshi",
//                  "description":"Utkarsh is taking the KT of this application from Nasib",
//                  "designation":"",
//                  "profilePicUrl":"ImgCustomer_06066.png",
//                  "IsExecutiveleadership":false,
//                  "IsMeetingParticipant":false,
//                  "metaData":null
//               }
//            ]
//         }
//      ],
//      "error":null
//   }
// }