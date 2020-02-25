import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {


  imageURL: string;
  data: any;
  constructor(public api: NetworkApiService) {

    this.getAboutUsContent();
  }

  ngOnInit() {

  }

  async getAboutUsContent() {
    let data = await this.api.aboutUs();
    if (data.response.isSuccess) {
      this.data = data.response.data;
      this.imageURL = Constants.BASE_IMAGE_URL + this.data.url;
      console.log("RESPONSE Success", this.imageURL);
    } else {
      console.log("RESPONSE failed");
    }
  }
}
