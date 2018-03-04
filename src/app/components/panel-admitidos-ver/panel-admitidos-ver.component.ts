import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable} from "rxjs/Observable";
import * as _ from "lodash";


//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";
import { UtilsService } from "../../services/utils.service";

@Component({
  selector: 'app-panel-admitidos-ver',
  templateUrl: './panel-admitidos-ver.component.html',
  styleUrls: ['./panel-admitidos-ver.component.css']
})
export class PanelAdmitidosVerComponent implements OnInit {

  inscritos:Promise<any>;
  admitidos:Promise<any>;


  constructor(
      private _auth: AutenticacionService, 
      private _inscripcionesService:InscripcionesService,
      private router: Router,
      private Utils:UtilsService

  ) {
        //Validando si el usuario tiene una sesion iniciada, si la tiene se redirige a panel
        if(!this._auth.currentUser){
          this.router.navigate(['/login']);
        }   
        
        this.listarAdmitidos();
   }

  ngOnInit() {
  }

  listarAdmitidos(){
    //this.admitidos = this._inscripcionesService.listarInscritos().then((data)=>{
      //return _.filter(data, function(o){ return o.estado == 3 });         //Mapeando como un array la promesa y filtrando los datos a los que tengan como estado "3" = admitidos      
      
    //});
    //this.admitidos = [
    //  { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
    //  { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
    //  { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
    //  { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" }
    //]
  }

  exportarExcel(){
    
    //_.forEach(this.admitidos, function(pin, index){                                                   //eliminando actualizado de los objetos dentor del array
    //  if(pin.actualizado != undefined){
    //    delete pin.actualizado;
    //    this.admitidos[index] = pin;
    //  }
    //});

    this.Utils.exportarExcel(this.admitidos, 'Reporte-de-admitidos');
  
  }

  detallesAdmitidos(id){
    
  }

  editarAdmitidos(id){

  }

  eliminarAdmitidos(id){

  }

}
