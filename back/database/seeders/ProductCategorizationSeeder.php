<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Products\ProductCategorization;
use Illuminate\Support\Facades\File;

class ProductCategorizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductCategorization::truncate();

        // ProductCategorization::create([
        //     'category_name' => 'Bienes de consumo',
        //     'status' => 1,
        // ]);

        $json = File::get("database/data/categories.json");

        $data = json_decode($json);

        foreach ($data as $obj) {
            ProductCategorization::create(array(
                "id" => $obj->id,
                "category_name" => $obj->category_name,
                "status" => $obj->status,
            ));
        }

    }
}
