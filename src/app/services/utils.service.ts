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

}
