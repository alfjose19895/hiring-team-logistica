import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductI } from 'src/app/models/product.interface';
import { ApiService } from '../../services/api/api.service'

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  control = new FormControl();
  controlFilter = new FormControl();
  ListProductI: ProductI[]=[];
  constructor(private apiService:ApiService,private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  buscarDato(){
    if (this.controlFilter.value != null){
      this.apiService.getAllProductSearch(this.controlFilter.value,this.control.value)
      .subscribe(data=>{
        this.ListProductI = data.respuesta;
      },(error)=>{
        this.ListProductI = [];
        this.toastr.error(error.error.mensaje);
      })
    }else{
      this.ListProductI = [];
      this.toastr.error("Select filter");
    }
  }
}
