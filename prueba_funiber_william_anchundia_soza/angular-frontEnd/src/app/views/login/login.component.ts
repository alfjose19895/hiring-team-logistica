import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface'
import { ResponseI } from 'src/app/models/response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private route:Router) { }

  errorStatus:boolean= false;
  errorMesaje:any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem("token")){
      this.route.navigate(['dashboard-history-product']);
    }
  }

  onLogin(form: LoginI){
    this.api.loginByEmail(form).subscribe(data =>{
      let dataResponse:ResponseI = data;

      if (dataResponse.key == 200){
        localStorage.setItem("token",dataResponse.mensaje);
        this.route.navigate(['dashboard-history-product']);
      }else{
        this.errorStatus= true;
        this.errorMesaje = dataResponse.mensaje;
      }
      
    },(error)=>{
      this.errorStatus= true;
      this.errorMesaje = error.error.mensaje;
    });
  }
}
