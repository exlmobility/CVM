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



  async authenticateUser(userName: any, passWord: any, grantType: any) {


    const params = new URLSearchParams();
    params.append('username', userName);
    params.append('password', passWord);
    params.append('grant_type', grantType);

    axios.defaults.headers.post['Accept'] = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    if (!this.isConnectedToNetwork) {
      return Promise.reject("No internet connectivity")
    }
    return axios.post(Constants.BASE_URL + "/token", params);

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
    return this.postData("/api/APP_ClientVisit/UserData", authToken, param);
  }

  // async postData(params: any, authToken: string, api_name: string): Promise<any> {
  //   if (!this.isConnectedToNetwork) {
  //     return Promise.reject("No internet connectivity")
  //   }
  //   axios.defaults.headers.common['Authorization'] = 'bearer ' + authToken;
  //   axios.defaults.headers.post['Content-Type'] = 'application/json';
  //   return axios.post(Constants.BASE_URL + api_name, params);

  // }

  async postData(endPoint: string, authToken: string, data: any) {

    // try {
    //   var isSecure = await SSL.isSecure();
    //   if (!isSecure) {
    //     return Promise.reject("CONNECTION_NOT_SECURE");
    //   }
    // } catch (error) {
    //   return Promise.reject(error)
    // }

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


  async getData(authToken: string, api_name: string): Promise<any> {
    if (!this.isConnectedToNetwork) {
      return Promise.reject("No internet connectivity")
    }
    axios.defaults.headers.common['Authorization'] = 'bearer ' + authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return axios.get(Constants.BASE_URL + api_name);

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
