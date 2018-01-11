//packages
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";


//Services
import { PinesService } from "../../services/pines.service";
import { UtilsService } from "../../services/utils.service";


@Component({
  selector: 'app-panel-pines-generados',
  templateUrl: './panel-pines-generados.component.html',
  styleUrls: ['./panel-pines-generados.component.css']
})
export class PanelPinesGeneradosComponent implements OnInit {

  ordenar:any=[
    {name:"Ordenar por", value:""},
    {name:"Por Cedula", value:"cedula"},    
    {name:"Por Nombres", value:"nombres"},
    {name:"Por Apellidos", value:"apellidos"},
    {name:"Por Teléfonos", value:"telefono"},
    {name:"Por Pin", value:"pin"},
    {name:"Por Redimido", value:"estado"}
    
  ]; 

  tipoOrden:String = "";
  orden:String = "";

  pines:Promise<any>;

  constructor(
    private _pinesServices:PinesService, 
    public db:AngularFireDatabase,
    public Utils:UtilsService 
  ) { 
    this.listarPines();
   }

  ngOnInit() {}

  listarPines(){
    this.pines  = this._pinesServices.obtenerPines();    
  }
  
  exportarExcel(){

    let pines = _.map(this.pines)[1];         //Mapeando como un array la promesa
    _.forEach(pines, function(pin, index){    //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        pines[index] = pin;
      }
    });

    this.Utils.exportarExcel(pines, 'Reporte-pines-generados');

    
  }



}
