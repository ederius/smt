import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable} from "rxjs/Observable";
import { FormGroup, FormControl, Validators, NgModel } from "@angular/forms";
import * as _ from "lodash";
import * as $ from "jquery"
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";
import { UtilsService } from "../../services/utils.service";
import { EmailsService } from "../../services/emails.service";

interface interfaceInscrito {
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
    ciudad:Number; 
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
    cedulaMama :Number;  
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

    //pin
    pin:String;
    
}

interface hora {
  hour: number,
  minute: number,
  second: number
}

interface fecha {day: number, month: number, year: number}

interface cita {
  fechaEntrevista:fecha,
  horaEntrevista:hora,
  fechaExamenes:fecha,
  horaExamenes:hora
}

@Component({
  selector: 'app-panel-inscritos',
  templateUrl: './panel-inscritos.component.html',
  styleUrls: ['./panel-inscritos.component.css']
})
export class PanelInscritosComponent implements OnInit {

  errorConsulta:String;
  exitoConsulta:String;
  exitoForma:Boolean;

  inscritos:Array<any>;
  inscrito:interfaceInscrito;
  forma:FormGroup;  

  //variables de examen y cita de admision
  fechaEntrevista:fecha;
  horaEntrevista: hora;
  fechaExamenes:fecha;
  horaExamenes:hora;
  actualizadoExitosamente: boolean;
  


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
    private modalService: NgbModal,
    private _emailSerice: EmailsService,
    private http:Http
    ) {
    
    this.listarInscritos();
    
  }

  ngOnInit() {
  }

  listarInscritos(){
    let inscritos
    this._inscripcionesService.listarInscritos().then((data)=>{
      this.inscritos = data; 
    });


    /*this.inscritos = [
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" },
      { id:"1", nombres:"Eder Alberto", apellidos:"Diaz Toro", telefono:3006343860, celularPapa:3006343860, celularMama:3006343860, correoPapa:"eder@diaz.com", correoMama:"yuyu@diaz.com", grado: "pre-escolar" }
    ]*/
  }

  exportarExcel(){

    let inscritos = this.inscritos;         //Mapeando como un array la promesa
    _.forEach(inscritos, function(pin, index){        //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        inscritos[index] = pin;
      }
    });

    this.Utils.exportarExcel(inscritos, 'Reporte-de-inscritos');
  
  }


  detallesInscrito(id, content){
             
    let inscritos
    
    if(inscritos = this.inscritos){ //Mapeando como un array la promesa
      for(let i = 0; i< inscritos.length; i++){
        if(inscritos[i].id==id){ 
          this.inscrito = inscritos[i]; 
        }  
      };
    }
    
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


  modalEditar(inscrito, contentEdit){

      this.inscrito = inscrito; 
      //Definiendo los campos del formulario y sus validaciones
      this.forma = new FormGroup({
        
            //datos de niño
            'id'        : new FormControl(this.inscrito.id, Validators.required),
            'fechaExp'  : new FormControl(this.inscrito.fechaExp, Validators.required),
            'nombres'   : new FormControl(this.inscrito.nombres, Validators.required),
            'apellidos' : new FormControl(this.inscrito.apellidos, Validators.required),
            'lugarN'    : new FormControl(this.inscrito.lugarN, Validators.required),
            'fechaN'    : new FormControl(this.inscrito.fechaN, Validators.required),    
            'direccion' : new FormControl(this.inscrito.direccion, Validators.required),
            'barrio'    : new FormControl(this.inscrito.barrio, Validators.required),        
            'telefonos' : new FormControl(this.inscrito.telefonos),
            'colegioPro': new FormControl(this.inscrito.colegioPro, Validators.required),
            'ciudad'    : new FormControl(this.inscrito.ciudad, Validators.required),
            'discapacidad': new FormControl(this.inscrito.discapacidad, Validators.required),        
            'eps'       : new FormControl(this.inscrito.eps, Validators.required),
            'viveCPadres': new FormControl(this.inscrito.viveCPadres, Validators.required),
            'viveCOtros': new FormControl(this.inscrito.viveCOtros),
            'estrato'   : new FormControl(this.inscrito.estrato, Validators.required),
            'sexo'      : new FormControl(this.inscrito.sexo, Validators.required),
            'tipoSangre': new FormControl(this.inscrito.tipoSangre, Validators.required),
            'jornada'   : new FormControl(this.inscrito.jornada, Validators.required),
            'grado'     : new FormControl(this.inscrito.grado, Validators.required),
            'indigena'  : new FormControl(this.inscrito.indigena, Validators.required),
            'etnia'     : new FormControl(this.inscrito.etnia),
    
            //datos de papa
            'cedulaPapa'    : new FormControl(this.inscrito.cedulaPapa, Validators.required),
            'fechaExpPapa'  : new FormControl(this.inscrito.fechaExpPapa, Validators.required),                
            'correoPapa'    : new FormControl(this.inscrito.correoPapa, [Validators.required, Validators.email]),        
            'nombresPapa'   : new FormControl(this.inscrito.nombresPapa, Validators.required),
            'apellidosPapa' : new FormControl(this.inscrito.apellidosPapa, Validators.required),
            'profesionPapa' : new FormControl(this.inscrito.profesionPapa),
            'LugarTrabajoPapa': new FormControl(this.inscrito.LugarTrabajoPapa),
            'cargoPapa'     : new FormControl(this.inscrito.cargoMama),        
            'celularPapa'   : new FormControl(this.inscrito.cedulaPapa, Validators.required),
    
            //datos de mama
            'cedulaMama'    : new FormControl(this.inscrito.cedulaMama, Validators.required),
            'fechaExpMama'  : new FormControl(this.inscrito.fechaExpMama, Validators.required),                
            'correoMama'    : new FormControl(this.inscrito.correoMama, [Validators.required, Validators.email]),        
            'nombresMama'   : new FormControl(this.inscrito.nombresMama, Validators.required),
            'apellidosMama' : new FormControl(this.inscrito.apellidosMama, Validators.required),
            'profesionMama' : new FormControl(this.inscrito.profesionMama),
            'LugarTrabajoMama': new FormControl(this.inscrito.LugarTrabajoMama),
            'cargoMama'     : new FormControl(this.inscrito.cargoMama),        
            'celularMama'   : new FormControl(this.inscrito.celularMama, Validators.required),
    
            //otra referencia
            'cedulaOtraR'    : new FormControl(this.inscrito.cedulaOtraR, Validators.required),
            'fechaExpOtraR'  : new FormControl(this.inscrito.fechaExpOtraR, Validators.required),                
            'correoOtraR'    : new FormControl(this.inscrito.correoOtraR, [Validators.required, Validators.email]),        
            'nombresOtraR'   : new FormControl(this.inscrito.nombresOtraR, Validators.required),
            'apellidosOtraR' : new FormControl(this.inscrito.apellidosOtraR, Validators.required),
            'parentescoOtraR': new FormControl(this.inscrito.parentescoOtraR, Validators.required),
            'ocupacionOtraR' : new FormControl(this.inscrito.ocupacionOtraR, Validators.required),        
            'direccionOtraR' : new FormControl(this.inscrito.direccionOtraR, Validators.required),        
            'celularOtraR'   : new FormControl(this.inscrito.cedulaOtraR, Validators.required),
    
            //habilidades
            'musica'          : new FormControl(this.inscrito.musica),                
            'RelacionPersonales'  : new FormControl(this.inscrito.RelacionPersonales),                
            'baile'           : new FormControl(this.inscrito.baile),                
            'amorNaturaleza'  : new FormControl(this.inscrito.amorNaturaleza),
            'arte'            : new FormControl(this.inscrito.arte),
            'armarFiguras'    : new FormControl(this.inscrito.armarFiguras),                
            'lenguaje'        : new FormControl(this.inscrito.lenguaje),
            'otraCual'        : new FormControl(this.inscrito.otraCual)
            
      });  

      this.modalService.open(contentEdit, {size: 'xl' as 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }


  actualizarInscripcion(){
    let forma = this.forma.value;
    forma.pin = this.inscrito.pin;
    this._inscripcionesService.actualizarInscrito(forma.pin, this.forma.value );    
    this.listarInscritos();  
    this.exitoForma = true;
  }

  modalEliminar(inscrito, content){
    this.inscrito = inscrito;
    this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modalExamenes(inscrito, content){
    this.actualizadoExitosamente = false;
    this.inscrito = inscrito;
    let pin = inscrito.pin;
    this._inscripcionesService.consultarCitas(pin).then((data)=>{
      let cita:cita = data;
      if(cita!={}){
        this.fechaEntrevista  = cita.fechaEntrevista;
        this.horaEntrevista   = cita.horaEntrevista;
        this.fechaExamenes    = cita.fechaExamenes;
        this.horaExamenes     = cita.horaExamenes;
      }
      
    });
        
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("sdfsdfsdf close");
    });

   
  }

  eliminarInscrito(){
    this._inscripcionesService.eliminarInscrito(this.inscrito.pin);
    this.listarInscritos()
  }

  enviarEmail(){
    let url = `https://us-central1-smt-1-7b0e8.cloudfunctions.net/emailNotificationPathers`
    let params: URLSearchParams = new URLSearchParams();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*')
    let options = new RequestOptions({headers:headers});

    params.set('to', 'ederitodiaz@gmail.com');
    params.set('from', '"Eder Diaz Toro" <ederdiaz_@hotmail.com>');
    params.set('subject', 'test-email');
    params.set('content', `Buenos dias, con este correo queremos informarle que se le ha asignado ya una fecha y hora para su proxima entrevista. Coordial saludi`);

    return this.http.post(url, params, options)
                    .toPromise()
                    .then( res => {
                      console.log("enviado con exito");
                      
                    })
                    .catch(err => {
                      console.log("error");
                      
                      console.log(err)
                    })
  }

  guardarCita(){
    let citas = {
    fechaEntrevista:this.fechaEntrevista,
    horaEntrevista: this.horaEntrevista,
    fechaExamenes:this.fechaExamenes,
    horaExamenes:this.horaExamenes
    };

    let pin = this.inscrito.pin;

    this._inscripcionesService.asignarCitas(citas, pin);
    this.actualizadoExitosamente = true;
    setTimeout(()=>{
       this.actualizadoExitosamente = false;
    }, 5000);
    this.enviarEmail();    

  }


}
