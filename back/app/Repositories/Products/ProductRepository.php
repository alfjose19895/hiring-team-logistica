<?php

namespace App\Repositories\Products;

use App\Models\Products\ProductChangeHistory;
use App\Models\Products\ProductMeasurement;
use App\Models\Products\Products;
use App\Models\Products\StockInquiries;
use Illuminate\Support\Carbon;

class ProductRepository {

    private $product_change_history;
    private $product_measurements;
    private $products;
    private $stock_inquiries;

    public function __construct(){
        $this->product_change_history = new ProductChangeHistory;
        $this->product_measurements = new ProductMeasurement;
        $this->products = new Products;
        $this->stock_inquiries = new StockInquiries;
    }

    /**
     * Queries all Products and returns them sorted in descending order
     *
     * @return \App\Models\Products\Products
     */
    public function all(){
        return $this->products::with('category')
                                ->with('productMeasurements')
                                ->with('stockInquiries')
                                ->orderBy('product_name', 'asc')
                                ->get();
    }

    /**
     * Records the Products received by the request
     *
     * @param  Object $request
     * @return \App\Models\Products\Products
     */
    public function save($request){

        $productMeasurements = $this->product_measurements::Create([
            'size' => $request->size,
            'weight' => $request->weight,
            'volume' => $request->volume,
            'price' => $request->price,
            'created_at' => Carbon::now(),
        ]);

        if (is_object($productMeasurements)) {
            $productMeasurementsId = $productMeasurements->id;
        }

        $stockInquiries = $this->stock_inquiries::Create([
            'quantity' => $request->quantity,
            'created_at' => Carbon::now(),
        ]);

        if (is_object($stockInquiries)) {
            $stockInquiriesId = $stockInquiries->id;
        }

        $product = $this->products::Create([
            'code' => $request->code,
            'product_name' => $request->product_name,
            'has_stock' => $request->has_stock,
            'category_id' => $request->category_id,
            'product_measurements_id' => $productMeasurementsId,
            'stock_inquiries_id' => $stockInquiriesId,
            'created_at' => Carbon::now(),
        ]);

        $product-> save();
        return $product;
    }

     /**
     * Updates the Products according to the received id
     *
     * @param  Object $request
     * @return \App\Models\Products\Products
     */
    public function update($request){

        $products = $this->products::find($request->id);
        if ($products) {

            $product_measurements = $this->product_measurements::find($request->product_measurements_id);
            $stock_inquiries = $this->stock_inquiries::find($request->stock_inquiries_id);

            $productChangeHistory = $this->product_change_history::Create([
                'product_id' => $request->id,
                'category_id' => $request->category_id,
                'product_history' => json_encode($products),
                'created_at' => Carbon::now(),
            ]);

            $product_measurements->size = $request->size;
            $product_measurements->weight = $request->weight;
            $product_measurements->volume = $request->volume;
            $product_measurements->price = $request->price;
            $product_measurements->updated_at = Carbon::now();
            $product_measurements->save();

            $stock_inquiries->quantity = $request->quantity;
            $stock_inquiries->updated_at = Carbon::now();
            $stock_inquiries->save();

            $products->code = $request->code;
            $products->product_name = $request->product_name;
            $products->has_stock = $request->has_stock;
            $products->category_id = $request->category_id;
            // $products->product_measurements_id = $request->product_measurements_id;
            // $products->stock_inquiries_id = $request->stock_inquiries_id;
            $products->updated_at = Carbon::now();
            $products->save();

            return response()->json($products, 200);
        }
        return $products;
    }
}