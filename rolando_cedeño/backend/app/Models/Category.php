<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'category';
    protected $primaryKey  = 'idcategory';
    public $timestamps = false;

    public function productos(){
        return $this->hasMany('App\Models\Product','id_category','idcategory');
    }
}
