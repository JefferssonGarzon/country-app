import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent
      },

      {
        path: '**',
        redirectTo: 'sign-up'
      }
    ]
  }
];


export default authRoutes;
