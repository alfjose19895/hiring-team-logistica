<?php

namespace App\Http\Controllers;
use App\Models\Product;
use DB;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $product=Product::with('category')
        ->where('state','A')
        ->get();
        return response()->json(
            $product
        );
    }

    public function searchProductCmb(Request $request){
        $data = [];
        $search = $request->q;        
        $text=mb_strtoupper($search);    
        $data=DB::table('product')
        ->leftJoin('category as cat', 'cat.idcategory','product.id_category')
        ->where(function($c)use($text) {
            $c->where('product.name', 'like', '%'.$text.'%')
            ->orwhere('code', 'like', '%'.$text.'%');           
        })
        ->select('id_product as id',DB::raw("CONCAT(code, ' - ', product.name, ' - ', cat.name) AS name"))
        ->where('product.state','A')
        ->where('cat.state','A')
        ->take(10)->get();            
        return response()->json($data);
    }

    public function searchProduct(Request $request){
     
        $data = [];
        $idproduct = $request->product;  
        $idcategory = $request->category;   
        $filter_product = $request->filtro_product;  
        $filter_category = $request->filtro_category;   
        $filtro_stock = $request->filtro_stock;        
       
        $data=DB::table('product')
        ->leftJoin('category as cat', 'cat.idcategory','product.id_category')
        ->where(function($pr)use($idproduct, $filter_product, $idcategory, $filter_category, $filtro_stock) {
            if($filter_product=="F"){
                $pr->where('product.id_product', $idproduct);    
            }  
            if($filter_category=="F"){
                $pr->where('product.id_category', $idcategory);    
            }  
            
            if($filtro_stock!=2){
                $pr->where('product.tiene_stock', $filtro_stock);    
            }  
        })
        // ->where('product.tiene_stock', $filtro_stock)
        ->select('product.id_product', 'product.name as product', 'cat.name as category', 'product.id_category', 'product.stock','product.tiene_stock', 'product.code')
        ->get();            
        return response()->json($data);
    }

    public function searchProductStock(Request $request){
     
        $data = [];
        $idproduct = $request->product;  
        $idcategory = $request->category;   
        $filter_product = $request->filtro_product;  
        $filter_category = $request->filtro_category;   
       
       
        $data=DB::table('product')
        ->leftJoin('category as cat', 'cat.idcategory','product.id_category')
        ->where(function($pr)use($idproduct, $filter_product, $idcategory, $filter_category) {
            if($filter_product=="F"){
                $pr->where('product.id_product', $idproduct);    
            }  
            if($filter_category=="F"){
                $pr->where('product.id_category', $idcategory);    
            }  
           
        })
        ->where('product.tiene_stock', 1)
        ->select('product.id_product', 'product.name as product', 'cat.name as category', 'product.id_category', 'product.stock','product.tiene_stock', 'product.code')
        ->get();            
        return response()->json($data);
    }


    public function searchProductHistory(Request $request){
     
        $data = [];
        $idproduct = $request->product;  
        $idcategory = $request->category;   
        $filter_product = $request->filtro_product;  
        $filter_category = $request->filtro_category;   
       
       
        $data=DB::table('product')
        ->leftJoin('category as cat', 'cat.idcategory','product.id_category')
        ->where(function($pr)use($idproduct, $filter_product, $idcategory, $filter_category) {
            if($filter_product=="F"){
                $pr->where('product.id_product', $idproduct);    
            }  
            if($filter_category=="F"){
                $pr->where('product.id_category', $idcategory);    
            }  
           
        })
       
        ->select('product.id_product', 'product.name as product', 'cat.name as category', 'product.id_category', 'product.stock','product.tiene_stock', 'product.code')
        ->get();            
        return response()->json($data);
    }

    public function getProduct($id){
        $data=DB::table('product')
        ->leftJoin('category as cat', 'cat.idcategory','product.id_category')
        ->select('product.id_product', 'product.name as product', 'cat.name as category', 'product.id_category', 'product.stock','product.tiene_stock', 'product.code')
        ->where('id_product',$id)
        ->first(); 
        return response()->json(
            [
                "error"=>false,
                "data"=>$data           
            ]
        );      
    }

    public function detailsHistory($id){
        $data=DB::table('record_movements')
        ->leftJoin('users as us', 'us.id','record_movements.idcreated_by')
        ->select('record_movements.idrecord_movements','record_movements.code_product','record_movements.category','record_movements.id_product','record_movements.product','us.name','record_movements.type','record_movements.quantity','record_movements.date_created')
        ->where('id_product',$id)
        ->get(); 
        return response()->json(
            [
                "error"=>false,
                "data"=>$data           
            ]
        ); 
    }

    public function store(Request $request){
        //validacion
        $messages = [
            'name.required' => 'You must enter the product ',
            'code.required' => 'You must enter the code',
            'idcategory.required' => 'You must select a category',
        ];

        $rules = [
            'name' =>"required|string|max:50",
            'code' => "required|string|max:500",
            'idcategory' => "required",
        ];

        $this->validate($request, $rules, $messages);
    
        //store
        $product=new Product();
        $product->name=$request->name;
        $product->code=$request->code;
        $product->id_category=$request->idcategory;
        $product->state='A';
        $product->stock=0;
        $product->tiene_stock=0;
        $product->idcreated_by=auth()->user()->id;
        $product->date_created=date('Y-m-d H:i:s');

        $name_p=$product->name;
        $code_p=$product->code;

        $exit=Product::where(function($c)use($name_p, $code_p) {
            $c->where('name', $name_p)
            ->orWhere('code', $code_p);
        })
        ->where('state','A')->first();

        if(!is_null($exit)){
            return response()->json(
                [
                    "error"=>true,
                    "mensaje"=>"The name or code of product already exists"                
                ]
            );
        }

        // validate that the information is not repeated
        $name_pr=$product->name;
        $code_pr=$product->code;
        $exist=Product::where('state','A')
        ->where(function($c)use($name_pr, $code_pr) {
            $c->where('name', $name_pr)
            ->orWhere('code', $code_pr);
        })->first();
        if(!is_null($exist)){
            return response()->json(
                [
                    "error"=>true,
                    "mensaje"=>"The name or code of the product already exists"                
                ]
            );
        }
       
        if($product->save()){
            return response()->json(
                [
                    "error"=>false,
                    "mensaje"=>"Product added successfully"                
                ]
            );
        }
        return response()->json(
            [
                "error"=>true,
                "mensaje"=>"Could not add product"                
            ]
        );

    }

    public function update(Request $request, $id){
        //validacion
        $messages = [
            'name.required' => 'You must enter the product ',
            'code.required' => 'You must enter the code',
            'idcategory.required' => 'You must select a category',
        ];

        $rules = [
            'name' =>"required|string|max:50",
            'code' => "required|string|max:500",
            'idcategory' => "required",
        ];

        $this->validate($request, $rules, $messages);
    
        //update
        $product=Product::where('id_product',$id)->first();
        $product->name=$request->name;
        $product->code=$request->code;
        $product->id_category=$request->idcategory;
        $product->idupdated_by=auth()->user()->id;
        $product->date_updated=date('Y-m-d H:i:s');

        $name_p=$product->name;
        $code_p=$product->code;

        $exit=Product::where(function($c)use($name_p, $code_p) {
            $c->where('name', $name_p)
            ->orWhere('code', $code_p);
        })
        ->where('state','A')
        ->where('id_product','!=',$id)
        ->first();

        if(!is_null($exit)){
            return response()->json(
                [
                    "error"=>true,
                    "mensaje"=>"The name or code of product already exists"                
                ]
            );
        }
       
        if($product->save()){
            return response()->json(
                [
                    "error"=>false,
                    "mensaje"=>"Product updated successfully"                
                ]
            );
        }
        return response()->json(
            [
                "error"=>true,
                "mensaje"=>"Could not update product"                
            ]
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
