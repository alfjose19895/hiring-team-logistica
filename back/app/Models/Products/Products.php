<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $primaryKey = 'id';

    protected $fillable = [ 'id', 'code', 'product_name', 'has_stock', 'category_id',
        'product_measurements_id', 'stock_inquiries_id', 'created_at', 'updated_at'
    ];

    public function productMeasurements(){
        return $this->hasMany(ProductMeasurement::class, 'id', 'product_measurements_id');
    }

    public function category(){
        return $this->hasMany(ProductCategorization::class, 'id', 'category_id');
    }

    public function stockInquiries(){
        return $this->hasMany(StockInquiries::class, 'id', 'stock_inquiries_id');
    }

}






