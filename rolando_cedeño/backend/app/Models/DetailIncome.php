<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailIncome extends Model
{
    use HasFactory;
    protected $table = 'detail_income';
    protected $primaryKey  = 'iddetail_income';
    public $timestamps = false;

}
