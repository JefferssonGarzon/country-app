import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { SearchComponent } from "../../components/search/search.component";
import { TableComponent } from '../../components/table/table.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [TableComponent, SearchComponent],
  templateUrl: './by-capital-page.component.html',
  standalone: true
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParams);

  countryResource = rxResource({
    request: () => ({ query: this.query(), areaType: 'capital' }),
    loader: ({ request }) => {

      if (!request.query) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      });

      return this.countryService.searchCountries(request.query, request.areaType)
    }
  });

  // countryResource = resource({
  //   request: () => ({ query: this.query(), areaType: 'capital' }),
  //   loader: async ({ request }) => {

  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchCountries(request.query, request.areaType)
  //     );
  //   }
  // });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {s
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchCountries(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err);
  //       }
  //     });
  // }
}
