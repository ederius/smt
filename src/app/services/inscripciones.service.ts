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
    forma.admitido=false;

    this.db.database.ref(`inscripciones/${pin}`).set(forma);                              //Guardando datos de inscripcion
    this.db.database.ref(`pines/${pin}`).update({"estado":2, "actualizado":fechaHora});  //Actualizando estado de pin

  }


  listarInscritos(){
    return this.db.database.ref('inscripciones').once('value').then(function(snapshop){
      return _.map(snapshop.val());
    });
  }

  obtenerInscritos(){
    return this.db.database.ref('inscripciones').once('value').then(function(snapshop){
      return snapshop;
    });
  }

  detallesInscrito(id){
    let inscritos:Array<any>;
    return new Promise(function(resolve, reject){
      return this.db.database.ref('inscripciones').once('value').then(function(snapshop){
        inscritos = _.map(snapshop.val());
        let keys = Object.keys(inscritos);
        let inscrito;
        for(var i = 0; i>keys.length;i++){
          if(keys[i] == id){
            inscrito = inscritos[i];
            break;
          }
        }
        if(inscrito!=""){
          resolve(inscrito);
        }else{
          resolve(false);
        }
    });
  });
  }

  consultarInscrito(pin){
    return this.db.database.ref(`inscripciones/${pin}`).once('value').then(function(snapshop){
      return snapshop.val();
    });
  }

  actualizarInscrito(pin, inscrito){
    return this.db.database.ref(`inscripciones/${inscrito.pin}`).update(inscrito);      
  }

  eliminarInscrito(pin){
    return this.db.database.ref(`inscripciones/${pin}`).remove();          
  }

  consultarCitas(pin){
    return this.db.database.ref(`citasExamenesAdmision/${pin}`).once('value').then(function(snapshop){
      return snapshop.val();
    });
  }

  asignarCitas(citas, pin){
    this.db.database.ref(`citasExamenesAdmision/${pin}`).set(citas);                              //Guardando datos de inscripcion
  }

  admitirInscrito(pin){
    return this.db.database.ref(`inscripciones/${pin}`).update({admitido:true});      
  }

}
