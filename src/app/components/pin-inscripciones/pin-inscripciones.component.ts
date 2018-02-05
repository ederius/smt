import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from "@angular/forms";
import { Router } from "@angular/router";

//services
import { AutenticacionService } from "../../services/autenticacion.service";
import { InscripcionesService } from "../../services/inscripciones.service";

@Component({
  selector: 'app-pin-inscripciones',
  templateUrl: './pin-inscripciones.component.html',
  styleUrls: ['./pin-inscripciones.component.css']
})
export class PinInscripcionesComponent implements OnInit {

  forma:FormGroup;
  errorForma:String;
  exitoForma:String;
  sended:Boolean;

  constructor(

    private _auth: AutenticacionService, 
    private _inscripcionesService:InscripcionesService,
    public router:Router
  
  ) {
      
      this._auth.verificarSesionActivaPin();        //validando si ya inicio sesion

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
        'otraCual'        : new FormControl('')
        
      });  

  }

  ngOnInit() {
  }

  guardarInscripcion(){

    console.log(this.forma);

    if(this.forma.valid){
      this._auth.verificarSesionActivaPin();      //validando si ya inicio sesion
      let forma = this.forma.value;               //Obteniendo datos del formario
      let pin = JSON.parse(localStorage.sesionPin);
      console.log(pin);
      forma.pin = pin.pin;                
      this._inscripcionesService.guardarInscripcion(forma);
      this.exitoForma = "Guardado exitosamente";
      this.sended = false;
      this.forma.reset();
      setTimeout(function() {
        this.router.navigate(['/pin/entrevistas']);      
      }, 3000);
    }else{
      this.errorForma = " algunos campos requeridos estan vacíos!!";
      this.sended = true;
    }

  }


  
}
