import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  })
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)^$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';

        case 'minlength':
          return `Se requieren mínimo ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Se requiere un valor superior a ${errors['min'].min}`;

        case 'email':
          return 'El correo electrónico ingresado no es valido.';

        case 'emailTaken':
          return 'El correo electrónico ya ha sido tomado.';

        case 'noKatros':
          return 'No se puede usar ese nombre de usuario.';

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor ingresado no es un correo valido.'
          }
          return 'Error de patron contra expresión regular';
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, field: string): boolean | null {
    return !!form.controls[field].errors && form.controls[field].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {

    if (!form.controls[field].errors) return null;

    const errors = form.controls[field].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldArrayError(formArray: FormArray, index: number): string | null {

    if (!formArray.controls[index].errors) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);

  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1V = formGroup.get(field1)?.value;
      const field2V = formGroup.get(field2)?.value;

      return field1V === field2V ? null : { passwordNotEqual: true }
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'jeff@gmail.com') {
      return {
        emailTaken: true
      };
    }

    return null;
  }

  static noKratos(control: AbstractControl): ValidationErrors | null {
    const formValue: string = control.value;
    console.log(formValue);

    return formValue.toLowerCase() === 'kratos' ? { noKatros: true } : null;
  }
}
