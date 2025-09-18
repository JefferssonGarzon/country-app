import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInfoPageComponent } from "./pages/country-info-page/country-info-page.component";

@Component({
  selector: 'app-country-detail',
  imports: [NotFoundComponent, CountryInfoPageComponent],
  templateUrl: './country-detail.component.html',
  standalone: true
})
export class CountryDetailComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);



  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    }
  })
}
