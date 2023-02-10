<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_measurements', function (Blueprint $table) {
            $table->id();
            $table->integer('price');
            $table->integer('size');
            $table->integer('weight');
            $table->timestamps();
        });

        Schema::table('product_measurements', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_measurements');
    }
};
