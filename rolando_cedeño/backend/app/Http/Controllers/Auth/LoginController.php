<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;

class LoginController extends Controller
{
    public function __constructor(){
        $this->middleware('guest');
    }

    public function login(Request $request){

        $this->validate($request,[
            "email"=>["required", "email"],
            "password"=>["required"],
        ]);

        //intentar loguear (negado)
        if(!auth()->guard()->attempt($request->only('email','password'))){
            throw new AuthenticationException();
        }


    } 
        
}