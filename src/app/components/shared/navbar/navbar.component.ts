import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../../services/autenticacion.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auht:AutenticacionService) { }

  ngOnInit() {
  }


  cerrarSession(){
    this._auht.CerrarSession()
  }


}
