import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NetworkApiService } from 'src/app/services/network-api.service';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.page.html',
  styleUrls: ['./emergency-contacts.page.scss'],
})
export class EmergencyContactsPage implements OnInit {

  contactsData: any[];
  constructor(private progresBarService: ProgressBarService,
    private apiService: NetworkApiService) {

    this.getDataFromServer();
  }

  ngOnInit() {
  }

  dialNumber(contactNumber: string) {

    window.open('tel:' + contactNumber, '_system');
  }

  async getDataFromServer() {
    this.progresBarService.show();
    let data = await this.apiService.getEmergencyContacts();
    this.progresBarService.hide();
    if (data.response) {
      this.contactsData = data.response.data;
    }
    console.log(data);
  }

}
