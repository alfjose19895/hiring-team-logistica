import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ResponseI } from 'src/app/models/response.interface';
import {HistoryProductI} from '../../models/historyProduct.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-history-product',
  templateUrl: './dashboard-history-product.component.html',
  styleUrls: ['./dashboard-history-product.component.css']
})
export class DashboardHistoryProductComponent implements OnInit {

  ListHistoryProductI: HistoryProductI[]=[];

  constructor(private api:ApiService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(!localStorage.getItem("token")){
      this.router.navigate(['login']);
    }else{
      this.getAllHistoryProduct();
    }
  }
  
  getAllHistoryProduct(){
    this.api.getAllHistoryProduct().subscribe(data =>{  
      this.ListHistoryProductI = data.respuesta;    
      console.log(this.ListHistoryProductI);
    },(error)=>{
      this.toastr.error(error.error.mensaje);
    });
  }

}
