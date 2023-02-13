import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { ProductResponse } from 'src/app/interfaces/productResponse';
import { Product } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductMeasurement } from 'src/app/interfaces/productMeasurement';
import { Stock } from 'src/app/interfaces/stock';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    has_stock: new FormControl(false, [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    stock_id: new FormControl(''),
    quantity: new FormControl('', [Validators.required]),
    productMeasurement_id: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
  });
  submitButtonText: string = 'Create';
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.productForm.reset();
  }

  handleSubmit() {
    this.submitButtonText == 'Create'
      ? this.createProduct()
      : this.updateProduct();
  }

  getCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  createProduct() {
    if (this.productForm.valid) {
      let product: Product = {
        name: this.productForm.get('name')?.value,
        code: this.productForm.get('code')?.value,
        has_stock: this.productForm.get('has_stock')?.value,
        category_id: this.productForm.get('category_id')?.value,
      };
      let productMeasurement: ProductMeasurement = {
        price: this.productForm.get('price')?.value,
        size: this.productForm.get('size')?.value,
        weight: this.productForm.get('weight')?.value,
      };
      let stock: Stock = {
        quantity: this.productForm.get('quantity')?.value,
      };
      this.productsService
        .createProduct(product, productMeasurement, stock)
        .subscribe((productResponse: ProductResponse) => {
          this.productForm.reset();
          this.productsService.refresh$.emit();
          let { message } = productResponse;
          alert(message);
        });
    }
  }

  showProduct(product: Product) {
    this.productForm.get('id')?.setValue(product.id);
    this.productForm.get('name')?.setValue(product.name);
    this.productForm.get('code')?.setValue(product.code);
    this.productForm.get('has_stock')?.setValue(product.has_stock);
    this.productForm.get('category_id')?.setValue(product.category_id);
    this.productForm
      .get('productMeasurement_id')
      ?.setValue(product.product_measurement?.id);
    this.productForm.get('price')?.setValue(product.product_measurement?.price);
    this.productForm.get('size')?.setValue(product.product_measurement?.size);
    this.productForm
      .get('weight')
      ?.setValue(product.product_measurement?.weight);
    this.productForm.get('stock_id')?.setValue(product.stock?.id);
    this.productForm.get('quantity')?.setValue(product.stock?.quantity);
    this.submitButtonText = 'Update';
  }

  updateProduct() {
    if (this.productForm.valid) {
      let product: Product = {
        id: this.productForm.get('id')?.value,
        name: this.productForm.get('name')?.value,
        code: this.productForm.get('code')?.value,
        has_stock: this.productForm.get('has_stock')?.value,
        category_id: this.productForm.get('category_id')?.value,
      };
      let productMeasurement: ProductMeasurement = {
        id: this.productForm.get('productMeasurement_id')?.value,
        price: this.productForm.get('price')?.value,
        size: this.productForm.get('size')?.value,
        weight: this.productForm.get('weight')?.value,
      };
      let stock: Stock = {
        id: this.productForm.get('stock_id')?.value,
        quantity: this.productForm.get('quantity')?.value,
      };
      this.productsService
        .updateProduct(product, productMeasurement, stock)
        .subscribe((productResponse: ProductResponse) => {
          this.productForm.reset();
          this.productsService.refresh$.emit();
          this.submitButtonText = 'Create';
          let { message } = productResponse;
          alert(message);
        });
    }
  }
}
