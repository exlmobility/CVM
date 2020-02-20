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
