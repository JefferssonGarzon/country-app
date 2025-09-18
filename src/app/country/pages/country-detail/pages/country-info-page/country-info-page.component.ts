import { Component, inject, input } from '@angular/core';
import { Country } from '../../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { CountryService } from '../../../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-country-info-page',
  imports: [DecimalPipe],
  templateUrl: './country-info-page.component.html',
  standalone: true
})
export class CountryInfoPageComponent {

  country = input.required<Country>();
  countryService = inject(CountryService);


  countriesBorderResource = rxResource({
    request: () => ({ codes: this.country().borders.toString() }),
    loader: ({ request }) => {
      if (!request.codes) return of([]);

      return this.countryService.searchCountriesByAlphaCodes(request.codes);
    }
  });

  get currencyKeys(): string[] {
    return Object.keys(this.country().currency);
  }

}
