import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";


@Directive({
    selector:'[customMin][ngModel]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})


// tenemos que importar el validator que es el que nos ayuda a hacer el required, el minLength...

export class CustomMinDirective implements Validator{

    @Input() minimo!:number;

    constructor(){
        console.log('Directive', this.minimo);
    }


    validate(control: FormControl){
        const inputValue=control.value;

        console.log(inputValue);
    

        return (inputValue < this.minimo) ? {'customMin': true} : null;
    }
}