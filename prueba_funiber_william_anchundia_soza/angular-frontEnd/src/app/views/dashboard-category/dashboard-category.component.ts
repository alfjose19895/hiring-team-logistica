import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CategoryProductI } from '../../models/categoryProduct.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.css']
})
export class DashboardCategoryComponent implements OnInit {

  ListCategoryProductI: CategoryProductI[]=[];


  constructor(private api:ApiService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkLocalStorage();    
  }

  checkLocalStorage(){
    if(!localStorage.getItem("token")){
      this.router.navigate(['login']);
    }else{
      this.getAllCategoryProduct();
    }
  }
  
  goNewCategoryProduct(){
    this.router.navigate(['new-category'])
  }

  getAllCategoryProduct(){
    this.api.getAllCategoryProduct().subscribe(data =>{  
      this.ListCategoryProductI = data.respuesta; 
    },(error)=>{
      this.ListCategoryProductI = [];
      this.toastr.error(error.error.mensaje);
    });
  }

  goEditCategory(idCategory:any){
    this.router.navigate(['edit-category',idCategory])
  }

  deleteCategory(id:any){
    this.api.deleteCategoryProduct(id).subscribe(data =>{ 
      if(data.key==200){
        this.getAllCategoryProduct();
        this.toastr.success(data.mensaje);
      } 
    },(error)=>{
      this.toastr.error(error);
    });
  }


}
