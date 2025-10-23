import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  standalone: true
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['GOD', Validators.required],
        ['LoL', Validators.required]
      ]
      , Validators.minLength(3))
  });

  newFavorite = this.fb.control([]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddFavorites() {
    if (!this.favoriteGames.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, [Validators.required]));
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }
}
