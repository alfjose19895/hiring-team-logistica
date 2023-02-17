<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Products\StoreStockInquiriesRequest;
use App\Http\Requests\Products\UpdateStockInquiriesRequest;
use App\Models\Products\StockInquiries;
use Illuminate\Http\Request;

class StockInquiriesController extends Controller
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
     * @param  \App\Http\Requests\StoreStockInquiriesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStockInquiriesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StockInquiries  $stockInquiries
     * @return \Illuminate\Http\Response
     */
    public function show(StockInquiries $stockInquiries)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockInquiries  $stockInquiries
     * @return \Illuminate\Http\Response
     */
    public function edit(StockInquiries $stockInquiries)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStockInquiriesRequest  $request
     * @param  \App\Models\StockInquiries  $stockInquiries
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStockInquiriesRequest $request, StockInquiries $stockInquiries)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StockInquiries  $stockInquiries
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockInquiries $stockInquiries)
    {
        //
    }
}
