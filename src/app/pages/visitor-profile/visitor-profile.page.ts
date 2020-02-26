import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.page.html',
  styleUrls: ['./visitor-profile.page.scss'],
})
export class VisitorProfilePage implements OnInit {

  visitorsData: any[]
  description = "Utkarsh is taking the KT of this application from nasib. Utkarsh is taking the KT of this application from nasib. Utkarsh is taking the KT of this application from nasib. Utkarsh is taking the KT of this application from nasib. Utkarsh is taking the KT of this application from nasib."
  constructor(private apiService: NetworkApiService,
    public progresBarService: ProgressBarService) {
    this.getDataFromServer();
  }

  ngOnInit() {
  }

  async getDataFromServer() {
    this.progresBarService.show();
    let data = await this.apiService.getVisitorProfile();
    this.progresBarService.hide();
    if (data.response) {
      this.visitorsData = data.response.data;
    }
    console.log(data);
  }

}
