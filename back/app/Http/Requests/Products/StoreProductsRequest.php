<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "code" => "required",
            "product_name" => "required",
            "has_stock" => "required|numeric",
            "category_id" => "required|numeric",
            "size" => "required|",
            "weight" => "required|",
            "volume" => "required|",
            "price" => "required|numeric",
            "quantity" => "required|numeric"
        ];
    }
}
