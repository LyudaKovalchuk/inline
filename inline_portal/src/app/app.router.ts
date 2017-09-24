import { Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

export const AppRouterConfig: Routes = [
  { path: '', component:  MainComponent },
  { path: 'signin', component:  SigninComponent },
  { path: 'signup', component:  SignupComponent },
  { path: '**', redirectTo: '' }
];
