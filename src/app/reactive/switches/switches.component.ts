import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit{


  //mandamos la referencia a la función, no la estamos ejecutando, por eso requiredTrue no tiene () y ponemos requiredTrue y no required solo porque queremos que el formulario sea válido solo cuando sea true.
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones:[false, Validators.requiredTrue]

  });

  persona= {
    genero: 'F',
    notificaciones: true,
  }

  constructor(private fb:FormBuilder) { }

  //para establecer valores predeterminados cuando veamos el formulario, aunque la persona tenga 2 campos y el formulario 3 no pasa nada si ponemos el reset. El setValue nos daria problemas.

  //ponemos el spread operator para extraer todo lo que la persona tiene y añadir las propiedades que noecesito como las condiciones. así siempre estan y no es un null al principio

  ngOnInit(): void {
      // this.miFormulario.reset(this.persona);

      this.miFormulario.reset({
        ...this.persona,
        condiciones:false
      })

      //otra forma de borrar las condiciones del objeto retornado
      // this.miFormulario.valueChanges.subscribe(form =>{
      //   delete form.condiciones;
      //   this.persona= form;
      // })

      //y otra más para borrar las condiciones-más limpio: extraigo las condiciones y todo el resto lo almaceno en una variable independiente rest
      this.miFormulario.valueChanges.subscribe(({condiciones, ...rest}) =>{
    
        this.persona= rest;
      })

  }

  guardar(){
    const formValue = {...this.miFormulario.value};

    //para borrar las condiciones del objeto retornado
    delete formValue.condiciones;

    this.persona = formValue;

    console.log(formValue);
  }

}
