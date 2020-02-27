import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NetworkApiService } from 'src/app/services/network-api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  selectedCategory: any
  feedbackCategories: any[]
  comment: string = ""

  constructor(private progressBarService: ProgressBarService,
    private networkApiService: NetworkApiService) {
    this.getFeedbackCategories();
  }

  ngOnInit() {
  }

  async getFeedbackCategories() {
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
