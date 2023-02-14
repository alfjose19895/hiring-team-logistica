<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeadExit extends Model
{
    use HasFactory;
    protected $table = 'head_exit';
    protected $primaryKey  = 'idhead_exit';
    public $timestamps = false;

}
