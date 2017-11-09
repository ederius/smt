import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as moment from "moment-timezone";
moment.locale('es');
moment.tz("America/Los_Angeles");


@Injectable()
export class InscripcionesService {

  constructor(private db:AngularFireDatabase) { }


  guardarInscripcion(forma){

    //obteniendo pin de sesion
    let ref = JSON.parse(localStorage.sesionPin);
    let pin = ref.pin;

    let fechaHora = moment().format();      //obteniendo fecha y hora actual  
    forma.creado = fechaHora;

    this.db.database.ref(`inscripciones/${pin}`).set(forma);                              //Guardando datos de inscripcion
    this.db.database.ref(`pines/${pin}`).update({"estado":2, "actualizado":fechaHora});  //Actualizando estado de pin

  }



}
