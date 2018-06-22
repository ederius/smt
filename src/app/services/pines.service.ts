import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Pin } from "../components/collecciones/Pin";
import * as _ from "lodash";
import * as moment from "moment";
import 'moment/locale/es-us';
moment.locale('es');


//SERVICES
import { SemestresService } from "../services/semestres.service";

@Injectable()
export class PinesService {

  pines: Observable<any>; 
  
  constructor(private db: AngularFireDatabase, private _semestresServices:SemestresService) {  }

 generarPin(cc:any){
     cc = parseInt(cc);
     return cc.toString( 36 );
  }

  guardarPin(campos){
    campos.creado = moment().format(); //obteniendo fecha y hora actual  
    let date = new Date();
    let ano = date.getFullYear();
    this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      this.db.database.ref(`semestres/${ano}/${semestre}/pines/${campos.pin}`).set(campos);
    }).catch((error)=>{
      console.error(error);
    })
  }

  obtenerPines(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/pines`).once('value').then(function(data){        
        return _.map(data.val());
      });
    }).catch((error)=>{
      console.error(error);
    })
  }

  listarPines(){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.list(`semestres/${ano}/${semestre}/pines`).valueChanges()
    }).catch((error)=>{
      console.error(error);
    })
  }

  actualizarEstado(pin, estado){
    let date = new Date();
    let ano = date.getFullYear();
    return this._semestresServices.obtenerUltimoSemestre().then((semestre)=>{
      return this.db.database.ref(`semestres/${ano}/${semestre}/pines/${pin}`).update({estado:estado}).then(function(data){
        return data;
      }).catch((error)=>{
        return error
      });
    }).catch((error)=>{
      console.error(error);
    })
  }
  
  

}
