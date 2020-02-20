import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
 
@Component({
  selector: 'app-set-mpin',
  templateUrl: './set-mpin.page.html',
  styleUrls: ['./set-mpin.page.scss'],
})
export class SetMpinPage implements OnInit {
  enterPasscode: string = "";
  setPasscode: string = "";
  rowInput: boolean = true;

 
  userName: string = "";
  passWord: string = "";
  token: string;
  employee_no: string;
  designation: string;
  fullName: string;
  lanId: string;

  isWrongPin: boolean = false;
  constructor(private userDetailService: UserDetailService, 
    public progresBarService: ProgressBarService,
    private toastCtrl:ToastService,
    private appStorage : AppStorageService,
    private router: Router) { }

  ngOnInit() {
  }

  add(value) {
    //this.passcode = value;
    if (this.enterPasscode.length == 3) {
      this.enterPasscode = this.enterPasscode + value;
      this.matchAndSetMpin();
    } else if (this.setPasscode.length >= 4) {
      this.enterPasscode = this.enterPasscode + value;
    } else {
      this.setPasscode = this.setPasscode + value;
    }
  }

  matchAndSetMpin() {
    if (this.enterPasscode != this.setPasscode) {
      this.isWrongPin = true;
      this.toastCtrl.showSimpleToast("Enter mPIN & Confirm mPIN does not match.");
      setTimeout(() => {
        this.isWrongPin = false;
        this.enterPasscode = "";
        this.setPasscode = "";
      }, 1000);
    } else {
      this.progresBarService.show();
      this.saveUserData();
      setTimeout(() => {
        this.appStorage.setUserMPIN(this.setPasscode);
        this.progresBarService.hide();
       // this.router.navigate(['/home'], { replaceUrl: true });
      }, 1000);
    }
  }

  remove() {
    if (this.enterPasscode.length > 0) {
      this.enterPasscode = this.enterPasscode.substring(
        0,
        this.enterPasscode.length - 1
      );
    } else if (this.setPasscode.length > 0) {
      this.setPasscode = this.setPasscode.substring(
        0,
        this.setPasscode.length - 1
      );
    } else if (this.enterPasscode.length == 0) {
      this.setPasscode = this.setPasscode.substring(
        0,
        this.setPasscode.length - 1
      );
    }
  }


  async  saveUserData() {
    let resposeData = this.userDetailService.loginResponseData;

    

    this.token = resposeData.data.access_token;
    this.employee_no = resposeData.data.Employee_Number;
    this.designation = resposeData.data.Desgination;
    this.fullName = resposeData.data.Name;
    this.lanId = resposeData.data.UserName;
    this.userDetailService.authToken = this.token;
    this.userDetailService.userLanId = this.lanId;
    this.userDetailService.userDesignation = this.designation;
    this.userDetailService.userFullName = this.fullName;
    this.userDetailService.employeeNumber = this.employee_no;
    await this.saveToStorage();
     
  }
  private saveToStorage() {
    this.appStorage.setAuthToken(this.token);
    this.appStorage.setDesignation(this.designation);
    this.appStorage.setEmpNo(this.employee_no);
    this.appStorage.setFullName(this.fullName);
    this.appStorage.setUsername(this.lanId);
    this.appStorage.setUserLoggedin('yes');
    return Promise.resolve()
  }

}
