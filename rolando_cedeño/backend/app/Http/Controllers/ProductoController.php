<?php

namespace App\Http\Controllers;
use App\Models\Producto;
use DB;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index(){
        $producto=Producto::all();
        return response()->json(
            $producto
        );
    }

    public function buscarProducto(Request $request){


        $data = [];
       
        $search = $request->text;
        
        $text=mb_strtoupper($search);
    
        $data=DB::table('producto')
        ->select('*')               
        ->where(function($c)use($text) {
            if($text!=""){
                $c->where('nombre', 'like', '%'.$text.'%');
            }
           
        })
        ->take(10)->get();       
        
        return response()->json($data);
    }

    public function store(Request $request){
        //validacion
       
        $messages = [
            'nombre.required' => 'Debe ingresar el nombre ',
            'imagen.required' => 'Debe ingresar la imagen',
            'precio.required' => 'Debe ingresar el precio',
            'categoria.required' => 'Debe ingresar la categoria',
        ];

        $rules = [
            'nombre' =>"required|string|max:50",
            'imagen' => "required|string|max:500",
            'precio' => "required",
            'categoria' => "required",
        ];

        $this->validate($request, $rules, $messages);

        //guardamos
        $producto=new Producto();
        $producto->nombre=$request->nombre;
        $producto->precio=$request->precio;
        $producto->descripcion=$request->descripcion;
        $producto->imagen=$request->imagen;
        $producto->categoria=$request->categoria;
       
        if($producto->save()){
            return response()->json(
                $producto
            );
        }
        return response()->json(
            //error
           true
        );

    }

    public function update(Request $request, $id){
        //validacion
        $messages = [
            'nombre.required' => 'Debe ingresar el nombre ',
            'imagen.required' => 'Debe ingresar la imagen',
            'precio.required' => 'Debe ingresar el precio',
            'categoria.required' => 'Debe ingresar la categoria',
        ];

        $rules = [
            'nombre' =>"required|string|max:50",
            'imagen' => "required|string|max:500",
            'precio' => "required",
            'categoria' => "required",
        ];

        $this->validate($request, $rules, $messages);
    
        //actualizamos
        $producto=Producto::find($id);
        $producto->nombre=$request->nombre;
        $producto->precio=$request->precio;
        $producto->descripcion=$request->descripcion;
        $producto->imagen=$request->imagen;
        $producto->categoria=$request->categoria;
       
        if($producto->save()){
            return response()->json(
               $producto
            );
        }
        return response()->json(
            //error
            true
        );

    }

    public function destroy($id){
        $prod=Producto::find($id);
        if($prod->delete()){
            return response()->json(
                false
            );
        }else{
            //error
            return response()->json(
                false
            );
        }
       
    }
}
