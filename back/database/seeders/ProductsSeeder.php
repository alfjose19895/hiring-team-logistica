<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Products\Products;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Products::truncate();

        Products::create([
            'id' => '1',
            'code' => 'A0101',
            'product_name' => 'Cama',
            'has_stock' => 1,
            'category_id' => 4,
            'product_measurements_id' => 1,
            'stock_inquiries_id' => 1,
        ]);

        Products::create([
            'id' => '2',
            'code' => 'A0101',
            'product_name' => 'Almohadas',
            'has_stock' => 1,
            'category_id' => 4,
            'product_measurements_id' => 2,
            'stock_inquiries_id' => 2,
        ]);
    }
}
