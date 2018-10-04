import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
    selector: 'show-errors',
    template: `
        <div *ngIf="shouldShowErrors()">
            <label style='float:right; margin-bottom: 0px;' class="text-danger" *ngFor="let error of listOfErrors()">{{error}}</label>
        </div>
  `,
})
export class ShowErrorsComponent {

    private static readonly errorMessages = {
        'required': () => '*Obrigatório',
        'cpf': () => 'CPF inválido',
        'minlength': (params) => 'Minimo de caracteres: ' + params.requiredLength,
        'maxlength': (params) => 'Máximo de caracteres: ' + params.requiredLength,
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
