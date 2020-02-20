import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import axios from 'axios'
import { Platform } from '@ionic/angular';
import { Constants } from '../utils/Constants';
@Injectable({
  providedIn: 'root'
})
export class NetworkApiService {

  isConnectedToNetwork = true;
  constructor(private network: Network, private platform: Platform) {

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

  async postData(params: any, authToken: string, api_name: string): Promise<any> {
    if (!this.isConnectedToNetwork) {
      return Promise.reject("No internet connectivity")
    }
    axios.defaults.headers.common['Authorization'] = 'bearer ' + authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return axios.post(Constants.BASE_URL + api_name, params);
     
  }

  async getData(authToken: string, api_name: string): Promise<any> {
    if (!this.isConnectedToNetwork) {
      return Promise.reject("No internet connectivity")
    }
    axios.defaults.headers.common['Authorization'] = 'bearer ' + authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return axios.get(Constants.BASE_URL + api_name);

  }


}
