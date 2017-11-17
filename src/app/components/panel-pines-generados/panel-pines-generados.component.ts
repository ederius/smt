import { Component, OnInit } from '@angular/core';
import { PinesService } from "../../services/pines.service";

@Component({
  selector: 'app-panel-pines-generados',
  templateUrl: './panel-pines-generados.component.html',
  styleUrls: ['./panel-pines-generados.component.css']
})
export class PanelPinesGeneradosComponent implements OnInit {

  ordenar:any=[
    {name:"Por Nombres", value:1},
    {name:"Por Apellidos", value:2},
    {name:"Por Teléfonos", value:3},
    {name:"Por Email", value:4}
  ]; 

  pines:any;

  constructor(private _pinesServices:PinesService) {

    this.pines = this.consultarPines();

  }

  ngOnInit() { }

  consultarPines(elementos?:number){
    return this._pinesServices.obtenerPines().then(function(data) {
      return data;
    }).catch(function(error){
      console.error(error);
    });
  }

}
