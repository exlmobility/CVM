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

  passWord: string = ""; 
  token: string ="";

  employee_Id: string = "";
  emp_name: string = "";
  userName: string = "";
  email_id:string = "";
  grade:string = "";
  job: string = "";
  location:string = "";
  country:string = "";
  user_type:string = "";
 

  isWrongPin: boolean = false;
  constructor(private userDetailService: UserDetailService,
    public progresBarService: ProgressBarService,
    private toastCtrl: ToastService,
    private appStorage: AppStorageService,
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
        this.router.navigate(['/about-us'], { replaceUrl: true });
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
    let responseData = this.userDetailService.userDetailsData;
     this.token = this.userDetailService.authToken;
     this.employee_Id = responseData.Employee_Id;
     this.emp_name = responseData.Emp_Name;
     this.userName = responseData.USER_NAME;
     this.email_id = responseData.EMAIL_ID;
     this.grade = responseData.GRADE;
     this.job = responseData.JOB;
     this.location = responseData.LOCATION;
     this.country = responseData.COUNTRY;
     this.user_type = responseData.USER_TYPE;
     await this.saveToStorage();

  }
  private saveToStorage() {
  
    this.appStorage.setAuthToken(this.token);
    this.appStorage.setDesignation(this.job);
    this.appStorage.setEmpNo(this.employee_Id);
    this.appStorage.setFullName(this.emp_name);
    this.appStorage.setUsername(this.userName);
    this.appStorage.setUserLocation(this.location);
    this.appStorage.setUserGrade(this.grade);
    this.appStorage.setUserType(this.user_type);
    this.appStorage.setUserEmailId(this.email_id);
    this.appStorage.setUserCountry(this.country);
     
    this.appStorage.setUserLoggedin('yes');
    return Promise.resolve()
  }

}
