<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Products\StoreProductMeasurementRequest;
use App\Http\Requests\Products\UpdateProductMeasurementRequest;
use App\Models\Products\ProductMeasurement;
use Illuminate\Http\Request;

class ProductMeasurementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductMeasurementRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductMeasurementRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductMeasurement  $productMeasurement
     * @return \Illuminate\Http\Response
     */
    public function show(ProductMeasurement $productMeasurement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductMeasurement  $productMeasurement
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductMeasurement $productMeasurement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductMeasurementRequest  $request
     * @param  \App\Models\ProductMeasurement  $productMeasurement
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductMeasurementRequest $request, ProductMeasurement $productMeasurement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductMeasurement  $productMeasurement
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductMeasurement $productMeasurement)
    {
        //
    }
}
