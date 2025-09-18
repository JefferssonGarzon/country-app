import { Region } from './../../interfaces/region.type';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [TableComponent],
  templateUrl: './by-region-page.component.html',
  standalone: true
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region>(() => this.isRegion(this.queryParams) ? this.queryParams : 'Americas');

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  private isRegion(value: string): value is Region {
    return ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'].includes(value);
  }

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      });

      return this.countryService.searchCountriesByRegion(request.region);
    }
  });
}
