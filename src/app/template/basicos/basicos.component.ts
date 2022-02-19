import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // Estamos cogiendo la propiedad #miFormulario del html
  @ViewChild('miFormulario') miFormulario!: NgForm;

  //crear el siguiente objeto para que el formulario aparezca directamente con estos valores predeterminados
  initForm={
    producto:'RTX 1080t',
    precio:10,
    existencias:10
  }
  

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean{

    // tenemos que saber si el formulario existe en este momento, por esto ponemos this.miFormulario.?
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched;
  }

  precioValido():boolean{
    
    return this.miFormulario?.controls['precio']?.touched && this.miFormulario?.controls['precio']?.value <0;
  }
  // guardar(miFormulario: NgForm){
  guardar(){
    // console.log(this.miFormulario);
    console.log('posteo correcto');
    // mando un objeto con la información que quiero que aparezca al resetear, después de enviar el formulario
    this.miFormulario.resetForm({
      producto:'algo',
      precio:0,
      existencias:0
    });
  }

}
