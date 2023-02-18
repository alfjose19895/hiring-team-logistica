<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Products\StockInquiries;


class StockInquiriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StockInquiries::truncate();

        StockInquiries::create([
            'id' => '1',
            'quantity' => '1000',
        ]);

        StockInquiries::create([
            'id' => '2',
            'quantity' => '100',
        ]);
    }
}
