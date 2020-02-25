import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import axios from 'axios'
import { Platform } from '@ionic/angular';
import { Constants } from '../utils/Constants';
import { UserDetailService } from './user-detail.service';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class NetworkApiService {

  isConnectedToNetwork = true;
  constructor(private network: Network, 
    private platform: Platform, private http: HTTP,
    private userDetailCtrl: UserDetailService) {

    console.log("NetworkapiService");


    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.isConnectedToNetwork = false;
    });

    // stop disconnect watch
    // disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type != 'UNKNOWN' && this.network.type != "NONE") {
          console.log('we got a wifi connection, woohoo!');
          this.isConnectedToNetwork = true;
        }
      }, 3000);
    });


    // stop connect watch
    // connectSubscription.unsubscribe();

  }



  async authenticateUser(userName: any, passWord: any) {
    if (!this.isConnectedToNetwork) {
      return Promise.reject("No internet connectivity")
    }
    var data = {
      username : userName,
      password: passWord,
      grant_type: "password"
    }

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
  }
  this.http.setDataSerializer('urlencoded');
  this.http.setRequestTimeout(30);
  return this.http.post(Constants.BASE_URL + "/token",data,headers);
  }


  async callGetUserData(userName: string, authToken: string) {

    var userData = {
      username: userName
    };
    var param = {
      user: userData,
      metaData: this.userDetailCtrl.getMetaData()
    };
    
    if (!this.isConnectedToNetwork) {
      return Promise.reject("No internet connectivity")
    }
    return this.postData("/api/APP_ClientVisit/UserData",authToken,param);
  }


 async postData(endPoint:string,authToken:string, data:any) {

    const options = {
      method: 'post',
      data: data,
      serializer: 'json',
      timeout: 30 * 1000,
      headers: { 'Authorization': 'bearer ' + authToken, 'Content-Type': 'application/json' }
    };

    console.log("request", options);
    try {
      let response = await this.http.sendRequest(`${Constants.BASE_URL}${endPoint}`, options);
      console.log("response", response);
      if (response && response.status == 200) {
        return Promise.resolve(JSON.parse(response.data));
      } else {
        return Promise.resolve("Something went wrong, please try again later");
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }

  }

  async aboutUs() {
    try {
      console.log("API CALLED");
      let response = await this.postData('/api/APP_ClientVisit/aboutExl', "", {});
      return Promise.resolve(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

}
