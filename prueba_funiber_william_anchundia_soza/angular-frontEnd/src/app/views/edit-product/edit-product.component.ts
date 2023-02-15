import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editProductForm = new FormGroup({
    codeProduct : new FormControl('',Validators.required),
    nameProduct : new FormControl('',Validators.required),
    hasStock : new FormControl('0',Validators.required),
    idCategoryProduct : new FormControl('',Validators.required),
  })

  constructor(private toastr:ToastrService, private apiService:ApiService,private _route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  onEditProduct(form:any){
    form.idProduct = this._route.snapshot.paramMap.get('idProduct');
    this.apiService.updateProduct(form).subscribe(data=>{
      this.toastr.success(data.mensaje);
      this.router.navigate(['dashboard-product']);
    },(error)=>{
      this.toastr.error(error.error.mensaje);
    });    
  }
}
