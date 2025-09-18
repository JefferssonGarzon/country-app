import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  standalone: true
})
export class NotFoundComponent {

  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
