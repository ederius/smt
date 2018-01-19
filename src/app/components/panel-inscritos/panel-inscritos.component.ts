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


  //Campos de formulario detalles inscrito
    //datos de niño
    id:Number;      
    fechaExp:String;  
    nombres :String;   
    apellidos:String;  
    lugarN:String;     
    fechaN :String;        
    direccion :String;  
    barrio:String;              
    telefonos:Number; 
    colegioPro:String;  
    ciudad:Nuber; 
    discapacidad :String;         
    eps :String;      
    viveCPadres :String;  
     viveCOtros :String;  
    estrato :Number;  
    sexo :String;       
    tipoSangre :String;  
    jornada :String;   
    grado  :String;    
    indigena:String;   
    etnia :String;     

    //datos de papa
    cedulaPapa:Number;    
    fechaExpPapa:String;                  
    correoPapa:String;             
    nombresPapa :String;  
    apellidosPapa:String;
    profesionPapa:String;
    LugarTrabajoPapa:String;
    cargoPapa :String;           
    celularPapa :Number;  

    //datos de mama
    cedulaMam :Number;  
    fechaExpMama :String;                
    correoMama  :String;          
    nombresMama  :String; 
    apellidosMama :String;
    profesionMama :String;
    LugarTrabajoMama:String;
    cargoMama  :String;           
    celularMama :Number;

    //otra referencia
    cedulaOtraR :Number;
    fechaExpOtraR :String;                
    correoOtraR :String;         
    nombresOtraR :String;  
    apellidosOtraR :String;
    parentescoOtraR :String;
    ocupacionOtraR  :String;       
    direccionOtraR :String;
    celularOtraR  :Number; 

    //habilidades
    musica  :String;                        
    RelacionPersonales :String;                 
    baile :String;                       
    amorNaturaleza :String; 
    arte  :String;          
    armarFiguras  :String;                  
    lenguaje  :String;      
    otraCual  :String;          


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

      //Campos de formulario detalles inscrito
    //datos de niño
    /*
    id        
    fechaExp  
    nombres   
    apellidos 
    lugarN    
    fechaN        
    direccion 
    barrio            
    telefonos 
    colegioPro
    ciudad    
    discapacidad        
    eps       
    viveCPadres
    viveCOtros
    estrato   
    sexo      
    tipoSangre
    jornada   
    grado     
    indigena  
    etnia     

    //datos de papa
    cedulaPapa    
    fechaExpPapa                  
    correoPapa            
    nombresPapa   
    apellidosPapa 
    profesionPapa 
    LugarTrabajoPapa
    cargoPapa             
    celularPapa   

    //datos de mama
    cedulaMama    
    fechaExpMama                  
    correoMama            
    nombresMama   
    apellidosMama 
    profesionMama 
    LugarTrabajoMama
    cargoMama             
    celularMama   

    //otra referencia
    cedulaOtraR    
    fechaExpOtraR                  
    correoOtraR            
    nombresOtraR   
    apellidosOtraR 
    parentescoOtraR
    ocupacionOtraR         
    direccionOtraR         
    celularOtraR   

    //habilidades
    musica                          
    RelacionPersonales                  
    baile                           
    amorNaturaleza  
    arte            
    armarFiguras                    
    lenguaje        
    otraCual            
*/



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
