<?php

namespace App\Http\Controllers;
use App\Models\Record;
use App\Models\DetailIncome;
use App\Models\HeadIncome;
use App\Models\Product;
use DB;
use Log;
use Illuminate\Http\Request;

class IncomeController extends Controller
{
    public function getIncomes(){
        $data=DB::table('head_income as head')
        ->leftJoin('users as us', 'us.id','head.idcreated_by')
        ->select('head.idhead_income','head.date_created','us.name as name_user','head.quantity_entered' )
        ->get();
        return response()->json(
            $data
        );
    }

    public function detailsIncome($id){
        $data=DB::table('detail_income')
        ->where('idhead_income',$id)
        ->get();
        return response()->json(
            $data
        );
    }
    
    public function saveIncome(Request $request){
      
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
                $headIncome=new HeadIncome();
                $headIncome->date_created=date('Y-m-d H:i:s');
                $headIncome->idcreated_by=auth()->user()->id;
                if($headIncome->save()){
                    //obtain the arrays of each one of the items
                    $idProduct=$request->idProdAdd;
                    $Product=$request->ProdAdd;
                    $Category=$request->CateAdd;
                    $Quantify=$request->QuantifyAdd;
                    $Code=$request->CodeAdd;
                    $cont=0;
                    $quant_products=0;
                    while($cont < count($idProduct)){
                        $detailIncome=new DetailIncome();
                        $detailIncome->idhead_income=$headIncome->idhead_income;
                        $detailIncome->id_product=$idProduct[$cont];
                        $detailIncome->product=$Product[$cont];
                        $detailIncome->category=$Category[$cont];
                        $detailIncome->quantify=$Quantify[$cont];
                        $detailIncome->code_product=$Code[$cont];
                        $detailIncome->date_created=date('Y-m-d H:i:s');
                        $detailIncome->idcreated_by=auth()->user()->id;
                        if($detailIncome->save()){

                            //income Record
                            $detailRecord=new Record();
                            $detailRecord->product=$Product[$cont];
                            $detailRecord->id_product=$idProduct[$cont];
                            $detailRecord->category=$Category[$cont];
                            $detailRecord->quantity=$Quantify[$cont];
                            $detailRecord->code_product=$Code[$cont];
                            $detailRecord->date_created=date('Y-m-d H:i:s');
                            $detailRecord->idcreated_by=auth()->user()->id;
                            $detailRecord->type="Income";
                            $detailRecord->save();

                            //update the stock of the product
                            $updateStock=Product::where('id_product',$detailIncome->id_product)
                            ->first();
                            $current_stock=$updateStock->stock;
                            $updateStock->stock=$current_stock + $detailIncome->quantify;
                            $updateStock->tiene_stock=1;
                            $updateStock->save();
                            $quant_products=$quant_products + $Quantify[$cont];
                            $cont=$cont+1;
                        }
                       
                    }
                    $udpateQuantHeader=HeadIncome::where('idhead_income',$headIncome->idhead_income)
                    ->update(['quantity_entered'=> $quant_products]);

                    return response()->json([
                        "error"=>false,
                        "mensaje"=>"Income added successfully"
                    ]);
                } 
            } catch (\Throwable $th) {
                Log::error('IncomeController, saveIncome '.$th->getMessage().' Linea => '.$th->getLine());
                DB::Rollback();
                return response()->json([
                    "error"=>true,
                    "mensaje"=>"An error occurred, please try again laterxx"
                ]);
            }
        });
        return $transaction;     
    }
}