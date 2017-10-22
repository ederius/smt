import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PinesService } from "../../services/pines.service";

@Component({
  selector: 'app-pines',
  templateUrl: './pines.component.html',
  styleUrls: ['./pines.component.css']
})
export class PinesComponent implements OnInit {

  forma:FormGroup;
  result:string;
  error:string;

  

  constructor(public _pines:PinesService) {

    this.forma = new FormGroup({
      'cedula': new FormControl('', [Validators.required, Validators.min(11111)]),
      'nombres': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'apellidos': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'telefono': new FormControl('', [Validators.required, Validators.min(111111)])

    })

   }

  ngOnInit() {
  }

  generarPin(){

    let campo = this.forma.value;
    this._pines.guardar(campo).then(data=>{
      console.log(data);
      data.key ? this.result = "Se genero exitosamente tu pin" : this.error = "Error! algo no ha salido bien, intentalo mas tarde";
    });

  }







}
