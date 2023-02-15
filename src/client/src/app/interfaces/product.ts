import { Category } from "./category"
import { ProductMeasurement } from "./productMeasurement"
import { Stock } from "./stock"

export interface Product {
    id?: number,
    name: string,
    code: string,
    has_stock: boolean,
    _has_stock?: string,
    category_id: number,
    category?: Category,
    created_at?: string,
    updated_at?: string,
    product_measurement?: ProductMeasurement,
    stock?: Stock
}