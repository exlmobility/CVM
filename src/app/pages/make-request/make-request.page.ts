import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NetworkApiService } from 'src/app/services/network-api.service';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.page.html',
  styleUrls: ['./make-request.page.scss'],
})
export class MakeRequestPage implements OnInit {

  information: string = "";
  selectedCategory: any
  feedbackCategories: any[]

  constructor(private progressBarService: ProgressBarService,
    private networkApiService: NetworkApiService) {
    this.getRequestCategories();
  }
  ngOnInit() {
  }


  async getRequestCategories() {
    this.progressBarService.show();
    let data = await this.networkApiService.getFeedbackCategories();
    this.progressBarService.hide();
    console.log(data);
    if (data.response) {
      this.feedbackCategories = data.response.data;
    }
    console.log(this.feedbackCategories.length);
  }

  onCategorySelect(data) {
    console.log("Change:: " + data)
  }

}
