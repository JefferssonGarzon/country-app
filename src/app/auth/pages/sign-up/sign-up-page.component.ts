import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'app-sign-up',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './sign-up-page.component.html',
  standalone: true
})
export class SignUpComponent {

  fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], [FormUtils.checkingServerResponse]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.noKratos]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },
    {
      validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]
    }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);

  }
}
