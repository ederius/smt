import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable} from "rxjs/Observable";
import * as _ from "lodash";


//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";
import { UtilsService } from "../../services/utils.service";


@Component({
  selector: 'app-panel-inscritos',
  templateUrl: './panel-inscritos.component.html',
  styleUrls: ['./panel-inscritos.component.css']
})
export class PanelInscritosComponent implements OnInit {

  errorConsulta:String;
  exitoConsulta:String;

  inscritos:Promise<any>;

  ordenar:any=[
    {name:"Ordenar por", value:""},
    {name:"Por tarjeta de I.", value:"id"},    
    {name:"Por nombres", value:"nombres"},
    {name:"Por apellidos", value:"apellidos"},
    {name:"Por celular Mama", value:"celularMama"},
    {name:"Por celular Papa", value:"celularPapa"},
    {name:"Por correo Mama", value:"correoMama"},
    {name:"Por correo Papa", value:"correoPapa"},
    {name:"Por grado", value:"grado"}    
  ]; 


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
    
    this.listarInscritos();
    
  }

  ngOnInit() {
  }

  listarInscritos(){
    this.inscritos = this._inscripcionesService.listarInscritos();
  }

  exportarExcel(){

    let inscritos = _.map(this.inscritos)[1];         //Mapeando como un array la promesa
    _.forEach(inscritos, function(pin, index){        //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        inscritos[index] = pin;
      }
    });

    this.Utils.exportarExcel(inscritos, 'Reporte-de-inscritos');
  
  }


  detallesInscrito(id){

  }

  editarInscrito(id){

  }

  eliminarInscrito(id){

  }


}
