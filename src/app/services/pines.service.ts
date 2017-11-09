import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Pin } from "../components/collecciones/Pin";
import * as moment from "moment";
import 'moment/locale/es-us';
moment.locale('es');

@Injectable()
export class PinesService {

  pines: AngularFireList<Pin[]>;
  pin: AngularFireObject<Pin[]>;
  
  constructor(private db: AngularFireDatabase) { 



  }

 generarPin(cc:any){
     cc = parseInt(cc);
     return cc.toString( 36 );
  }

  guardarPin(campos){
    campos.creado = moment().format(); //obteniendo fecha y hora actual  
    this.db.database.ref(`pines/${campos.pin}`).set(campos);
  }

  obtenerPines(){
    return this.db.database.ref(`pines`).once('value').then(function(data){
      data = data.val();
      return data;
    }).catch(err=>{
      return err;
    });
  }

}
