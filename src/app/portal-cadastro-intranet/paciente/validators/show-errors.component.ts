import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
    selector: 'show-errors',
    template: `
        <div class="alert alert-danger" role="alert" *ngIf="shouldShowErrors()">
            <i *ngFor="let error of listOfErrors()">{{error}}</i>
        </div>
  `,
})
export class ShowErrorsComponent {

    private static readonly errorMessages = {
        'required': () => 'Este campo é obrigatório',
        'cpf': () => 'CPF não é válido',
        'minlength': (params) => 'O Minimo de caracteres desse campo é: ' + params.requiredLength,
        'maxlength': (params) => 'O Máximo de caracteres desse campo é: ' + params.requiredLength,
        'pattern': (params) => 'O padrão para esse campo é: ' + params.requiredPattern,
        'nascimento': (params) => params.message,
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return ShowErrorsComponent.errorMessages[type](params);
    }

}
