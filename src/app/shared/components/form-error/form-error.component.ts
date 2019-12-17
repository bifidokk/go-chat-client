import { Component, forwardRef, Host, Injector, Input, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormControlName,
    FormGroupDirective,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

interface ErrorMessages {
    [key: string]: string;
}

@Component({
    selector: 'app-form-error',
    template: `
        <ng-container *ngIf="isErrorVisible()">{{firstError}}</ng-container>
    `,
    styles: [
        `:host {
            display: inline-flex;
        }`,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormErrorComponent),
            multi: true,
        },
    ],
})
export class FormErrorComponent implements ControlValueAccessor, OnInit {
    @Input() public control: FormControlName;
    @Input() public formControlName: string;

    private errorMessages: object = {
        required: 'The value should not be blank.',
        minlength: 'The value is too short. It should have %requiredLength% character or more.',
        maxlength: 'The value is too long. It should have %requiredLength% character or less.',
        min: 'The number can\'t be less than %min%.',
        max: 'The number can\'t be greater than %max%.',
        number: 'The value is not a valid number.',
        email: 'The value is not a valid email.',
        url: 'The value is not a valid URL.',
        pattern: 'The value is not valid.',
    };

    public constructor(
        @Host() private form: FormGroupDirective,
        private injector: Injector,
    ) {
    }

    public ngOnInit(): void {
        this.control = this.injector.get<FormControlName>(FormControlName);
    }

    @Input()
    public set messages(messages: ErrorMessages) {
        Object.assign(this.errorMessages, messages);
    }

    public get errors() {
        const errors = this.control.errors || [];

        return Object
            .keys(errors)
            .map(key => this.mapKeyToMessage(key, errors[key]));
    }

    public get firstError() {
        return this.errors[0];
    }

    public isErrorVisible() {
        return ((!this.control.valid || this.control.errors)
            && (this.control.dirty || this.form.submitted));
    }

    public writeValue(obj: any): void {
    }

    public registerOnChange(fn: any): void {
    }

    public registerOnTouched(fn: any): void {
    }

    public setDisabledState(isDisabled: boolean): void {
    }

    private mapKeyToMessage(key: string, params: object) {
        const message = this.errorMessages[key];

        if (message == null) {
            return key;
        }

        return message.replace(/(%(.+?)%)/g, (match, match1, attribute)  => {
            const replacement = typeof params === 'object' ? params[attribute] : params;

            if (null == replacement) {
                return null;
            }

            return replacement;
        });
    }
}
