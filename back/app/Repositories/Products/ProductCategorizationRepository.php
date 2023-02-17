<?php

namespace App\Repositories\Products;
use App\Models\Products\ProductCategorization;
use Illuminate\Support\Carbon;

class ProductCategorizationRepository {

    private $model;

    public function __construct(){
        $this->model = new ProductCategorization;
    }

    /**
     * Queries all ProductCategorization and returns them sorted in descending order
     *
     * @return \App\Models\Products\ProductCategorization
     */
    public function all(){
        return $this->model::orderBy('created_at', 'desc')->get();
    }
}