import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../../services/autenticacion.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rollUsuario:Number;

  constructor(private _auht:AutenticacionService) {
    this._auht.getRollUser().then((roll)=>{
      //1 -> general, 2-> administrator
      this.rollUsuario = Number(roll);
      console.log(this.rollUsuario);
      
    });
   }

  ngOnInit() {
  }


  cerrarSession(){
    this._auht.CerrarSession()
  }


}
