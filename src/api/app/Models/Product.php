<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;

class Product extends Model implements Auditable
{
    use HasFactory;
    use AuditableTrait;

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function stock() {
        return $this->hasOne(Stock::class);
    }

    public function productMeasurement() {
        return $this->hasOne(productMeasurement::class);
    }
}
