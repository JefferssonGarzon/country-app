import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/country-layout/country-layout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { CountryFormsPageComponent } from './pages/country-forms-page/country-forms-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent
      },
      {
        path: 'by/:code',
        component: CountryDetailComponent
      },
      {
        path: 'country-forms',
        component: CountryFormsPageComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.routes')
      },
      {
        path: 'reactive',
        loadChildren: () => import('../reactive/reactive.routes').then(m => m.reactiveRoutes)
      },

      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
];

export default countryRoutes;
