import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from "lodash";

//SERVICES
import { SemestresService } from "../../services/semestres.service";

@Component({
  selector: 'app-panel-configuracion-semestre',
  templateUrl: './panel-configuracion-semestre.component.html',
  styleUrls: ['./panel-configuracion-semestre.component.css']
})
export class PanelConfiguracionSemestreComponent implements OnInit {

  ListaSemestres:Array<any>;
  forma:FormGroup;
  semestre:any;
  registro:Boolean;
  inscritosSalaCula:any;
  admitidosSalaCula:any;
  matriculadosSalaCula:any;
  cuposSalaCula:any;
  inscritosCaminadores:any;
  admitidosCaminadores:any;
  matriculadosCaminadores:any;
  cuposCaminadores:any;
  inscritosParvulo:any;
  admitidosParvulo:any;
  matriculadosParvulo:any;
  cuposParvulo:any;
  inscritosPreJardin:any;
  admitidosPreJardin:any;
  matriculadosPreJardin:any;
  cuposPreJardin:any;
  inscritosJardin:any;
  admitidosJardin:any;
  matriculadosJardin:any;
  cuposJardin:any;
  inscritosTrancision:any;
  admitidosTrancision:any;
  matriculadosTrancision:any;
  cuposTrancision:any;
  inscritosPrimero:any;
  admitidosPrimero:any;
  matriculadosPrimero:any;
  cuposPrimero:any;
  inscritosSegundo:any;
  admitidosSegundo:any;
  matriculadosSegundo:any;
  cuposSegundo:any;
  inscritosTercero:any;
  admitidosTercero:any;
  matriculadosTercero:any;
  cuposTercero:any;
  inscritosCuarto:any;
  admitidosCuarto:any;
  matriculadosCuarto:any;
  cuposCuarto:any;
  inscritosQuinto:any;
  admitidosQuinto:any;
  matriculadosQuinto:any;
  cuposQuinto:any;


  constructor(
    private modalService: NgbModal,
    private _semestreServices:SemestresService
  ) { 
    this.forma = new FormGroup({
      'cupoSalaCula': new FormControl('', [Validators.required]),
      'cuposCaminadores': new FormControl('', [Validators.required]),
      'cuposParvulo': new FormControl('', [Validators.required]),
      'cuposPreJardin': new FormControl('', [Validators.required]),
      'cuposJardin': new FormControl('', [Validators.required]),
      'cuposTrancision': new FormControl('', [Validators.required]),
      'cuposPrimero': new FormControl('', [Validators.required]),
      'cuposSegundo': new FormControl('', [Validators.required]),
      'cuposTercero': new FormControl('', [Validators.required]),
      'cuposCuarto': new FormControl('', [Validators.required]),
      'cuposQuinto': new FormControl('', [Validators.required]),
      'cerrado': new FormControl(false)
    });
    this.listarSemestes();
  }

  ngOnInit() {
  }

  listarSemestes(){
    this._semestreServices.obtenerSemestres().then(data=>{
      this.ListaSemestres = [];
      _.forEach(data, (anos, index)=>{
          anos = _.map(anos);
        _.forEach(anos, (semestre, index2)=>{
          if(semestre){
            this.ListaSemestres.push(semestre);
          }
        })
      });
    }).catch(error=>{
      console.error("error obteniendo listado de semestres");
      console.error(error);
    })
  }

  modalAbrirSemestrer(content){
    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
    }, (reason) => {
    });
  }

  modalCerrarSemestrer(content){
    this.modalService.open(content, {size: 'sm' as 'sm'}).result.then((result) => {
    }, (reason) => {
    });
  }


  registrarSemestre(){
    let ultimoAno, dataSemestre, numSemestresUltimoAno;
    this._semestreServices.obtenerUltimoAno().then((semestre)=>{
      dataSemestre = semestre;
      this.forma.value.alumnNoAdmidos = {value: 0};                            
      if(semestre){                               //Preguntando si existe un semestre creado
        let keysAnosSemestre = Object.keys(semestre);       //Años 
        ultimoAno = keysAnosSemestre.pop();              //Ultimo año
        let keysSemestre = Object.keys(semestre[ultimoAno]);
        numSemestresUltimoAno = keysSemestre.length; 
        return this._semestreServices.crearSemestre(numSemestresUltimoAno+1, this.forma.value);       //Si existe
      }else{
        return this._semestreServices.crearSemestre(1, this.forma.value );       //Si existe
      }
      }).then((response1)=>{       
        if(dataSemestre){
          var ultimoS=dataSemestre[ultimoAno][numSemestresUltimoAno];
          ultimoS.cerrado=true;
          ultimoS.alumnNoAdmitidos ={value:Number(ultimoS.alumnInscritos.value)-Number(ultimoS.alumnAdmitidos.value)};
          return this._semestreServices.cerrarSemestre(numSemestresUltimoAno, ultimoAno, ultimoS);
        }else{
          return;
        }
      }).then((response2)=>{
        this.listarSemestes();
        this.forma.reset();
        this.registro = true;
        console.log("respuesta de cerrar semestre");
        console.log(response2);
      }).catch((error=>{
        console.log(error);
      }));
  }

  modalDetalleSemestre(content, semestre){
    this.semestre=semestre;

    let inscripciones = _.map(semestre.inscripciones)
    let admitidos = _.map(semestre.admitidos)
    let matriculados = _.map(semestre.matriculados)
    console.log(inscripciones);
    this.cuposSalaCula=this.semestre.cupoSalaCula;
    this.cuposCaminadores=this.semestre.cuposCaminadores;
    this.cuposParvulo=this.semestre.cuposParvulo;
    this.cuposPreJardin=this.semestre.cuposPreJardin;
    this.cuposJardin=this.semestre.cuposJardin;
    this.cuposTrancision=this.semestre.cuposTrancision;
    this.cuposPrimero=this.semestre.cuposPrimero;
    this.cuposSegundo=this.semestre.cuposSegundo;
    this.cuposTercero=this.semestre.cuposTercero;
    this.cuposCuarto=this.semestre.cuposCuarto;
    this.cuposQuinto=this.semestre.cuposQuinto;
    
    _.forEach(inscripciones, (o:any)=>{ 
      this.inscritosSalaCula=0;this.inscritosCaminadores=0;this.inscritosParvulo=0;this.inscritosPreJardin=0;this.inscritosJardin=0;
      this.inscritosTrancision=0;this.inscritosPrimero=0;this.inscritosSegundo=0;this.inscritosTercero=0;this.inscritosCuarto=0;this.inscritosQuinto=0;
      switch (o.grado) {
        case 'salacuna':
        this.inscritosSalaCula++;
        break;
        case 'caminadores':
        this.inscritosCaminadores++;
        break;
        case 'parvulo':
        this.inscritosParvulo++;
        break;
        case 'pre-jardin':
        this.inscritosPreJardin++;
        break;
        case 'jardin':
        this.inscritosJardin++;
        break;
        case 'transicion':
        this.inscritosTrancision++;
        break;
        case 'primero':
        this.inscritosPrimero++;
        break;
        case 'segundo':
        this.inscritosSegundo++;
        break;
        case 'tercero':
        this.inscritosTercero++;
        break;
        case 'cuarto':
        this.inscritosCuarto++;
        break;
        case 'quinto':
        this.inscritosQuinto++;
        break;
      }
    });
    _.forEach(admitidos, (o:any)=>{ 
      this.admitidosSalaCula=0;this.admitidosCaminadores=0;this.admitidosParvulo=0;this.admitidosPreJardin=0;this.admitidosJardin=0
      this.admitidosTrancision=0;this.admitidosPrimero=0;this.admitidosSegundo=0;this.admitidosTercero=0;this.admitidosCuarto=0;this.admitidosQuinto=0;
      switch (o.grado) {
        case 'salacuna':
        this.admitidosSalaCula++;
        break;
        case 'caminadores':
        this.admitidosCaminadores++;
        break;
        case 'parvulo':
        this.admitidosParvulo++;
        break;
        case 'pre-jardin':
        this.admitidosPreJardin++;
        break;
        case 'jardin':
        this.admitidosJardin++;
        break;
        case 'transicion':
        this.admitidosTrancision++;
        break;
        case 'primero':
        this.admitidosPrimero++;
        break;
        case 'segundo':
        this.admitidosSegundo++;
        break;
        case 'tercero':
        this.admitidosTercero++;
        break;
        case 'cuarto':
        this.admitidosCuarto++;
        break;
        case 'quinto':
        this.admitidosQuinto++;
        break;
      }
    });
    _.forEach(matriculados, (o:any)=>{ 
      this.matriculadosSalaCula=0;this.matriculadosCaminadores=0;this.matriculadosParvulo=0;this.matriculadosPreJardin=0;this.matriculadosJardin=0
      this.matriculadosTrancision=0;this.matriculadosPrimero=0;this.matriculadosSegundo=0;this.matriculadosTercero=0;this.matriculadosCuarto=0;this.matriculadosQuinto=0;
      switch (o.grado) {
        case 'salacuna':
        this.matriculadosSalaCula++;
        break;
        case 'caminadores':
        this.matriculadosCaminadores++;
        break;
        case 'parvulo':
        this.matriculadosParvulo++;
        break;
        case 'pre-jardin':
        this.matriculadosPreJardin++;
        break;
        case 'jardin':
        this.matriculadosJardin++;
        break;
        case 'transicion':
        this.matriculadosTrancision++;
        break;
        case 'primero':
        this.matriculadosPrimero++;
        break;
        case 'segundo':
        this.matriculadosSegundo++;
        break;
        case 'tercero':
        this.matriculadosTercero++;
        break;
        case 'cuarto':
        this.matriculadosCuarto++;
        break;
        case 'quinto':
        this.matriculadosQuinto++;
        break;
      }
    });

    this.modalService.open(content, {size: 'xl' as 'lg'}).result.then((result) => {
    }, (reason) => {
    });
  }


}
