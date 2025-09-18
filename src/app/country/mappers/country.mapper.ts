import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static countryMapper(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      capital: restCountry.capital?.join(', '),
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].official ?? 'No spanish name',
      commonName: restCountry.translations['spa'].common ?? 'No common spanish name',
      population: restCountry.population,
      borders: restCountry.borders ?? [],
      continents: restCountry.continents,
      coatOfArmsSvg: restCountry.coatOfArms.svg,
      fifa: restCountry.fifa,
      currency: restCountry.currencies
    }
  }

  static mapperCovertRestCountrytoCountry(countries: RESTCountry[]): Country[] {
    return countries.map(CountryMapper.countryMapper);
  }
}
