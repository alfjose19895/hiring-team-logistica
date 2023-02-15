import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { CategoryProductI} from '../../models/categoryProduct.interface'
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  newCategoryProductForm = new FormGroup({
    nameCategoryProduct : new FormControl('',Validators.required),
    idCategoryProduct: new FormControl('0')
  })

  constructor(private router:Router, private apiService:ApiService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onCreateCategoryProduct(form:CategoryProductI){
    console.log(form);
    this.apiService.createCategoryProduct(form).subscribe(data=>{
      this.toastr.success(data.mensaje);      
    },(error)=>{
      this.toastr.error(error.error.mensaje);
    });

    
    this.router.navigate(['dashboard-category']);

  }
}
