<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Products\StoreProductChangeHistoryRequest;
use App\Http\Requests\Products\UpdateProductChangeHistoryRequest;
use App\Models\Products\ProductChangeHistory;
use App\Repositories\Products\ProductChangeHistoryRepository;
// use App\Models\Products\Products;
use Exception;
use Illuminate\Http\Request;


class ProductChangeHistoryController extends Controller
{

    private $productChangeHistoryRepository;

    /**
     * @param  App\Repositories\Products\ProductChangeHistoryRepository  $productChangeHistoryRepository
     */
    public function __construct( ProductChangeHistoryRepository $productChangeHistoryRepository){
        $this->productChangeHistoryRepository = $productChangeHistoryRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // if (!$request->ajax()) return redirect('/');
        try {
            $productChange = $this->productChangeHistoryRepository->all();
            return  response()->json($productChange, 200);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
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
     * @param  \App\Http\Requests\StoreProductChangeHistoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductChangeHistoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductChangeHistory  $productChangeHistory
     * @return \Illuminate\Http\Response
     */
    public function show(ProductChangeHistory $productChangeHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductChangeHistory  $productChangeHistory
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductChangeHistory $productChangeHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductChangeHistoryRequest  $request
     * @param  \App\Models\ProductChangeHistory  $productChangeHistory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductChangeHistoryRequest $request, ProductChangeHistory $productChangeHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductChangeHistory  $productChangeHistory
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductChangeHistory $productChangeHistory)
    {
        //
    }
}
