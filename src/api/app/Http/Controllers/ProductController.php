<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMeasurement;
use App\Models\Stock;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with('category')->with('stock')->with('productMeasurement')->get();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request = $request->all();

        $product = new Product;
        $product->name = $request['name'];
        $product->code = $request['code'];
        $product->has_stock = $request['has_stock'];
        $product->category_id = $request['category_id'];
        $product->save();

        $productMeasurement = new ProductMeasurement;
        $productMeasurement->price = $request['productMeasurement']['price'];
        $productMeasurement->width = $request['productMeasurement']['width'];
        $productMeasurement->height = $request['productMeasurement']['height'];
        $productMeasurement->weight = $request['productMeasurement']['weight'];
        $productMeasurement->weight_measure = $request['productMeasurement']['weight_measure'];
        $productMeasurement->product_id = $product->id;
        $productMeasurement->save();

        $stock = new Stock;
        $stock->quantity = $request['stock']['quantity'];
        $stock->product_id = $product->id;
        $stock->save();

        return response()->json([
            "message" => "Product Added",
            "data" => $product
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $request = $request->all();

        $product->name = $request['name'];
        $product->code = $request['code'];
        $product->has_stock = $request['has_stock'];
        $product->category_id = $request['category_id'];
        $product->save();

        $productMeasurement = ProductMeasurement::find($request['productMeasurement']['id']);
        $productMeasurement->price = $request['productMeasurement']['price'];
        $productMeasurement->width = $request['productMeasurement']['width'];
        $productMeasurement->height = $request['productMeasurement']['height'];
        $productMeasurement->weight = $request['productMeasurement']['weight'];
        $productMeasurement->weight_measure = $request['productMeasurement']['weight_measure'];
        $productMeasurement->product_id = $request['id'];
        $productMeasurement->save();

        $stock = Stock::find($request['stock']['id']);
        $stock->quantity = $request['stock']['quantity'];
        $stock->product_id = $request['id'];
        $stock->save();

        return response()->json([
            "message" => "Product Updated",
            "data" => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete(); 
        return response()->json([
            "message" => "Product Deleted",
            "data" => $product
        ]);
    }
}
