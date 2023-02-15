import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  goCategoryProduct(){
    this.route.navigate(['dashboard-category']);
  }

  goProduct(){
    this.route.navigate(['dashboard-product'])
  }

  goSearchProduct(){
    this.route.navigate(['search-product'])
  }

  destroySession(){
    localStorage.removeItem("token");
  }

}
