<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code', 100);
            $table->string('product_name', 100);
            $table->boolean('has_stock')->default(1);
            $table->integer('category_id')->references('id')->on('product_categorizations')->onDelete('cascade');
            $table->integer('product_measurements_id')->references('id')->on('product_measurements')->onDelete('cascade');
            $table->integer('stock_inquiries_id')->references('id')->on('stock_inquiries')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
