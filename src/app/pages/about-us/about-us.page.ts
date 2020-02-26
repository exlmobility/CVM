import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { Constants } from 'src/app/utils/Constants';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { Router } from '@angular/router';

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
    public router: Router) {

    this.getAboutUsContent();
  }

  ngOnInit() {

  }

  async getAboutUsContent() {
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

  onContinue() {
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
}
