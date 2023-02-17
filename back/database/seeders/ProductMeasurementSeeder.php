<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Products\ProductMeasurement;

class ProductMeasurementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductMeasurement::truncate();

        ProductMeasurement::create([
            'id' => '1',
            'size' => '150 cm x 190 cm',
            'weight' => '42 Kg',
            'volume' => 100,
            'price' => 500,
        ]);

        ProductMeasurement::create([
            'id' => '2',
            'size' => '40cm',
            'weight' => '2lb',
            'volume' => 12,
            'price' => 30,
        ]);
    }
}
