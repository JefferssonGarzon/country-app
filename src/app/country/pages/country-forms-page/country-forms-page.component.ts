import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, pipe, Subscription, switchMap, tap } from 'rxjs';
import { ShortCountry } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-forms-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-forms-page.component.html',
  standalone: true
})
export class CountryFormsPageComponent {

  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal<ShortCountry[]>([]);
  borders = signal<ShortCountry[]>([]);

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect((onCleanup) => {
    const formRegionChanged = this.onRegionChaged();
    const formCountryChanged = this.onCountryChanged();

    onCleanup(() => {
      formRegionChanged.unsubscribe();
      formCountryChanged.unsubscribe();
    });
  });

  onRegionChaged(): Subscription {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => {
          this.myForm.get('country')!.setValue('');
          this.myForm.get('border')!.setValue('');
          this.countriesByRegion.set([]);
          this.borders.set([]);
        }),
        switchMap(region => this.countryService.getShortCountryByRegion(region ?? ''))
      )
      .subscribe(countries => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged(): Subscription {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((alphaCode: string) => alphaCode.length > 0),
        switchMap(alphaCode => this.countryService.getShortCountryByAlphaCode(alphaCode)),
        switchMap(country => this.countryService.getCountryNamesByCodeArray(country.borders))
      )
      .subscribe(borders => {
        console.log({ borders });
        this.borders.set(borders);
      })
  }
}
