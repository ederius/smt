import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Pin } from "../components/collecciones/Pin";

@Injectable()
export class PinesService {

  pines: AngularFireList<Pin[]>;
  pin: AngularFireObject<Pin[]>;
  
  constructor(private db: AngularFireDatabase) { 



  }


  guardar(pin){

    return this.db.database.ref('pines').push(pin).then(data=>{
      console.log(data);
      return data
    });

  }

}
