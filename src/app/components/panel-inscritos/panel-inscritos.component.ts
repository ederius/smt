import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable} from "rxjs/Observable";
import * as _ from "lodash";
import * as $ from "jquery"
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



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
  //inscritos:Array<any>;
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

  closeResult: string;

  constructor(
    private _auth: AutenticacionService, 
    private _inscripcionesService:InscripcionesService,
    private router: Router,
    private Utils:UtilsService,
    private modalService: NgbModal
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
    /*this.inscritos = [
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" }
    ]*/
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


  detallesInscrito(id, content){
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  editarInscrito(id){

  }

  eliminarInscrito(id){

  }


}
