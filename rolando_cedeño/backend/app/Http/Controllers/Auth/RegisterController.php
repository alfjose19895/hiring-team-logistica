<?php

namespace App\Http\Controllers\Auth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __constructor(){
        $this->middleware('guest');
    }
    public function register(Request $request){
        
        $this->validate($request,[
            "name"=>["required", "max:255"],
            "email"=>["required", "email", "max:255", "unique:users"],
            "password"=>["required", "max:255"],
        ]);
        
        $nuevo_usuario=new User();
        $nuevo_usuario->name=$request->name;
        $nuevo_usuario->email=$request->email;
        $nuevo_usuario->password=bcrypt($request->password);
        $nuevo_usuario->save();
        
    }
}
