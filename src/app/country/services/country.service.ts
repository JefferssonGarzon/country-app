import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchCountries(query: string, areaType: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []).pipe(
        delay(1000)
      );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/${areaType}/${query}`)
      .pipe(
        map(CountryMapper.mapperCovertRestCountrytoCountry),
        tap(countriesConvert => this.queryCacheCountry.set(query, countriesConvert)),
        delay(2000),
        catchError(err => {
          console.log('Error fetching ', err);
          return throwError(() => new Error('No se puede obtener países con esa busqueda.'))
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    const URL = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(URL)
      .pipe(
        map(CountryMapper.mapperCovertRestCountrytoCountry),
        map(countries => countries.at(0)),
        catchError(err => {
          console.log('Error fetching ', err);
          return throwError(() => new Error(`No se puede obtener el país con el codigo ${code}`))
        })
      )
  }

  searchCountriesByAlphaCodes(codes: string) {
    const URL = `${API_URL}/alpha?codes=${codes}`;

    return this.http.get<RESTCountry[]>(URL)
      .pipe(
        map(CountryMapper.mapperCovertRestCountrytoCountry),
        catchError(err => {
          console.log('Error fetching ', err);
          return throwError(() => new Error(`No se puede obtener el país con el codigo ${codes}`))
        })
      )
  }

  searchCountriesByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []).pipe(
        delay(1000)
      );
    }

    const URL = `${API_URL}/region/${region}`;

    return this.http.get<RESTCountry[]>(URL)
      .pipe(
        map(CountryMapper.mapperCovertRestCountrytoCountry),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        catchError(err => {
          console.log('Error fetching ', err);
          return throwError(() => new Error(`No se puede obtener el país por la región ${region}`))
        })
      );
  }

}
