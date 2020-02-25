import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {


  AUTH_TOKEN: string = "AUTH_TOKEN";
  EMP_NUMBER: string = "EMP_NUMBER";
  USERNAME: string = "USERNAME";
  FULL_NAME: string = "FULL_NAME";
  DESIGNATION: string = "DESIGNATION";
  ISLOGGEDIN: string = "ISLOGGEDIN";
  MPIN: string = "MPIN";
  LOCATION:string = "LOCATION";
  COUNTRY:string = "COUNTRY";
  USER_TYPE :string = "USER_TYPE";
  EMAIL_ID:string = "EMAIL_ID";
  GRADE:string = "GRADE";



  constructor() { }

  setAuthToken(token: string) {
    return this.setItem(this.AUTH_TOKEN, token)
  }
  getAuthToken() {
    return this.getItem(this.AUTH_TOKEN)
  }

  setEmpNo(empNo: string) {
    return this.setItem(this.EMP_NUMBER, empNo)
  }
  getEmpNo() {
    return this.getItem(this.EMP_NUMBER)
  }

  setUsername(username: string) {
    return this.setItem(this.USERNAME, username)
  }
  getUsername() {
    return this.getItem(this.USERNAME)
  }

  setFullName(fullname: string) {
    return this.setItem(this.FULL_NAME, fullname)
  }
  geFullName() {
    return this.getItem(this.FULL_NAME)
  }

  setDesignation(designation: string) {
    return this.setItem(this.DESIGNATION, designation)
  }
  getDesignation() {
    return this.getItem(this.DESIGNATION)
  }

  setUserMPIN(mpin: string) {
    return this.setItem(this.MPIN, mpin);
  }
  getUserMPIN() {
    return this.getItem(this.MPIN);
  }


    // LOCATION: "Noida-Center3"
    // COUNTRY: "India"
    // USER_TYPE: "1"
    // EMAIL_ID: "ERPDBA.Support@exlservice.com"
    // GRADE: "C2"

    setUserLocation(location: string) {
      return this.setItem(this.LOCATION, location)
    }
    getUserLocation() {
      return this.getItem(this.LOCATION)
    }

    setUserCountry(country: string) {
      return this.setItem(this.COUNTRY, country)
    }
    getUserCountry() {
      return this.getItem(this.COUNTRY)
    }

    setUserType(userType: string) {
      return this.setItem(this.USER_TYPE, userType)
    }
    getUserType() {
      return this.getItem(this.USER_TYPE)
    }

    setUserEmailId(email: string) {
      return this.setItem(this.EMAIL_ID, email)
    }
    getUserEmailId() {
      return this.getItem(this.EMAIL_ID)
    }

    setUserGrade(grade: string) {
      return this.setItem(this.GRADE, grade)
    }
    getUserGrade() {
      return this.getItem(this.ISLOGGEDIN)
    }


  setUserLoggedin(isloggedIn: string) {
    return this.setItem(this.ISLOGGEDIN, isloggedIn)
  }

  getUserLoggedin() {
    return this.getItem(this.ISLOGGEDIN)
  }
   //****************************/
   setItem(key: any, value: any) {
    // return this.nativeStorage.setItem(key, value);
    return window.localStorage.setItem(window.btoa(key), window.btoa(value));
  }

  getItem(key) {
    let value = undefined
    try {
      //    value = this.nativeStorage.getItem(key);
      value = window.localStorage.getItem(window.btoa(key));
      console.log("DATA:::: " + value)
      return Promise.resolve(window.atob(value))
    } catch (error) {
      return Promise.resolve(undefined)
    }

  }

  clearAllItems() {
    //  return this.nativeStorage.clear();
    return window.localStorage.clear();
  }
}
