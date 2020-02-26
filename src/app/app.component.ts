import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AppStorageService } from './services/app-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  isUserLoggedIn: string;
  public appPages = [
    {
      title: 'Inbox',
      url: 'visitor-profile',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private appStorage: AppStorageService,
  ) {
    this.initializeApp();
  }

 async  initializeApp() {
 
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    this.decidedRootBasedOnAuth();
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }

  async decidedRootBasedOnAuth() {
   this.isUserLoggedIn = await this.appStorage.getUserLoggedin()
    if (this.isUserLoggedIn == 'yes') {
      //this.router.navigate(['/enter-mpin'], { replaceUrl: true });
       this.router.navigate(['/dashboard'], { replaceUrl: true });
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
 


}
