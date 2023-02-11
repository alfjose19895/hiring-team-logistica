import { Category } from "./category"

export interface Product {
    id?: number,
    name: string,
    code: string,
    has_stock: boolean,
    _has_stock?: string,
    category_id: number,
    category?: Category,
    created_at?: string,
    updated_at?: string
}