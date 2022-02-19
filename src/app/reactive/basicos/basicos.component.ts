import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

// miFormulario: FormGroup = new FormGroup({
//   nombre: new FormControl('RTX 1080ti'),
//   precio: new FormControl(1500),
//   existencias: new FormControl(5)

// }) Si tenemos un formulario muy grande esto seria inmanegable, demasiadas líneas

// validarores syncronos, son los que se hacen cuando la persona está tocando una tecla. Lo que irá en la segunda posición del array del nombre
// validarores asyncrono, se puede ejecutar en otro momento del tiempo, para saber por ej si existe en la base de datos. SEria en el tercer lugar
miFormulario: FormGroup = this.fb.group({
  nombre:[, [Validators.required, Validators.minLength(3)] ],
  precio:[, [Validators.required, Validators.min(0)]],
  existencias:[, [Validators.required, Validators.min(0)]]
})

//esto es un servicio que tenemos que inyectar
  constructor(private fb: FormBuilder) { }

  //ngOnInit se ejecuta lo primero y da unos valores determinados al formulario con setValue(), el problema viene cuando no se dan todos los campos, falta existencias, entonces no funciona. Si hacemos reset() si que funciona
  ngOnInit(): void {
      this.miFormulario.reset({
        nombre: 'RtX 4080ti',
        precio: 1600,
        existencias: 10
      })
  }

  //el campo sera el nombre, precio, o lo que tengamos y la función evaluará esto. no tenemos que repetir la función por las opciones que tenemos
  campoEsValido( campo: string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  //si el formulario no es válido no continua haciendo nada, no lo muestra en el console.log. markAllAsTouched() significa que si se envia sin que el usuario haya tocado nada, se marca todo tocado automaticamente y salen los errores.
  guardar(){

    if(this.miFormulario.invalid){
    
      this.miFormulario.markAllAsTouched();
      return
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
