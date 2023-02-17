<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategorization extends Model
{
    use HasFactory;

    public $table = "product_categorizations";

    protected $fillable = [
        'id', 'category_name', 'status', 'created_at', 'updated_at'
    ];
}
