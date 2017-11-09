import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

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

  constructor(

    private _auth: AutenticacionService, 
    private _inscripcionesService:InscripcionesService
  
  ) {
      
      
      this._auth.verificarSesionActivaPin();        //validando si ya inicio sesion

      //Definiendo los campos del formulario y sus validaciones
      this.forma = new FormGroup({

        // //datos de niño
        // 'id'        : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'fechaExp'  : new FormControl('', [Validators.required]),
        // 'nombres'   : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'apellidos' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'lugarN'    : new FormControl('', [Validators.required]),
        // 'fechaN'    : new FormControl('', [Validators.required]),    
        // 'direccion' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'barrio'    : new FormControl('', [Validators.required, Validators.minLength(4)]),        
        // 'telefonos' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'colegioPro': new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'ciudad'    : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'discapacidad': new FormControl('', [Validators.required, Validators.minLength(4)]),        
        // 'eps'       : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'viveCPadres': new FormControl('', [Validators.required]),
        // 'viveCOtros': new FormControl('', [Validators.required]),
        // 'estrato'   : new FormControl('', [Validators.required]),
        // 'sexo'      : new FormControl('', [Validators.required]),
        // 'tipoSangre': new FormControl('', [Validators.required]),
        // 'jornada'   : new FormControl('', [Validators.required]),
        // 'grado'     : new FormControl('', [Validators.required]),
        // 'indigena'  : new FormControl('', [Validators.required]),
        // 'etnia'     : new FormControl('', [Validators.required]),

        // //datos de papa
        // 'cedulaPapa'    : new FormControl('', [Validators.required, Validators.minLength(6)]),
        // 'fechaExpPapa'  : new FormControl('', [Validators.required]),                
        // 'correoPapa'    : new FormControl('', [Validators.required, Validators.email]),        
        // 'nombresPapa'   : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'apellidosPapa' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'profesionPapa' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'LugarTrabajoPapa': new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'cargoPapa'     : new FormControl('', [Validators.required, Validators.minLength(4)]),        
        // 'celularPapa'   : new FormControl('', [Validators.required, Validators.minLength(10)]),

        // //datos de mama
        // 'cedulaMama'    : new FormControl('', [Validators.required, Validators.minLength(6)]),
        // 'fechaExpMama'  : new FormControl('', [Validators.required]),                
        // 'correoMama'    : new FormControl('', [Validators.required, Validators.email]),        
        // 'nombresMama'   : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'apellidosMama' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'profesionMama' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'LugarTrabajoMama': new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'cargoMama'     : new FormControl('', [Validators.required, Validators.minLength(4)]),        
        // 'celularMama'   : new FormControl('', [Validators.required, Validators.minLength(10)]),

        // //otra referencia
        // 'cedulaOtraR'    : new FormControl('', [Validators.required, Validators.minLength(6)]),
        // 'fechaExpOtraR'  : new FormControl('', [Validators.required]),                
        // 'correoOtraR'    : new FormControl('', [Validators.required, Validators.email]),        
        // 'nombresOtraR'   : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'apellidosOtraR' : new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'parentescoOtraR': new FormControl('', [Validators.required, Validators.minLength(4)]),
        // 'ocupacionOtraR' : new FormControl('', [Validators.required, Validators.minLength(4)]),        
        // 'direccionOtraR' : new FormControl('', [Validators.required, Validators.minLength(4)]),        
        // 'celularOtraR'   : new FormControl('', [Validators.required, Validators.minLength(10)]),

        // //habilidades
        // 'musica'          : new FormControl(''),                
        // 'RelacionPersonales'  : new FormControl(''),                
        // 'baile'           : new FormControl(''),                
        // 'amorNaturaleza'  : new FormControl(''),
        // 'arte'            : new FormControl(''),
        // 'armarFiguras'    : new FormControl(''),                
        // 'lenguaje'        : new FormControl(''),
        // 'otraCual'        : new FormControl('')

        'nombres'        : new FormControl('', Validators.required)

        
      })

   }

  ngOnInit() {
  }

  guardarInscripcion(){

    console.log(this.forma);
    
    this._auth.verificarSesionActivaPin();      //validando si ya inicio sesion

    let forma = this.forma.value;               //Obteniendo datos del formario                
    this._inscripcionesService.guardarInscripcion(forma);
    this.exitoForma = "Guardado exitosamente";


  }

}
