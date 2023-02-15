import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  editCategoryProductForm = new FormGroup({
    nameCategoryProduct : new FormControl('',Validators.required),
    idCategoryProduct: new FormControl('0',Validators.required)
  })

  constructor(private _route:ActivatedRoute, private apiService:ApiService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    console.log("Category edit: "+this._route.snapshot.paramMap.get('idCategory'));
  }

  onEditCategoryProduct(form:any){
    form.idCategoryProduct = this._route.snapshot.paramMap.get('idCategory');
    this.apiService.updateCategoryProduct(form).subscribe(data=>{
      this.toastr.success(data.mensaje);
      this.router.navigate(['dashboard-category']);
    },(error)=>{
      this.toastr.error(error.error.mensaje);
    });
  }
}
