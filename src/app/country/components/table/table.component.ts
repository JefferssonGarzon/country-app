import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-table',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './table.component.html',
  standalone: true
})
export class TableComponent {

  countries = input.required<Country[]>();

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false)
}
