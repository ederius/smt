import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pin-header',
  templateUrl: './pin-header.component.html',
  styleUrls: ['./pin-header.component.css']
})
export class PinHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  cerrarSesion(){

    //borrando datos de sesion
    localStorage.sesionPin = "";
    this.router.navigate(['/pin/login']);

  }

}
