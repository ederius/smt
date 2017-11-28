import { Component, OnInit } from '@angular/core';
import { PinesService } from "../../services/pines.service";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";

@Component({
  selector: 'app-panel-pines-generados',
  templateUrl: './panel-pines-generados.component.html',
  styleUrls: ['./panel-pines-generados.component.css']
})
export class PanelPinesGeneradosComponent implements OnInit {

  ordenar:any=[
    
    {name:"Por Cedula", value:"cedula"},    
    {name:"Por Nombres", value:1},
    {name:"Por Apellidos", value:"apellidos"},
    {name:"Por Teléfonos", value:3},
    {name:"Por Pin", value:4},
    {name:"Por Redimido", value:4}
    
  ]; 

  orden:String = "";

  pines:Observable<any>;

  constructor(private _pinesServices:PinesService, db:AngularFireDatabase) { 
    this.pines  = this._pinesServices.listarPines();
   }

  ngOnInit() {}

  consultarPines(elementos?:number){


  }

}
