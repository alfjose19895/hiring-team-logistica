<?php

namespace App\Repositories\Products;
use App\Models\Products\ProductChangeHistory;
// use Illuminate\Support\Carbon;

class ProductChangeHistoryRepository {

    private $model;

    public function __construct(){
        $this->model = new ProductChangeHistory;
    }

    /**
     * Queries all ProductCategorization and returns them sorted in descending order
     *
     * @return \App\Models\Products\ProductChangeHistory
     */
    public function all(){
        return $this->model::with('product')->with('category')->orderBy('created_at', 'desc')->get();
    }
}