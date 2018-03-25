import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from "../../../services/autenticacion.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _auht:AutenticacionService, private router:Router) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this._auht.CerrarSession().then(data=>{
      this.router.navigate(['/login']);        
    }).catch(data=>{
      console.log(data);
    })
  }

}
