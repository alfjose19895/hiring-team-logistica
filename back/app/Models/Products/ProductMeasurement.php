<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductMeasurement extends Model
{
    use HasFactory;

    protected $table = 'product_measurements';

    protected $primaryKey = 'id';

    protected $fillable = [ 'id', 'size', 'weight', 'volume', 'price', 'created_at', 'updated_at' ];

}



