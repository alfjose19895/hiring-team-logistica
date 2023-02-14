<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeadIncome extends Model
{
    use HasFactory;
    protected $table = 'head_income';
    protected $primaryKey  = 'idhead_income';
    public $timestamps = false;

}
