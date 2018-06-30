import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable} from "rxjs/Observable";
import * as _ from "lodash";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, NgModel } from "@angular/forms";



//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";
import { UtilsService } from "../../services/utils.service";
import { AdmitidosService } from "../../services/admitidos.service";
import { PinesService } from "../../services/pines.service";
import { MatriculadosService } from "../../services/matriculados.service";


@Component({
  selector: 'app-panel-admitidos-ver',
  templateUrl: './panel-admitidos-ver.component.html',
  styleUrls: ['./panel-admitidos-ver.component.css']
})
export class PanelAdmitidosVerComponent implements OnInit {

  inscritos:Array<any>;
  admitidos:Array<any>;
  admitido:any;
  adm:any;
  documentoID:boolean;
  fotos:boolean;
  pago:boolean;
  certificadoMedico:boolean;
  certificadoEPS:boolean;
  exito:string;
  error:any;
  forma:FormGroup;
  errorForma:String;
  exitoForma:String;
  sended:Boolean;

  constructor(
      private _auth: AutenticacionService, 
      private _inscripcionesService:InscripcionesService,
      private router: Router,
      private Utils:UtilsService,
      private _admitidosService:AdmitidosService,
      private modalService: NgbModal,
      private _pinesService:PinesService,
      private _matriculadosService:MatriculadosService
  ) {
        
      this.listarAdmitidos();

            //Definiendo los campos del formulario y sus validaciones
            this.forma = new FormGroup({

              //datos de niño
              'id'        : new FormControl('', Validators.required),
              'fechaExp'  : new FormControl('', Validators.required),
              'nombres'   : new FormControl('', Validators.required),
              'apellidos' : new FormControl('', Validators.required),
              'lugarN'    : new FormControl('', Validators.required),
              'fechaN'    : new FormControl('', Validators.required),    
              'direccion' : new FormControl('', Validators.required),
              'barrio'    : new FormControl('', Validators.required),        
              'telefonos' : new FormControl(''),
              'colegioPro': new FormControl('', Validators.required),
              'ciudad'    : new FormControl('', Validators.required),
              'discapacidad': new FormControl('', Validators.required),        
              'eps'       : new FormControl('', Validators.required),
              'viveCPadres': new FormControl('', Validators.required),
              'viveCOtros': new FormControl(''),
              'estrato'   : new FormControl('', Validators.required),
              'sexo'      : new FormControl('', Validators.required),
              'tipoSangre': new FormControl('', Validators.required),
              'jornada'   : new FormControl('', Validators.required),
              'grado'     : new FormControl('', Validators.required),
              'indigena'  : new FormControl('', Validators.required),
              'etnia'     : new FormControl(''),
      
              //datos de papa
              'cedulaPapa'    : new FormControl('', Validators.required),
              'fechaExpPapa'  : new FormControl('', Validators.required),                
              'correoPapa'    : new FormControl('', [Validators.required, Validators.email]),        
              'nombresPapa'   : new FormControl('', Validators.required),
              'apellidosPapa' : new FormControl('', Validators.required),
              'profesionPapa' : new FormControl(''),
              'LugarTrabajoPapa': new FormControl(''),
              'cargoPapa'     : new FormControl(''),        
              'celularPapa'   : new FormControl('', Validators.required),
      
              //datos de mama
              'cedulaMama'    : new FormControl('', Validators.required),
              'fechaExpMama'  : new FormControl('', Validators.required),                
              'correoMama'    : new FormControl('', [Validators.required, Validators.email]),        
              'nombresMama'   : new FormControl('', Validators.required),
              'apellidosMama' : new FormControl('', Validators.required),
              'profesionMama' : new FormControl(''),
              'LugarTrabajoMama': new FormControl(''),
              'cargoMama'     : new FormControl(''),        
              'celularMama'   : new FormControl('', Validators.required),
      
              //otra referencia
              'cedulaOtraR'    : new FormControl('', Validators.required),
              'fechaExpOtraR'  : new FormControl('', Validators.required),                
              'correoOtraR'    : new FormControl('', [Validators.required, Validators.email]),        
              'nombresOtraR'   : new FormControl('', Validators.required),
              'apellidosOtraR' : new FormControl('', Validators.required),
              'parentescoOtraR': new FormControl('', Validators.required),
              'ocupacionOtraR' : new FormControl('', Validators.required),        
              'direccionOtraR' : new FormControl('', Validators.required),        
              'celularOtraR'   : new FormControl('', Validators.required),
      
              //habilidades
              'musica'          : new FormControl(''),                
              'RelacionPersonales'  : new FormControl(''),                
              'baile'           : new FormControl(''),                
              'amorNaturaleza'  : new FormControl(''),
              'arte'            : new FormControl(''),
              'armarFiguras'    : new FormControl(''),                
              'lenguaje'        : new FormControl(''),
              'ninguna'        : new FormControl(''),
              'otraCual'        : new FormControl('')
      
              
            }); 
   }

  ngOnInit() {
  }

  modalAdmitirAlumnoAntiguo(content){
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  agregarAlumnoAntiguo(){
    
    if(this.forma.valid){
      let forma = this.forma.value;               //Obteniendo datos del formario 
      forma.matriculado=false;         
      this._admitidosService.agregarAlumnoAntiguo(forma).then((response1)=>{
        this.exitoForma = "Guardado exitosamente";
        //this.forma.reset();
        this.getDismissReason
        this.sended = false;
        this.listarAdmitidos()
      }).catch((error)=>{
        console.log(error);
      });
    }else{
      this.sended = true;
      this.errorForma = " algunos campos requeridos estan vacíos!!";
    }

  }

  listarAdmitidos(){
    this._admitidosService.listarAdmitidos().then((admitidos)=>{
      this._admitidosService.obtenerRequerimientos2().then((requisitos)=>{
        if(requisitos){
          _.forEach(admitidos, (a, index1)=>{ 
            _.forEach(requisitos, (r, index2)=>{               
              if(a.pin == r.pin){ 
                admitidos[index1].documentoID=r.documentoID;
                admitidos[index1].fotos=r.fotos;
                admitidos[index1].pago=r.pago;
                admitidos[index1].certificadoMedico=r.certificadoMedico;
                admitidos[index1].certificadoEPS=r.certificadoEPS;
              }
            });
            console.log(`${admitidos.length - 1} == ${index1}`);
            if(parseInt(index1) == (admitidos.length-1) ){ this.admitidos = admitidos; console.log(admitidos);
             }
          });
        }else{
          this.admitidos = admitidos;
        }
      });
    });
  }

  exportarExcel(){
    
    _.forEach(this.admitidos, function(pin, index){                                                   //eliminando actualizado de los objetos dentor del array
      if(pin.actualizado != undefined){
        delete pin.actualizado;
        this.admitidos[index] = pin;
      }
    });

    this.Utils.exportarExcel(this.admitidos, 'Reporte-de-admitidos');
  
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

  matricularModal(admitido, index, content){
    this.admitido = admitido;
    this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      //this.admitido[admitido.id]=false;               //Devolviendo switch a su estado original 
    }, (reason) => {
      let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("cerre");

    });
  }


  matricular(){
    let admitido = this.admitido;
    admitido.matriculado = true;
    this._matriculadosService.agregar(admitido).then((response1)=>{
      return this._admitidosService.actualizar(admitido.pin, admitido);
    }).then((response2)=>{
      this._matriculadosService.sumarMatriculado();
      let array = admitido.pin.split("-")
      if(array[1]){
        console.log("no actualizo estado de pin");
        return ;
      }else{
        console.log("si actualizo estado de pin");
        return this._pinesService.actualizarEstado(admitido.pin, 4);
      }
    }).then((response3)=>{
      this.listarAdmitidos();
    })
    .catch((error)=>{
      console.log(error);
    });

  }


  detallesAdmitido(id, content){
    let admitidos
    if(admitidos = this.admitidos){ //Mapeando como un array la promesa
      for(let i = 0; i< admitidos.length; i++){
        if(admitidos[i].id==id){ 
          this.adm = admitidos[i]; 
        }  
      };
    }
    
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editarAdmitidos(id){

  }

  requerimientosModal(admitido, content){
    this.admitido = admitido;
    this._admitidosService.obtenerRequerimientos(admitido.pin).then((data)=>{
      if(data){       
        this.documentoID=data.documentoID;
        this.fotos=data.fotos;
        this.pago=data.pago;
        this.certificadoMedico=data.certificadoMedico;
        this.certificadoEPS=data.certificadoEPS;
      }
        this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
        //this.closeResult = `Closed with: ${result}`;
        //this.admitido[admitido.id]=false;               //Devolviendo switch a su estado original 
      }, (reason) => {
        let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("cerre");
      });
    

   });
  }

  guardarRequerimientos(){
   this.exito="";
    let data = {
      documentoID:this.documentoID ? this.documentoID : false,
      fotos:this.fotos ? this.fotos : false,
      pago:this.pago ? this.pago : false,
      certificadoMedico:this.certificadoMedico ? this.certificadoMedico : false,
      certificadoEPS:this.certificadoEPS ? this.certificadoEPS : false,
      pin:this.admitido.pin,
    }
    this._admitidosService.guardarRequerimientos(this.admitido.pin, data).then((response)=>{
      this.exito="Los requerimientos han sido guardados con exito."
      this.listarAdmitidos();
    }).catch((error)=>{
      this.error="Ups... algo a salido mal, intentelo mas tarde."
    });
  }




}
