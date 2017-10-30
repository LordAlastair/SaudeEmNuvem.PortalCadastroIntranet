import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';


@Directive({
    selector: '[nascimento]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DataNascimentoValidatorDirective, multi: true }],
})
export class DataNascimentoValidatorDirective implements Validator {

    validate(c: FormControl): ValidationErrors {
        const numValue = Number(c.value);
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 115;
        const maxYear = currentYear;
        const isValid = !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
        const message = {
            'nascimento': {
                'message': 'A data de nascimento deve ser entre ' + minYear + ' e ' + maxYear,
            },
        };
        return isValid ? null : message;
    }
}
