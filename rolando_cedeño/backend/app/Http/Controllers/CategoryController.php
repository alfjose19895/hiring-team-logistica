<?php

namespace App\Http\Controllers;
use App\Models\Category;
use DB;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $category=Category::where('state','A')->get();
        return response()->json(
            $category
        );
    }

    public function searchCategories(){

        $data=DB::table('category')
        ->select('idcategory as id', 'name as text')
        ->where('state','A')
        ->get();       
        
        return response()->json($data);
    }

    public function store(Request $request){
        //validation
       
        $messages = [
            'name.required' => 'You must enter the category ',
        ];

        $rules = [
            'name' =>"required|string|max:50",
        ];

        $this->validate($request, $rules, $messages);

        //store
        $category=new Category();
        $category->name=$request->name;
        $category->state='A';
        $category->idcreated_by=auth()->user()->id;
        $category->date_created=date('Y-m-d H:i:s');

        $exit=Category::where('name', $category->name)
        ->where('state','A')->first();

        if(!is_null($exit)){
            return response()->json(
                [
                    "error"=>true,
                    "mensaje"=>"The category already exists"                
                ]
            );
        }
       
        if($category->save()){
            return response()->json(
                [
                    "error"=>false,
                    "mensaje"=>"Category added successfully"                
                ]
            );
        }
        return response()->json(
            [
                "error"=>true,
                "mensaje"=>"Could not add category"                
            ]
        );

    }

    public function update(Request $request, $id){
               
        //validation
        $messages = [
            'name.required' => 'You must enter the category ',
        ];

        $rules = [
            'name' =>"required|string|max:50",
        ];

        $this->validate($request, $rules, $messages);
    
        //update
        $category=Category::where('idcategory',$id)->first();
        $category->name=$request->name;
        $category->idupdated_by=auth()->user()->id;
        $category->date_updated=date('Y-m-d H:i:s');

        $exit=Category::where('name', $category->name)
        ->where('state','A')
        ->where('idcategory','!=',$id)
        ->first();

        if(!is_null($exit)){
            return response()->json(
                [
                    "error"=>true,
                    "mensaje"=>"The category already exists"                
                ]
            );
        }
       
        if($category->save()){
            return response()->json(
                [
                    "error"=>false,
                    "mensaje"=>"Category updated successfully"                
                ]
            );
        }
        return response()->json(
            [
                "error"=>true,
                "mensaje"=>"Could not update category"                
            ]
        );
    }

    public function destroy($id){
        $category=Category::with('productos')
        ->where('idcategory',$id)->first();
        if(sizeof($category->productos)>0){
            return response()->json(
                [
                    "error"=>true,
                    "mensaje"=>"The category is related"                
                ]
            );
        }
        $category->state="I";
        $category->idupdated_by=auth()->user()->id;
        $category->date_updated=date('Y-m-d H:i:s');
        if($category->save()){
            return response()->json(
                [
                    "error"=>false,
                    "mensaje"=>"Category deleted successfully"                
                ]
            );
        }
        return response()->json(
            [
                "error"=>true,
                "mensaje"=>"Could not delete category"                
            ]
        );
       
    }
}
