import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { Router } from '@angular/router';
import { NetworkApiService } from 'src/app/services/network-api.service';
import { Constants } from 'src/app/utils/Constants';
@Component({
  selector: 'app-enter-mpin',
  templateUrl: './enter-mpin.page.html',
  styleUrls: ['./enter-mpin.page.scss'],
})
export class EnterMpinPage implements OnInit {
  enterPasscode: string = "";
  rowInput: boolean = true;
  isWrongPin: boolean = false;
  constructor(private userDetailService: UserDetailService,
    public progresBarService: ProgressBarService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
    public apiCtrl: NetworkApiService,
    private router: Router) { }

  ngOnInit() {
  }

  add(value) {
    if (this.enterPasscode.length < 4) {
      this.enterPasscode = this.enterPasscode + value;
      if (this.enterPasscode.length == 4) {
        this.goForDashboard(this.enterPasscode);
      }
    }
  }

  async  goForDashboard(enteredPasscode: string) {
    if (!this.apiCtrl.isConnectedToNetwork) {
      this.toastCtrl.showSimpleToast(Constants.MSG_INTERNET_ERROR)
      return;
    }

    let storedMpin = await this.appStorage.getUserMPIN();

    if (storedMpin === enteredPasscode) {
      this.progresBarService.show();
      setTimeout(() => {
        this.progresBarService.hide();
        this.router.navigate(['/about-us'], { replaceUrl: true });
      }, 1000);
    } else {
      this.isWrongPin = true;
      setTimeout(() => {
        this.enterPasscode = "";
        this.isWrongPin = false;
      }, 1000);
      this.toastCtrl.showSimpleToast("Please enter a valid mPIN");
    }
  }

  remove() {
    if (this.enterPasscode.length > 0) {
      this.enterPasscode = this.enterPasscode.substring(
        0,
        this.enterPasscode.length - 1
      );
    }
  }
  async  onPressForgotmPIN() {

    await this.appStorage.clearAllItems();

    this.router.navigate(['/login'], { replaceUrl: true });

  }
}
