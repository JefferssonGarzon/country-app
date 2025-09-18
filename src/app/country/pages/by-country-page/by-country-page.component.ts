import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { TableComponent } from "../../components/table/table.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchComponent, TableComponent],
  templateUrl: './by-country-page.component.html',
  standalone: true
})
export class ByCountryPageComponent {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  countryService = inject(CountryService);
  query = linkedSignal<string>(() => this.queryParams);

  countryResource = rxResource({
    request: () => ({ query: this.query(), areaType: 'name' }),
    loader: ({ request }) => {

      if (!request.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      });

      return this.countryService.searchCountries(request.query, request.areaType)
    }
  });
}
