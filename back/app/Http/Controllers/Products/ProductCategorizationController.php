<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Products\StoreProductCategorizationRequest;
use App\Http\Requests\Products\UpdateProductCategorizationRequest;
use App\Models\Products\ProductCategorization;
use App\Repositories\Products\ProductCategorizationRepository;
use Exception;
use Illuminate\Http\Request;

class ProductCategorizationController extends Controller
{
    private $productCategorizationRepository;

    /**
     * @param  App\Repositories\Products\ProductCategorizationRepository  $productCategorizationRepository
     */
    public function __construct( ProductCategorizationRepository $productCategorizationRepository){
        $this->productCategorizationRepository = $productCategorizationRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        // if (!$request->ajax()) return redirect('/');
        try {
            $productCategorization = $this->productCategorizationRepository->all();
            return  response()->json($productCategorization, 200);
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
     * @param  \App\Http\Requests\StoreProductCategorizationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductCategorizationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductCategorization  $productCategorization
     * @return \Illuminate\Http\Response
     */
    public function show(ProductCategorization $productCategorization)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductCategorization  $productCategorization
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductCategorization $productCategorization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductCategorizationRequest  $request
     * @param  \App\Models\ProductCategorization  $productCategorization
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductCategorizationRequest $request, ProductCategorization $productCategorization)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductCategorization  $productCategorization
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductCategorization $productCategorization)
    {
        //
    }
}
