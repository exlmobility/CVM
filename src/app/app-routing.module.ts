import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'set-mpin',
    loadChildren: () => import('./pages/set-mpin/set-mpin.module').then(m => m.SetMpinPageModule)
  },
  {
    path: 'enter-mpin',
    loadChildren: () => import('./pages/enter-mpin/enter-mpin.module').then(m => m.EnterMpinPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'visitor-profile',
    loadChildren: () => import('./pages/visitor-profile/visitor-profile.module').then(m => m.VisitorProfilePageModule)
  },
  {
    path: 'emergency-contacts',
    loadChildren: () => import('./pages/emergency-contacts/emergency-contacts.module').then(m => m.EmergencyContactsPageModule)
  },
  {
    path: 'make-request',
    loadChildren: () => import('./pages/make-request/make-request.module').then(m => m.MakeRequestPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackPageModule)
  },
  {
    path: 'agenda-details',
    loadChildren: () => import('./pages/agenda-details/agenda-details.module').then( m => m.AgendaDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
