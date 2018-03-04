import { Injectable } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as _ from "lodash";


@Injectable()
export class UtilsService  {


  constructor() { }

  exportarExcel(datos, nombreArchivo){
    
        var options = { 
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true, 
          showTitle: true,
          useBom: true
        };
        
        setTimeout(()=>{
          new Angular5Csv(datos, nombreArchivo);
        }, 1000)
        
 }


  reverseObject(object) {
    console.log(object);
    var newObject = {};
    var keys = [];
    for (var key in object) {
        keys.push(key);
    }
    for (var i = keys.length - 1; i >= 0; i--) {

      var value = object[keys[i]];
      newObject[keys[i]]= value;
    }       
    console.log(newObject);
    
    return newObject;
  }

}


