<?php

namespace App\Http\Controllers;

use App\Models\ProductMeasurement;
use Illuminate\Http\Request;

class ProductMeasurementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productMeasurements = ProductMeasurement::all();
        return response()->json($productMeasurements);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $productMeasurement = new ProductMeasurement;
        $productMeasurement->price = $request->price;
        $productMeasurement->size = $request->size;
        $productMeasurement->weight = $request->weight;
        $productMeasurement->product_id = $request->product_id;
        $productMeasurement->save();
        return response()->json([
            "message" => "Product measurement Added",
            "data" => $productMeasurement
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductMeasurement  $productMeasurement
     * @return \Illuminate\Http\Response
     */
    public function show(ProductMeasurement $productMeasurement)
    {
        return response()->json($productMeasurement);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductMeasurement  $productMeasurement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductMeasurement $productMeasurement)
    {
        $productMeasurement->price = $request->price;
        $productMeasurement->size = $request->size;
        $productMeasurement->weight = $request->weight;
        $productMeasurement->product_id = $request->product_id;
        $productMeasurement->save();
        return response()->json([
            "message" => "Product measurement Updated",
            "data" => $productMeasurement
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductMeasurement  $productMeasurement
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductMeasurement $productMeasurement)
    {
        $productMeasurement->delete();
        return response()->json([
            "message" => "Product measurement Deleted",
            "data" => $productMeasurement
        ]);
    }
}
