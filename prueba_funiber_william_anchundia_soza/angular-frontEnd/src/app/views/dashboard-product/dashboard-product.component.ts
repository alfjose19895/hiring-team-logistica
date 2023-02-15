import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { ProductI } from '../../models/product.interface';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css']
})
export class DashboardProductComponent implements OnInit {

  ListProductI:ProductI[]=[];

  constructor(private router:Router,private apiService:ApiService) { 
    const activo = true;
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(!localStorage.getItem("token")){
      this.router.navigate(['login']);
    }else{
      this.getAllProduct();
    }
  }

  getAllProduct(){
    this.apiService.getAllProduct().subscribe(data=>{
      this.ListProductI = data.respuesta;
      console.log(data.respuesta);
    },(error)=>{

    });
  }

  goEditProduct(idProduct:any){
    this.router.navigate(['edit-product',idProduct]);
  }
}
