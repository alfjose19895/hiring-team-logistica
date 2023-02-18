<?php

namespace App\Models\Products;

use App\Models\Products\Products;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductChangeHistory extends Model
{
    use HasFactory;

    protected $table = 'product_change_histories';

    protected $primaryKey = 'id';

    protected $fillable = [ 'id', 'product_id', 'category_id', 'product_history', 'created_at', 'updated_at' ];

    public function product(){
        return $this->hasMany(Products::class, 'id', 'product_id');
    }

    public function category(){
        return $this->hasMany(ProductCategorization::class, 'id', 'category_id');
    }
}
