import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform { //Pipe que devuelve los datos resultantes de array de objetos que se le entrega

  transform(value: any, input?: any): any {
    let resultado=[];    
    if (input != undefined && input != "") {
      input = input.toLowerCase();

      value.forEach(el => {                             //Recorriendo la coleccion de objetos
        var keys = Object.keys(el);
        for(var i=0;i<keys.length;i++){
          var texto = String(el[keys[i]]).toLowerCase();
          if(texto.indexOf(input) > -1){
            resultado.push(el) ;
            break;
          }
        }
      });

     }else{
       return value;
     }
     return resultado;
  }

}
