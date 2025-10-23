export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  commonName: string;
  capital: string;
  population: number;
  continents: string[];
  borders: string[];
  coatOfArmsSvg: string;
  fifa: string;
  currency: { [key: string]: Currency };
}

export interface Currency {
  symbol: string;
  name: string;
}

export interface ShortCountry {
  name: Name;
  cca3: string;
  borders: string[];
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common: string;
}

