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
      title: 'Dashboard',
      url: 'dashboard',
      icon: '../../../assets/imgs/dashboard.png'
    },
    {
      title: 'Visit List',
      url: '',
      icon: '../../../assets/imgs/client_visit.png'
    },
    {
      title: 'EXL Profiles',
      url: '',
      icon: '../../../assets/imgs/profile_icon.png'
    },
    {
      title: 'Visitor Profile',
      url: 'visitor-profile',
      icon: '../../../assets/imgs/visitor_profile.png'
    },
    {
      title: 'Travel',
      url: '',
      icon: '../../../assets/imgs/menu_travel.png'
    },
    {
      title: 'Make A Request',
      url: 'make-request',
      icon: '../../../assets/imgs/menu_make-a-request.png'
    },
    {
      title: 'Feedback',
      url: 'feedback',
      icon: '../../../assets/imgs/menu_feedback.png'
    },
    {
      title: 'Emergency Contacts',
      url: 'emergency-contacts',
      icon: '../../../assets/imgs/menu_contact.png'
    },
    {
      title: 'Places to Visit',
      url: '',
      icon: '../../../assets/imgs/menu_place-to-visit.png'
    },
    {
      title: 'Food Menu',
      url: '',
      icon: '../../../assets/imgs/menu_foodmenu.png'
    },
    {
      title: 'Food Guide',
      url: '',
      icon: '../../../assets/imgs/food_guide.png'
    },
    {
      title: 'EXL Locations',
      url: '',
      icon: '../../../assets/imgs/menu_location.png'
    },
    {
      title: 'About EXL',
      url: '',
      icon: '../../../assets/imgs/menu_about-excel.png'
    }
    ,
    {
      title: 'Log Off',
      url: '',
      icon: '../../../assets/imgs/menu_sign-out.png'
    }
    ,
    {
      title: 'Sign Out',
      url: '',
      icon: '../../../assets/imgs/sign-out.png'
    }
    
  ];
 
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
     this.router.navigate(['/enter-mpin'], { replaceUrl: true });
    } else {
     this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
 
}
