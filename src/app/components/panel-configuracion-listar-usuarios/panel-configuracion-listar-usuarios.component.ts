import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-panel-configuracion-listar-usuarios',
  templateUrl: './panel-configuracion-listar-usuarios.component.html',
  styleUrls: ['./panel-configuracion-listar-usuarios.component.css']
})
export class PanelConfiguracionListarUsuariosComponent implements OnInit {

  usuarios:Array<any>;

  constructor(private _authServices:AutenticacionService) {
    this.listarUsuarios();
   }

  ngOnInit() {
  }

  listarUsuarios(){
    this._authServices.listarUsuarios().then(usuarios=>{
      this.usuarios = usuarios;
    }).catch(error=>{
      console.error("Error consultando los usuarios a listar");
    })
  }

}
