<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;
    protected $table = 'record_movements';
    protected $primaryKey  = 'idrecord_movements';
    public $timestamps = false;

}
