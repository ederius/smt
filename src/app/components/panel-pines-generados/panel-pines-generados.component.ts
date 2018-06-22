//packages
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";
import { Router } from "@angular/router";

//Services
import { PinesService } from "../../services/pines.service";
import { UtilsService } from "../../services/utils.service";
import { AutenticacionService } from "../../services/autenticacion.service";



@Component({
  selector: 'app-panel-pines-generados',
  templateUrl: './panel-pines-generados.component.html',
  styleUrls: ['./panel-pines-generados.component.css']
})
export class PanelPinesGeneradosComponent implements OnInit {

  ordenar:any=[
    {name:"Ordenar por", value:""},
    {name:"Por identificación", value:"cedula"},    
    {name:"Por Nombres", value:"nombres"},
    {name:"Por Apellidos", value:"apellidos"},
    {name:"Por Teléfonos", value:"telefono"},
    {name:"Por Pin", value:"pin"},
    {name:"Por Redimido", value:"estado"}
    
  ]; 

  tipoOrden:String = "";
  orden:String = "";

  pines:any;

  constructor(
    private _pinesServices:PinesService, 
    public db:AngularFireDatabase,
    public Utils:UtilsService,
    public _authService:AutenticacionService, 
    public router:Router
  ) { 

      this.listarPines();
   }

  ngOnInit() {}

  listarPines(){
     this._pinesServices.obtenerPines().then((data)=>{
      this.pines=data;
     }).catch(function(error){
       console.log(error)
     });    
  }
  
  exportarExcel(){   
    var pines:any = this.pines, self = this
    _.forEach(pines, function(pin, index){    //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        pines[index] = pin;
      }
      if(pines.length == index+1){
        self.Utils.exportarExcel(pines, 'Reporte-pines-generados');
      }
    });


    
  }



}
