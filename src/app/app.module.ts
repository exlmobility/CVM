import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NetworkApiService } from './services/network-api.service';
import { ProgressBarService } from './services/progress-bar.service';
import { ToastService } from './services/toast.service';
import { Network } from '@ionic-native/network/ngx';
import { UserDetailService } from './services/user-detail.service';
import { AppStorageService } from './services/app-storage.service';
import { Device } from '@ionic-native/device/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NetworkApiService,
    UserDetailService,
    ProgressBarService,
    HTTP,
    AppStorageService,
    Device,
    Network,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
