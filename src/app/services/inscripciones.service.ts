import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as moment from "moment-timezone";
import * as _ from "lodash";
moment.locale('es');
moment.tz("America/Los_Angeles");


@Injectable()
export class InscripcionesService {

  constructor(private db:AngularFireDatabase) {
  }


  guardarInscripcion(forma){

    //obteniendo pin de sesion
    let ref = JSON.parse(localStorage.sesionPin);
    let pin = ref.pin;

    let fechaHora = moment().format();      //obteniendo fecha y hora actual  
    forma.creado = fechaHora;

    this.db.database.ref(`inscripciones/${pin}`).set(forma);                              //Guardando datos de inscripcion
    this.db.database.ref(`pines/${pin}`).update({"estado":2, "actualizado":fechaHora});  //Actualizando estado de pin

  }


  listarInscritos(){
    return this.db.database.ref('inscripciones').once('value').then(function(snapshop){
      let inscritos = _.map(snapshop.val());
      console.log(inscritos);
      inscritos = _.filter(inscritos, function(o){ o.estado==2});
      console.log(inscritos);
      return _.map(snapshop.val());
    });
  }



}
