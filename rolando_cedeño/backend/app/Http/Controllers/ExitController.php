<?php

namespace App\Http\Controllers;
use App\Models\Record;
use App\Models\DetailExit;
use App\Models\HeadExit;
use App\Models\Product;
use DB;
use Log;
use Illuminate\Http\Request;

class ExitController extends Controller
{
    public function getExits(){
        $data=DB::table('head_exit as head')
        ->leftJoin('users as us', 'us.id','head.idcreated_by')
        ->select('head.idhead_exit','head.date_created','us.name as name_user','head.quantity_entered' )
        ->get();
        return response()->json(
            $data
        );
    }

    public function detailsExit($id){
        $data=DB::table('detail_exit')
        ->where('idhead_exit',$id)
        ->get();
        return response()->json(
            $data
        );
    }
    public function saveExit(Request $request){
      
        $transaction=DB::transaction(function() use($request){   
            try{
                
                //validation
                if(sizeof($request->IdCateAdd)<=0){
                    return response()->json(
                        [
                            "error"=>true,
                            "mensaje"=>"You must enter at least one product"                
                        ]
                    );
                }
              
                //header
                $headExit=new HeadExit();
                $headExit->date_created=date('Y-m-d H:i:s');
                $headExit->idcreated_by=auth()->user()->id;
                if($headExit->save()){
                    //obtain the arrays of each one of the items
                    $idProduct=$request->idProdAdd;
                    $Product=$request->ProdAdd;
                    $Category=$request->CateAdd;
                    $Quantify=$request->QuantifyAdd;
                    $Code=$request->CodeAdd;
                    $cont=0;
                    $quant_products=0;
                    while($cont < count($idProduct)){
                        $detailExit=new DetailExit();
                        $detailExit->idhead_exit=$headExit->idhead_exit;
                        $detailExit->id_product=$idProduct[$cont];
                        $detailExit->product=$Product[$cont];
                        $detailExit->category=$Category[$cont];
                        $detailExit->quantify=$Quantify[$cont];
                        $detailExit->code_product=$Code[$cont];
                        $detailExit->date_created=date('Y-m-d H:i:s');
                        $detailExit->idcreated_by=auth()->user()->id;
                        if($detailExit->save()){

                            //exit Record
                            $detailRecord=new Record();
                            $detailRecord->product=$Product[$cont];
                            $detailRecord->id_product=$idProduct[$cont];
                            $detailRecord->category=$Category[$cont];
                            $detailRecord->quantity=$Quantify[$cont];
                            $detailRecord->code_product=$Code[$cont];
                            $detailRecord->date_created=date('Y-m-d H:i:s');
                            $detailRecord->idcreated_by=auth()->user()->id;
                            $detailRecord->type="Exit";
                            $detailRecord->save();

                            //update the stock of the product
                            $updateStock=Product::where('id_product',$detailExit->id_product)
                            ->first();
                            $current_stock=$updateStock->stock;
                            $subtract_stock=$current_stock - $detailExit->quantify;
                            if($subtract_stock<0){
                                DB::Rollback();
                                return response()->json([
                                    "error"=>true,
                                    "mensaje"=>"The available stock of " .$detailExit->product. " cannot be greater than 10"
                                ]);
                            }
                            if($subtract_stock==0){
                                $updateStock->tiene_stock=0;
                            }else{
                                $updateStock->tiene_stock=1;
                            }
                            $updateStock->stock=$subtract_stock;
                            $updateStock->save();
                            $quant_products=$quant_products + $Quantify[$cont];
                            $cont=$cont+1;
                        }
                       
                    }
                    $udpateQuantHeader=HeadExit::where('idhead_exit',$headExit->idhead_exit)
                    ->update(['quantity_entered'=> $quant_products]);

                    return response()->json([
                        "error"=>false,
                        "mensaje"=>"Exit added successfully"
                    ]);
                } 
            } catch (\Throwable $th) {
                Log::error('ExitController, saveExit '.$th->getMessage().' Linea => '.$th->getLine());
                DB::Rollback();
                return response()->json([
                    "error"=>true,
                    "mensaje"=>"An error occurred, please try again later"
                ]);
            }
        });
        return $transaction;     
    }
}