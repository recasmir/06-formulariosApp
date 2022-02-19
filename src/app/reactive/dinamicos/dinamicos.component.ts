import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  //favoritos va a ser un arreglo por eso this.fb.array() y dentro del paréntesi tenemos que esicificar cada uno de los elementos de los que va a consistir. Lo primero va a ser un arreglo ([]lila), dentro de este hay el array que viene con los dos valores de juegos (Metal Gear y el otro) y estos son colecciones de formControls que le podriamos añadir los validators tb
  miFormulario: FormGroup = this.fb.group({
    nombre:['', [Validators.required, Validators.minLength(3)] ],
    favoritos: this.fb.array( [
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ], Validators.required)
  })

  //El FormControl mira que el valor introducido a nuevoFavorito sea válido antes de añadirlo
  nuevoFavorito: FormControl = this.fb.control('', Validators.required)

//.get('favoritos') coge el control directament. Seria como .controls.favoritos
  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }
  
//FormBuilder es un servicio que se tiene que inyectar en el constructor e importar
  constructor(private fb: FormBuilder) { }

  campoEsValido( campo: string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  //no es necesario recibir ningún campo porque ya tengo toda la información más arriba en nuevoFavorito
  agregarFavorito(){
    //si lo que añadimos no es valido, no hagas nada, no continues con la función
    if(this.nuevoFavorito.invalid){return}

    //Se puede añadir un favorito de dos maneras:
    //1.  this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));
    //2. la siguiente
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();
  }

borrar(index:number){

  this.favoritosArr.removeAt(index);
}


  guardar(){

    if(this.miFormulario.invalid){
    
      this.miFormulario.markAllAsTouched();
      return
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

 

}
