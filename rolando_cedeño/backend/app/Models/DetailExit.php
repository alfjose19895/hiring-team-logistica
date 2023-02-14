<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailExit extends Model
{
    use HasFactory;
    protected $table = 'detail_exit';
    protected $primaryKey  = 'iddetail_exit';
    public $timestamps = false;

}
