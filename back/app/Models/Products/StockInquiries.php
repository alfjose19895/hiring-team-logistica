<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockInquiries extends Model
{
    use HasFactory;

    protected $table = 'stock_inquiries';

    protected $primaryKey = 'id';

    protected $fillable = [ 'id', 'quantity', 'created_at', 'updated_at' ];
}
